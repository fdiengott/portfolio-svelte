<script>
	export let text = '';
	export let depth = 1;

	const className = text
		.replace(/\s|\./g, '-')
		.replace(/[^a-z-]/gi, '')
		.toLowerCase();

	const copyToClipboard = async () => {
		try {
			const link = window.location.href.split('#')[0] + `#${className}`;

			window.location.href = link;

			await navigator.clipboard.writeText(link);
		} catch (err) {
			console.error(err);
		}
	};
</script>

<div class="header-wrapper">
	<svelte:element this={`h${depth}`} class="header {className}" id={className}
		>{text}
		<button class="header-link" on:click={copyToClipboard}>
			<svg width="15px" viewBox="0 0 24 24">
				<path
					stroke-width="1"
					d="M14.851 11.923c-.179-.641-.521-1.246-1.025-1.749-1.562-1.562-4.095-1.563-5.657 0l-4.998 4.998c-1.562 1.563-1.563 4.095 0 5.657 1.562 1.563 4.096 1.561 5.656 0l3.842-3.841.333.009c.404 0 .802-.04 1.189-.117l-4.657 4.656c-.975.976-2.255 1.464-3.535 1.464-1.28 0-2.56-.488-3.535-1.464-1.952-1.951-1.952-5.12 0-7.071l4.998-4.998c.975-.976 2.256-1.464 3.536-1.464 1.279 0 2.56.488 3.535 1.464.493.493.861 1.063 1.105 1.672l-.787.784zm-5.703.147c.178.643.521 1.25 1.026 1.756 1.562 1.563 4.096 1.561 5.656 0l4.999-4.998c1.563-1.562 1.563-4.095 0-5.657-1.562-1.562-4.095-1.563-5.657 0l-3.841 3.841-.333-.009c-.404 0-.802.04-1.189.117l4.656-4.656c.975-.976 2.256-1.464 3.536-1.464 1.279 0 2.56.488 3.535 1.464 1.951 1.951 1.951 5.119 0 7.071l-4.999 4.998c-.975.976-2.255 1.464-3.535 1.464-1.28 0-2.56-.488-3.535-1.464-.494-.495-.863-1.067-1.107-1.678l.788-.785z"
				/></svg
			>
		</button>
	</svelte:element>
</div>

<style>
	.header {
		display: flex;
		gap: 0.5rem;
	}

	.header-link {
		background: none;
		border: none;
		opacity: 0;
	}

	.header-link path {
		stroke: #868686;
	}
	.header-wrapper:hover .header-link {
		opacity: 1;
		cursor: pointer;
	}
</style>
