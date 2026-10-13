<script>
	import { t, tl } from '$lib/i18n.svelte.js';
	import record from '$lib/content/record.json';
	import ui from '$lib/content/ui.json';
	import community from '$lib/assets/brand/community.jpg';
	import Signature from '$lib/components/Signature.svelte';
</script>

<svelte:head>
	<title>{t(ui.nav.record)} | {ui.listName}</title>
	<meta name="description" content={t(record.page.metaDescription)} />
</svelte:head>

<section class="hero">
	<img src={community} alt="" />
	<div class="wrap hero-copy">
		<h1 class="display title">{t(record.title)}</h1>
		<p class="lead">{t(record.lead)}</p>
	</div>
</section>

<!-- Laid out like the campaign's "Cosa hanno fatto" poster: label on the left,
     items flowing on the right in alternating white and yellow -->
<div class="wrap blocks">
	<section class="block missions" aria-labelledby="missions-title">
		<div class="label">
			<h2 id="missions-title">{t(record.missions.title)}</h2>
			<p class="count"><span class="count-num">{record.missions.places.length}</span> {t(record.page.citiesLabel)}</p>
		</div>
		<div class="content">
			<p class="note">{t(record.missions.note)}</p>
			<ul class="flow">
				{#each record.missions.places as place}
					<li>{place}</li>
				{/each}
			</ul>
		</div>
	</section>

	{#each record.groups as group}
		<section class="block" aria-labelledby="{group.id}-title">
			<div class="label">
				<h2 id="{group.id}-title">{t(group.title)}</h2>
			</div>
			<div class="content">
				<ul class="flow">
					{#each tl(group.items) as item}
						<li>{item}</li>
					{/each}
				</ul>
			</div>
		</section>
	{/each}
</div>

<section class="wrap continues">
	<p class="display continues-text">{t(record.continues)}</p>
	<Signature width="220px" class="continues-sig" />
</section>

<style>
	.hero {
		position: relative;
		overflow: hidden;
		background: var(--navy);
		color: var(--on-dark);
	}
	.hero img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		filter: grayscale(1) contrast(1.05);
		opacity: 0.38;
		mix-blend-mode: luminosity;
	}
	.hero-copy {
		position: relative;
		padding-block: clamp(4rem, 12vw, 8rem) clamp(3rem, 8vw, 5rem);
		display: grid;
		gap: 1.25rem;
	}
	.title {
		font-size: var(--step-4);
		max-width: 18ch;
	}
	.lead {
		font-size: var(--step-2);
		font-style: italic;
		font-weight: 600;
		color: var(--sun);
	}

	.blocks {
		display: grid;
		gap: 1rem;
		padding-top: clamp(2rem, 5vw, 3rem);
	}
	.block {
		display: grid;
		gap: 1rem 2.5rem;
		padding: clamp(1.5rem, 4vw, 2.5rem);
		background: var(--navy);
		color: var(--on-dark);
	}
	@media (min-width: 820px) {
		.block {
			grid-template-columns: minmax(0, 0.7fr) minmax(0, 2fr);
			align-items: center;
		}
	}
	.block > * {
		min-width: 0;
	}
	.label h2 {
		font-size: var(--step-3);
		font-style: italic;
		font-weight: 900;
		letter-spacing: -0.02em;
		line-height: 1;
	}
	.count {
		margin-top: 0.75rem;
		color: var(--on-dark-soft);
	}
	.count-num {
		display: block;
		font-weight: 900;
		font-size: clamp(3.5rem, 8vw, 5.5rem);
		line-height: 0.9;
		letter-spacing: -0.05em;
		color: var(--sun);
	}
	.note {
		margin-bottom: 0.9rem;
		color: var(--on-dark-soft);
	}
	.flow {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 0.15rem 0.85rem;
		text-transform: uppercase;
		font-size: clamp(1.05rem, 1.9vw, 1.4rem);
		line-height: 1.35;
		font-weight: 500;
	}
	.flow li:nth-child(even) {
		color: var(--sun);
	}
	.missions .flow {
		font-size: clamp(1.15rem, 2.2vw, 1.6rem);
	}

	.continues {
		padding-top: clamp(2.5rem, 6vw, 4rem);
		display: grid;
		justify-items: center;
		gap: 0.5rem;
		color: var(--navy);
	}
	.continues-text {
		font-size: var(--step-3);
		text-transform: none;
	}
	.continues :global(.continues-sig) {
		color: var(--navy);
	}
</style>
