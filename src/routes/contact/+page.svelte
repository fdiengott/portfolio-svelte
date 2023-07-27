<script>
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { quadOut } from 'svelte/easing';
	import resume from '../../assets/Freddy_Diengott_Resume.pdf';

	let isPageLoaded = false;
	onMount(() => (isPageLoaded = true));

	const NUM_ROWS = 7;
	const NUM_CELLS = NUM_ROWS * 2;
	const transitionParams = Array.from({ length: NUM_CELLS + 1 }, (_, i) => ({
		delay: 200 + i * 50,
		duration: 400,
		y: -50,
		opacity: 0,
		easing: quadOut
	}));
</script>

<svelte:head>
	<title>Freddy Diengott - Contact</title>
</svelte:head>

<article class="panel">
	<div class="contact__header">
		<h1>Contact Me</h1>
	</div>
	{#if isPageLoaded}
		<div transition:fly={transitionParams[0]}>
			<div class="page-break" />
		</div>
		<table>
			<tbody>
				<tr>
					<th transition:fly={transitionParams[1]}>Name</th>
					<th transition:fly={transitionParams[2]}>Freddy Diengott</th>
				</tr>
				<tr>
					<th transition:fly={transitionParams[3]}>Email</th>
					<th transition:fly={transitionParams[4]}>fdiengott@gmail.com</th>
				</tr>
				<tr>
					<th transition:fly={transitionParams[5]}>Location</th>
					<th transition:fly={transitionParams[6]}>Brooklyn, NY</th>
				</tr>
				<tr>
					<th transition:fly={transitionParams[7]}>Github</th>
					<th transition:fly={transitionParams[8]}
						><a href="https://github.com/fdiengott" target="_blank" rel="noopener noreferrer">fdiengott</a
						></th
					>
				</tr>
				<tr>
					<th transition:fly={transitionParams[9]}>LinkedIn</th>
					<th transition:fly={transitionParams[10]}
						><a href="https://www.linkedin.com/in/freddiengott/" target="_blank" rel="noopener noreferrer"
							>freddiengott</a
						></th
					>
				</tr>
				<tr>
					<th transition:fly={transitionParams[11]}>Wellfound</th>
					<th transition:fly={transitionParams[12]}>
						<a href="https://wellfound.com/u/freddy-diengott" target="_blank" rel="noopener noreferrer">
							freddy-diengott
						</a>
					</th>
				</tr>
				<tr>
					<th transition:fly={transitionParams[13]}>Resume</th>
					<th transition:fly={transitionParams[14]}
						><a href={resume} target="_blank" rel="noopener noreferrer">Link</a></th
					>
				</tr>
			</tbody>
		</table>
	{/if}
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
