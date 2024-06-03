<script lang="ts">
	import { afterUpdate } from 'svelte';
	import { UICardTemplate } from '$lib/utils/uiCardTemplate';
	import { CardTemplate } from '$lib/models/CardTemplate';
	import { activeView, cardTemplates, darkTheme, menuExpanded } from '$lib/store';
	import { cardTemplate } from '$lib/api/cardTemplate';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';

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
			.then((id) => {
				activeView.set('template');
				goto(`/template/${id}`);
			})
			.then(() => cardTemplate.getAll())
			.then(($cardTemplates) => cardTemplates.set($cardTemplates))
			.catch((error) => console.error(error));
	}

	// Buttons
	let createButton: HTMLButtonElement;
	const createButtonOffset: { x: string | number; y: string | number } = {
		x: '50%',
		y: '50%',
	};
	let openButton: HTMLButtonElement;
	const openButtonOffset: { x: string | number; y: string | number } = {
		x: '50%',
		y: '50%',
	};
</script>

<svelte:window on:resize={() => setRelativeUnit(cardContainer)} />

{#if card}
	<div class="flex column template-container">
		<div class="flex card-container" bind:this={cardContainer}>
			<div
				class="outer-card"
				style="--card-border-top-left-radius: {(card.border.radius.topLeft || 0) *
					relativeUnit}px;  
					--card-border-top-right-radius: {(card.border.radius.topRight || 0) * relativeUnit}px; 
					--card-border-bottom-right-radius: {(card.border.radius.bottomRight || 0) * relativeUnit}px;  
					--card-border-bottom-left-radius: {(card.border.radius.bottomLeft || 0) * relativeUnit}px; "
			>
				<div
					class="card"
					style="--card-height: {card.height * relativeUnit}px; 
					--card-width: {card.width * relativeUnit}px; 
					--card-border-color: {card.border.color}; 
					--card-border-top-width: {(card.border.width.top || 5) * relativeUnit}px; 
					--card-border-right-width: {(card.border.width.right || 5) * relativeUnit}px; 
					--card-border-bottom-width: {(card.border.width.bottom || 5) * relativeUnit}px; 
					--card-border-left-width: {(card.border.width.left || 5) * relativeUnit}px; 
					
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
						<button
							type="button"
							bind:this={createButton}
							on:click={addNewCard}
							on:mouseover={(e) => {
								createButtonOffset.x = `${e.pageX - createButton.getBoundingClientRect().left}px`;
								createButtonOffset.y = `${e.pageY - createButton.getBoundingClientRect().top}px`;
							}}
							on:mousemove={(e) => {
								createButtonOffset.x = `${e.pageX - createButton.getBoundingClientRect().left}px`;
								createButtonOffset.y = `${e.pageY - createButton.getBoundingClientRect().top}px`;
							}}
							on:focus={(e) => console.log(e)}
							style="--x: {createButtonOffset.x}; --y: {createButtonOffset.y};"
							>New card template</button
						>
						<button
							type="button"
							bind:this={openButton}
							on:click={() => menuExpanded.set(true)}
							on:mouseover={(e) => {
								openButtonOffset.x = `${e.pageX - openButton.getBoundingClientRect().left}px`;
								openButtonOffset.y = `${e.pageY - openButton.getBoundingClientRect().top}px`;
							}}
							on:mousemove={(e) => {
								openButtonOffset.x = `${e.pageX - openButton.getBoundingClientRect().left}px`;
								openButtonOffset.y = `${e.pageY - openButton.getBoundingClientRect().top}px`;
							}}
							on:focus={(e) => console.log(e)}
							style="--x: {openButtonOffset.x}; --y: {openButtonOffset.y};"
							>Open card template</button
						>
					</div>
				</div>
				<div class="shadow" data-theme={$darkTheme ? 'dark' : 'light'} />
			</div>
		</div>
	</div>
{/if}

<style lang="scss">
	.template-container {
		height: 100%;
	}

	.card-container {
		flex-grow: 1;
	}

	.outer-card {
		margin: auto auto 3rem;
		position: relative;
		border-top-left-radius: var(--card-border-top-left-radius);
		border-top-right-radius: var(--card-border-top-right-radius);
		border-bottom-right-radius: var(--card-border-bottom-right-radius);
		border-bottom-left-radius: var(--card-border-bottom-left-radius);
	}

	.card {
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
		overflow: hidden;
		padding: calc(var(--base-font-size) / 4) calc(var(--base-font-size) / 2);
		box-sizing: border-box;
		z-index: 3;
	}

	.shadow {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		border-radius: inherit;
		background-color: #18206f;
		background-image: linear-gradient(to right, pink 1px, transparent 2px),
			linear-gradient(to bottom, pink 2px, transparent 2px);
		/* background-image: radial-gradient(circle, pink 1px, rgba(0, 0, 0, 0) 1px); */
		background-size: 10% 10%;
		transform: rotate3d(1, 0, 0, 78deg) skew(8deg);
		transform-origin: bottom;
		transition: transform 0.4s, opacity 0.4s;
		opacity: 0.8;
		z-index: 2;
	}

	.shadow[data-theme='light'] {
		transform: rotate3d(1, 0, 0, 78deg) skew(-16deg);
		opacity: 0.5;
	}

	.title {
		gap: 0;
		font-size: calc(var(--base-font-size) * 1.5);
		color: pink;
	}

	.type {
		font-style: italic;
		font-size: calc(var(--base-font-size) / 2);
		color: var(--color);
	}

	.button-container {
		padding-top: calc(var(--card-height) / 12);
		justify-content: space-around;
	}

	@keyframes pulse {
		from {
			--pulse: -50%;
		}
		to {
			--pulse: 150%;
		}
	}

	button {
		--pulse: -50%;
		--x: 50%;
		--y: 50%;
		height: calc(var(--card-height) / 4);
		width: calc(var(--card-height) / 4);
		background-color: var(--card-background-color);
		background-image: radial-gradient(
				circle at var(--x) var(--y),
				var(--card-background-color) 0%,
				var(--card-background-color) max(var(--pulse) - 50%, 0%),
				transparent max(var(--pulse), 0%),
				var(--card-background-color) calc(var(--pulse) + 50%),
				var(--card-background-color) 100%
			),
			linear-gradient(to right, lightgreen 2qpx, transparent 2px),
			linear-gradient(to bottom, lightgreen 1px, transparent 2px);
		/* Angled linear gradient */
		// background-image: linear-gradient(
		// 		115deg,
		// 		var(--card-background-color) 0%,
		// 		var(--card-background-color) max(var(--pulse) - 30%, 0%),
		// 		transparent max(var(--pulse), 0%),
		// 		var(--card-background-color) calc(var(--pulse) + 30%),
		// 		var(--card-background-color) 100%
		// 	),
		// 	linear-gradient(to right, pink 1px, transparent 2px),
		// 	linear-gradient(to bottom, pink 2px, transparent 2px);
		background-size: cover, 10% 10%, 10% 10%;
		border-radius: 0.5rem;
		border: 5px solid pink;
		font-size: calc(var(--base-font-size) / 2);

		&:hover {
			animation: pulse 2000ms infinite ease-out;
		}
	}

	@media screen and (min-width: 600px) {
		.outer-card {
			margin: 3rem auto auto;
		}
	}
</style>
