<script>
	import { page } from '$app/stores';
	import GithubLogo from './components/githubLogo.svelte';
	import ThemeToggle from './components/ThemeToggle.svelte';

	$: pathname = $page.url.pathname;
</script>

<header>
	<div class="header__corner" data-visible={pathname !== '/'}>
		<a href="/" tabindex={pathname === '/' ? -1 : 0}> Freddy Diengott</a>
	</div>

	<nav>
		<ul>
			<li aria-current={pathname === '/' && 'page'}>
				<a href="/">Home</a>
			</li>
			<li aria-current={pathname === '/skills' && 'page'}>
				<a href="/skills">Skills</a>
			</li>
			<li aria-current={pathname === '/projects' && 'page'}>
				<a href="/projects">Projects</a>
			</li>
			<li aria-current={pathname.includes('/blogs') && 'page'}>
				<a href="/blogs">Blog</a>
			</li>
			<li aria-current={pathname === '/contact' && 'page'}>
				<a href="/contact">Contact</a>
			</li>
		</ul>
	</nav>

	<div class="header__corner header__corner--github">
		<a href="https://github.com/fdiengott/" target="_blank">
			<GithubLogo />
		</a>
		<ThemeToggle />
	</div>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
	}

	.header__corner {
		padding-inline: 1rem;
	}

	.header__corner a {
		display: flex;
		align-items: center;
		justify-content: center;
		padding-inline: 0.5rem;
		width: 100%;
		height: 100%;
	}

	.header__corner[data-visible='false'] a {
		opacity: 0;
		pointer-events: none;
	}
	.header__corner[data-visible='true'] a {
		opacity: 1;
	}

	.header__corner {
		display: none;
	}

	nav {
		margin-inline: auto;
	}

	@media (width > 768px) {
		.header__corner {
			display: flex;
		}

		nav {
			margin-inline: 0;
		}
	}

	/* TODO fix these styles */
	nav {
		display: flex;
		justify-content: center;
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--color-bg);
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}

	li[aria-current='page']::before {
		--size: 8px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--color-primary);
	}

	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		color: var(--color-text);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
	}

	nav a,
	.header__corner a {
		transition: color 0.2s linear;
	}

	.header__corner a {
		color: var(--color-text);
		text-decoration: none;
	}

	a:hover {
		color: var(--color-primary);
	}

	.header__corner--github {
		display: none;
	}

	@media (width > 768px) {
		.header__corner--github {
			display: flex;
			align-items: center;
		}
	}
</style>
