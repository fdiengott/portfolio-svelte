<script>
	import { page } from '$app/stores';
	import ThemeToggle from './components/ThemeToggle.svelte';

	$: pathname = $page.url.pathname;
</script>

<header>
	<div class="header__home-link" data-visible={pathname !== '/'}>
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

	<div class="header__theme-toggle">
		<ThemeToggle />
	</div>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
	}

	.header__home-link {
		padding-inline: 1rem;
		place-items: center;
		display: none;
	}

	.header__home-link a {
		display: flex;
		align-items: center;
		justify-content: center;
		padding-inline: 0.5rem;
		width: 100%;
		height: 100%;
	}

	.header__home-link[data-visible='false'] a {
		opacity: 0;
		pointer-events: none;
	}
	.header__home-link[data-visible='true'] a {
		opacity: 1;
	}

	.header__theme-toggle {
		display: flex;
		place-items: center;
		padding-inline-end: 1rem;
	}

	nav {
		display: flex;
		justify-content: start;
		padding-inline-start: 1rem;
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
		padding: 0 0.25rem;
		color: var(--color-text);
		font-weight: 700;
		font-size: 0.7rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
	}

	nav a,
	.header__home-link a {
		transition: color 0.2s linear;
	}

	.header__home-link a {
		color: var(--color-text);
		text-decoration: none;
	}

	a:hover {
		color: var(--color-primary);
	}

	@media (width > 768px) {
		.header__home-link {
			display: flex;
		}
		nav {
			margin-inline: 0;
			justify-content: center;
			margin-inline: auto;
		}
		nav a {
			font-size: 0.8rem;
			padding: 0 0.5rem;
		}
	}
</style>
