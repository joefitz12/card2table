<script lang="ts">
	import TextElementControl from './TextElementControl.svelte';
	import {
		unit,
		height,
		width,
		borderRadius,
		backgroundColor,
		color,
		borderColor,
		textElements,
		title,
		borderWidth,
		leftPadding,
		topPadding,
		rightPadding,
		bottomPadding
	} from './store';
	import type { CardState } from './types';

	export let cardState: CardState = {
		title: undefined,
		unit: undefined,
		borderRadius: undefined,
		width: undefined,
		height: undefined,
		backgroundColor: undefined,
		color: undefined,
		borderColor: undefined,
		textElements: [],
		topPadding: undefined,
		rightPadding: undefined,
		bottomPadding: undefined,
		leftPadding: undefined
	};

	export let textElementId = 0;

	title.subscribe((value) => (cardState.title = value));
	unit.subscribe((value) => (cardState.unit = value));
	height.subscribe((value) => (cardState.height = value));
	width.subscribe((value) => (cardState.width = value));
	backgroundColor.subscribe((value) => (cardState.backgroundColor = value));
	color.subscribe((value) => (cardState.color = value));
	borderColor.subscribe((value) => (cardState.borderColor = value));
	borderRadius.subscribe((value) => (cardState.borderRadius = value));
	borderWidth.subscribe((value) => (cardState.borderWidth = value));
	topPadding.subscribe((value) => (cardState.topPadding = value));
	rightPadding.subscribe((value) => (cardState.rightPadding = value));
	bottomPadding.subscribe((value) => (cardState.bottomPadding = value));
	leftPadding.subscribe((value) => (cardState.leftPadding = value));

	$: {
		if (cardState.title) {
			title.set(cardState.title);
		}
		if (cardState.unit) {
			unit.set(cardState.unit);
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
		if (cardState.borderColor) {
			borderColor.set(cardState.borderColor);
		}
		if (typeof cardState.borderRadius === 'number') {
			borderRadius.set(cardState.borderRadius);
		}
		if (cardState.borderWidth) {
			borderWidth.set(cardState.borderWidth);
		}
		if (cardState.color) {
			color.set(cardState.color);
		}
		if (cardState.textElements) {
			textElements.set(cardState.textElements);
		}
		if (cardState.topPadding) {
			topPadding.set(cardState.topPadding);
		}
		if (cardState.rightPadding) {
			rightPadding.set(cardState.rightPadding);
		}
		if (cardState.bottomPadding) {
			bottomPadding.set(cardState.bottomPadding);
		}
		if (cardState.leftPadding) {
			leftPadding.set(cardState.leftPadding);
		}
	}
</script>

<div class="flex controls">
	<div class="flex column">
		<div class="flex row header">
			<h3>Dimensions</h3>
		</div>
		<div class="flex column container">
			<div class="flex row">
				<div class="flex column">
					<label for="card-template-unit">Unit</label>
					<select id="card-template-unit" bind:value={cardState.unit}>
						<option selected>in</option>
						<option>cm</option>
					</select>
				</div>
			</div>
			<div class="flex row">
				<div class="flex column">
					<label for="card-template-width">Width</label>
					<input type="number" id="card-template-width" step="0.01" bind:value={cardState.width} />
				</div>
				<div class="flex column">
					<label for="card-template-height">Height</label>
					<input
						type="number"
						id="card-template-height"
						step="0.01"
						bind:value={cardState.height}
					/>
				</div>
			</div>
			<fieldset class="flex column padding">
				<legend>Padding</legend>
				<div class="flex row">
					<div class="flex column">
						<label for={`card-template-padding-top`}>Top</label>
						<input
							type="number"
							id={`card-template-padding-top`}
							step="0.01"
							bind:value={cardState.topPadding}
						/>
					</div>
					<div class="flex column">
						<label for={`card-template-padding-right`}>Right</label>
						<input
							type="number"
							id={`card-template-padding-right`}
							step="0.01"
							bind:value={cardState.rightPadding}
						/>
					</div>
					<div class="flex column">
						<label for={`card-template-padding-bottom`}>Bottom</label>
						<input
							type="number"
							id={`card-template-padding-bottom`}
							step="0.01"
							bind:value={cardState.bottomPadding}
						/>
					</div>
					<div class="flex column">
						<label for={`card-template-padding-left`}>Left</label>
						<input
							type="number"
							id={`card-template-padding-left`}
							step="0.01"
							bind:value={cardState.leftPadding}
						/>
					</div>
				</div>
			</fieldset>
		</div>
	</div>
	<div class="flex column">
		<div class="flex row header">
			<input type="color" id={`border-color`} bind:value={cardState.borderColor} />
			<h3>Border</h3>
		</div>
		<div class="flex column container">
			<div class="flex column">
				<label for="card-template-border-width">Width</label>
				<input
					type="number"
					id="card-template-border-width"
					step="0.01"
					bind:value={cardState.borderWidth}
				/>
			</div>
			<div class="flex column">
				<label for="card-template-border-radius">Radius</label>
				<input
					type="number"
					id="card-template-border-radius"
					step="0.01"
					bind:value={cardState.borderRadius}
				/>
			</div>
		</div>
	</div>
	<div class="flex column">
		<div class="flex row header">
			<h3>Colors</h3>
		</div>
		<div class="flex column container">
			<div class="flex row">
				<div class="flex column">
					<label for="card-template-background-color">Background</label>
					<input
						type="color"
						id="card-template-background-color"
						bind:value={cardState.backgroundColor}
					/>
				</div>
				<div class="flex column">
					<label for="card-template-color">Text</label>
					<input type="color" id="card-template-color" bind:value={cardState.color} />
				</div>
			</div>
		</div>
	</div>
	<div class="flex column">
		<div class="flex row header">
			<h3>Text Elements</h3>
			<button
				type="button"
				class="create"
				on:click={() => {
					cardState.textElements.push({
						id: textElementId.toString(),
						title: `Text Element ${textElementId}`,
						color: cardState.color || '#000000',
						fontSize: 0.22,
						fontWeight: '400',
						fontStyle: '',
						textDecoration: '',
						topPadding: 0,
						rightPadding: 0,
						bottomPadding: 0,
						leftPadding: 0
					});
					cardState.textElements = cardState.textElements;
					textElementId = textElementId + 1;
				}}>+</button
			>
		</div>
		{#each cardState.textElements as textElement, i}
			{@const handleRemove = () => {
				cardState.textElements.splice(
					cardState.textElements.findIndex(
						(cardStateTextElement) => textElement.id === cardStateTextElement.id
					),
					1
				);
				cardState.textElements = cardState.textElements;
			}}
			<TextElementControl {...textElement} {handleRemove} />
		{/each}
	</div>
</div>

<style>
	.controls {
		padding: 1rem;
		gap: 0.5rem;
		flex-wrap: wrap;
		animation: 60ms ease both fade-in, 300ms ease both slide-from-right;
	}
	.header input[type='color'] {
		border: none;
		background: none;
		width: 1.5rem;
		height: 1.5rem;
		cursor: pointer;
	}

	/* .container .column {
	} */
	h3 {
		margin: 0;
	}
	label {
		font-size: 1rem;
	}

	button.create {
		background-color: transparent;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1rem;
		height: 1.5rem;
		width: 1.5rem;
	}
	button.create:hover {
		background-color: whitesmoke;
	}
</style>
