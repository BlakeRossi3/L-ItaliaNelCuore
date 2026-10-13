<script>
	import { afterNavigate, goto } from '$app/navigation';
	import { href, jumpTo } from '$lib/link.js';
	import { t, tl } from '$lib/i18n.svelte.js';
	import ui from '$lib/content/ui.json';
	import CandidatePhoto from '$lib/components/CandidatePhoto.svelte';
	import logo from '$lib/assets/brand/logo-720.png';

	let { data } = $props();
	const c = $derived(data.candidate);
	const bio = $derived(c.bio ? tl(c.bio) : []);
	// the logo matches the height of the name block (name down to the biography button)
	let nameHeight = $state(220);

	// Arriving from the grid, the back arrow returns to the same spot in it.
	let cameFromGrid = $state(false);
	afterNavigate(({ from }) => {
		cameFromGrid = from?.route.id === '/candidates';
	});

	/** @param {MouseEvent} event */
	function back(event) {
		if (cameFromGrid) {
			event.preventDefault();
			history.back();
		}
	}

	/** @param {KeyboardEvent} event */
	function onKey(event) {
		if (event.key !== 'Escape' || event.defaultPrevented) return;
		if (cameFromGrid) history.back();
		else goto(href('/candidates'));
	}
</script>

<svelte:head>
	<title>{c.name} | {ui.listName}</title>
	<meta name="description" content="{c.name} – {t(c.role)}, {c.state}. “{t(c.quote)}”" />
</svelte:head>

<svelte:window onkeydown={onKey} />

<article>
	<header class="hero">
		<img class="backdrop" src={c.thumb} alt="" aria-hidden="true" />
		<div class="hero-inner">
			<a class="back" href={href('/candidates')} onclick={back}>
				<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
					<path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" />
				</svg>
				<span class="back-text">{t(ui.candidate.allCandidates)}</span>
				<span class="visually-hidden">{t(ui.candidate.backToAll)}</span>
			</a>

			<figure class="portrait">
				<CandidatePhoto candidate={c} size="photo" loading="eager" alt="{t(ui.candidate.portrait)} {c.name}" />
			</figure>

			<div class="ident">
				<blockquote class="quote">
					<p>{t(c.quote)}</p>
				</blockquote>
				<p class="caps role">{t(c.role)}</p>
				<div class="name-row">
					<div class="name-block" bind:clientHeight={nameHeight}>
				<h1 class="display name">{c.name}</h1>
				{#if c.signature}
							<img
								class="signature-img"
								class:large={c.slug === 'antonio-mariniello'}
								src={c.signature}
								alt=""
								aria-hidden="true"
							/>
						{:else}
							<p class="script name-script" aria-hidden="true">{c.name}</p>
						{/if}
				<p class="state">
					<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
						<path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z" fill="currentColor" />
						<circle cx="12" cy="10" r="2.6" fill="var(--navy)" />
					</svg>
					{c.state}
				</p>
				{#if bio.length}
					<a class="button light bio-button" href="#bio" onclick={(e) => jumpTo(e, 'bio')}>
						{t(ui.candidate.goToBio)}
						<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
							<path d="M12 5v14M6 13l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" />
						</svg>
					</a>
				{/if}
					</div>
					<img class="name-logo" src={logo} alt={t(ui.logoAlt)} width="240" height="240" style:--logo-size="{nameHeight}px" />
				</div>
			</div>
		</div>
		<svg class="curve" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
			<path d="M0 80 C 420 10 980 10 1440 70 L1440 80 Z" fill="var(--sage)" />
			<path d="M0 80 C 430 28 990 28 1440 80 Z" fill="var(--paper)" />
		</svg>
	</header>

	<div class="wrap body">
		{#if bio.length}
			<section id="bio" class="bio" aria-labelledby="bio-title">
				<h2 id="bio-title" class="display bio-title">{t(ui.candidate.about)}</h2>
				<div class="prose">
					{#each bio as paragraph}
						<p>{paragraph}</p>
					{/each}
				</div>
			</section>
		{/if}

		<nav class="pager" aria-label={t(ui.candidate.more)}>
			<a class="pager-link" href={href(`/candidates/${data.previous.slug}`)}>
				<CandidatePhoto candidate={data.previous} morph={false} alt="" />
				<span>
					<span class="pager-dir">{t(ui.candidate.previous)}</span>
					<span class="pager-name">{data.previous.name}</span>
				</span>
			</a>
			<a class="pager-link next" href={href(`/candidates/${data.next.slug}`)}>
				<span>
					<span class="pager-dir">{t(ui.candidate.next)}</span>
					<span class="pager-name">{data.next.name}</span>
				</span>
				<CandidatePhoto candidate={data.next} morph={false} alt="" />
			</a>
		</nav>
	</div>
</article>

<style>
	.hero {
		position: relative;
		overflow: hidden;
		background: var(--navy);
		color: var(--on-dark);
	}
	/* The candidate's own photo, blurred, fills the band behind the portrait */
	.backdrop {
		position: absolute;
		inset: -40px;
		width: calc(100% + 80px);
		height: calc(100% + 80px);
		object-fit: cover;
		filter: blur(36px) saturate(0.9);
		opacity: 0.55;
	}
	.hero::before {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(90deg, rgb(19 77 126 / 0.55), rgb(19 77 126 / 0.9) 60%);
		z-index: 1;
	}
	.hero-inner {
		position: relative;
		z-index: 2;
		max-width: var(--max);
		margin-inline: auto;
		padding: clamp(4.25rem, 7vw, 5rem) var(--gutter) clamp(3.5rem, 6vw, 5rem);
		display: grid;
		gap: 1.75rem 3.5rem;
		align-items: end;
	}
	@media (min-width: 860px) {
		.hero-inner {
			grid-template-columns: auto minmax(0, 1fr);
		}
	}
	.portrait {
		margin: 0;
		height: clamp(380px, 66vh, 660px);
		aspect-ratio: 4 / 5;
		max-width: 100%;
		background: var(--navy-deep);
		box-shadow: 0 30px 60px -30px rgb(0 0 0 / 0.6);
	}
	.portrait :global(img) {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: 50% 20%;
	}
	@media (max-width: 859px) {
		.hero-inner {
			padding-top: 0;
			padding-inline: 0;
		}
		.portrait {
			height: auto;
			width: 100%;
			max-height: 78vh;
			box-shadow: none;
		}
		.ident {
			padding-inline: var(--gutter);
		}
	}
	.ident {
		display: grid;
		gap: 0.5rem;
		justify-items: start;
		padding-bottom: 0.5rem;
	}
	.role {
		color: var(--sky);
	}
	.name {
		font-size: clamp(2.4rem, 4.6vw, 4.4rem);
		overflow-wrap: break-word;
		hyphens: none;
	}
	.signature-img {
		height: clamp(3rem, 5vw, 4.4rem);
		width: auto;
		max-width: 100%;
		object-fit: contain;
		object-position: left center;
		margin: 0.1rem 0 0.2rem;
		/* every signature shown in white */
		filter: brightness(0) invert(1);
	}
	/* Antonio's drawn signature is lighter, so it gets a little more room */
	.signature-img.large {
		height: clamp(4rem, 6.6vw, 5.8rem);
	}
	.name-script {
		font-size: clamp(2.6rem, 4.6vw, 3.6rem);
		color: var(--on-dark);
		margin-top: -0.2rem;
		margin-left: 0.2rem;
	}
	.bio-button {
		margin-top: 1rem;
	}
	.bio-button:focus-visible {
		outline-color: var(--sun);
	}
	.bio {
		scroll-margin-top: calc(var(--header-h) + 24px);
	}
	.state {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		margin-top: 0.5rem;
		padding: 0.35rem 0.85rem 0.35rem 0.6rem;
		border-radius: 999px;
		background: rgb(255 255 255 / 0.14);
		font-weight: 600;
	}

	.back {
		position: absolute;
		top: clamp(14px, 2.4vw, 26px);
		left: var(--gutter);
		z-index: 3;
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		min-height: 44px;
		padding: 0.55rem 1rem 0.55rem 0.7rem;
		border-radius: 999px;
		background: var(--white);
		color: var(--navy);
		text-decoration: none;
		font-weight: 700;
		line-height: 1;
		box-shadow: 0 4px 18px rgb(0 0 0 / 0.22);
		transition:
			background-color 0.15s ease,
			color 0.15s ease;
	}
	.back:hover {
		background: var(--cream);
	}
	.back:focus-visible {
		outline-color: var(--sun);
	}
	@media (max-width: 859px) {
		.back {
			top: 14px;
		}
	}
	@media (max-width: 480px) {
		.back-text {
			display: none;
		}
		.back {
			padding: 0.6rem;
		}
	}

	.curve {
		position: absolute;
		left: 0;
		right: 0;
		bottom: -1px;
		width: 100%;
		height: clamp(28px, 4vw, 56px);
		z-index: 2;
	}

	.body {
		padding-block: clamp(2rem, 5vw, 3.5rem) clamp(3.5rem, 7vw, 5rem);
		display: grid;
		gap: clamp(2.5rem, 5vw, 3.5rem);
	}
	/* Quote across the full header width, centered, above the name */
	.quote {
		width: 100%;
		text-align: center;
		margin-bottom: clamp(0.75rem, 2vw, 1.5rem);
	}
	.quote::before {
		content: '“';
		display: block;
		font-family: Georgia, 'Times New Roman', serif;
		font-size: 4.4rem;
		line-height: 0.6;
		font-weight: 700;
		color: var(--sun);
		margin-top: 0.6rem;
	}
	.quote p {
		font-style: italic;
		font-size: clamp(1.05rem, 1.5vw, 1.35rem);
		line-height: 1.5;
		color: var(--on-dark);
		text-wrap: balance;
	}

	/* Name on the left, logo beside it and set a little lower */
	.name-row {
		display: flex;
		flex-wrap: nowrap;
		align-items: flex-start;
		justify-content: space-between;
		gap: 1rem 2rem;
		width: 100%;
	}
	.name-block {
		display: grid;
		gap: 0.5rem;
		justify-items: start;
		min-width: 0;
		flex: 1 1 auto;
	}
	.name-logo {
		width: var(--logo-size, 220px);
		height: auto;
		aspect-ratio: 1;
		flex-shrink: 0;
	}
	/* tablets: keep the logo from crowding long names */
	@media (max-width: 1199px) {
		.name-logo {
			width: min(var(--logo-size, 220px), 38%);
		}
	}
	@media (max-width: 600px) {
		.name-row {
			flex-wrap: wrap;
		}
		.name-logo {
			width: 170px;
			height: 170px;
			max-width: none;
		}
	}

	.bio {
		display: grid;
		gap: 1.25rem;
		padding-top: 2rem;
		border-top: 3px solid var(--navy);
	}
	@media (min-width: 900px) {
		.bio {
			grid-template-columns: minmax(0, 1fr) minmax(0, 2.4fr);
			gap: 3rem;
		}
	}
	.bio-title {
		font-size: var(--step-2);
		color: var(--navy);
	}
	.bio .prose {
		font-size: var(--step-1);
		line-height: 1.62;
	}

	.pager {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1px;
		background: var(--rule);
		border-block: 1px solid var(--rule);
	}
	.pager-link {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1.1rem 0;
		background: var(--paper);
		text-decoration: none;
		min-width: 0;
	}
	.pager-link.next {
		justify-content: flex-end;
		text-align: right;
	}
	.pager-link :global(img) {
		width: 56px;
		height: 70px;
		object-fit: cover;
		object-position: 50% 20%;
		flex-shrink: 0;
	}
	.pager-link > span {
		display: grid;
		min-width: 0;
	}
	.pager-dir {
		color: var(--ink-soft);
		font-size: var(--step--1);
	}
	.pager-name {
		font-weight: 900;
		text-transform: uppercase;
		letter-spacing: -0.02em;
		line-height: 1.1;
		color: var(--navy);
		overflow-wrap: anywhere;
	}
	.pager-link:hover .pager-name {
		color: var(--red);
	}
	@media (max-width: 520px) {
		.pager-link :global(img) {
			display: none;
		}
	}
</style>
