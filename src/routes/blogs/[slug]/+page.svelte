<script>
	import SvelteMarkdown from 'svelte-markdown';

	export let data;
</script>

<article>
	<a href="/blogs">Back</a>
	<SvelteMarkdown source={data.page} />
</article>
