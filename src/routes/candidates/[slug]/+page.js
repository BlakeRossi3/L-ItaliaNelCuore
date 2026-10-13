import { error } from '@sveltejs/kit';
import { candidates } from '$lib/candidates.js';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
	const index = candidates.findIndex((c) => c.slug === params.slug);
	if (index === -1) error(404, 'Not found');

	const count = candidates.length;
	return {
		candidate: candidates[index],
		previous: candidates[(index - 1 + count) % count],
		next: candidates[(index + 1) % count]
	};
}

/** @type {import('./$types').EntryGenerator} */
export function entries() {
	return candidates.map((c) => ({ slug: c.slug }));
}
