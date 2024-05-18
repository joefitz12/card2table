<script lang="ts">
	import { PrintLayout, Sidebar, TemplateEditor } from '$lib/components';
	import { activeView } from '$lib/store';
</script>

<div class="flex editor">
	<div class="main flex">
		{#if $activeView === 'template'}
			<TemplateEditor />
		{/if}
		{#if $activeView === 'print'}
			<PrintLayout />
		{/if}
	</div>
	<div class="sidebar">
		<Sidebar />
	</div>
</div>

<style>
	.editor {
		flex-grow: 1;
		position: relative;
		min-height: 0;
	}
	.main {
		flex-grow: 1;
		position: relative;
		min-width: 0;
	}
	.sidebar {
		border-radius: 4px;
		overflow: hidden;
		z-index: 0;
		position: absolute;
		right: 0;
	}
	@media screen and (min-width: 680px) {
		.editor {
			display: flex;
		}
	}
</style>
