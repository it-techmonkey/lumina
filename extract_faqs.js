const fs = require('fs');
const content = fs.readFileSync('blackout-blinds/figma_output6.tsx', 'utf8');
const textMatches = [...content.matchAll(/<p.*?>(.*?)<\/p>/gs)];
for (const m of textMatches) {
  const txt = m[1].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ');
  if (txt) console.log(txt);
}
