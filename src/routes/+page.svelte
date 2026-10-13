<script>
	import { href, sectionHref, rememberJump } from '$lib/link.js';
	import { t, tl } from '$lib/i18n.svelte.js';
	import { candidates } from '$lib/candidates.js';
	import home from '$lib/content/home.json';
	import about from '$lib/content/about.json';
	import program from '$lib/content/program.json';
	import ui from '$lib/content/ui.json';
	import towerEs from '$lib/assets/brand/tower-es.jpg';
	import towerIt from '$lib/assets/brand/tower-it.jpg';
	import towerEn from '$lib/assets/brand/tower-en.jpg';
	import logo from '$lib/assets/brand/logo-720.png';
	import community from '$lib/assets/brand/community.jpg';
	import CandidatePhoto from '$lib/components/CandidatePhoto.svelte';
	import Signature from '$lib/components/Signature.svelte';
	import Slogan from '$lib/components/Slogan.svelte';

	// The tower photo with the slogan painted on it, one per language
	const tower = { es: towerEs, it: towerIt, en: towerEn };

	const letterOpening = $derived(tl(about.letter).slice(0, 2));
</script>

<svelte:head>
	<title>{t(home.metaTitle)}</title>
	<meta name="description" content={t(home.metaDescription)} />
</svelte:head>

<!-- Hero: navy panel with the logo, and the tower with the slogan painted on it -->
<section class="hero">
	<div class="hero-panel">
		<div class="hero-copy">
			<p class="hero-election">{t(ui.election)}</p>
			<h1 class="display hero-title">{ui.listName}</h1>
			<div class="hero-mark">
				<img class="hero-logo" src={logo} alt={t(ui.logoAlt)} width="340" height="340" />
				<div class="hero-actions">
					<a class="button red" href={href('/vote')}>{t(home.heroCtaVote)}</a>
					<a class="button light" href={href('/candidates')}>{t(home.heroCtaTeam)}</a>
				</div>
			</div>
		</div>
	</div>
	<div class="hero-photo">
		<img src={t(tower)} alt={t(about.slogan)} />
	</div>
</section>

<!-- Key dates -->
<section class="dates" aria-labelledby="dates-title">
	<div class="wrap">
		<h2 id="dates-title" class="display section-title"><span class="bar">{t(home.dates.title)}</span></h2>
		<ol class="date-list">
			{#each home.dates.items as item, i}
				<li class:done={item.done}>
					<span class="numeral" aria-hidden="true">0{i + 1}</span>
					<div class="date-body">
						<a class="date-when" href={sectionHref('/vote', `step-${i + 1}`)} onclick={() => rememberJump(`step-${i + 1}`)}>
							{t(item.when)}
						</a>
						<p class="date-what">{t(item.what)}</p>
						{#if item.status}
							<p class="status" class:open={!item.done}>{t(item.status)}</p>
						{/if}
						<a class="text-link details" href={sectionHref('/vote', `step-${i + 1}`)} onclick={() => rememberJump(`step-${i + 1}`)}>
							{t(home.dates.details)}
						</a>
					</div>
				</li>
			{/each}
		</ol>
	</div>
</section>

<!-- What is the Com.It.Es. -->
<section class="wrap explainer" aria-labelledby="comites-title">
	<h2 id="comites-title" class="display section-title">{t(home.comites.title)}</h2>
	<div class="comites-text">
		{#each tl(home.comites.text) as p, i}
			<p class={i === 0 ? 'lede' : ''}>{p}</p>
		{/each}
	</div>
</section>

<!-- The team -->
<section class="team" aria-labelledby="team-title">
	<div class="wrap team-inner">
		<div class="team-copy">
			<h2 id="team-title" class="display team-title">{t(home.team.title)}</h2>
			<p class="team-text">{t(home.team.text)}</p>
			<a class="button light" href={href('/candidates')}>{t(home.team.cta)}</a>
		</div>
		<ul class="team-grid">
			{#each candidates as c}
				<li>
					<a href={href(`/candidates/${c.slug}`)} title={c.name}>
						<CandidatePhoto candidate={c} alt={c.name} />
					</a>
				</li>
			{/each}
		</ul>
	</div>
</section>

<!-- Letter -->
<section class="wrap letter" aria-labelledby="letter-title">
	<blockquote class="slogan">
		<p><Slogan /></p>
		<Signature width="200px" class="slogan-sig" />
	</blockquote>
	<div class="letter-teaser">
		<h2 id="letter-title" class="display section-title">{t(home.letter.title)}</h2>
		<div class="prose letter-text">
			{#each letterOpening as p}
				<p>{p}</p>
			{/each}
		</div>
		<a class="text-link" href={href(__HASH_ROUTER__ ? '/about' : '/about#letter')}>{t(home.letter.cta)}</a>
	</div>
</section>

<!-- Record and program -->
<section class="wrap pair">
	<a class="record-card" href={href('/record')}>
		<img src={community} alt="" loading="lazy" />
		<div class="record-copy">
			<h2 class="display">{t(home.record.title)}</h2>
			<p>{t(home.record.text)}</p>
			<span class="fake-link">{t(home.record.cta)}</span>
		</div>
	</a>
	<div class="program-card">
		<h2 class="display section-title">{t(home.program.title)}</h2>
		<p>{t(home.program.text)}</p>
		<ul class="commission-list">
			{#each program.commissions as c}
				<li>{t(c.title)}</li>
			{/each}
		</ul>
		<a class="button" href={href('/program')}>{t(home.program.cta)}</a>
	</div>
</section>

<style>
	/* Hero */
	.hero {
		display: grid;
		background: var(--navy);
		color: var(--on-dark);
	}
	@media (min-width: 900px) {
		.hero {
			grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr);
			min-height: min(78vh, 760px);
		}
	}
	.hero-panel {
		display: flex;
		align-items: center;
		padding: clamp(2.5rem, 7vw, 5rem) var(--gutter);
	}
	.hero-copy {
		width: 100%;
		max-width: 640px;
		margin-left: auto;
		display: grid;
		justify-items: start;
		gap: 0.4rem;
	}
	.hero-election {
		justify-self: start;
		padding: 0.4rem 0.95rem;
		border-radius: 999px;
		background: rgb(255 255 255 / 0.12);
		box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.25);
		font-size: var(--step-0);
		font-weight: 700;
		letter-spacing: 0.01em;
	}
	@media (max-width: 480px) {
		.hero-election {
			font-size: 0.82rem;
			white-space: nowrap;
		}
	}
	.hero-title {
		font-size: clamp(2.8rem, 6.6vw, 5.6rem);
		margin-top: 0.9rem;
	}
	/* Logo with the two main actions beside it */
	.hero-mark {
		display: flex;
		align-items: center;
		gap: clamp(1.25rem, 3vw, 2.25rem);
		margin-top: clamp(1.25rem, 3vw, 2rem);
	}
	.hero-logo {
		width: clamp(200px, 24vw, 340px);
		height: auto;
		aspect-ratio: 1;
		flex-shrink: 0;
	}
	.hero-actions {
		display: grid;
		gap: 0.75rem;
	}
	.hero-actions .button {
		min-width: 11rem;
		white-space: nowrap;
		font-size: clamp(1rem, 1.4vw, 1.25rem);
		min-height: 54px;
	}
	@media (max-width: 560px) {
		.hero-mark {
			flex-direction: column;
			align-items: stretch;
		}
		.hero-logo {
			align-self: center;
			width: min(300px, 78vw);
		}
	}
	.hero-photo {
		position: relative;
		min-height: 300px;
		overflow: hidden;
	}
	.hero-photo img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: 50% 55%;
	}
	@media (max-width: 899px) {
		.hero-photo {
			min-height: clamp(300px, 80vw, 520px);
		}
		.hero-photo img {
			object-position: 50% 72%;
		}
		.hero-copy {
			margin-left: 0;
		}
	}
	.hero :focus-visible {
		outline-color: var(--sun);
	}

	/* Key dates */
	.dates {
		padding-block: clamp(3rem, 7vw, 5rem);
		background: var(--white);
	}
	.dates .wrap {
		display: grid;
		gap: 2rem;
		justify-items: start;
	}
	.date-list {
		list-style: none;
		padding: 0;
		margin: 0;
		width: 100%;
		display: grid;
		gap: 1.5rem 2rem;
	}
	@media (min-width: 820px) {
		.date-list {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
	}
	.date-list li {
		display: grid;
		gap: 0.6rem;
		align-content: start;
		padding-top: 1rem;
		border-top: 3px solid var(--sky);
		min-width: 0;
	}
	.done {
		border-top-color: var(--rule);
	}
	.numeral {
		font-weight: 900;
		font-size: 2.6rem;
		line-height: 1;
		letter-spacing: -0.05em;
		color: var(--sky);
	}
	.done .numeral {
		color: var(--rule);
	}
	.date-body {
		position: relative;
		display: grid;
		gap: 0.25rem;
		justify-items: start;
	}
	.date-when {
		font-weight: 900;
		text-transform: uppercase;
		letter-spacing: -0.02em;
		font-size: var(--step-2);
		line-height: 1.05;
		color: var(--navy);
	}
	a.date-when {
		text-decoration: none;
	}
	a.date-when:hover {
		text-decoration: underline;
		text-decoration-thickness: 3px;
		text-underline-offset: 5px;
	}
	.details {
		margin-top: 0.4rem;
		font-size: var(--step--1);
	}
	.date-what {
		font-size: var(--step-1);
	}
	.done .date-when,
	.done .date-what {
		color: var(--ink-soft);
	}
	.status {
		margin-top: 0.35rem;
		font-size: var(--step--1);
		font-weight: 700;
		padding: 0.2rem 0.65rem;
		border-radius: 999px;
		background: var(--rule);
		color: var(--ink);
	}
	.status.open {
		background: var(--green);
		color: var(--on-dark);
	}

	/* Explainer */
	.explainer {
		display: grid;
		gap: 1.25rem 3rem;
		padding-block: clamp(3.5rem, 8vw, 6rem);
	}
	@media (min-width: 900px) {
		.explainer {
			grid-template-columns: minmax(0, 1fr) minmax(0, 1.5fr);
			align-items: start;
		}
	}
	.comites-text {
		display: grid;
		gap: 1.1rem;
		max-width: 60ch;
	}
	.comites-text .lede {
		max-width: none;
	}
	.comites-text p:not(.lede) {
		font-size: var(--step-1);
		line-height: 1.6;
		color: var(--ink-soft);
	}

	/* Team */
	.team {
		background: var(--olive);
		color: var(--on-dark);
		padding-block: clamp(3rem, 7vw, 5rem);
	}
	.team-inner {
		display: grid;
		gap: 2.5rem;
		align-items: center;
	}
	@media (min-width: 980px) {
		.team-inner {
			grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.4fr);
			gap: 3.5rem;
		}
	}
	.team-copy {
		display: grid;
		gap: 1.25rem;
		justify-items: start;
	}
	.team-title {
		font-size: var(--step-4);
	}
	.team-text {
		font-size: var(--step-1);
		line-height: 1.5;
		max-width: 36ch;
	}
	.team-grid {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 6px;
	}
	@media (min-width: 640px) {
		.team-grid {
			grid-template-columns: repeat(8, minmax(0, 1fr));
		}
	}
	.team-grid a {
		display: block;
		overflow: hidden;
		background: var(--olive-deep);
	}
	.team-grid :global(img) {
		width: 100%;
		aspect-ratio: 4 / 5;
		object-fit: cover;
		object-position: 50% 20%;
		transition: transform 0.25s ease;
	}
	.team-grid a:hover :global(img) {
		transform: scale(1.05);
	}
	.team :focus-visible {
		outline-color: var(--sun);
	}

	/* Letter */
	.letter {
		display: grid;
		gap: 3rem;
		padding-block: clamp(3.5rem, 8vw, 6rem);
	}
	@media (min-width: 900px) {
		.letter {
			grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr);
			align-items: center;
		}
	}
	.slogan {
		color: var(--navy);
		display: grid;
		gap: 1rem;
	}
	.slogan p {
		font-size: var(--step-3);
		font-style: italic;
		font-weight: 300;
		line-height: 1.15;
		letter-spacing: -0.015em;
		max-width: 16ch;
	}
	.slogan :global(.slogan-sig) {
		color: var(--navy);
	}
	.letter-teaser {
		display: grid;
		gap: 1.25rem;
		justify-items: start;
	}
	.letter-text {
		font-style: italic;
		font-weight: 300;
		font-size: var(--step-1);
		line-height: 1.55;
	}

	/* Record and program */
	.pair {
		display: grid;
		gap: 1.5rem;
		padding-bottom: clamp(3.5rem, 8vw, 6rem);
	}
	@media (min-width: 900px) {
		.pair {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}
	.record-card {
		position: relative;
		display: flex;
		align-items: end;
		min-height: 380px;
		overflow: hidden;
		background: var(--navy);
		color: var(--on-dark);
		text-decoration: none;
	}
	.record-card img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		filter: grayscale(1);
		opacity: 0.45;
		mix-blend-mode: luminosity;
		transition: transform 0.4s ease;
	}
	.record-card:hover img {
		transform: scale(1.03);
	}
	.record-copy {
		position: relative;
		padding: clamp(1.5rem, 4vw, 2.5rem);
		display: grid;
		gap: 0.8rem;
		justify-items: start;
	}
	.record-copy h2 {
		font-size: var(--step-3);
	}
	.record-copy p {
		font-size: var(--step-1);
		max-width: 34ch;
		line-height: 1.45;
	}
	.fake-link {
		font-weight: 700;
		text-decoration: underline;
		text-decoration-thickness: 2px;
		text-underline-offset: 4px;
		color: var(--sun);
	}
	.record-card:focus-visible {
		outline-color: var(--red);
	}
	.program-card {
		background: var(--cream);
		padding: clamp(1.5rem, 4vw, 2.5rem);
		display: grid;
		gap: 1rem;
		align-content: start;
		justify-items: start;
	}
	.program-card > p {
		font-size: var(--step-1);
		line-height: 1.45;
		max-width: 38ch;
	}
	.commission-list {
		list-style: none;
		margin: 0 0 0.5rem;
		padding: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}
	.commission-list li {
		padding: 0.35rem 0.85rem;
		border-radius: 999px;
		background: var(--white);
		color: var(--navy);
		font-weight: 700;
		box-shadow: inset 0 0 0 1px var(--sky);
	}
</style>
