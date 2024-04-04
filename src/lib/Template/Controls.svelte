<script lang="ts">
	import PapaParse from 'papaparse';
	import TextElementControl from './TextElementControl.svelte';
	import {
		unit,
		height,
		width,
		backgroundColor,
		color,
		borderColor,
		borderWidth,
		textElements,
		title,
		cards,
		textElementTemplateId,
		borderRadius,
		padding
	} from '../store';
	import type { CardState, PositionalProps } from '../types';
	import { TextElement } from '$lib/utils/textElement';

	let cardState: CardState = {
		title: undefined,
		unit: undefined,
		borderRadius: { topLeft: 5, topRight: 5, bottomRight: 5, bottomLeft: 5 },
		borderWidth: { top: 0, right: 0, bottom: 0, left: 0 },
		padding: { top: 0, right: 0, bottom: 0, left: 0 },
		width: undefined,
		height: undefined,
		backgroundColor: undefined,
		color: undefined,
		borderColor: undefined,
		textElements: []
	};

	let currentId: number;

	title.subscribe((value) => (cardState.title = value));
	unit.subscribe((value) => (cardState.unit = value));
	height.subscribe((value) => (cardState.height = value));
	width.subscribe((value) => (cardState.width = value));
	backgroundColor.subscribe((value) => (cardState.backgroundColor = value));
	color.subscribe((value) => (cardState.color = value));
	borderColor.subscribe((value) => (cardState.borderColor = value));
	borderWidth.subscribe((value) => (cardState.borderWidth = value));
	borderRadius.subscribe((value) => (cardState.borderRadius = value));
	textElements.subscribe((value) => (cardState.textElements = value));
	textElementTemplateId.subscribe((value) => (currentId = value));
	padding.subscribe((value) => (cardState.padding = value));

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
		if (cardState.borderRadius) {
			borderRadius.set(cardState.borderRadius);
		}
		if (cardState.color) {
			color.set(cardState.color);
		}
		if (cardState.textElements) {
			textElements.set(cardState.textElements);
		}
		if (cardState.borderWidth) {
			borderWidth.set(cardState.borderWidth);
		}
		if (cardState.padding) {
			padding.set(cardState.padding);
		}
		// if (cardState.borderWidthTop) {
		// 	borderWidthTop.set(cardState.borderWidthTop);
		// }
		// if (cardState.borderWidthRight) {
		// 	borderWidthRight.set(cardState.borderWidthRight);
		// }
		// if (cardState.borderWidthBottom) {
		// 	borderWidthBottom.set(cardState.borderWidthBottom);
		// }
		// if (cardState.borderWidthLeft) {
		// 	borderWidthLeft.set(cardState.borderWidthLeft);
		// }
	}

	const handleFileUpload = (e: Event) => {
		const input = e.target as HTMLInputElement;
		const file = input.files ? input.files[0] : null;
		if (!file) {
			return;
		}

		PapaParse.parse(file, {
			header: true,
			complete: (results) => {
				cards.set(results.data as { [x: string]: string }[]);
			}
		});
	};
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
							bind:value={cardState.padding.top}
						/>
					</div>
					<div class="flex column">
						<label for={`card-template-padding-right`}>Right</label>
						<input
							type="number"
							id={`card-template-padding-right`}
							step="0.01"
							bind:value={cardState.padding.right}
						/>
					</div>
					<div class="flex column">
						<label for={`card-template-padding-bottom`}>Bottom</label>
						<input
							type="number"
							id={`card-template-padding-bottom`}
							step="0.01"
							bind:value={cardState.padding.bottom}
						/>
					</div>
					<div class="flex column">
						<label for={`card-template-padding-left`}>Left</label>
						<input
							type="number"
							id={`card-template-padding-left`}
							step="0.01"
							bind:value={cardState.padding.left}
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
			<fieldset class="flex column">
				<legend>Width</legend>
				<div class="flex row">
					<div class="flex column">
						<label for={`card-template-border-width-top`}>Top</label>
						<input
							type="number"
							id={`card-template-border-width-top`}
							step="0.01"
							bind:value={cardState.borderWidth.top}
						/>
					</div>
					<div class="flex column">
						<label for={`card-template-border-width-right`}>Right</label>
						<input
							type="number"
							id={`card-template-border-width-right`}
							step="0.01"
							bind:value={cardState.borderWidth.right}
						/>
					</div>
					<div class="flex column">
						<label for={`card-template-border-width-bottom`}>Bottom</label>
						<input
							type="number"
							id={`card-template-border-width-bottom`}
							step="0.01"
							bind:value={cardState.borderWidth.bottom}
						/>
					</div>
					<div class="flex column">
						<label for={`card-template-border-width-left`}>Left</label>
						<input
							type="number"
							id={`card-template-border-width-left`}
							step="0.01"
							bind:value={cardState.borderWidth.left}
						/>
					</div>
				</div>
			</fieldset>
			<fieldset class="flex column">
				<legend>Radius</legend>
				<div class="flex row">
					<div class="flex column">
						<div class="flex column">
							<label for={`card-template-border-radius-top`}>Top Left</label>
							<input
								type="number"
								id={`card-template-border-radius-top`}
								step="0.01"
								bind:value={cardState.borderRadius.topLeft}
							/>
						</div>
						<div class="flex column">
							<label for={`card-template-border-radius-left`}>Bottom Left</label>
							<input
								type="number"
								id={`card-template-border-radius-left`}
								step="0.01"
								bind:value={cardState.borderRadius.bottomLeft}
							/>
						</div>
					</div>
					<div class="flex column">
						<div class="flex column">
							<label for={`card-template-border-radius-right`}>Top Right</label>
							<input
								type="number"
								id={`card-template-border-radius-right`}
								step="0.01"
								bind:value={cardState.borderRadius.topRight}
							/>
						</div>
						<div class="flex column">
							<label for={`card-template-border-radius-bottom`}>Bottom Right</label>
							<input
								type="number"
								id={`card-template-border-radius-bottom`}
								step="0.01"
								bind:value={cardState.borderRadius.bottomRight}
							/>
						</div>
					</div>
				</div>
			</fieldset>
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
					cardState.textElements.push(
						new TextElement({
							id: currentId.toString(),
							color: cardState.color,
							borderColor: cardState.borderColor
						})
						// 	{
						// 	id: currentId.toString(),
						// 	title: `Text Element ${currentId}`,
						// 	color: cardState.color || '#000000',
						// 	fontSize: 0.22,
						// 	fontWeight: '400',
						// 	fontStyle: '',
						// 	textDecoration: '',
						// 	topPadding: 0,
						// 	rightPadding: 0,
						// 	bottomPadding: 0,
						// 	leftPadding: 0,
						// 	borderWidth: { top: 0, right: 0, bottom: 0, left: 0 },
						// 	borderColor: cardState.borderColor || '#000000'
						// }
					);
					cardState.textElements = cardState.textElements;
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
			<TextElementControl id={textElement.id} {handleRemove} />
		{/each}
	</div>
</div>

<style>
	.controls {
		padding: 1rem;
		gap: 0.5rem;
		/* flex-wrap: wrap; */
		flex-direction: column;
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

	fieldset input {
		max-width: 3rem;
	}
</style>
