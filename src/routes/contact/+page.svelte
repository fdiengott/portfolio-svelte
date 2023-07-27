<script>
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { quadOut } from 'svelte/easing';
	import resume from '../../assets/Freddy_Diengott_Resume.pdf';

	let isPageLoaded = false;
	onMount(() => (isPageLoaded = true));

	const rows = [
		{ label: 'Name', value: 'Freddy Diengott' },
		{ label: 'Email', value: 'fdiengott@gmail.com' },
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
	<table>
		<tbody>
			{#each rows as row, index}
				{#if isPageLoaded}
					<tr>
						<th transition:fly={{ ...defaultTransitionParams, delay: 250 + index * 50 }}>{row.label}</th>
						<th transition:fly={{ ...defaultTransitionParams, delay: 250 + (index + 1) * 50 }}>
							{#if typeof row.value === 'string'}
								{row.value}
							{:else}
								<a href={row.value.link} target="_blank" rel="noopener noreferrer">{row.value.text}</a>
							{/if}
						</th>
					</tr>
				{/if}
			{/each}
		</tbody>
	</table>
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
	table {
		text-align: left;
		margin-inline: auto;
		margin-block-end: 2rem;
	}

	tr {
		height: 2.5rem;
	}

	th {
		font-weight: 400;
	}

	th:first-child {
		width: 17rem;
	}

	th:not(:first-child) {
		text-align: right;
	}

	@media (width > 768px) {
		th:not(:first-child) {
			text-align: left;
		}
	}
</style>
