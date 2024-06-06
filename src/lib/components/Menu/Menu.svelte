<script lang="ts">
	import { goto } from '$app/navigation';
	import { cardTemplate } from '$lib/api/cardTemplate';
	import { cardTemplates, menuExpanded } from '$lib/store';

	function addNewCard() {
		cardTemplate
			.add()
			.then((id) => goto(`/template/${id}`))
			.then(() => cardTemplate.getAll())
			.then(($cardTemplates) => cardTemplates.set($cardTemplates))
			.catch((error) => console.error(error));
	}

	function deleteCard(id: number) {
		cardTemplate
			.delete({ id })
			.then(() => cardTemplate.getAll())
			.then(($cardTemplates) => cardTemplates.set($cardTemplates))
			.catch((error) => console.error(error));
	}
</script>

<div
	class="overlay"
	class:expanded={$menuExpanded}
	on:click={() => menuExpanded.update(($menuExpanded) => !$menuExpanded)}
	on:keypress={() => null}
/>
<div class="menu flex column" class:expanded={$menuExpanded}>
	<div class="flex row align-center">
		<h2>Templates</h2>
		<button
			aria-label="create new card template"
			title="create new card template"
			class="create"
			on:click={() => addNewCard()}>+</button
		>
	</div>
	<ol class="flex column">
		{#if $cardTemplates}
			{#each $cardTemplates as template}
				<li class="template flex align-center">
					<a aria-label={`Edit ${template.title}`} href={`/template/${template.id}`}
						>{template.title}</a
					>
					<button
						type="button"
						on:click={() => deleteCard(parseInt(template.id.toString()))}
						aria-label={`Remove ${template.title}`}
						class="delete">&#10005;</button
					>
				</li>
			{/each}
		{/if}
	</ol>
</div>

<style>
	.overlay {
		width: 100%;
		height: calc(var(--app-max-height) - 48px);
		max-height: calc(var(--app-max-height) - 48px);
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		pointer-events: none;
	}
	.overlay.expanded {
		z-index: 3;
		pointer-events: all;
	}
	.menu {
		view-transition-name: menu;
		position: absolute;
		top: 0;
		left: 0;
		height: calc(var(--app-max-height) - 48px);
		max-height: calc(var(--app-max-height) - 48px);
		width: 300px;
		padding: 1rem;
		gap: 0.5rem;
		transition: transform 60ms ease-in-out, opacity 60ms ease-in-out;
		background-color: var(--transparent-background-color);
		z-index: 4;
		row-gap: 0.5rem;
		transform: translateX(-100%);
		opacity: 0;
	}

	.menu.expanded {
		transform: translateX(0);
		opacity: 1;
	}
	.menu ol {
		row-gap: 0.25rem;
	}
	.menu li {
		width: 100%;

		justify-content: space-between;
		--column-gap: 8px;
		column-gap: var(--column-gap);
	}
	.menu li a {
		flex-grow: 1;
		font-size: 1.25rem;
		line-height: 1.25rem;
		max-width: calc(100% - 24px - var(--column-gap));
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
