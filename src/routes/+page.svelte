<script>
	import headshot from '../assets/images/headshot.jpeg';

	const delayInterval = 0.05;
	const initialDelay = 0.8;
	const firstNameTime = 'Freddy '.length * delayInterval + initialDelay;
</script>

<svelte:head>
	<title>Freddy Diengott - Software Engineer</title>
	<meta
		name="description"
		content="A software engineer with a specialty in writing explicitly maintainable, efficient code...and also a big nerd."
	/>
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
					<span>
						{#each 'Freddy ' as char, i}
							<span
								style="animation-delay: {initialDelay + i * delayInterval}s"
								class="name-letter animate-in">{char}</span
							>
						{/each}
					</span>
					<span>
						{#each 'Diengott' as char, i}
							<span
								style="animation-delay: {firstNameTime + i * delayInterval}s"
								class="name-letter animate-in">{char}</span
							>
						{/each}
					</span>
					<svg class="svg-underline" xmlns="http://www.w3.org/2000/svg" viewBox="47.18 165.7 1980.58 143.53">
						<path
							d="M1900.58,10.60 Q1881.87,11.33 1865.70,11.71 T1826.54,11.67 1774.96,10.63 1713.76,9.20 1646.34,7.80 1575.03,6.72 1498.88,5.89 1419.89,5.24 1341.12,5.05 1262.82,5.80 1185.76,6.98 1109.65,7.89 1033.68,8.60 956.06,9.74 877.14,11.53 798.40,13.51 719.22,15.95 639.41,19.33 558.82,24.04 481.80,29.78 413.52,35.42 355.28,40.08 306.92,43.69 266.82,46.48 233.70,48.64 205.14,50.90 178.24,53.26 152.33,55.68 126.90,58.15 102.36,60.07 80.68,61.25 35.35,62.56 0.00,63.53 -0.00,63.53"
							fill="transparent"
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
					<span class="design-text">
						{#each 'design-focused' as letter, index}
							<span style="--delay: {index * 300}ms">{letter}</span>
						{/each}
					</span>, auto-didactic, full-stack software engineer based in Brooklyn, NY! I'm currently a UI
					engineer at Adaptive Financial where I'm building a real-time finance platform built on top of a
					web-socket connected, highly secure, fast, distributed system where the UI is made with
					<span class="bold">TypeScript</span>, <span class="bold">React</span>,
					<span class="bold">Material UI</span>, TanStack's
					<span class="bold">React Table</span>, <span class="bold">React Query</span>,
					<span class="bold">React Hook Form</span>, and some other goodies. I'm passionate about writing
					loosely coupled, maintainable, performant code, with an emphasis on intuitive design and
					accessibility.
				</p>

				<p>
					This last year I've seen myself grow as a <span class="underline italic">full</span>-stack engineer,
					as I've spent a serious amount of time reading java code, learning design patterns, the advantages
					and security concerns of cloud technologies, and the ins and outs of distributed systems that handle
					lots of data.
				</p>

				<p>
					I've recently spent a large swath of free time studying Machine Learning and AI safety, as I believe
					it is the defining technology of our time.
				</p>

				<p>
					This year I made a new years resolution to read a book in all of the major scientific disciplines.
					It's been a goal for myself in the last couple of years to try and have as deep and accurate model
					of the world as I can, and this is a piece of that journey. To hold myself accountable (and because
					I find it useful to refer to) I will include all of the books I read and would recommend in a blog
					post. I hope this blog will start to fill up with articles I'm writing to understand technology,
					both software engineering and in general, and the world. I am not under the impression that anyone
					will read it, but by making them publicly accessible, I hope to motivate myself to write. To
					understand how I think. I've never been someone who writes very much, but I think it is an
					incredibly valuable skill to cultivate. Not the writing in and of itself, but the exploration into
					one's own thinking that is concrete and mulled over.
				</p>

				<p>So feel free to reach out. And stay tuned!</p>
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
	.name-letter {
		position: relative;
		opacity: 0;
		display: inline-block;
		min-width: 10px;
		transform: translate(0, 10px);
	}

	.home__header--name {
		--fade-in-dur: 0.5s;
		position: relative;
		margin-block: 0;
		transition: all var(--transition-timing);
	}

	.home__header--name span {
		white-space: nowrap;
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

		.home__headshot,
		.home__header {
			--home-headshot-width: 20rem;
		}

		.home__headshot {
			width: var(--home-headshot-width);
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
		margin-inline: var(--fancy-text-inline-spacing);
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

	.underline {
		text-decoration: underline;
	}

	.italic {
		font-style: italic;
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

	.nav-icon:is(:hover, :focus-within)::before,
	.nav-icon:is(:hover, :focus-within) span {
		opacity: 1;
	}

	.svg-underline {
		display: none;
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

		.svg-underline {
			--right-offset: 2rem;

			display: block;
			position: absolute;
			right: calc(var(--right-offset) - 1rem);
			bottom: -1.5rem;
			transform: rotateY(180deg);
			width: calc(100% - var(--home-headshot-width) - var(--right-offset));
			height: auto;
		}

		.svg-underline path {
			--underline-offset: 200%;

			transform: translate(100px, 200px);
			stroke-dasharray: 200%;
			stroke-dashoffset: var(--underline-offset);
			stroke: var(--color-text);
			fill: none;
			stroke-width: 10px;

			animation: draw 0.7s forwards;
			animation-timing-function: cubic-bezier(0.67, 0.01, 0.97, 0.85);
			animation-delay: calc(15 * var(--delay-interval) + var(--fade-in-dur));
		}

		@keyframes draw {
			to {
				stroke-dashoffset: 0;
			}
		}
	}
</style>
