import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	// the single-file preview embeds fonts so it needs no other files
	build: process.env.PREVIEW === '1' ? { assetsInlineLimit: () => true } : {},
	define: {
		// true only for the single-page preview build, which uses #/hash links
		__HASH_ROUTER__: JSON.stringify(process.env.PREVIEW === '1')
	}
});
