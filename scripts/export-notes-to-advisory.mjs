#!/usr/bin/env node
/**
 * Re-export today's Apple Notes into b9-advisory/ (optional maintenance script).
 * Run: node scripts/export-notes-to-advisory.mjs
 */
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const outDir = path.join(root, 'b9-advisory-notes-from-notes-app');

const listScript = `
set todayStart to (current date)
set time of todayStart to 0
set todayEnd to todayStart + (1 * days)
set out to ""
tell application "Notes"
  set countToday to 0
  repeat with acct in accounts
    repeat with f in folders of acct
      repeat with n in notes of f
        set cd to creation date of n
        if cd ≥ todayStart and cd < todayEnd then
          set countToday to countToday + 1
          set out to out & countToday & tab & (name of n) & linefeed
        end if
      end repeat
    end repeat
  end repeat
end tell
return out
`;

function sanitize(title, idx) {
  if (title.startsWith('#')) title = title.replace(/^#\s*/, '');
  else if (title.startsWith('//')) return `${String(idx).padStart(2, '0')}-code-block-${idx}.md`;
  return `${String(idx).padStart(2, '0')}-${title.replace(/[^\w\s-—]/g, '').replace(/\s+/g, '-').slice(0, 80)}.md`;
}

fs.mkdirSync(outDir, { recursive: true });
const raw = execSync('osascript -e ' + JSON.stringify(listScript), { encoding: 'utf8' });
const entries = raw.trim().split('\n').filter(Boolean).map((line) => {
  const [idx, title] = line.split('\t');
  return { idx: Number(idx), title };
});

for (const { idx, title } of entries) {
  const fetchScript = `
set todayStart to (current date)
set time of todayStart to 0
set todayEnd to todayStart + (1 * days)
set targetIdx to ${idx}
set countToday to 0
tell application "Notes"
  repeat with acct in accounts
    repeat with f in folders of acct
      repeat with n in notes of f
        set cd to creation date of n
        if cd ≥ todayStart and cd < todayEnd then
          set countToday to countToday + 1
          if countToday = targetIdx then return plaintext of n
        end if
      end repeat
    end repeat
  end repeat
end tell
return ""
`;
  const body = execSync('osascript -e ' + JSON.stringify(fetchScript), { encoding: 'utf8' });
  const fname = sanitize(title, idx);
  fs.writeFileSync(path.join(outDir, fname), `# ${title}\n\n${body}`);
  console.log('Exported', fname);
}

console.log(`Done — ${entries.length} notes in ${outDir}`);
