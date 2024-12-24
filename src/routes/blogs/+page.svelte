<script>
	import Pin from '../components/Pin.svelte';

	import { pages } from './articles/index.js';
</script>

<ul class="article__list">
	{#each Object.entries(pages) as [slug, article], index}
		<li class="article__item animate-in" style="animation-delay: {250 + index * 100}ms">
			{#if article.pinned}
				<div class="article__pin-wrapper">
					<Pin />
				</div>
			{/if}
			<div class="article__date">{article.date}</div>
			<a href="/blogs/{slug}">
				<span>{article.title}</span>
			</a>
			{#if article.tags}
				<ul class="article__tags">
					{#each article.tags as tag}
						<li class="article__tag {tag}">{tag}</li>
					{/each}
				</ul>
			{/if}
		</li>
	{/each}
</ul>

<style lang="scss">
	a {
		width: fit-content;
		text-decoration: underline;
		text-underline-offset: 2px;
		transition: all 0.3s;
	}
	a:is(:hover, :focus) {
		text-underline-offset: 7px;
	}
	a:focus {
		outline: 1px solid #0008;
	}

	.article__list {
		display: grid;
		row-gap: 2rem;
		justify-content: center;

		.article__item {
			display: grid;
			position: relative;
			border: 1px solid var(--black-transparent);
			padding: 1rem 2rem;
			border-radius: 0.5rem;
			max-width: 40rem;
		}
	}

	.article__date {
		font-size: var(--fs-200);
	}

	.article__tags {
		display: flex;
		margin-block-start: 1rem;
	}

	.article__tag {
		--text-padding: 1.5rem;

		display: inline-block;
		position: relative;
		font-size: var(--fs-200);
		border: 1px solid var(--tag-color, var(--black-transparent));
		border-radius: 999999px;
		padding: 0.5rem 0.75rem;
		padding-inline-start: var(--text-padding);
	}

	.article__tag::before {
		content: '';
		width: 0.5rem;
		aspect-ratio: 1/1;
		border-radius: 50%;
		background-color: var(--tag-color);
		position: absolute;
		left: calc(var(--text-padding) / 2 - 3px);
		top: 1rem;
		transform: translateY(-50%);
	}

	.article__tag.recipes {
		--tag-color: rgb(31, 190, 31);
	}
	.article__tag.coding {
		--tag-color: rgb(0, 203, 218);
	}
	.article__tag.musings {
		--tag-color: rgb(183, 35, 241);
	}
	// .article__tag.music { }
	.article__tag.suggestions {
		--tag-color: rgb(56, 35, 241);
	}
	.article__tag.featured {
		--tag-color: rgb(199, 0, 0);
	}

	.article__pin-wrapper {
		position: absolute;
		top: calc(1rem - 7.5px);
		left: calc(1rem - 7.5px);
	}
</style>
