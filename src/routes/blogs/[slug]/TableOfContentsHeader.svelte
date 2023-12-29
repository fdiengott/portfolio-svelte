<script>
	export let text = '';
	export let depth = 1;

	const className = text
		.split(' ')
		.map((s) => s.toLowerCase())
		.join('-');

	console.log($$restProps);
</script>

<svelte:element this={`h${depth}`} class={className}>{text}</svelte:element>
