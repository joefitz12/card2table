<script lang="ts">
	import { activeElement, activeSidebarMenu, template } from '$lib/store';
	import { TemplateDrawer } from './components';
	import { fade, slide } from 'svelte/transition';

	function toggleActiveMenu(menu: 'card' | 'color' | 'text' | 'image') {
		if ($activeSidebarMenu === menu) {
			activeSidebarMenu.set(null);
		} else {
			activeSidebarMenu.set(menu);
		}
		activeElement.set(null);
	}
</script>

<div class="column min-content drawer">
	{#if ($activeSidebarMenu || $activeElement) && $template}
		<div class="controls-container" in:fade|global={{ duration: 60 }}>
			<div class="flex column min-content controls" in:slide|global={{ axis: 'y', duration: 120 }}>
				<TemplateDrawer />
			</div>
		</div>
	{/if}
	{#if $template}
		<div class="flex row menu">
			<button on:click={() => toggleActiveMenu('card')}>card</button>
			<button on:click={() => toggleActiveMenu('color')}>color</button>
			<button on:click={() => toggleActiveMenu('text')}>text</button>
			<button on:click={() => toggleActiveMenu('image')}>image</button>
		</div>
	{/if}
</div>

<style lang="scss">
	.drawer {
		position: relative;
	}
	.menu {
		position: relative;
		z-index: 1;
		padding: 0.5rem;
	}
	.controls-container {
		--gutter: 0.5rem;
		position: absolute;
		left: var(--gutter);
		right: var(--gutter);
		bottom: 100%;
		max-height: 85vh;
		height: fit-content;
		overflow: scroll;
	}
	.controls {
		width: calc(100vw - 2 * var(--gutter));
		height: fit-content;
		box-sizing: border-box;
		border-radius: 4px;
		transform-origin: bottom;
	}
	button {
		height: 3rem;
		flex-grow: 1;
		border-radius: 8px;
	}
</style>
