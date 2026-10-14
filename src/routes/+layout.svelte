<script>
	import '@fontsource-variable/inter-tight/wght.css';
	import '@fontsource-variable/inter-tight/wght-italic.css';
	import '@fontsource/allison/400.css';
	import '$lib/styles/app.css';
	import { onMount } from 'svelte';
	import { onNavigate, afterNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import { nav, OFFICIAL_ELECTION_PAGE } from '$lib/nav.js';
	import { href, jumpTo } from '$lib/link.js';
	import { i18n, t } from '$lib/i18n.svelte.js';
	import ui from '$lib/content/ui.json';
	import about from '$lib/content/about.json';
	import logo from '$lib/assets/brand/logo-720.png';
	import favicon from '$lib/assets/brand/logo-48.png';
	import LanguageSwitch from '$lib/components/LanguageSwitch.svelte';
	import Signature from '$lib/components/Signature.svelte';
	import Slogan from '$lib/components/Slogan.svelte';

	let { children } = $props();
	let menuOpen = $state(false);

	onMount(() => i18n.restore());

	// Animate page changes (a candidate's photo grows from the grid into their page)
	onNavigate((navigation) => {
		if (!document.startViewTransition) return;
		if (navigation.from?.url.href === navigation.to?.url.href) return;
		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	afterNavigate(() => (menuOpen = false));

	/** @param {string} route */
	const isActive = (route) => {
		const id = page.route.id ?? '';
		return route === '/' ? id === '/' : id.startsWith(route);
	};
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<svelte:window onkeydown={(e) => e.key === 'Escape' && menuOpen && (menuOpen = false)} />

<a class="skip" href="#main" onclick={(e) => jumpTo(e, 'main')}>{t(ui.skip)}</a>

<header class="site-header">
	<div class="wrap header-bar">
		<a class="brand" href={href('/')}>
			<img src={logo} alt="" width="52" height="52" />
			<span class="brand-text">
				<span class="brand-name">{ui.listName}</span>
				<span class="brand-with">{ui.listWith}</span>
			</span>
			<span class="visually-hidden">{t(ui.nav.home)}</span>
		</a>

		<nav class="desktop-nav" aria-label={t(ui.mainNav)}>
			<ul>
				{#each nav.slice(1) as item}
					<li>
						<a href={href(item.path)} aria-current={isActive(item.route) ? 'page' : undefined}>{t(item.label)}</a>
					</li>
				{/each}
			</ul>
		</nav>

		<div class="tools">
			<LanguageSwitch />
			<button
				class="menu-button"
				type="button"
				aria-expanded={menuOpen}
				aria-controls="mobile-menu"
				onclick={() => (menuOpen = !menuOpen)}
			>
				<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
					{#if menuOpen}
						<path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" />
					{:else}
						<path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" />
					{/if}
				</svg>
				<span class="visually-hidden">{menuOpen ? t(ui.closeMenu) : t(ui.menu)}</span>
			</button>
		</div>
	</div>

	<nav id="mobile-menu" class="mobile-nav" aria-label={t(ui.mainNav)} hidden={!menuOpen}>
		<ul class="wrap">
			{#each nav as item}
				<li>
					<a href={href(item.path)} aria-current={isActive(item.route) ? 'page' : undefined}>{t(item.label)}</a>
				</li>
			{/each}
		</ul>
	</nav>
</header>

<main id="main" tabindex="-1">
	{@render children()}
</main>

<footer class="site-footer">
	<div class="wrap foot">
		<div class="foot-brand">
			<img src={logo} alt={t(ui.logoAlt)} width="112" height="112" loading="lazy" />
			<div>
				<p class="foot-slogan"><Slogan /></p>
				<Signature width="150px" class="foot-sig" />
			</div>
		</div>

		<nav aria-label={t(ui.footer.pages)}>
			<p class="foot-heading">{t(ui.footer.pages)}</p>
			<ul>
				{#each nav as item}
					<li><a href={href(item.path)}>{t(item.label)}</a></li>
				{/each}
			</ul>
		</nav>

		<div class="foot-info">
			<p class="foot-heading">{t(ui.footer.official)}</p>
			<a href={OFFICIAL_ELECTION_PAGE} target="_blank" rel="noopener">{t(ui.footer.embassyPage)}</a>

			<p class="foot-heading foot-contacts">{t(ui.footer.contacts)}</p>
			<ul>
				<li>{t(ui.footer.email)}: <a href="mailto:info@italianelcuore.mx">info@italianelcuore.mx</a></li>
				<li>
					{t(ui.footer.whatsapp)}:
					<a href="https://wa.me/525518495738" target="_blank" rel="noopener">+52 55 1849 5738</a>
				</li>
			</ul>

			<p class="foot-tagline">{t(ui.footer.tagline)}</p>
		</div>
	</div>
	<div class="wrap legal">
		<p>© 2026 {ui.movement} – {ui.listWith}</p>
	</div>
</footer>

<style>
	.skip {
		position: absolute;
		left: 8px;
		top: -80px;
		z-index: 60;
		background: var(--white);
		color: var(--navy);
		padding: 0.7em 1.1em;
		border-radius: 8px;
		font-weight: 700;
	}
	.skip:focus {
		top: 8px;
	}

	.site-header {
		position: sticky;
		top: env(safe-area-inset-top, 0px);
		z-index: 40;
		background: var(--navy);
		color: var(--on-dark);
		view-transition-name: site-header;
	}
	.header-bar {
		display: flex;
		align-items: center;
		gap: 1.5rem;
		min-height: var(--header-h);
		padding-block: 0.6rem;
	}
	.brand {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		text-decoration: none;
		flex-shrink: 0;
	}
	.brand img {
		width: 52px;
		height: 52px;
	}
	.brand-text {
		display: grid;
		line-height: 1;
	}
	.brand-name {
		font-weight: 900;
		text-transform: uppercase;
		letter-spacing: -0.02em;
		font-size: 1.12rem;
	}
	.brand-with {
		margin-top: 0.3rem;
		text-transform: uppercase;
		letter-spacing: 0.16em;
		font-size: 0.68rem;
		font-weight: 500;
		color: var(--on-dark-soft);
	}

	.desktop-nav {
		margin-left: auto;
	}
	.desktop-nav ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		gap: 1.4rem;
	}
	.desktop-nav a {
		display: inline-block;
		padding-block: 0.35rem;
		text-decoration: none;
		font-weight: 600;
		white-space: nowrap;
		border-bottom: 3px solid transparent;
	}
	.desktop-nav a:hover {
		border-bottom-color: rgb(255 255 255 / 0.4);
	}
	.desktop-nav a[aria-current='page'] {
		border-bottom-color: var(--sky);
	}

	.tools {
		display: flex;
		align-items: center;
		gap: 0.6rem;
	}
	.menu-button {
		display: none;
		width: 44px;
		height: 44px;
		border: 0;
		border-radius: 999px;
		background: rgb(255 255 255 / 0.12);
		color: var(--on-dark);
		cursor: pointer;
		place-items: center;
	}
	.site-header :focus-visible {
		outline-color: var(--sun);
	}

	.mobile-nav {
		border-top: 1px solid rgb(255 255 255 / 0.16);
		background: var(--navy);
	}
	.mobile-nav ul {
		list-style: none;
		margin: 0;
		padding-block: 0.5rem 1.25rem;
		display: grid;
	}
	.mobile-nav a {
		display: block;
		padding: 0.8rem 0;
		border-bottom: 1px solid rgb(255 255 255 / 0.12);
		text-decoration: none;
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: -0.01em;
		font-size: 1.35rem;
	}
	.mobile-nav a[aria-current='page'] {
		color: var(--sky);
	}

	@media (max-width: 1159px) {
		.desktop-nav {
			display: none;
		}
		.tools {
			margin-left: auto;
		}
		.menu-button {
			display: grid;
		}
	}
	@media (min-width: 1160px) {
		.mobile-nav {
			display: none;
		}
	}
	@media (max-width: 520px) {
		.brand-with {
			display: none;
		}
		.brand-name {
			font-size: 0.98rem;
		}
	}
	/* Small phones: the round logo carries the name, leaving room for the language switch */
	@media (max-width: 430px) {
		.brand-text {
			display: none;
		}
		.brand img {
			width: 46px;
			height: 46px;
		}
		.header-bar {
			gap: 0.6rem;
		}
	}

	main {
		display: block;
		min-height: 60vh;
	}
	main:focus {
		outline: none;
	}

	.site-footer {
		background: var(--olive);
		color: var(--on-dark);
		padding-block: clamp(3rem, 6vw, 4.5rem) 1.5rem;
	}
	.foot {
		display: grid;
		gap: 2.5rem;
	}
	@media (min-width: 860px) {
		.foot {
			grid-template-columns: 1.6fr 1fr 1.2fr;
		}
	}
	.foot-brand {
		display: flex;
		gap: 1.25rem;
		align-items: center;
	}
	.foot-brand img {
		width: 112px;
		height: 112px;
		flex-shrink: 0;
	}
	.foot-slogan {
		--slogan-accent: var(--sun);
		font-style: italic;
		font-size: var(--step-1);
		line-height: 1.3;
		max-width: 22ch;
		margin-bottom: 0.6rem;
	}
	.site-footer :global(.foot-sig) {
		color: var(--on-dark);
	}
	.foot-heading {
		color: var(--on-dark-soft);
		font-size: var(--step--1);
		margin-bottom: 0.6rem;
	}
	.foot ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 0.35rem;
	}
	.foot a {
		text-decoration: none;
		font-weight: 600;
	}
	.foot a:hover {
		text-decoration: underline;
		text-underline-offset: 4px;
	}
	.foot-info {
		display: grid;
		align-content: start;
		gap: 0.2rem;
	}
	.foot-contacts {
		margin-top: 1.4rem;
	}
	.foot-tagline {
		margin-top: 1rem;
		color: var(--on-dark-soft);
		font-size: var(--step--1);
		max-width: 36ch;
	}
	.legal {
		margin-top: 2.5rem;
		font-size: var(--step--1);
		color: var(--on-dark-soft);
	}
	.legal p {
		padding-top: 1.2rem;
		border-top: 1px solid rgb(255 255 255 / 0.2);
	}
	.site-footer :focus-visible {
		outline-color: var(--sun);
	}
</style>
