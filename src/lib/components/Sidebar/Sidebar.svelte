<script lang="ts">
	import { activeView, sidebarExpanded, state } from '$lib/store';
	import { PrintSidebar, TemplateSidebar } from './components';
</script>

<div class="sidebar flex">
	<button
		type="button"
		class="options"
		class:active={$sidebarExpanded}
		on:click={() => sidebarExpanded.update(($sidebarExpanded) => !$sidebarExpanded)}>&#9881;</button
	>
	<div
		class="inner-sidebar flex column collapsible"
		class:collapsed={!$sidebarExpanded}
		class:expanded={$sidebarExpanded}
	>
		<div class="choose-editor flex">
			<button type="button" on:click={() => activeView.set('print')}>print</button>
			<button type="button" on:click={() => activeView.set('template')}>edit template</button>
		</div>
		{#if $activeView === 'template'}
			<TemplateSidebar />
		{/if}
		{#if $activeView === 'print'}
			<PrintSidebar />
		{/if}
	</div>
</div>

<style>
	.sidebar {
		justify-content: flex-end;
		z-index: 0;
		position: absolute;
		right: 0;
		top: 0;
		max-height: calc(100vh - 48px - 34px);
		gap: 0.5rem;
		animation: 60ms ease both fade-in, 300ms ease both slide-from-right;
	}
	button.options {
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
		position: absolute;
		margin-right: 0.5rem;
		box-sizing: border-box;
		/* margin: 0.5rem 1rem; */
	}
	button.options:hover {
		background-color: var(--color);
		color: var(--background-color);
		border-color: var(--color);
		transition: 0.2s;
	}
	button.options.active {
		border-color: var(--color);
		transition: 0.2s;
	}
	.inner-sidebar {
		top: 2.5rem;
		padding: 1rem;
		margin-right: 0.5rem;
		border-radius: 0.25rem;
		border: 1px solid lightgray;
		background-color: var(--transparent-background-color);
		gap: 0.5rem;
		position: absolute;
		width: 350px;
		transform-origin: top right;
	}
	.choose-editor {
		gap: 0.5rem;
	}
	.choose-editor button {
		flex-grow: 1;
		white-space: nowrap;
	}
	.collapsible {
		overflow: visible;
	}
	@keyframes minimize {
		from {
			transform: scale(1);
		}
		to {
			transform: scale(0);
		}
	}
	@keyframes collapse {
		from {
			max-width: 350px;
			min-width: 350px;
		}

		to {
			max-width: 0px;
			min-width: 0px;
		}
	}
	.collapsed {
		animation: 300ms ease both minimize, 300ms ease both fade-out;
	}
	@keyframes expand {
		from {
			max-width: 0px;
			min-width: 0px;
		}

		to {
			max-width: 350px;
			min-width: 350px;
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
	.expanded {
		animation: 300ms ease both maximize, 300ms ease both fade-in;
	}
</style>
