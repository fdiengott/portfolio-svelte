<script>
	import SvelteMarkdown from 'svelte-markdown';
	import tableOfContentsHeaderRenderer from './TableOfContentsHeader.svelte';

	export let data;
</script>

<article id="blog__container">
	<a class="blog__back-btn" href="/blogs">Back</a>
	<div class="date"><em>First published on {data.page.date}.</em></div>
	<SvelteMarkdown source={data.page.content} renderers={{ heading: tableOfContentsHeaderRenderer }} />
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

		h2,
		h3,
		h4 {
			margin-block: 1em 0.5em;
		}

		p {
			margin-block-end: 1.5rem;
			line-height: 1.7em;
		}

		table {
			margin-block: 3rem;
		}

		.table-of-contents + ul,
		.table-of-contents + ul li {
			margin-block-start: 0.3em;
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
			list-style: outside;
		}

		ol > li > ul {
			margin-inline-start: 2rem;
		}

		--code-background: hsl(0, 0%, 95%);
		--code-border-color: 205, 84%, 20%; // blueish gray

		code {
			padding: 0.1rem 0.3rem;
			margin-inline: 0.2rem;
			background: var(--code-background);
			border: 1px solid hsla(var(--code-border-color), 0.255);
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
				border: none;
			}
		}

		blockquote {
			padding: 2rem 3rem;
			margin-block-start: -1rem;
			background: hsla(var(--code-border-color), 0.129);

			p {
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
			padding: 1.2rem 0.8rem;
		}

		p:has(img) {
			text-align: center;
		}
	}
</style>
