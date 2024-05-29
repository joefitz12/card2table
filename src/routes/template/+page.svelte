<script lang="ts">
	import '../../styles/list.css';
	import { goto } from '$app/navigation';
	import { cardTemplates } from '$lib/store';
	import { cardTemplate } from '$lib/api';

	function addNewCard() {
		cardTemplate
			.add()
			.then((id) => goto(`/template/${id}`))
			.catch((error) => console.error(error));
	}

	function deleteCard(id: number) {
		cardTemplate
			.delete({ id })
			.then(() => {
				return cardTemplate.getAll();
			})
			.then(($cardTemplates) => cardTemplates.set($cardTemplates));
	}
</script>

<header>
	<h1>Templates</h1>
	<button
		aria-label="create new card template"
		title="create new card template"
		on:click={() => addNewCard()}>+</button
	>
</header>
<div class="flex column">
	{#if $cardTemplates}
		{#each $cardTemplates as template}
			<div class="flex">
				<a aria-label={`Edit ${template.title}`} href={`/template/${template.id}`}
					>{template.title}</a
				>
				<button
					type="button"
					on:click={() => deleteCard(parseInt(template.id.toString()))}
					aria-label={`Remove ${template.title}`}
					class="delete">&#10005;</button
				>
			</div>
		{/each}
	{/if}
</div>
