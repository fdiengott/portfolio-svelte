<script>
	import Highlight, { LineNumbers } from 'svelte-highlight';
	import typescript from 'svelte-highlight/languages/typescript';
	import atelierCaveLight from 'svelte-highlight/styles/atelier-cave-light';
	export let text = '';

	// INFO: to add highlighted lines, add a `>` at the start of the line of code to be highlighted
	const highlightedLineNumbers = text.split('\n').reduce((acc, line, i) => {
		if (/^\s*> /.test(line)) {
			acc.push(i);
		}

		return acc;
	}, []);
	const cleanText = text.replace(/(\n[\t\s]*)>\s(\w+)/g, '$1$2');
</script>

<svelte:head>
	{@html atelierCaveLight}
</svelte:head>

<Highlight language={typescript} code={cleanText} let:highlighted>
	<LineNumbers
		--highlighted-background="hsl(314.91deg 100% 66.86% / 16%)"
		highlightedLines={highlightedLineNumbers}
		wrapLines
		{highlighted}
	/>
</Highlight>
