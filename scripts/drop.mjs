// Removes a story the editor cut, and its photo.
//   node scripts/drop.mjs content/editions/2026-09-29/some-story.md
// Only touches files inside content/editions, so the editor can be allowed this and nothing broader.

import { existsSync, readFileSync, rmSync } from 'node:fs';
import { basename, relative, resolve } from 'node:path';

const file = process.argv[2];
const rel = file && relative(resolve('content/editions'), resolve(file));
if (!file || !file.endsWith('.md') || !rel || rel.startsWith('..')) {
  console.error('usage: node scripts/drop.mjs content/editions/<date>/<story>.md');
  process.exitCode = 1;
} else if (!existsSync(file)) {
  console.error(`${file} does not exist`);
  process.exitCode = 1;
} else {
  const image = readFileSync(file, 'utf8').match(/^image: "\/images\/([^"]+)"/m)?.[1];
  rmSync(file);
  if (image && existsSync(`public/images/${image}`)) rmSync(`public/images/${image}`);
  console.log(`dropped ${basename(file)}${image ? ` and images/${image}` : ''}`);
}
