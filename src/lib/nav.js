import ui from '$lib/content/ui.json';

// Site pages, in menu order. `route` is the SvelteKit route id used to highlight the current page.
export const nav = [
	{ path: '/', route: '/', label: ui.nav.home },
	{ path: '/about', route: '/about', label: ui.nav.about },
	{ path: '/candidates', route: '/candidates', label: ui.nav.candidates },
	{ path: '/program', route: '/program', label: ui.nav.program },
	{ path: '/record', route: '/record', label: ui.nav.record },
	{ path: '/vote', route: '/vote', label: ui.nav.vote }
];

export const OFFICIAL_ELECTION_PAGE =
	'https://ambcittadelmessico.esteri.it/it/servizi-consolari-e-visti/servizi-per-il-cittadino-italiano/servizi-elettorali/elezioni-com-it-es-2026/';
