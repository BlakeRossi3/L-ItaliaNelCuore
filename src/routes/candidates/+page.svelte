<script>
	import { href } from '$lib/link.js';
	import { t } from '$lib/i18n.svelte.js';
	import { candidates } from '$lib/candidates.js';
	import ui from '$lib/content/ui.json';
	import home from '$lib/content/home.json';
	import CandidatePhoto from '$lib/components/CandidatePhoto.svelte';
</script>

<svelte:head>
	<title>{t(ui.nav.candidates)} | {ui.listName}</title>
	<meta name="description" content={t(home.team.text)} />
</svelte:head>

<h1 class="visually-hidden">{t(ui.candidate.gridTitle)}</h1>

<div class="wrap">
	<ul class="grid">
		{#each candidates as c, i}
			<li>
				<a class="tile" href={href(`/candidates/${c.slug}`)}>
					<CandidatePhoto candidate={c} alt={c.name} class="tile-photo" loading={i < 8 ? 'eager' : 'lazy'} />
					<span class="tile-label" aria-hidden="true">
						<span class="tile-name">{c.name}</span>
						<span class="tile-state">{c.state}</span>
					</span>
				</a>
			</li>
		{/each}
	</ul>
</div>

<style>
	.wrap {
		padding-block: clamp(1rem, 2.5vw, 2rem) clamp(3rem, 7vw, 5rem);
	}
	.grid {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: clamp(6px, 1vw, 12px);
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}
	/* 16 candidates: 4 rows of 4 on wide screens, 8 rows of 2 on phones */
	@media (min-width: 900px) {
		.grid {
			grid-template-columns: repeat(4, minmax(0, 1fr));
		}
	}
	.tile {
		position: relative;
		display: block;
		overflow: hidden;
		background: var(--navy);
		text-decoration: none;
	}
	.tile :global(.tile-photo) {
		width: 100%;
		aspect-ratio: 4 / 5;
		object-fit: cover;
		object-position: 50% 20%;
	}
	/* Name on a navy band, shown on hover or keyboard focus */
	.tile-label {
		position: absolute;
		inset: auto 0 0 0;
		display: grid;
		gap: 0.15rem;
		padding: 0.8em 0.95em 0.85em;
		background: var(--navy);
		color: var(--on-dark);
		transform: translateY(101%);
		transition: transform 0.22s cubic-bezier(0.2, 0.7, 0.2, 1);
	}
	.tile-name {
		font-weight: 900;
		text-transform: uppercase;
		letter-spacing: -0.02em;
		line-height: 1.05;
		font-size: clamp(1rem, 1.5vw, 1.2rem);
	}
	.tile-state {
		font-size: var(--step--1);
		color: var(--on-dark-soft);
	}
	.tile:hover .tile-label,
	.tile:focus-visible .tile-label {
		transform: translateY(0);
	}
	.tile:focus-visible {
		outline-offset: 2px;
	}
	/* Touch screens have no hover: photos only, as on the original brief */
	@media (hover: none) {
		.tile-label {
			display: none;
		}
	}
</style>
