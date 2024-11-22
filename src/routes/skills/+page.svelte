<script>
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { quadOut } from 'svelte/easing';

	let isPageLoaded = false;
	onMount(() => (isPageLoaded = true));

	const skillData = [
		{ iconCls: 'devicon-typescript-plain colored', text: 'TypeScript' },
		{ iconCls: 'devicon-javascript-plain colored', text: 'JavaScript' },
		{ iconCls: 'devicon-react-original colored', text: 'React' },
		{ iconCls: 'devicon-sass-original colored', text: 'Sass' },

		{ iconCls: 'devicon-nextjs-original-wordmark colored', text: 'Next.js' },
		{ iconCls: 'devicon-svelte-plain colored', text: 'Svelte' },
		{ iconCls: 'devicon-astro-plain colored', text: 'Astro' },
		{ iconCls: 'devicon-vuejs-plain colored', text: 'Vue.js' },

		{ iconCls: 'devicon-d3js-plain colored', text: 'RxJS' },
		{ iconCls: 'devicon-d3js-plain colored', text: 'D3.js' },
		{ iconCls: 'devicon-trpc-plain colored', text: 'tRPC' },
		{ iconCls: 'devicon-bash-plain colored', text: 'Bash' },

		{ iconCls: 'devicon-ruby-plain colored', text: 'Ruby' },
		{ iconCls: 'devicon-rails-plain colored', text: 'Rails' },
		{ iconCls: 'devicon-nodejs-plain colored', text: 'Node.js' },
		{ iconCls: 'devicon-express-original colored', text: 'Express' },

		{ iconCls: 'devicon-postgresql-plain colored', text: 'PostgreSQL' },
		{ iconCls: 'devicon-mongodb-plain colored', text: 'MongoDB' },
		{ iconCls: 'devicon-html5-plain colored', text: 'HTML' },
		{ iconCls: 'devicon-css3-plain colored', text: 'CSS' },

		{ iconCls: 'devicon-graphql-plain colored', text: 'GraphQL' },
		{ iconCls: 'devicon-vitejs-plain colored', text: 'Vite' },
		{ iconCls: 'devicon-webpack-plain colored', text: 'Webpack' },
		{ iconCls: 'devicon-babel-plain colored', text: 'Babel' },

		{ iconCls: 'devicon-heroku-original colored', text: 'Heroku' },
		{ iconCls: 'devicon-amazonwebservices-plain colored', text: 'Amazon Web Services' },
		{ iconCls: 'devicon-netlify-plain colored', text: 'Netlify' },
		{ iconCls: 'devicon-git-plain colored', text: 'Git' },

		{ iconCls: 'devicon-jest-plain colored', text: 'Jest' },
		{ iconCls: 'devicon-materialui-plain', text: 'Material UI' },
		{ iconCls: 'devicon-storybook-plain', text: 'Storybook' },
		{ iconCls: 'devicon-neovim-plain colored', text: 'Neovim' },
	];

	const defaultTransitionParams = {
		duration: 400,
		y: -80,
		opacity: 0,
		easing: quadOut
	};

</script>

<svelte:head>
	<title>Freddy Diengott - skills</title>
</svelte:head>

<article id="skills" class="panel">
	<div class="skills__header">
		<h1>Skills</h1>
	</div>
	<section>
		<div class="skill__grid">
			{#each skillData as skill, index (skill.text)}
				{#if isPageLoaded}
					<div class="skill__icon" in:fly={{ ...defaultTransitionParams, delay: 200 + index * 35 }}>
						<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
						<i class={skill.iconCls} data-text={skill.text} tabindex="0" />
					</div>
				{/if}
			{/each}
		</div>
	</section>
</article>

<style>
	.skill__grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		row-gap: 3rem;
	}

	@media (width > 768px) {
		.skill__grid {
			grid-template-columns: repeat(4, 1fr);
		}
	}

	.skills__header {
		margin-block-end: 2rem;
	}

	.skill__icon {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 80px;
		position: relative;
		opacity: 0.9;
		transition: all var(--transition-timing);
	}

	.skill__icon:hover,
	.skill__icon:has(:focus-visible) {
		color: var(--color-primary);
		opacity: 1;
		transform: translateY(5px) scale(1.05);
	}

	.skill__icon:before {
		content: '';
		position: absolute;
		inset: 100% 30% -20% 30%;
		background-color: #444;
		filter: blur(10px);
		opacity: 0;
		transition: all var(--transition-timing);
	}
	.skill__icon:hover:before,
	.skill__icon:has(:focus-visible):before {
		opacity: 0.2;
	}
	.skill__icon i {
		display: flex;
		flex-direction: column;
		align-items: center;
		color: var(--color-primary);
		outline: none;
	}

	i[data-text]:after {
		content: attr(data-text);
		font-size: 1rem;
		position: absolute;

		top: 0;
		padding: 10px;
		border-radius: 10px;
		/* background: var(--color-bg); */
		background: var(--color-primary);
		color: var(--white);
		text-align: center;

		opacity: 0;
		transition: all var(--transition-timing);
	}

	i[data-text]:hover:after,
	i[data-text]:focus-visible:after {
		opacity: 1;
		transform: translateY(-120%);
	}
</style>
