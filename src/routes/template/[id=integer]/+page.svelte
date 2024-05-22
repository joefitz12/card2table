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
	<Sidebar />
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
	@media screen and (min-width: 680px) {
		.editor {
			display: flex;
		}
	}
</style>
