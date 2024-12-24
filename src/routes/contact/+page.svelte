<script>
	const rows = [
		{ label: 'Name', value: 'Freddy Diengott' },
		{ label: 'Location', value: 'Brooklyn, NY' },
		{
			label: 'Github',
			value: { link: 'https://github.com/fdiengott', text: 'fdiengott' },
			external: true,
		},
		{
			label: 'LinkedIn',
			value: { link: 'https://www.linkedin.com/in/freddiengott/', text: 'freddiengott' },
			external: true,
		},
		{
			label: 'Wellfound',
			value: { link: 'https://wellfound.com/u/freddy-diengott', text: 'freddy-diengott' },
			external: true,
		},
		{ label: 'Resume', value: { link: '/resume', text: 'Link' } },
	];
</script>

<svelte:head>
	<title>Freddy Diengott - Contact</title>
</svelte:head>

<article class="panel">
	<div class="contact__header">
		<h1>Contact Me</h1>
	</div>
	<div class="animate-in" style="animation-delay: {200}ms">
		<div class="page-break" />
	</div>
	<dl>
		{#each rows as row, index}
			<div class="row">
				<dt class="animate-in" style="animation-delay: {250 + index * 50}ms">{row.label}</dt>
				<dd class="animate-in" style="animation-delay: {250 + (index + 1) * 50}ms">
					{#if typeof row.value === 'string'}
						{row.value}
					{:else}
						<a
							href={row.value.link}
							target={row.external && '_blank'}
							rel={row.external && 'noopener noreferrer'}
						>
							{row.value.text}
						</a>
					{/if}
				</dd>
			</div>
		{/each}
	</dl>
</article>

<style>
	.page-break {
		opacity: 1;
		height: 1px;
		background-color: #000;
		margin-block: 1rem 3rem;
		transition: all var(--transition-timing);
		transform: translateY(0);
	}
	dl {
		display: grid;
		justify-content: center;
		margin-block-end: 2rem;
		text-align: left;
	}

	.row {
		display: grid;
		grid-template-columns: 1fr max-content;
		padding-block: 0.5rem;
	}

	dt,
	dd {
		font-weight: 400;
	}

	dd {
		text-align: right;
		margin-inline-start: 3rem;
	}

	@media (width > 768px) {
		.row {
			display: flex;
		}
		dt {
			width: clamp(7rem, 3rem + 18vw, 20rem);
		}
		dd {
			text-align: left;
			margin-inline-start: 0;
		}
	}
</style>
