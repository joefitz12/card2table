<script lang="ts">
	import '../styles/app.css';
	import { onNavigate } from '$app/navigation';
	import { Background, Header, Menu, Tabs } from '$lib/components';
	import { darkTheme } from '$lib/store';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	let maxHeight: number;

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

	onMount(() => {
		maxHeight = window.innerHeight;
	});

	if (browser) {
		CSS.registerProperty({
			name: '--pulse',
			syntax: '<percentage>',
			inherits: false,
			initialValue: '0%',
		});
	}
</script>

<svelte:window on:resize={() => (maxHeight = window.innerHeight)} />

{#if browser}
	<div
		class="main-container flex column"
		data-theme={$darkTheme ? 'dark' : 'light'}
		style="--window-height: {maxHeight}"
	>
		{#if !$page.url.pathname.includes('template')}
			<Background />
		{/if}
		<Header />
		<main class="flex column">
			<Menu />
			<div class="tabs">
				<Tabs />
			</div>
			<slot />
		</main>
	</div>
{/if}

<style lang="scss">
	:root {
		--graph-unit: 65px;
	}
	.main-container {
		--app-max-height: calc(var(--window-height) * 1px);
		gap: 0;
		height: var(--app-max-height);
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
	.tabs {
		flex-basis: 0;
		grid-template-rows: 0fr;
		overflow: hidden;
	}
	@media screen and (min-width: 640px) {
		.tabs {
			flex-basis: auto;
		}
	}
</style>
