import { error } from '@sveltejs/kit';
import { teamOrder } from '$lib/candidates.js';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
	const index = teamOrder.findIndex((c) => c.slug === params.slug);
	if (index === -1) error(404, 'Not found');

	const count = teamOrder.length;
	return {
		candidate: teamOrder[index],
		previous: teamOrder[(index - 1 + count) % count],
		next: teamOrder[(index + 1) % count]
	};
}

/** @type {import('./$types').EntryGenerator} */
export function entries() {
	return teamOrder.map((c) => ({ slug: c.slug }));
}
