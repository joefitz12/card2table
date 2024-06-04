<script lang="ts">
	import { activeSidebarMenu, activeView, sidebarExpanded } from '$lib/store';
	import { PrintSidebar, TemplateSidebar } from './components';

	let sidebar: HTMLDivElement;
</script>

<div class="sidebar flex column" bind:this={sidebar}>
	<button
		type="button"
		class="options"
		class:active={$sidebarExpanded}
		on:click={() => sidebarExpanded.update(($sidebarExpanded) => !$sidebarExpanded)}>&#9881;</button
	>
	<div
		class="inner-sidebar flex column"
		class:collapsed={!$sidebarExpanded}
		class:expanded={$sidebarExpanded}
	>
		<div
			class="choose-editor flex column"
			class:add-secondary-header={$activeSidebarMenu === 'text'}
		>
			<div class="flex row">
				<button type="button" on:click={() => activeView.set('print')}>print</button>
				<button type="button" on:click={() => activeView.set('template')}>edit template</button>
			</div>
			{#if $activeView === 'template'}
				<div class="flex row">
					<button on:click={() => activeSidebarMenu.set('card')}>card</button>
					<button on:click={() => activeSidebarMenu.set('color')}>color</button>
					<button on:click={() => activeSidebarMenu.set('text')}>text</button>
					<button on:click={() => activeSidebarMenu.set('image')}>image</button>
				</div>
			{/if}
		</div>
		<div class="flex column controls fade-in">
			{#if $activeView === 'template'}
				<TemplateSidebar />
			{/if}
			{#if $activeView === 'print'}
				<PrintSidebar />
			{/if}
		</div>
	</div>
</div>

<style lang="scss">
	.sidebar {
		align-items: flex-end;
		justify-content: flex-end;
		z-index: 0;
		position: absolute;
		right: 0.5rem;
		top: 0;
		max-height: calc(100vh - 48px);
		gap: 0.5rem;
		animation: 60ms ease both fade-in;
	}
	button.options {
		flex-shrink: 0;
		font-size: 2rem;
		font-weight: 400;
		height: 2rem;
		width: 2rem;
		background-color: transparent;
		border: 1px solid transparent;
		border-radius: 4px;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		overflow: hidden;

		&.active {
			border-color: lightgray;
			transition: 0.2s;
		}
	}
	.inner-sidebar {
		padding: 0 1rem 1rem;
		border-radius: 0.25rem;
		border: 1px solid lightgray;
		background-color: var(--transparent-background-color);
		gap: 0rem;
		transform-origin: 95% 0%;
		width: min(375px, calc(100vw - 1rem));
		box-sizing: border-box;
		max-height: 100%;
		overflow-y: scroll;
		scrollbar-width: thin;
	}
	.choose-editor {
		gap: 0.5rem;
		min-height: unset;
		position: sticky;
		top: 0;
		background-image: linear-gradient(
			to top,
			transparent 0,
			var(--background-color) 0.25rem,
			var(--background-color) 100%
		);
		z-index: 1;
		padding: 1rem 0 0.5rem;

		button {
			flex-grow: 1;
			white-space: nowrap;
		}

		&.add-secondary-header {
			background: var(--background-color);
		}
	}
	@keyframes minimize {
		from {
			transform: scale(1);
		}
		to {
			transform: scale(0);
		}
	}
	@keyframes maximize {
		from {
			transform: scale(0);
		}
		to {
			transform: scale(1);
		}
	}
	.collapsed {
		animation: 150ms ease both minimize, 175ms ease both fade-out;
		pointer-events: none;
	}
	.expanded {
		animation: 150ms ease both maximize, 175ms ease both fade-in;
	}
	.fade-in {
		animation: 300ms ease both fade-in;
	}
	@media screen and (min-width: 600px) {
		button.options:hover {
			background-color: var(--color);
			color: var(--background-color);
			border-color: var(--color);
			transition: 0.2s;
		}
	}
	@media print {
		.sidebar {
			display: none;
		}
	}
</style>
