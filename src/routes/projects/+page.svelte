<script>
	import { projects } from './projects';
</script>

<svelte:head>
	<title>Freddy Diengott - Projects</title>
</svelte:head>

<article class="panel">
	<div class="projects__header">
		<h1 class="animate-in" style="animation-delay: 200ms">Projects</h1>
		<p class="animate-in" style="animation-delay: 300ms">
			Take a look through a few of my recent projects! Most are from early on in my career and are no longer live,
			but you can still check out the code if you'd like!
		</p>
	</div>

	<div class="animate-in" style="animation-delay: 500ms">
		<div class="page-break" />
	</div>

	<section class="projects__wrapper">
		{#each projects as project}
			<div class="projects__card">
				<span class="projects__card-header">
					<h2>{project.title}</h2>
					<div class="external-links">
						<a href={project.githubLink} target="_blank" rel="noopener noreferrer">Github</a>
						{#if project?.liveLink}
							<a href={project.liveLink} target="_blank" rel="noopener noreferrer">Live</a>
						{/if}
					</div>
				</span>

				<a href={project.githubLink} target="_blank" rel="noopener noreferrer" class="projects__image-link fit">
					<img src={project.imgSrc} alt={project.title} />
					<article class="hover-text web">
						{#if project.description}
							{#each project.description as description}
								<p>{description}</p>
							{/each}
						{/if}
					</article>
				</a>
				<article class="hover-text mobile">
					{#if project.description}
						{#each project.description as description}
							<p>{description}</p>
						{/each}
					{/if}
				</article>
			</div>
		{/each}
	</section>
</article>

<style>
	.projects__wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 4rem;
	}

	.projects__header p {
		line-height: 1.7;
	}

	.page-break {
		opacity: 1;
		height: 1px;
		background-color: #000;
		margin-block: 3rem;
		transition: all var(--transition-timing);
		transform: translateY(0);
	}

	.projects__card {
		width: 80%;
	}

	.projects__image-link {
		display: block;
		position: relative;
		overflow: hidden;
	}

	.projects__image-link img {
		transition: var(--transition-timing) transform ease-in-out, var(--transition-timing) filter ease-in-out;
		position: relative;
		top: 1px;
	}

	.hover-text {
		background-color: rgba(0, 0, 0, 0.45);
		color: white;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding-block: 1rem;
		line-height: 1.6;
	}
	.hover-text.web {
		display: none;
		position: absolute;
		inset: 0;
		opacity: 0;
		gap: 4rem;
		font-size: var(--fs-500);
		font-weight: 600;
		transition: opacity calc(var(--transition-timing) * 2) ease-in-out;
	}
	.hover-text.mobile {
		display: flex;
		gap: 1rem;
		font-size: var(--fs-300);
		pointer-events: none;
	}

	@media (width > 768px) {
		.projects__image-link:hover img,
		.projects__image-link:focus-visible img {
			transform: scale(1.02);
			filter: blur(8px);
		}

		.hover-text.mobile {
			display: none;
		}
		.hover-text.web {
			display: flex;
		}

		.projects__image-link:hover .hover-text,
		.projects__image-link:focus-visible .hover-text {
			opacity: 0.9;
		}
	}

	.hover-text p {
		width: 80%;
		font-weight: 400;
	}

	.projects__card-header {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		margin-block-end: 0.5rem;
	}

	.projects__card-header h2 {
		font-size: var(--fs-700);
	}

	.external-links {
		text-align: right;
		line-height: 2.4;
	}

	.external-links a,
	.external-links a:visited {
		color: var(--color-primary);
		text-decoration: none;
		margin-inline: 0.5rem 0;
		font-weight: 400;
	}

	@media (width > 768px) {
		.external-links a:hover {
			text-decoration: underline;
		}

		.external-links {
			text-align: left;
		}

		.external-links a,
		.external-links a:visited {
			margin-inline: 0.5rem;
		}
	}
</style>
