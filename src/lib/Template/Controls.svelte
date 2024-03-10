<script lang="ts">
	import TextElementControl from './TextElementControl.svelte';
	import {
		unit,
		height,
		width,
		borderRadius,
		backgroundColor,
		color,
		textElements,
		title
	} from './store';
	import type { CardState } from './types';

	export let cardState: Omit<CardState, 'borderRadius'> & { borderRadius?: number } = {
		title: undefined,
		unit: undefined,
		borderRadius: undefined,
		width: undefined,
		height: undefined,
		backgroundColor: undefined,
		color: undefined,
		textElements: []
	};

	export let textElementId = 0;

	title.subscribe((value) => (cardState.title = value));
	unit.subscribe((value) => (cardState.unit = value));
	borderRadius.subscribe((value) => (cardState.borderRadius = parseFloat(value.split('%')[0])));
	height.subscribe((value) => (cardState.height = value));
	width.subscribe((value) => (cardState.width = value));
	backgroundColor.subscribe((value) => (cardState.backgroundColor = value));
	color.subscribe((value) => (cardState.color = value));

	$: {
		if (cardState.title) {
			title.set(cardState.title);
		}
		if (cardState.unit) {
			unit.set(cardState.unit);
		}
		if (cardState.borderRadius) {
			borderRadius.set(`${cardState.borderRadius}%`);
		}
		if (cardState.width) {
			width.set(cardState.width);
		}
		if (cardState.height) {
			height.set(cardState.height);
		}
		if (cardState.backgroundColor) {
			backgroundColor.set(cardState.backgroundColor);
		}
		if (cardState.color) {
			color.set(cardState.color);
		}
		if (cardState.textElements) {
			textElements.set(cardState.textElements);
		}
	}
</script>

<div class="flex column">
	<h3>Customize card</h3>
	<div class="flex column controls">
		<div class="flex row">
			<div class="flex column">
				<label for="card-template-unit">Unit</label>
				<select id="card-template-unit" bind:value={cardState.unit}>
					<option selected>in</option>
					<option>cm</option>
				</select>
			</div>
			<div class="flex column">
				<label for="card-template-border-radius">Border Radius</label>
				<input
					type="number"
					id="card-template-border-radius"
					step="0.01"
					bind:value={cardState.borderRadius}
				/>
			</div>
		</div>
		<div class="flex row">
			<div class="flex column">
				<label for="card-template-width">Width</label>
				<input type="number" id="card-template-width" step="0.01" bind:value={cardState.width} />
			</div>
			<div class="flex column">
				<label for="card-template-height">Height</label>
				<input type="number" id="card-template-height" step="0.01" bind:value={cardState.height} />
			</div>
		</div>
		<div class="flex row">
			<div class="flex column">
				<label for="card-template-background-color">Background Color</label>
				<input
					type="color"
					id="card-template-background-color"
					bind:value={cardState.backgroundColor}
				/>
			</div>
			<div class="flex column">
				<label for="card-template-color">Text Color</label>
				<input type="color" id="card-template-color" bind:value={cardState.color} />
			</div>
		</div>
		<button
			type="button"
			on:click={() => {
				cardState.textElements.push({
					id: textElementId,
					title: `Text Element ${textElementId}`,
					color: cardState.color
				});
				cardState.textElements = cardState.textElements;
				textElementId = textElementId + 1;
			}}>New text element</button
		>
		{#each cardState.textElements as textElement, i}
			{@const handleClick = () => {
				cardState.textElements.splice(
					cardState.textElements.findIndex(
						(cardStateTextElement) => textElement.id === cardStateTextElement.id
					),
					1
				);
				cardState.textElements = cardState.textElements;
			}}
			<TextElementControl
				id={textElement.id}
				title={textElement.title}
				fontSize={textElement.fontSize}
				color={textElement.color}
				{handleClick}
			/>
		{/each}
	</div>
</div>

<style>
	.controls {
		gap: 0.5rem;
	}
</style>
