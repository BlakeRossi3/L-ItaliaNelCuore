<script>
	import { onMount } from 'svelte';
	import { runPendingJump } from '$lib/link.js';

	onMount(runPendingJump);
	import { t } from '$lib/i18n.svelte.js';
	import vote from '$lib/content/vote.json';
	import ui from '$lib/content/ui.json';

	let copied = $state(false);
	let shared = $state(false);

	/** @param {string} text */
	async function copy(text) {
		try {
			await navigator.clipboard.writeText(text);
			return true;
		} catch {
			return false;
		}
	}

	async function copyEmail() {
		copied = await copy(vote.steps[1].email);
		setTimeout(() => (copied = false), 2000);
	}

	async function share() {
		const url = location.href;
		if (navigator.share) {
			try {
				await navigator.share({ title: t(vote.title), url });
				return;
			} catch {}
		}
		shared = await copy(url);
		setTimeout(() => (shared = false), 2500);
	}
</script>

<svelte:head>
	<title>{t(vote.title)} | {ui.listName}</title>
	<meta name="description" content={t(vote.metaDescription)} />
</svelte:head>

<section class="wrap head">
	<h1 class="display page-title"><span class="bar">{t(vote.title)}</span></h1>
	<p class="lede">{t(vote.lede)}</p>
	<div class="who">
		<h2>{t(vote.who.title)}</h2>
		<p>{t(vote.who.text)}</p>
	</div>
</section>

<!-- Steps, numbered as on the campaign posters (01, 02, 03) -->
<ol class="wrap steps">
	{#each vote.steps as step, i}
		<li id="step-{i + 1}" class="step" class:done={step.done}>
			<span class="numeral" aria-hidden="true">0{i + 1}</span>
			<div class="step-body">
				<p class="visually-hidden">{t(vote.stepLabel)} {i + 1}</p>
				<h2 class="display step-title">{t(step.title)}</h2>
				<p class="when">
					<span>{t(step.when)}</span>
					{#if step.status}
						<span class="status" class:open={!step.done}>{t(step.status)}</span>
					{/if}
				</p>
				<p class="step-text">{t(step.text)}</p>

				{#if step.email}
					<div class="email-row">
						<span class="email">{step.email}</span>
						<button type="button" class="button small" onclick={copyEmail}>
							{copied ? t(vote.copied) : t(vote.copy)}
						</button>
					</div>
				{/if}
				{#if step.link}
					<a class="text-link" href={step.link.href} target="_blank" rel="noopener">{t(step.link.label)}</a>
				{/if}
			</div>
		</li>
	{/each}
</ol>

<section class="wrap extras">
	<div class="tip">
		<h2>{t(vote.tip.title)}</h2>
		<p>{t(vote.tip.text)}</p>
		<a class="text-link" href={vote.tip.link.href} target="_blank" rel="noopener">{vote.tip.link.label}</a>
	</div>
	<div class="embassy">
		<h2>{t(vote.embassy.title)}</h2>
		<p class="address">{vote.embassy.address}</p>
	</div>
</section>

<section class="help" aria-labelledby="help-title">
	<div class="wrap help-inner">
		<div>
			<h2 id="help-title" class="display">{t(vote.help.title)}</h2>
			<p>{t(vote.help.text)}</p>
		</div>
		<button type="button" class="button light" onclick={share}>
			{shared ? t(vote.linkCopied) : t(vote.share)}
		</button>
	</div>
</section>

<style>
	.head {
		padding-block: clamp(2.5rem, 7vw, 5rem) clamp(1.5rem, 3vw, 2rem);
		display: grid;
		gap: 1.5rem;
	}
	.head .lede {
		max-width: 44ch;
	}
	.who {
		max-width: 46rem;
		padding: 1.25rem 1.5rem;
		background: var(--cream);
		display: grid;
		gap: 0.35rem;
	}
	.who h2 {
		font-size: var(--step-0);
		font-weight: 800;
		color: var(--navy);
	}
	.who p {
		font-size: var(--step-1);
		line-height: 1.45;
	}

	.steps {
		list-style: none;
		margin: 0;
		padding-block: 1rem 0;
		display: grid;
		gap: 0;
	}
	.step {
		position: relative;
		scroll-margin-top: calc(var(--header-h) + 16px);
		display: grid;
		padding-block: clamp(2rem, 5vw, 3rem);
		border-top: 1px solid var(--rule);
	}
	@media (min-width: 820px) {
		.step {
			grid-template-columns: 12rem minmax(0, 1fr);
			gap: 2rem;
		}
	}
	.numeral {
		font-weight: 900;
		font-size: clamp(5.5rem, 13vw, 10rem);
		line-height: 0.8;
		letter-spacing: -0.07em;
		color: var(--sky);
	}
	@media (max-width: 819px) {
		.numeral {
			font-size: 4rem;
			margin-bottom: 0.5rem;
		}
	}
	.step-body {
		position: relative;
		display: grid;
		gap: 0.75rem;
		justify-items: start;
		max-width: 44rem;
		min-width: 0;
	}
	.step-title {
		font-size: var(--step-4);
		color: var(--navy);
	}
	.when {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.5rem 0.75rem;
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: -0.01em;
		font-size: var(--step-1);
	}
	.status {
		font-size: var(--step--1);
		text-transform: none;
		letter-spacing: 0;
		font-weight: 700;
		padding: 0.2rem 0.7rem;
		border-radius: 999px;
		background: var(--rule);
	}
	.status.open {
		background: var(--green);
		color: var(--on-dark);
	}
	.step-text {
		font-size: var(--step-1);
		line-height: 1.55;
	}
	.done .step-title,
	.done .when > span:first-child,
	.done .step-text {
		color: var(--ink-soft);
	}
	.done .numeral {
		color: var(--sky-soft);
	}

	.email-row {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.6rem 0.9rem;
		padding: 0.6rem 0.6rem 0.6rem 1rem;
		background: var(--white);
		box-shadow: inset 0 0 0 1px var(--rule);
		border-radius: 999px;
		max-width: 100%;
	}
	.email {
		font-weight: 700;
		color: var(--navy);
		user-select: all;
		overflow-wrap: anywhere;
	}
	.button.small {
		min-height: 38px;
		padding: 0.45em 1em;
		font-size: var(--step--1);
	}

	.extras {
		display: grid;
		gap: 1rem;
		padding-top: 1rem;
	}
	@media (min-width: 820px) {
		.extras {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}
	.tip,
	.embassy {
		padding: 1.5rem;
		display: grid;
		gap: 0.5rem;
		align-content: start;
		justify-items: start;
		min-width: 0;
	}
	.tip {
		background: var(--sky-soft);
	}
	.embassy {
		background: var(--white);
		box-shadow: inset 0 0 0 1px var(--rule);
	}
	.tip h2,
	.embassy h2 {
		font-size: var(--step-1);
		font-weight: 800;
		color: var(--navy);
	}
	.address {
		user-select: all;
	}

	.help {
		margin-top: clamp(3rem, 7vw, 4.5rem);
		background: var(--red);
		color: var(--on-dark);
	}
	.help-inner {
		padding-block: clamp(2.5rem, 6vw, 3.5rem);
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 1.5rem 3rem;
	}
	.help h2 {
		font-size: var(--step-3);
		margin-bottom: 0.6rem;
	}
	.help p {
		font-size: var(--step-1);
		max-width: 48ch;
		line-height: 1.45;
	}
	.help :focus-visible {
		outline-color: var(--white);
	}
</style>
