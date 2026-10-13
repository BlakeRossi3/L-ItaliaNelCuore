// Language switching. Every text in src/lib/content is stored as { es, it, en };
// t() picks the current language. Spanish is the default.
import { browser } from '$app/environment';

export const LANGS = /** @type {const} */ (['es', 'it', 'en']);
export const LANG_NAMES = { es: 'Español', it: 'Italiano', en: 'English' };
const KEY = 'lang';

let current = $state(/** @type {'es' | 'it' | 'en'} */ ('es'));

export const i18n = {
	get lang() {
		return current;
	},
	/** @param {string} value */
	set(value) {
		if (!LANGS.includes(/** @type {any} */ (value))) return;
		current = /** @type {any} */ (value);
		if (browser) {
			document.documentElement.lang = current;
			// remembered for this visit only, so a new visit opens in Spanish
			try {
				sessionStorage.setItem(KEY, current);
			} catch {}
		}
	},
	// Called once in the browser: ?lang=it in a shared link wins, then this visit's choice.
	restore() {
		let wanted = null;
		try {
			wanted = new URLSearchParams(location.search).get('lang') ?? sessionStorage.getItem(KEY);
		} catch {}
		if (wanted) this.set(wanted);
	}
};

/**
 * Text in the current language. Accepts a plain string (same in every language),
 * a { es, it, en } object, or null.
 * @param {any} value
 */
export function t(value) {
	if (value == null) return '';
	if (typeof value === 'string' || Array.isArray(value)) return value;
	return value[current] ?? value.es ?? value.it ?? '';
}

/** Lists (paragraphs, bullet points) in the current language. @param {any} value */
export function tl(value) {
	const v = t(value);
	return Array.isArray(v) ? v : v ? [v] : [];
}
