<script lang="ts">
	import { dbTemplates } from '$lib/store';
	import '../../styles/list.css';
	import { cardTemplate } from '$lib/api/cardTemplate';
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
			<div class="flex">
				<a aria-label={`Edit ${template.title}`} href={`/template/${id}`}>{template.title}</a>
				<button
					type="button"
					on:click={() => cardTemplate.delete({ id })}
					aria-label={`Remove ${template.title}`}
					class="delete">&#10005;</button
				>
			</div>
		{/each}
	{/if}
</div>
