// Scoped theme tooling: credentials are inherited from .env.local, never printed.
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const root = path.resolve(__dirname, '../..');
const cache = path.join(root, 'node_modules/.cache/npm-shopify/_npx');
const cli = fs.readdirSync(cache).map(id => path.join(cache, id, 'node_modules/@shopify/cli/bin/run.js')).find(fs.existsSync);
if (!cli) throw new Error('Install Shopify CLI using the workspace npm cache first.');
const args = process.argv.slice(2);
if (args[0] !== 'theme' || !['list', 'push', 'check', 'pull', 'package'].includes(args[1])) throw new Error('Only theme development commands are allowed.');
if (args.some(arg => ['--live', '--allow-live', '--publish'].includes(arg))) throw new Error('Live theme operations are prohibited.');
if (args[1] === 'push' && !args.includes('--unpublished')) {
  const target = args[args.indexOf('--theme') + 1];
  const saved = JSON.parse(fs.readFileSync(path.join(root, 'shopify/theme-target.json'), 'utf8'));
  if (!args.includes('--theme') || target !== String(saved.id)) throw new Error('Updates must target the saved unpublished theme ID.');
}
const local = path.join(root, 'shopify/.local');
fs.mkdirSync(local, { recursive: true });
const env = { ...process.env, SHOPIFY_CLI_NO_ANALYTICS: '1', SHOPIFY_CLI_NO_NOTIFICATIONS: '1', XDG_CONFIG_HOME: local };
const result = spawnSync(process.execPath, [cli, ...args], { cwd: root, env, stdio: 'inherit' });
process.exit(result.status ?? 1);
