<script>
	// Antonio Mariniello's signature. Takes the text color of its parent.
	import sig from '$lib/assets/brand/signature.png';
	import ui from '$lib/content/ui.json';
	import { t } from '$lib/i18n.svelte.js';

	let { width = '180px', class: className = '' } = $props();
</script>

<span
	class="signature {className}"
	style:--sig="url({sig})"
	style:width
	role="img"
	aria-label={t(ui.signatureAlt)}
></span>
