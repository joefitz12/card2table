<script lang="ts">
	import '../../../styles/new.css';
	import { afterUpdate } from 'svelte';
	import { UICardTemplate } from '$lib/utils/uiCardTemplate';
	import { CardTemplate } from '$lib/models/CardTemplate';
	import { cardTemplates, menuExpanded } from '$lib/store';
	import { cardTemplate } from '$lib/api/cardTemplate';
	import { goto } from '$app/navigation';

	// convert to pixels
	let cardContainer: HTMLDivElement;
	let relativeUnit: number;

	function setRelativeUnit(cardContainer: HTMLDivElement) {
		if (!cardContainer) {
			return;
		}
		let maxCardHeight = cardContainer.clientHeight - 2 * 48;
		let maxCardWidth = cardContainer.clientWidth - 2 * 16;

		if (relativeUnit * 2.44 > maxCardWidth) {
			relativeUnit = Math.floor(maxCardWidth / 2.44);
		} else {
			relativeUnit = Math.floor(maxCardHeight / 3.43);
		}
	}

	afterUpdate(() => {
		setRelativeUnit(cardContainer);
	});

	$: {
		setRelativeUnit(cardContainer);
	}

	const card = new UICardTemplate({ ...new CardTemplate(), id: '' });

	function addNewCard() {
		cardTemplate
			.add()
			.then((id) => goto(`/template/${id}`))
			.then(() => cardTemplate.getAll())
			.then(($cardTemplates) => cardTemplates.set($cardTemplates))
			.catch((error) => console.error(error));
	}
</script>

<svelte:window on:resize={() => setRelativeUnit(cardContainer)} />

{#if card}
	<div class="flex column template-container">
		<div class="flex card-container" bind:this={cardContainer}>
			<div
				class="card"
				style="--card-height: {card.height * relativeUnit}px; 
				--card-width: {card.width * relativeUnit}px; 
				--card-border-color: {card.border.color}; 
				--card-border-top-width: {(card.border.width.top || 0) * relativeUnit}px; 
				--card-border-right-width: {(card.border.width.right || 0) * relativeUnit}px; 
				--card-border-bottom-width: {(card.border.width.bottom || 0) * relativeUnit}px; 
				--card-border-left-width: {(card.border.width.left || 0) * relativeUnit}px; 
				--card-border-top-left-radius: {(card.border.radius.topLeft || 0) * relativeUnit}px;  
				--card-border-top-right-radius: {(card.border.radius.topRight || 0) * relativeUnit}px; 
				--card-border-bottom-right-radius: {(card.border.radius.bottomRight || 0) * relativeUnit}px;  
				--card-border-bottom-left-radius: {(card.border.radius.bottomLeft || 0) * relativeUnit}px; 
				--card-background-color: {card.backgroundColor}; 
				--card-top-padding: {(card.padding.top || 0) * relativeUnit}px;
				--card-right-padding: {(card.padding.right || 0) * relativeUnit}px;
				--card-bottom-padding: {(card.padding.bottom || 0) * card.relativeUnit}px;
				--card-left-padding: {(card.padding.left || 0) * relativeUnit}px;
                --base-font-size: {0.22 * relativeUnit}px;
				"
			>
				<div class="flex title">
					<span data-content="card">card</span>
					<span data-content="2">2</span>
					<span data-content="table">table</span>
				</div>
				<span class="type">a Svelte application</span>
				<div class="button-container flex">
					<button type="button" on:click={addNewCard}>New card template</button>
					<button type="button" on:click={() => menuExpanded.set(true)}>Open card template</button>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.template-container {
		--padding: 1rem;
		height: calc(100% - 2 * var(--padding) - 48px - 34px);
		padding-top: 53px;
	}

	.card-container {
		flex-grow: 1;
	}

	.card {
		margin: auto auto 3rem;
		position: relative;
		display: flex;
		flex-direction: column;
		height: var(--card-height);
		width: var(--card-width);
		border-top-left-radius: var(--card-border-top-left-radius);
		border-top-right-radius: var(--card-border-top-right-radius);
		border-bottom-right-radius: var(--card-border-bottom-right-radius);
		border-bottom-left-radius: var(--card-border-bottom-left-radius);
		background-color: var(--card-background-color);
		transform-origin: top left;
		--shadow-color: 0deg 0% 60%;
		--box-shadow: 0px 0.4px 0.6px hsl(var(--shadow-color) / 0.1),
			0px 1.9px 2.7px -0.2px hsl(var(--shadow-color) / 0.24),
			0px 4px 5.6px -0.4px hsl(var(--shadow-color) / 0.39),
			0.1px 8.6px 12.1px -0.6px hsl(var(--shadow-color) / 0.53);
		box-shadow: var(--box-shadow);
		overflow: hidden;
		padding: calc(var(--base-font-size) / 4) calc(var(--base-font-size) / 2);
		box-sizing: border-box;
	}

	.title {
		gap: 0;
		font-size: calc(var(--base-font-size) * 1.5);
		color: pink;
	}

	.type {
		font-style: italic;
		font-size: calc(var(--base-font-size) / 2);
	}

	.button-container {
		padding-top: calc(var(--card-height) / 12);
		justify-content: space-around;
	}

	button {
		height: calc(var(--card-height) / 4);
		width: calc(var(--card-height) / 4);
		background: transparent;
		border-radius: 0.5rem;
		border: 5px solid pink;
		font-size: calc(var(--base-font-size) / 2);
		transition: transform 150ms ease-in-out;
	}

	button:hover {
		transform: translate3d(0, -5px, 0);
	}
</style>
