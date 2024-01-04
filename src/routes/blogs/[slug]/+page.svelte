<script>
	import SvelteMarkdown from 'svelte-markdown';
	import tableOfContentsHeaderRenderer from './TableOfContentsHeader.svelte';

	export let data;

	const scrollToTop = () => {
		window.history.pushState({}, '', window.location.href.split('#')[0]);

		window.scrollTo(0, 0);
	};
</script>

<article id="blog__container">
	<a class="blog__back-btn" href="/blogs">Back</a>
	<div class="date"><em>First published on {data.page.date}.</em></div>
	<div class="btn" />
	<SvelteMarkdown source={data.page.content} renderers={{ heading: tableOfContentsHeaderRenderer }} />
	<button class="btn-scroll-top" on:click={scrollToTop}><span class="chevron" /></button>
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

	.btn-scroll-top {
		position: sticky;
		bottom: 1rem;
		left: 50%;
		transform: translateX(-50%);

		background: none;
		border: none;
		cursor: pointer;
		transition: all 200ms;

		&:hover {
			scale: 1.08;
			transform-origin: center;
		}
	}
	.btn-scroll-top::after {
		content: '';
		position: absolute;
		inset: -50% -10%;
		z-index: -1;
		background: white;
		filter: blur(2px);
	}

	.chevron {
		display: block;
		--stroke: 3px;
		width: 15px;
		aspect-ratio: 1/1;

		border-top: var(--stroke) solid black;
		border-right: var(--stroke) solid black;
		transform: rotate(-45deg);
	}

	#blog__container {
		position: relative;

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
			list-style-position: inside;
		}

		ul li {
			list-style: outside;
		}

		ol > li > ul {
			margin-inline-start: 2rem;
		}

		li:has(code) {
			overflow-x: scroll;
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
			overflow-x: scroll;

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
			display: block;
			overflow-x: scroll;
		}

		th,
		td {
			--border-color: #444;
			border-bottom: 1px solid var(--border-color);
			min-width: 10rem;
		}

		td {
			padding: 1.2rem 0.8rem;
		}

		p:has(img) {
			text-align: center;
		}

		@media (width > 768px) {
			ol li {
				list-style-position: outside;
			}

			li:has(code) {
				overflow: visible;
			}

			pre {
				overflow: visible;
			}

			table {
				overflow: visible;
				display: revert;
			}
		}
	}
</style>
