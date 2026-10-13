<script>
	import { t, tl } from '$lib/i18n.svelte.js';
	import about from '$lib/content/about.json';
	import ui from '$lib/content/ui.json';
	import logo from '$lib/assets/brand/logo-720.png';
	import Signature from '$lib/components/Signature.svelte';

	const headings = about.page;
	const pillars = ['mission', 'vision', 'purpose'];
</script>

<svelte:head>
	<title>{t(ui.nav.about)} | {ui.listName}</title>
	<meta name="description" content={t(headings.metaDescription)} />
</svelte:head>

<section class="wrap head">
	<h1 class="display page-title"><span class="bar">{t(ui.nav.about)}</span></h1>
	<p class="lede">{t(headings.lede)}</p>
</section>

<!-- Mission, vision, purpose: laid out like the campaign's own sheet -->
<section class="pillars" aria-label="{t(headings.mission)}, {t(headings.vision)}, {t(headings.purpose)}">
	<div class="wrap pillars-inner">
		<img class="pillars-logo" src={logo} alt={t(ui.logoAlt)} width="300" height="300" loading="eager" />
		<dl>
			{#each pillars as key}
				<div>
					<dt class="caps">{t(headings[key])}</dt>
					<dd>{t(about[key])}</dd>
				</div>
			{/each}
		</dl>
	</div>
</section>

<section class="wrap split" aria-labelledby="story-title">
	<h2 id="story-title" class="display section-title">{t(headings.story)}</h2>
	<div class="prose story">
		{#each tl(about.story) as p}
			<p>{p}</p>
		{/each}
	</div>
</section>

<section class="wrap split" aria-labelledby="commitments-title">
	<h2 id="commitments-title" class="display section-title">{t(headings.commitments)}</h2>
	<ul class="commitments">
		{#each tl(about.commitments) as item}
			<li>
				<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
					<circle cx="12" cy="12" r="11" fill="var(--green)" />
					<path d="M7 12.5l3.2 3.2L17 9" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" />
				</svg>
				<span>{item}</span>
			</li>
		{/each}
	</ul>
</section>

<section id="letter" class="letter-section" aria-labelledby="letter-title">
	<div class="wrap">
		<article class="letter">
			<h2 id="letter-title" class="display section-title">{t(headings.letter)}</h2>
			<div class="letter-body">
				{#each tl(about.letter) as p}
					<p>{p}</p>
				{/each}
			</div>
			<footer class="letter-sign">
				<p>{t(about.letterSignoff)}</p>
				<Signature width="220px" class="letter-sig" />
				<p class="letter-name">Antonio Mariniello</p>
			</footer>
		</article>
	</div>
</section>

<style>
	.head {
		padding-block: clamp(2.5rem, 7vw, 5rem) clamp(2rem, 4vw, 3rem);
		display: grid;
		gap: 1.5rem;
	}
	.head .lede {
		max-width: 44ch;
	}

	.pillars {
		background: var(--olive);
		color: var(--on-dark);
		padding-block: clamp(3rem, 6vw, 4.5rem);
	}
	.pillars-inner {
		display: grid;
		gap: 2rem;
	}
	.pillars-logo {
		justify-self: center;
		width: clamp(180px, 24vw, 300px);
		height: auto;
		aspect-ratio: 1;
	}
	dl {
		width: 100%;
		max-width: 56rem;
		justify-self: center;
	}
	dl {
		display: grid;
	}
	dl div {
		display: grid;
		gap: 0.5rem 2.5rem;
		padding-block: 1.4rem;
		border-top: 1px solid rgb(255 255 255 / 0.28);
	}
	dl div:first-child {
		border-top: 0;
		padding-top: 0;
	}
	@media (min-width: 700px) {
		dl div {
			grid-template-columns: 9rem minmax(0, 1fr);
		}
	}
	dt {
		font-weight: 700;
		color: var(--on-dark);
		padding-top: 0.25rem;
	}
	dd {
		font-size: var(--step-1);
		line-height: 1.5;
		max-width: 60ch;
	}

	.split {
		display: grid;
		gap: 1.25rem 3rem;
		padding-top: clamp(3.5rem, 8vw, 5.5rem);
	}
	@media (min-width: 900px) {
		.split {
			grid-template-columns: minmax(0, 1fr) minmax(0, 1.7fr);
		}
	}
	.split > * {
		min-width: 0;
	}
	.story {
		font-size: var(--step-1);
		line-height: 1.6;
	}

	.commitments {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 0.9rem;
		max-width: 60ch;
	}
	.commitments li {
		display: grid;
		grid-template-columns: 22px minmax(0, 1fr);
		gap: 0.9rem;
		align-items: start;
		font-size: var(--step-1);
		line-height: 1.45;
	}
	.commitments svg {
		margin-top: 0.15rem;
	}

	.letter-section {
		margin-top: clamp(4rem, 9vw, 6.5rem);
		padding-block: clamp(3rem, 7vw, 5rem);
		background: var(--cream);
	}
	.letter {
		max-width: 46rem;
		margin-inline: auto;
		background: var(--white);
		padding: clamp(1.75rem, 6vw, 4rem);
		box-shadow: 0 1px 2px rgb(44 44 42 / 0.06), 0 18px 40px -24px rgb(19 77 126 / 0.35);
		display: grid;
		gap: 2rem;
	}
	.letter-body {
		display: grid;
		gap: 1.1em;
		font-style: italic;
		font-weight: 300;
		font-size: var(--step-1);
		line-height: 1.65;
	}
	.letter-body p:first-child {
		font-weight: 600;
		font-style: normal;
		color: var(--navy);
	}
	.letter-sign {
		display: grid;
		justify-items: end;
		gap: 0.3rem;
		font-style: italic;
		color: var(--ink-soft);
	}
	.letter :global(.letter-sig) {
		color: var(--navy);
	}
	.letter-name {
		font-style: normal;
		font-weight: 700;
		color: var(--navy);
	}
</style>
