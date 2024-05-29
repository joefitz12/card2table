<script lang="ts">
	import '../styles/app.css';
	import { onNavigate } from '$app/navigation';
	import { Background, Header, Menu, Tabs } from '$lib/components';
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

<div class="main-container flex column" data-theme={$darkTheme ? 'dark' : 'light'}>
	{#if !$page.url.pathname.includes('template')}
		<Background />
	{/if}
	<Header />
	<main class="flex column">
		<Menu />
		<Tabs />
		<slot />
	</main>
</div>

<style lang="scss">
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
		overflow: clip;

		&[data-theme='dark'] {
			--color: var(--dark-theme-color);
			--background-color: var(--dark-theme-background-color);
			--transparent-background-color: var(--dark-theme-transparent-background-color);
		}
	}
	main {
		z-index: 1;
		flex-grow: 1;
		gap: 0;
		position: relative;
	}
</style>
