<script lang="ts">
	import { dbTemplates } from '$lib/store';
	import '../../styles/list.css';
	import { onMount } from 'svelte';
	import { cardTemplate } from '$lib/api/cardTemplate';

	onMount(() => {
		cardTemplate.getAll();
	});
</script>

<header>
	<h1>Templates</h1>
	<button
		aria-label="create new card template"
		title="create new card template"
		on:click={() => cardTemplate.add()}>+</button
	>
</header>
<div class="flex column">
	{#if $dbTemplates}
		{#each [...($dbTemplates.entries() || [])] as [id, template]}
			<a aria-label={`Edit ${template.title}`} href={`/template/${id}`}>{template.title}</a>
		{/each}
	{/if}
</div>
