// Checks that every piece of text in src/lib/content has Spanish, Italian and English.
// Run with: node scripts/check-translations.js
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const dir = new URL('../src/lib/content/', import.meta.url).pathname;
const LANGS = ['es', 'it', 'en'];
const problems = [];

function walk(node, path) {
	if (Array.isArray(node)) return node.forEach((v, i) => walk(v, `${path}[${i}]`));
	if (!node || typeof node !== 'object') return;

	const isText = LANGS.some((l) => l in node);
	if (isText) {
		for (const l of LANGS) {
			const v = node[l];
			const empty = v == null || v === '' || (Array.isArray(v) && (v.length === 0 || v.some((s) => !s)));
			if (empty) problems.push(`${path}.${l} is missing`);
		}
		// translated lists must have the same number of entries in every language
		if (LANGS.every((l) => Array.isArray(node[l]))) {
			const counts = LANGS.map((l) => node[l].length);
			if (new Set(counts).size > 1) problems.push(`${path}: different lengths ${LANGS.map((l, i) => `${l}=${counts[i]}`).join(' ')}`);
		}
		if (node.original && !LANGS.includes(node.original)) problems.push(`${path}.original is not es/it/en`);
		return;
	}
	for (const [k, v] of Object.entries(node)) walk(v, `${path}.${k}`);
}

for (const file of readdirSync(dir).filter((f) => f.endsWith('.json'))) {
	walk(JSON.parse(readFileSync(join(dir, file), 'utf8')), file.replace('.json', ''));
}

if (problems.length) {
	console.log(`${problems.length} problem(s):\n` + problems.join('\n'));
	process.exit(1);
}
console.log('All content has Spanish, Italian and English.');
