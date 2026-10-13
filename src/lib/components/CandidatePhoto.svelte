<script>
	/** @type {{ candidate: import('$lib/candidates.js').Candidate, size?: 'thumb' | 'photo', class?: string, loading?: 'lazy' | 'eager', alt?: string, morph?: boolean }} */
	let { candidate, size = 'thumb', class: className = '', loading = 'lazy', alt = '', morph = true } = $props();
</script>

<img
	src={size === 'thumb' ? candidate.thumb : candidate.photo}
	{alt}
	{loading}
	class={className}
	style:view-transition-name={morph ? `photo-${candidate.slug}` : undefined}
	decoding="async"
/>
