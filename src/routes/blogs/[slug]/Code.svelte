<script>
	import Highlight from 'svelte-highlight';
	import typescript from 'svelte-highlight/languages/typescript';
	import atelierCaveLight from 'svelte-highlight/styles/atelier-cave-light';
	export let text = 'text';
</script>

<svelte:head>
	{@html atelierCaveLight}
</svelte:head>

<Highlight language={typescript} code={text} />
