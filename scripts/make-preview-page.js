// Builds the whole site into ONE self-contained HTML file (hash links, inlined
// code and fonts) so it can be shared as a quick clickable preview.
// Run with: npm run build:preview-page   → output in preview-page/index.html
// The real site is built with `npm run build`; this script doesn't affect it.
import { cpSync, rmSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const routesCopy = join(root, '.svelte-kit', 'preview-routes');

// 1. Copy the pages, leaving out server-only files (the preview has no server)
rmSync(routesCopy, { recursive: true, force: true });
cpSync(join(root, 'src', 'routes'), routesCopy, {
	recursive: true,
	filter: (src) => !/\+server\.js$|\.server\.js$/.test(src)
});
// Hash-routed apps can't have page options (prerender, entries...), so strip them
rmSync(join(routesCopy, '+layout.js'), { force: true });
const slugPage = join(routesCopy, 'candidates', '[slug]', '+page.js');
writeFileSync(
	slugPage,
	readFileSync(slugPage, 'utf8').replace(/\/\*\* @type \{import\('\.\/\$types'\)\.EntryGenerator\} \*\/\s*export function entries\(\) \{[\s\S]*?\n\}\n/, '')
);

// 2. Build in preview mode
execSync('npx vite build', {
	cwd: root,
	stdio: 'inherit',
	env: { ...process.env, PREVIEW: '1', PREVIEW_ROUTES: routesCopy }
});

// 3. Turn the built page into a fragment (title and styles first, then the app)
const html = readFileSync(join(root, 'preview-build', 'index.html'), 'utf8');
// (the app's code contains its own '</body>' text, so cut at the LAST one)
const head = html.slice(html.indexOf('<head>') + 6, html.indexOf('</head>'));
const bodyOpen = html.indexOf('>', html.indexOf('<body')) + 1;
const body = html.slice(bodyOpen, html.lastIndexOf('</body>'));
const headKept = head
	.replace(/<meta charset[^>]*>/, '')
	.replace(/<meta name="viewport"[^>]*>/, '')
	.replace(/<link rel="icon"[^>]*>/, '');

const page = `<title>L’Italia nel cuore Website</title>\n${headKept.trim()}\n${body.trim()}\n`;
mkdirSync(join(root, 'preview-page'), { recursive: true });
writeFileSync(join(root, 'preview-page', 'index.html'), page);
console.log(`preview-page/index.html written (${(page.length / 1024).toFixed(0)} KB)`);
