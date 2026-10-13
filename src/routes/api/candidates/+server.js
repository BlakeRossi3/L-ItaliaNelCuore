// Backend example: GET /api/candidates returns the list as JSON.
// Server routes like this run on the host (Vercel/Netlify); this is where
// things like a contact form or a newsletter sign-up would go later.
import { json } from '@sveltejs/kit';
import { candidates } from '$lib/candidates.js';

export const prerender = false;

export function GET() {
	return json(candidates.map(({ slug, name, state, role }) => ({ slug, name, state, role })));
}
