// Builds an internal link. The deployed site uses normal paths (/candidates);
// the single-file preview build uses hash links (#/candidates).
/** @param {string} path */
export const href = (path) => (__HASH_ROUTER__ ? '#' + path : path);

// In-page jump links (#section). Handled in script so they also work in the
// hash-routed preview, where a bare #id would be read as a page address.
/** @param {MouseEvent} event @param {string} id */
export function jumpTo(event, id) {
	const target = document.getElementById(id);
	if (!target) return;
	event.preventDefault();
	const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
	target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
	if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
	target.focus({ preventScroll: true });
}

// Link to a section on another page (e.g. step 2 of "How to vote").
// The deployed site uses a normal #anchor; the preview build remembers the
// target and the destination page scrolls to it once it has loaded.
export const pendingJump = { id: /** @type {string | null} */ (null) };

/** @param {string} path @param {string} id */
export const sectionHref = (path, id) => (__HASH_ROUTER__ ? '#' + path : `${path}#${id}`);

/** @param {string} id */
export const rememberJump = (id) => {
	pendingJump.id = id;
};

// Call from the destination page after it mounts.
export function runPendingJump() {
	const id = pendingJump.id;
	pendingJump.id = null;
	if (!id) return;
	requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ block: 'start' }));
}
