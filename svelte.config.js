import adapterAuto from '@sveltejs/adapter-auto';
import adapterStatic from '@sveltejs/adapter-static';

// Normal builds deploy to Vercel/Netlify (adapter-auto picks the right one).
// PREVIEW=1 builds a single self-contained HTML page for quick previews in chat.
const preview = process.env.PREVIEW === '1';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: preview
		? {
				adapter: adapterStatic({ pages: 'preview-build', assets: 'preview-build', strict: false }),
				router: { type: 'hash' },
				output: { bundleStrategy: 'inline' },
				// a copy of src/routes without server files, made by scripts/make-preview-page.js
				files: { routes: process.env.PREVIEW_ROUTES ?? 'src/routes' }
			}
		: {
				adapter: adapterAuto()
			}
};

export default config;
