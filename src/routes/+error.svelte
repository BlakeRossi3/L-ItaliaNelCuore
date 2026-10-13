<script>
	import { page } from '$app/state';
	import { href } from '$lib/link.js';
	import { t } from '$lib/i18n.svelte.js';
	import ui from '$lib/content/ui.json';
</script>

<svelte:head>
	<title>{t(ui.notFound.title)} | {ui.listName}</title>
</svelte:head>

<section class="wrap err">
	<h1 class="display page-title">{page.status === 404 ? t(ui.notFound.title) : page.status}</h1>
	<p class="lede">{page.status === 404 ? t(ui.notFound.text) : page.error?.message}</p>
	<a class="button" href={href('/')}>{t(ui.notFound.home)}</a>
</section>

<style>
	.err {
		padding-block: clamp(3rem, 9vw, 7rem);
		display: grid;
		gap: 1.5rem;
		justify-items: start;
	}
</style>
