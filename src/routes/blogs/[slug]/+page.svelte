<script>
	import SvelteMarkdown from 'svelte-markdown';

	export let data;
</script>

<article id="blog__container">
	<a class="blog__back-btn" href="/blogs">Back</a>
	<div class="date"><em>First published on {data.page.date}.</em></div>
	<SvelteMarkdown source={data.page.content} />
</article>

<style global lang="scss">
	.blog__back-btn {
		font-size: var(--fs-300);
		margin-block-end: 0.5rem;
		display: inline-block;
	}

	.date {
		font-size: var(--fs-200);
		margin-block: 0.5rem;
	}

	#blog__container {
		font-size: var(--fs-350);

		h1 {
			font-size: var(--fs-800);
			line-height: 1;
			margin-block-end: 0.5em;
		}

		h2,
		h3,
		h4 {
			margin-block-start: 2em;
		}

		h2 + h3 {
			margin-block-start: 0;
		}

		ol {
			display: grid;
			gap: 2rem;
		}

		ul,
		ol {
			margin-inline-start: 1.2rem;
		}

		ol li {
			list-style: auto;
			list-style-position: outside;
		}

		ul li {
			margin-block-start: 1.5rem;
			list-style: outside;
		}

		p:not(:last-child),
		pre {
			margin-block-end: 3rem;
		}

		ol > li > ul {
			margin-inline-start: 2rem;
		}

		--code-background: #e6e6e6;

		code {
			background: var(--code-background);
			padding: 0.2rem 0.5rem;
			margin-inline: 0.2rem;
		}

		pre {
			background: var(--code-background);
			padding: 1rem;
			border: 1px solid #aaa;
			border-radius: 0.5rem;
			font-size: var(--fs-300);

			code {
				padding: 0;
				margin: 0;
			}
		}

		table {
			margin-inline: auto;
			font-size: var(--fs-300);
		}

		th,
		td {
			--border-color: #444;
			border-bottom: 1px solid var(--border-color);
		}

		td {
			padding: 1.5rem 1rem;
		}
	}
</style>
