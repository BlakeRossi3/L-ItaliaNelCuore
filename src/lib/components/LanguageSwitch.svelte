<script>
	import { i18n, LANGS, LANG_NAMES, t } from '$lib/i18n.svelte.js';
	import ui from '$lib/content/ui.json';
</script>

<div class="switch" role="group" aria-label={t(ui.language)}>
	{#each LANGS as code}
		<button
			type="button"
			lang={code}
			aria-pressed={i18n.lang === code}
			title={LANG_NAMES[code]}
			onclick={() => i18n.set(code)}
		>
			<span aria-hidden="true">{code.toUpperCase()}</span>
			<span class="visually-hidden">{LANG_NAMES[code]}</span>
		</button>
	{/each}
</div>

<style>
	.switch {
		display: inline-flex;
		padding: 3px;
		border-radius: 999px;
		background: rgb(255 255 255 / 0.12);
		box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.22);
	}
	button {
		min-width: 40px;
		min-height: 34px;
		padding: 0 0.6rem;
		border: 0;
		border-radius: 999px;
		background: transparent;
		color: var(--on-dark);
		font: inherit;
		font-size: 0.85rem;
		font-weight: 700;
		letter-spacing: 0.04em;
		cursor: pointer;
		transition:
			background-color 0.15s ease,
			color 0.15s ease;
	}
	button:hover {
		background: rgb(255 255 255 / 0.14);
	}
	button[aria-pressed='true'] {
		background: var(--white);
		color: var(--navy);
	}
	button:focus-visible {
		outline: 3px solid var(--sun);
		outline-offset: 2px;
	}
</style>
