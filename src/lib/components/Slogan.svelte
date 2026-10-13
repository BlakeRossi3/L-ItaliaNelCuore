<script>
	// The campaign slogan with "siempre con Italia" / "sempre con l’Italia" / "always with Italy" highlighted.
	import about from '$lib/content/about.json';
	import { t } from '$lib/i18n.svelte.js';
	let { class: className = '' } = $props();
	const parts = $derived(t(about.sloganParts));
</script>

<span class="slogan-text {className}">“{parts[0]}<strong>{parts[1]}</strong>{parts[2]}”</span>

<style>
	strong {
		font-weight: 800;
		color: var(--slogan-accent, var(--red));
	}
</style>
