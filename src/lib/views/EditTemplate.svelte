<script lang="ts">
	import { browser } from '$app/environment';
	import { Drawer, PrintLayout, Sidebar, TemplateEditor } from '$lib/components';
	import { activeView } from '$lib/store';
</script>

<div class="flex column editor">
	<div class="main flex">
		{#if $activeView === 'template'}
			<TemplateEditor />
		{/if}
		{#if $activeView === 'print'}
			<PrintLayout />
		{/if}
	</div>
	{#if browser && window.innerWidth > 600}
		<div class="sidebar">
			<Sidebar />
		</div>
	{/if}
	<div class="drawer"><Drawer /></div>
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
	@media screen and (min-width: 680px) {
		.drawer {
			display: none;
		}
		.sidebar {
			display: block;
		}
	}
</style>
