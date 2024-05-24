<script lang="ts">
	import '../styles/app.css';
	import { onNavigate } from '$app/navigation';
	import { Header, Menu, Tabs } from '$lib/components';
	import { darkTheme } from '$lib/store';
	import { page } from '$app/stores';

	interface ExtendedDocument extends Document {
		startViewTransition: any;
	}

	onNavigate((navigation) => {
		if (!('startViewTransition' in document)) return;

		return new Promise((resolve) => {
			(document as ExtendedDocument).startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<div
	class="main-container flex column"
	class:template={$page.url.pathname.includes('template')}
	data-theme={$darkTheme ? 'dark' : 'light'}
>
	<div class="background light-theme">
		<div class="top-portion" class:animate={!$page.url.pathname.includes('template')} />
		<div class="bottom-portion" />
	</div>
	<div class="background dark-theme">
		<div class="top-portion" class:animate={!$page.url.pathname.includes('template')} />
		<div class="bottom-portion" />
	</div>
	<Header />
	<main class="flex column">
		<Menu />
		<Tabs />
		<slot />
	</main>
</div>

<style>
	:root {
		--graph-unit: 65px;
	}
	.main-container {
		gap: 0;
		height: 100vh;
		max-width: 100vw;
		overflow-x: clip;
		transition: color 150ms ease-in-out, background-color 150ms ease-in-out;
		background-color: var(--background-color);
		color: var(--color);
		position: relative;
	}
	.main-container[data-theme='dark'] {
		--color: var(--dark-theme-color);
		--background-color: var(--dark-theme-background-color);
		--transparent-background-color: var(--dark-theme-transparent-background-color);
	}
	.main-container[data-theme='dark'] .dark-theme {
		opacity: 1;
	}
	.main-container[data-theme='dark'] .light-theme {
		opacity: 0;
	}
	.main-container[data-theme='light'] .light-theme {
		opacity: 1;
	}
	.main-container[data-theme='light'] .dark-theme {
		opacity: 0;
	}
	.main-container.template {
		background-color: var(--background-color);
		background-image: none !important;
	}
	.main-container.template .background {
		display: none;
	}
	main {
		z-index: 1;
		flex-grow: 1;
		gap: 0;
		position: relative;
	}

	.background {
		content: ' ';
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		height: 100vh;
		width: 100vw;
		max-width: 100vw;
		transition: opacity 150ms ease-in-out;
	}
	.top-portion {
		content: ' ';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 70vh;
		width: 100vw;
		max-width: 100vw;
		background-image: radial-gradient(circle, pink 1px, rgba(0, 0, 0, 0) 1px);
		background-size: var(--graph-unit) var(--graph-unit);
	}
	.top-portion.animate {
		animation: drift 10000ms infinite linear;
	}
	@keyframes drift {
		from {
			background-position-x: 0px;
			background-position-y: 0px;
		}
		to {
			background-position-x: var(--graph-unit);
			background-position-y: calc(-2 * var(--graph-unit));
		}
	}
	.bottom-portion {
		content: ' ';
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 30vh;
		width: 100vw;
		max-width: 100vw;
	}
	.dark-theme .bottom-portion {
		background-image: linear-gradient(
			to bottom,
			var(--dark-theme-background-color) 0%,
			var(--dark-theme-color) 100%
		);
	}
	.light-theme .bottom-portion {
		background-image: linear-gradient(
			to bottom,
			var(--light-theme-background-color) 0%,
			var(--light-theme-color) 100%
		);
	}
</style>
