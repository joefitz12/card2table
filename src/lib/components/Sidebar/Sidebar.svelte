<script lang="ts">
	import { activeView, sidebarExpanded, state } from '$lib/store';
	import { PrintSidebar, TemplateSidebar } from './components';
</script>

<div
	class="flex column sidebar"
	class:collapsed={!$sidebarExpanded}
	class:expanded={$sidebarExpanded}
>
	<button on:click={() => sidebarExpanded.update(($sidebarExpanded) => !$sidebarExpanded)}
		>{$sidebarExpanded ? '>' : '<'}</button
	>

	<div
		class="flex column collapsible"
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

	.choose-editor {
		gap: 0.5rem;
	}

	.choose-editor button {
		flex-grow: 1;
	}

	.collapsible {
		overflow: visible;
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

	.collapsed .collapsible {
		animation: 300ms ease both collapse, 300ms ease both fade-out;
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

	.expanded .collapsible {
		animation: 300ms ease both expand, 300ms ease both fade-in;
	}
</style>
