<script lang="ts">
	import { state } from '$lib/store';
	import CardControls from './controls/CardControls.svelte';
	import ColorControls from './controls/ColorControls.svelte';
	import TextElementControls from './controls/TextElementControls.svelte';

	let collapsed: boolean;
	let activeMenu: 'card' | 'color' | 'text' | 'image' | 'print' = 'text';
	$: sidebarClass = collapsed ? 'collapsed' : 'expanded';
	const updateSidebar = (sidebarUpdates: { collapsed?: boolean; activeMenu?: typeof activeMenu }) =>
		state.update(
			(value) =>
				(value = {
					...value,
					sidebar: {
						...value.sidebar,
						...sidebarUpdates,
					},
				})
		);
	state.subscribe((value) => {
		value.sidebar.collapsed === true ? (collapsed = true) : (collapsed = false);
		activeMenu = value.sidebar.activeMenu;
	});
</script>

<div class="flex column sidebar {sidebarClass}">
	<button on:click={() => updateSidebar({ collapsed: !collapsed })}>{collapsed ? '<' : '>'}</button>
	<div class="flex row collapsible">
		<button on:click={() => updateSidebar({ activeMenu: 'card' })}>card</button>
		<button on:click={() => updateSidebar({ activeMenu: 'color' })}>color</button>
		<button on:click={() => updateSidebar({ activeMenu: 'text' })}>text</button>
		<button on:click={() => updateSidebar({ activeMenu: 'image' })}>image</button>
	</div>
	<div class="collapsible {sidebarClass}">
		<div class="controls-container {activeMenu}">
			{#if activeMenu === 'card'}
				<CardControls />
			{/if}
			{#if activeMenu === 'color'}
				<ColorControls />
			{/if}
			{#if activeMenu === 'text'}
				<TextElementControls />
			{/if}
		</div>
	</div>
</div>

<style>
	.sidebar {
		padding: 1rem;
		gap: 0.5rem;
		animation: 60ms ease both fade-in, 300ms ease both slide-from-right;
		position: relative;
		background-color: rgba(255, 255, 255, 0.5);
	}
	.sidebar::after {
		content: ' ';
		position: absolute;
		height: 100%;
		right: 0;
		width: 1rem;
	}
	.collapsible {
		overflow: visible;
	}
	.controls-container {
		min-width: 300px;
	}
	@keyframes collapse {
		from {
			max-width: 300px;
		}
		to {
			max-width: 0px;
		}
	}
	.collapsed .collapsible {
		animation: 300ms ease both collapse, 300ms ease both fade-out;
	}
	@keyframes expand {
		from {
			max-width: 0px;
		}
		to {
			max-width: 300px;
		}
	}
	.expanded .collapsible {
		animation: 300ms ease both expand, 300ms ease both fade-in;
	}
</style>
