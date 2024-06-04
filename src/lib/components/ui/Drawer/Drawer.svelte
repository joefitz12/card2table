<script lang="ts">
	import { activeElement, activeSidebarMenu } from '$lib/store';
	import { TemplateDrawer } from './components';

	function setActiveMenu(menu: 'card' | 'color' | 'text' | 'image') {
		activeElement.set(null);
		activeSidebarMenu.set(menu);
	}
</script>

<div class="column drawer">
	<div class="flex column controls fade-in">
		<!-- {#if $activeView === 'template'} -->
		<TemplateDrawer />
		<!-- {/if}
		{#if $activeView === 'print'}
			<PrintSidebar />
		{/if} -->
	</div>
	<div class="flex row">
		<button on:click={() => setActiveMenu('card')}>card</button>
		<button on:click={() => setActiveMenu('color')}>color</button>
		<button on:click={() => setActiveMenu('text')}>text</button>
		<button on:click={() => setActiveMenu('image')}>image</button>
	</div>
</div>

<style lang="scss">
	.drawer {
		position: relative;
	}
	.controls {
		position: absolute;
		bottom: calc(100% + 0.5rem);
		max-height: calc(85vh);
		width: 100vw;
		overflow: scroll;
	}
	button {
		height: 3rem;
		flex-grow: 1;
	}
</style>
