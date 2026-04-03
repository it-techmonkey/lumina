const fs = require('fs');
const content = fs.readFileSync('blackout-blinds/figma_output5.tsx', 'utf8');
const names = ['Jakob L', 'Sara M', 'Tom R', 'Annika B', 'David K'];

for (const name of names) {
  const index = content.indexOf(`data-name="${name}."`);
  if (index === -1) continue;
  const section = content.slice(Math.max(0, index - 2000), index + 1500);
  const textMatches = [...section.matchAll(/<p.*?>(.*?)<\/p>/gs)];
  console.log(`\n--- ${name}. ---`);
  for (const m of textMatches) {
    const txt = m[1].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ');
    if (txt) console.log(txt);
  }
}
