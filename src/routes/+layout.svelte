<script lang="ts">
	import '../styles/app.css';
	import { onNavigate } from '$app/navigation';
	import { Header, Menu, Tabs } from '$lib/components';
	import { darkTheme } from '$lib/store';

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

<div class="main-container flex column" data-theme={$darkTheme ? 'dark' : 'default'}>
	<Header />
	<main class="flex column">
		<Menu />
		<Tabs />
		<slot />
	</main>
</div>

<style>
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
	.main-container:after {
		content: ' ';
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		height: 100vh;
		width: 100vw;
		max-width: 100vw;
		background-image: linear-gradient(
				to top,
				var(--light-theme-background-color) 0 30%,
				var(--dark-theme-background-color) 30% 100%
			),
			radial-gradient(circle, pink 1px, rgba(0, 0, 0, 0) 1px);
		opacity: 0;
		transition: opacity 150ms ease-in-out;
	}
	.main-container:before {
		content: ' ';
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		height: 100vh;
		width: 100vw;
		max-width: 100vw;
		background-image: linear-gradient(
				to top,
				var(--dark-theme-background-color) 0 30%,
				var(--light-theme-background-color) 30% 100%
			),
			radial-gradient(circle, pink 1px, rgba(0, 0, 0, 0) 1px);
		opacity: 1;
		transition: opacity 150ms ease-in-out;
	}
	.main-container[data-theme='dark'] {
		--color: var(--dark-theme-color);
		--background-color: var(--dark-theme-background-color);
		--transparent-background-color: var(--dark-theme-transparent-background-color);
	}
	.main-container[data-theme='dark']:after {
		opacity: 1;
	}
	.main-container[data-theme='dark']:before {
		opacity: 0;
	}
	main {
		z-index: 1;
		flex-grow: 1;
		gap: 0;
		position: relative;
	}
</style>
