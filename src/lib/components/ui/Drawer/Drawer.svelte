<script lang="ts">
	import { activeElement, activeSidebarMenu } from '$lib/store';
	import { TemplateDrawer } from './components';
	import { fade } from 'svelte/transition';

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
	<div
		in:fade={{ duration: 120 }}
		class="flex column controls"
		class:container={$activeSidebarMenu}
	>
		<!-- {#if $activeView === 'template'} -->
		<TemplateDrawer />
		<!-- {/if}
		{#if $activeView === 'print'}
			<PrintSidebar />
		{/if} -->
	</div>
	<div class="flex row">
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
	.controls {
		--gutter: 0.5rem;
		width: calc(100vw - 2 * var(--gutter));
		position: absolute;
		left: var(--gutter);
		right: var(--gutter);
		bottom: calc(100% + 0.5rem);
		max-height: calc(85vh);
		overflow: scroll;
		box-sizing: border-box;
		background-color: var(--transparent-background-color);
	}
	button {
		height: 3rem;
		flex-grow: 1;
	}
</style>
