<script lang="ts">
	import { activeElement, activeSidebarMenu } from '$lib/store';
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

<div class="column drawer">
	{#if $activeSidebarMenu || $activeElement}
		<div class="controls-container" in:fade|local={{ duration: 120 }}>
			<div class="flex column controls" in:slide|local={{ axis: 'y', duration: 120 }}>
				<!-- {#if $activeView === 'template'} -->

				<TemplateDrawer />
				<!-- {/if}
			{#if $activeView === 'print'}
				<PrintSidebar />
			{/if} -->
			</div>
		</div>
	{/if}
	<div class="flex row menu">
		<button on:click={() => toggleActiveMenu('card')}>card</button>
		<button on:click={() => toggleActiveMenu('color')}>color</button>
		<button on:click={() => toggleActiveMenu('text')}>text</button>
		<button on:click={() => toggleActiveMenu('image')}>image</button>
	</div>
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
		max-height: calc(85vh);
		overflow: scroll;
	}
	.controls {
		width: calc(100vw - 2 * var(--gutter));
		box-sizing: border-box;
		border-radius: 4px;
	}
	button {
		height: 3rem;
		flex-grow: 1;
		border-radius: 8px;
	}
</style>
