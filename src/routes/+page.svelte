<script>
	import { onMount } from 'svelte';
	import headshot from '../assets/images/headshot.jpeg';

	const designText = 'design-focused'.split('');

	const nameArray = 'Freddy Diengott'.split('');

	let animate = false;
	const delayInterval = 0.05;

	onMount(() => (animate = true));
</script>

<svelte:head>
	<title>Freddy Diengott - Software Engineer</title>
	<meta name="description" content="I'm an EA-aligned software engineer, former opera singer, and full time nerd." />
</svelte:head>

<section>
	<article id="home" class="panel intro">
		<div>
			<img
				class="home__headshot"
				src={headshot}
				alt="A professional headshot of a young man wearing a black button down"
			/>
			<div class="home__header">
				<h1 class="home__header--name" style="--delay-interval: {delayInterval}s">
					{#each nameArray as char, i}
						<span style="animation-delay: {i * delayInterval}s" class="name-letter {animate && 'animate'}"
							>{char}</span
						>
					{/each}
					<svg class="svg-underline" xmlns="http://www.w3.org/2000/svg" viewBox="47.18 165.7 1980.58 143.53">
						<path
							d="M1900.58,10.60 Q1881.87,11.33 1865.70,11.71 T1826.54,11.67 1774.96,10.63 1713.76,9.20 1646.34,7.80 1575.03,6.72 1498.88,5.89 1419.89,5.24 1341.12,5.05 1262.82,5.80 1185.76,6.98 1109.65,7.89 1033.68,8.60 956.06,9.74 877.14,11.53 798.40,13.51 719.22,15.95 639.41,19.33 558.82,24.04 481.80,29.78 413.52,35.42 355.28,40.08 306.92,43.69 266.82,46.48 233.70,48.64 205.14,50.90 178.24,53.26 152.33,55.68 126.90,58.15 102.36,60.07 80.68,61.25 35.35,62.56 0.00,63.53 -0.00,63.53"
							fill="transparent"
							stroke="#000000"
							stroke-width="18"
							stroke-linejoin="round"
							stroke-linecap="round"
						/>
					</svg>
				</h1>
				<p class="home__header--subtitle">Software Engineer</p>
			</div>
			<div class="home__blurb">
				<p>
					I'm a <span class="cursive-text">
						curious
						<span class="sparkle" />
						<span class="sparkle" />
						<span class="sparkle" />
					</span>,
					<span class="design-text" data-text="design-focused">
						{#each designText as letter, index}
							<span style="--delay: {index * 300}ms">{letter}</span>
						{/each}
					</span>
					full-stack software engineer based in NYC who loves making websites! I'm currently a frontend developer
					at Etrade from Morgan Stanley where I'm maintaining a
					<span class="bold">React Component Library</span>
					and work as the team lead for our <span class="bold">D3.js Charts Library</span> and a
					<span class="bold">Web Scraping Bun/Astro/React Metrics Dashboard</span>. I'm passionate about
					design, accessibility, and writing scalable, maintainable, and performant code.
				</p>

				<p>
					My journey to software engineering took many unexpected turns. Some of the pit stops included
					pursuing a career as an opera singer and organizing the music and entertainment for over 200
					high-end events! I have lots of hobbies and love to learn new things!
				</p>
			</div>
		</div>
		<div class="home__footer-links">
			<a href="/resume" class="icon solid fa-file nav-icon">
				<span>Resume</span>
			</a>
			<a
				href="https://github.com/fdiengott"
				target="_blank"
				rel="noopener noreferrer"
				class="icon brands fa-github nav-icon"
			>
				<span>Github</span>
			</a>
			<a
				href="https://www.linkedin.com/in/freddiengott/"
				target="_blank"
				rel="noopener noreferrer"
				class="icon brands fa-linkedin nav-icon"
			>
				<span>LinkedIn</span>
			</a>
			<a
				href="https://wellfound.com/u/freddy-diengott"
				target="_blank"
				rel="noopener noreferrer"
				class="icon brands fa-angellist nav-icon"
			>
				<span>Wellfound</span>
			</a>
		</div>
	</article>
</section>

<style>
	.svg-underline {
		position: absolute;
		right: 6rem;
		bottom: -1.5rem;
		transform: rotateY(180deg);
		width: 600px;
		height: auto;
	}

	.svg-underline path {
		--underline-offset: 200%;

		transform: translate(100px, 200px);
		stroke-dasharray: 200%;
		stroke-dashoffset: var(--underline-offset);
		stroke: black;
		fill: none;
		stroke-width: 10px;

		animation: draw 1s forwards;
		animation-timing-function: cubic-bezier(0.67, 0.01, 0.97, 0.85);
		animation-delay: calc(15 * var(--delay-interval) + var(--fade-in-dur));
	}

	@keyframes draw {
		to {
			stroke-dashoffset: 0;
		}
	}

	.name-letter {
		position: relative;
		opacity: 0;
		display: inline-block;
		min-width: 10px;
		transform: translate(0, 10px);
	}

	.name-letter.animate {
		animation: fadeIn var(--fade-in-dur) forwards;
	}

	@keyframes fadeIn {
		to {
			opacity: 1;
			transform: translate(0, 0);
		}
	}

	.home__header--name {
		--fade-in-dur: 0.5s;
		position: relative;
		margin-block: 0;
		transition: all var(--transition-timing);
	}

	.sparkle {
		position: absolute;
		background-color: var(--color-primary);
		scale: 0;
		clip-path: polygon(0 50%, 40% 40%, 50% 0, 60% 40%, 100% 50%, 60% 60%, 50% 100%, 40% 60%);
		aspect-ratio: 1/1;
	}

	@keyframes pulse {
		from,
		to {
			scale: 0;
		}
		50% {
			scale: 1;
		}
	}
	@keyframes rotate {
		from {
			rotate: 0deg;
		}
		to {
			rotate: 180deg;
		}
	}

	article {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.home__header {
		margin-block-end: 1.5rem;
	}
	.home__headshot {
		border-radius: 0.5rem;
	}

	@media (width > 768px) {
		.home__header {
			margin-block-end: 0;
		}

		.home__headshot {
			width: 20rem;
			border-radius: 50%;
			margin-inline-end: 2rem;
			float: left;
			shape-outside: polygon(0 0, 100% 0, 100% 60%, 70% 100%);
		}
	}

	.home__blurb {
		margin-block: 0 1rem;
		text-align: justify;
	}
	.home__blurb p {
		padding-block: 1rem;
		line-height: 1.5;
	}

	/* Cursive text */
	.cursive-text,
	.design-text {
		--fancy-text-inline-spacing: 10px;
		font-size: var(--fs-600);
		line-height: 1;
	}

	.cursive-text {
		--transition-timing: 600ms;

		font-family: 'Dancing Script', cursive;
		margin-inline-start: var(--fancy-text-inline-spacing);
		position: relative;
		display: inline-block;
		transition: all var(--transition-timing);
	}
	.design-text {
		font-family: 'Poiret One', sans-serif;
		margin-inline: var(--fancy-text-inline-spacing);
	}

	.cursive-text:hover .sparkle {
		animation: pulse 1000ms ease forwards infinite, rotate 1000ms linear infinite;
	}
	.cursive-text .sparkle {
		position: absolute;
		width: 1rem;
		opacity: 0.6;
	}
	.cursive-text .sparkle:nth-child(1) {
		top: 0%;
		left: 0;
		animation-delay: calc(333ms * 1);
	}
	.cursive-text .sparkle:nth-child(2) {
		top: 70%;
		left: 25%;
		animation-delay: calc(333ms * 2);
	}
	.cursive-text .sparkle:nth-child(3) {
		top: 20%;
		left: 80%;
		animation-delay: calc(333ms * 3);
	}

	.cursive-text:hover {
		transform: scale(1.3);
	}

	/* Design text */
	.design-text,
	.design-text span {
		display: inline-block;
		transition: all 600ms;
	}
	.design-text:hover {
		scale: 1.1;
	}
	.design-text:hover span {
		animation: float 2s ease-in-out infinite;
		animation-delay: var(--delay);
	}

	@keyframes float {
		50% {
			transform: translateY(0.45rem);
		}
	}

	.bold {
		font-weight: 700;
	}

	.icon:focus {
		outline: 2px solid #000;
		outline-offset: 1px;
		border-radius: 3px;
	}

	/* Nav Icons */
	.home__footer-links {
		display: flex;
		justify-content: space-between;
		max-width: 25rem;
		width: 100%;
	}
	.nav-icon {
		width: 1em;
		line-height: 0.9em;
		font-size: 2.5em;
		outline: 0;
		color: var(--color-primary);
		text-align: center;
	}
	.nav-icon.icon:before {
		padding-right: 0;
		opacity: 0.6;
		font-size: 0.8em;
		transition: opacity var(--transition-timing);
	}

	.nav-icon span {
		display: block;
		position: absolute;
		top: -1.75em;
		font-size: 0.3em;
		height: 2.25em;
		line-height: 2.25em;
		left: 50%;
		-webkit-transition: opacity 0.25s ease-in-out;
		transition: opacity 0.25s ease-in-out;
		width: 5.5em;
		margin-left: -2.75em;
	}

	.nav-icon span:after {
		content: '';
		display: none;
		position: absolute;
		bottom: -0.4em;
		left: 50%;
		margin-left: -0.6em;
		border-top: solid 0.6em #222222;
		border-left: solid 0.6em transparent;
		border-right: solid 0.6em transparent;
	}

	.nav-icon:hover:before {
		opacity: 1;
	}

	.nav-icon:hover span {
		opacity: 1;
	}

	@media (width > 768px) {
		.nav-icon {
			margin-inline: 0.25em;
		}

		.nav-icon span {
			top: -2.75em;
			opacity: 0;
			background: #222222;
			color: #ffffff;
		}

		.nav-icon span:after {
			display: block;
		}
	}
</style>
