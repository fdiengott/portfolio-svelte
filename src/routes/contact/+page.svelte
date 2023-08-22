<script>
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { quadOut } from 'svelte/easing';
	import resume from '../../assets/Freddy_Diengott_Resume.pdf';

	let isPageLoaded = false;
	onMount(() => (isPageLoaded = true));

	const rows = [
		{ label: 'Name', value: 'Freddy Diengott' },
		{ label: 'Location', value: 'Brooklyn, NY' },
		{ label: 'Github', value: { link: 'https://github.com/fdiengott', text: 'fdiengott' } },
		{ label: 'LinkedIn', value: { link: 'https://www.linkedin.com/in/freddiengott/', text: 'freddiengott' } },
		{ label: 'Wellfound', value: { link: 'https://wellfound.com/u/freddy-diengott', text: 'freddy-diengott' } },
		{ label: 'Resume', value: { link: resume, text: 'Link' } }
	];

	const defaultTransitionParams = {
		duration: 600,
		y: -50,
		easing: quadOut
	};
</script>

<svelte:head>
	<title>Freddy Diengott - Contact</title>
</svelte:head>

<article class="panel">
	<div class="contact__header">
		<h1>Contact Me</h1>
	</div>
	{#if isPageLoaded}
		<div transition:fly={{ ...defaultTransitionParams, delay: 200 }}>
			<div class="page-break" />
		</div>
	{/if}
	<dl>
		{#each rows as row, index}
			{#if isPageLoaded}
				<div class="row">
					<dt transition:fly={{ ...defaultTransitionParams, delay: 250 + index * 50 }}>{row.label}</dt>
					<dd transition:fly={{ ...defaultTransitionParams, delay: 250 + (index + 1) * 50 }}>
						{#if typeof row.value === 'string'}
							{row.value}
						{:else}
							<a href={row.value.link} target="_blank" rel="noopener noreferrer">{row.value.text}</a>
						{/if}
					</dd>
				</div>
			{/if}
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
