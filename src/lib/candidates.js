// The 16 candidates with their photos attached.
// Text lives in src/lib/content/candidates.json; photos in src/lib/assets/candidates/
// (<slug>.jpg for the large photo, <slug>-sm.jpg for the grid). To replace a photo,
// overwrite those two files with the same names.
import data from '$lib/content/candidates.json';

const photos = /** @type {Record<string, string>} */ (
	import.meta.glob('/src/lib/assets/candidates/*.jpg', { eager: true, query: '?url', import: 'default' })
);

const signatures = /** @type {Record<string, string>} */ (
	import.meta.glob('/src/lib/assets/signatures/*.png', { eager: true, query: '?url', import: 'default' })
);

/** @param {string} name */
const photo = (name) => photos[`/src/lib/assets/candidates/${name}.jpg`];

export const candidates = data.map((c) => ({
	...c,
	photo: photo(c.slug),
	thumb: photo(`${c.slug}-sm`) ?? photo(c.slug),
	// exact signature from the campaign cards (src/lib/assets/signatures/<slug>.png), if there is one
	signature: signatures[`/src/lib/assets/signatures/${c.slug}.png`] ?? null
}));

/** @typedef {(typeof candidates)[number]} Candidate */
