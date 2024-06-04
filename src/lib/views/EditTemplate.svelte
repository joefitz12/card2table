<script lang="ts">
	import { browser } from '$app/environment';
	import { Drawer, PrintLayout, Sidebar, TemplateEditor } from '$lib/components';
	import { activeView } from '$lib/store';

	let isDesktop = browser && window.innerWidth > 640;
</script>

<svelte:window on:resize={() => (isDesktop = browser && window.innerWidth > 640)} />
<div class="flex column editor">
	<div class="main flex">
		{#if $activeView === 'template'}
			<TemplateEditor />
		{/if}
		{#if $activeView === 'print'}
			<PrintLayout />
		{/if}
	</div>
	{#if isDesktop}
		<div class="sidebar">
			<Sidebar />
		</div>
	{/if}
	{#if !isDesktop}
		<div class="drawer"><Drawer /></div>
	{/if}
</div>

<style>
	.editor {
		flex-grow: 1;
		min-height: 0;
	}
	.main {
		flex-grow: 1;
		position: relative;
		min-width: 0;
	}
	.sidebar {
		display: none;
	}
	@media screen and (min-width: 640px) {
		.drawer {
			display: none;
		}
		.sidebar {
			display: block;
		}
	}
</style>
