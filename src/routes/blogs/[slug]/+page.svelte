<script>
	import SvelteMarkdown from 'svelte-markdown';

	export let data;
</script>

<article id="blog__container">
	<a class="blog__back-btn" href="/blogs">Back</a>
	<SvelteMarkdown source={data.page.content} />
</article>

<style global lang="scss">
	.blog__back-btn {
		font-size: var(--fs-300);
		margin-block-end: 0.5rem;
		display: inline-block;
	}

	#blog__container {
		h1 {
			font-size: var(--fs-800);
			line-height: 1;
			margin-block-end: 0.5em;
		}

		h2,
		h3 {
			margin-block-start: 0.75em;
		}

		ul li {
			list-style: inside;
		}

		ol {
			display: grid;
			gap: 2rem;
		}

		ol li {
			list-style: auto;
			list-style-position: inside;
		}

		p {
			margin-block: 1rem;
		}
	}
</style>
