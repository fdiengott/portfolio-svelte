<script>
	import { pages } from './articles/index.js';
</script>

<ul class="article__list">
	{#each Object.entries(pages) as [slug, article]}
		<li>
			<div class="article__date">{article.date}</div>
			<a href="/blogs/{slug}">
				<div>{article.title}</div>
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
	.article__list {
		display: grid;
		row-gap: 2rem;
		justify-content: center;

		> li {
			display: grid;
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
		gap: 0.5rem;
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

	// TODO fix these colors
	.article__tag.recipe {
		--tag-color: rgb(104, 255, 104);
	}
	.article__tag.coding {
	}
	.article__tag.musings {
		--tag-color: rgb(183, 35, 241);
	}
	.article__tag.music {
	}
	.article__tag.suggestions {
		--tag-color: rgb(56, 35, 241);
	}
</style>
