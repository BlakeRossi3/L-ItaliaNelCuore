<script>
	import { t, tl } from '$lib/i18n.svelte.js';
	import program from '$lib/content/program.json';
	import about from '$lib/content/about.json';
	import ui from '$lib/content/ui.json';
	import Signature from '$lib/components/Signature.svelte';
	import Slogan from '$lib/components/Slogan.svelte';
	import { jumpTo } from '$lib/link.js';

	const page = program.page;
</script>

<svelte:head>
	<title>{t(page.title)} | {ui.listName}</title>
	<meta name="description" content={t(page.metaDescription)} />
</svelte:head>

<section class="wrap head">
	<h1 class="display page-title"><span class="bar">{t(page.title)}</span></h1>
	<div class="prose intro">
		{#each tl(program.intro) as p}
			<p>{p}</p>
		{/each}
	</div>
</section>

<section class="wrap commissions" aria-labelledby="commissions-title">
	<div class="commissions-head">
		<h2 id="commissions-title" class="display section-title">{t(page.commissionsTitle)}</h2>
		<div class="prose commissions-intro">
			{#each tl(program.commissionsIntro) as p}
				<p>{p}</p>
			{/each}
		</div>
	</div>

	<nav class="jump" aria-label={t(page.commissionsTitle)}>
		{#each program.commissions as c}
			<a href="#{c.id}" onclick={(e) => jumpTo(e, c.id)}>{t(c.title)}</a>
		{/each}
	</nav>

	{#each program.commissions as c}
		<article id={c.id} class="commission">
			<header>
				<h3 class="display">{t(c.title)}</h3>
				<p class="aim">{t(c.aim)}</p>
			</header>
			<ul class="items">
				{#each tl(c.items) as item}
					<li>{item}</li>
				{/each}
			</ul>
		</article>
	{/each}
</section>

<section class="special" aria-labelledby="special-title">
	<div class="wrap">
		<div class="special-head">
			<h2 id="special-title" class="display">{t(page.specialTitle)}</h2>
			<p>{t(program.specialIntro)}</p>
		</div>
		<div class="special-grid">
			{#each program.special as s}
				<article id={s.id} class="project">
					<h3>{t(s.title)}</h3>
					<ul>
						{#each tl(s.items) as item}
							<li>{item}</li>
						{/each}
					</ul>
				</article>
			{/each}
		</div>
	</div>
</section>

<section class="wrap closing">
	<p class="closing-slogan"><Slogan /></p>
	<Signature width="200px" class="closing-sig" />
</section>

<style>
	.head {
		padding-block: clamp(2.5rem, 7vw, 5rem) clamp(2rem, 4vw, 3rem);
		display: grid;
		gap: 1.75rem;
	}
	/* intro paragraphs run the full content width */
	.intro,
	.commissions-intro {
		max-width: none;
	}
	.intro {
		font-size: var(--step-1);
		line-height: 1.6;
		color: var(--ink-soft);
	}
	/* first paragraph leads, a size up and in full ink */
	.intro p:first-child {
		font-size: var(--step-2);
		line-height: 1.45;
		color: var(--ink);
	}

	.commissions {
		padding-top: clamp(1.5rem, 4vw, 2.5rem);
		display: grid;
		gap: 0;
	}
	.commissions-head {
		display: grid;
		gap: 0.6rem;
		margin-bottom: 1.5rem;
	}
	.commissions-intro {
		font-size: var(--step-1);
		line-height: 1.6;
		color: var(--ink-soft);
	}
	.jump {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-bottom: 2rem;
	}
	.jump a {
		padding: 0.4rem 0.9rem;
		border-radius: 999px;
		background: var(--white);
		color: var(--navy);
		font-weight: 700;
		text-decoration: none;
		box-shadow: inset 0 0 0 1px var(--sky);
	}
	.jump a:hover {
		background: var(--sky-soft);
	}
	.commission {
		display: grid;
		gap: 1rem 3rem;
		padding-block: 2rem;
		border-top: 3px solid var(--navy);
	}
	@media (min-width: 860px) {
		.commission {
			grid-template-columns: minmax(0, 1fr) minmax(0, 1.8fr);
		}
	}
	.commission > * {
		min-width: 0;
	}
	.commission h3 {
		font-size: clamp(1.7rem, 2.9vw, 2.4rem);
		hyphens: manual;
		overflow-wrap: break-word;
		color: var(--navy);
	}
	.aim {
		margin-top: 0.6rem;
		font-style: italic;
		color: var(--ink-soft);
		font-size: var(--step-1);
		line-height: 1.4;
		max-width: 30ch;
	}
	.items {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 0.75rem;
	}
	.items li {
		position: relative;
		padding-left: 1.4rem;
		font-size: var(--step-1);
		line-height: 1.5;
	}
	.items li::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0.62em;
		width: 0.55rem;
		height: 0.55rem;
		border-radius: 50%;
		background: var(--red);
	}

	.special {
		margin-top: clamp(3rem, 7vw, 5rem);
		background: var(--navy);
		color: var(--on-dark);
		padding-block: clamp(3rem, 7vw, 5rem);
	}
	.special-head {
		display: grid;
		gap: 1rem;
		margin-bottom: 2.5rem;
	}
	.special-head h2 {
		font-size: var(--step-4);
	}
	.special-head p {
		font-size: var(--step-1);
		line-height: 1.55;
		max-width: 60ch;
		color: var(--on-dark-soft);
	}
	.special-grid {
		display: grid;
		gap: 1.25rem;
	}
	@media (min-width: 760px) {
		.special-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}
	@media (min-width: 1100px) {
		.special-grid {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
	}
	.project {
		background: rgb(255 255 255 / 0.07);
		box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.16);
		padding: 1.5rem;
		display: grid;
		gap: 0.9rem;
		align-content: start;
		min-width: 0;
	}
	.project h3 {
		font-weight: 900;
		text-transform: uppercase;
		letter-spacing: -0.02em;
		font-size: var(--step-1);
		line-height: 1.15;
		color: var(--sun);
	}
	.project ul {
		margin: 0;
		padding-left: 1.1rem;
		display: grid;
		gap: 0.55rem;
		line-height: 1.5;
	}

	.closing {
		padding-block: clamp(3.5rem, 8vw, 5.5rem) 0;
		display: grid;
		justify-items: center;
		text-align: center;
		gap: 1rem;
		color: var(--navy);
	}
	.closing-slogan {
		font-size: var(--step-3);
		font-style: italic;
		font-weight: 300;
		line-height: 1.15;
		max-width: 22ch;
	}
	.closing :global(.closing-sig) {
		color: var(--navy);
	}
</style>
