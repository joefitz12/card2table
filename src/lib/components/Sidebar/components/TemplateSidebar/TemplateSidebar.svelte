<script lang="ts">
	import { sidebarExpanded, activeSidebarMenu } from '$lib/store';
	import { CardControls, ColorControls, TextElementControls } from './components';
</script>

<div class="flex column fade-in">
	<div class="flex row">
		<button on:click={() => activeSidebarMenu.set('card')}>card</button>
		<button on:click={() => activeSidebarMenu.set('color')}>color</button>
		<button on:click={() => activeSidebarMenu.set('text')}>text</button>
		<button on:click={() => activeSidebarMenu.set('image')}>image</button>
	</div>
	<div class="collapsible" class:collapsed={!$sidebarExpanded} class:expanded={$sidebarExpanded}>
		<div class="controls-container {$activeSidebarMenu}">
			{#if $activeSidebarMenu === 'card'}
				<CardControls />
			{/if}
			{#if $activeSidebarMenu === 'color'}
				<ColorControls />
			{/if}
			{#if $activeSidebarMenu === 'text'}
				<TextElementControls />
			{/if}
		</div>
	</div>
</div>

<style>
	.fade-in {
		animation: 300ms ease both fade-in;
	}
	button {
		flex-grow: 1;
	}
</style>
