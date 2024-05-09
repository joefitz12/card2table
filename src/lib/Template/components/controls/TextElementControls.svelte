<script lang="ts">
	import '../../../../styles/controls.css';
	import { dbTextElements, state } from '$lib/store';
	import TextElementControl from './TextElementControl.svelte';
	import { textElement } from '$lib/api/textElement';

	$: templateId = parseInt($state.template?.id);
</script>

<div class="flex column">
	<div class="flex row header">
		<h3>Text Elements</h3>
		<button type="button" class="create" on:click={() => textElement.add({ templateId })}>+</button>
		<!-- <button
			type="button"
			class="create"
			on:click={() => textElement.getAllByTemplateId({ templateId })}>...</button
		> -->
	</div>
	{#if $dbTextElements}
		{#each Array.from($dbTextElements) as [key, value], i}
			{#key key}
				<TextElementControl id={key} />
			{/key}
		{/each}
	{/if}
</div>
