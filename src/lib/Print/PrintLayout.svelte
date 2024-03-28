<script lang="ts">
	import type { CardState } from '$lib/Template/types';
	import {
		cards,
		height,
		width,
		color,
		borderColor,
		borderRadius,
		borderWidth,
		backgroundColor,
		topPadding,
		rightPadding,
		bottomPadding,
		leftPadding,
		textElements,
		title,
		unit,
		pageHeight,
		pageWidth
	} from '$lib/store';
	import { derived } from 'svelte/store';

	let uploadedCards: Array<{ [x: string]: string }>;
	let cardState: CardState = {
		unit: 'in',
		borderColor: undefined,
		borderWidth: undefined,
		borderRadius: undefined,
		width: undefined,
		height: undefined,
		backgroundColor: undefined,
		color: undefined,
		textElements: [],
		topPadding: 0,
		rightPadding: 0,
		bottomPadding: 0,
		leftPadding: 0
	};
	let printState = {
		pageHeight: 8.5,
		pageWidth: 11,
		rowsPerPage: 2
	};

	cards.subscribe((value) => (uploadedCards = value));
	borderRadius.subscribe((value) => (cardState.borderRadius = value));
	height.subscribe((value) => (cardState.height = value));
	width.subscribe((value) => (cardState.width = value));
	backgroundColor.subscribe((value) => (cardState.backgroundColor = value));
	color.subscribe((value) => (cardState.color = value));
	textElements.subscribe((value) => (cardState.textElements = value));
	borderColor.subscribe((value) => (cardState.borderColor = value));
	borderWidth.subscribe((value) => (cardState.borderWidth = value));
	topPadding.subscribe((value) => (cardState.topPadding = value));
	rightPadding.subscribe((value) => (cardState.rightPadding = value));
	bottomPadding.subscribe((value) => (cardState.bottomPadding = value));
	leftPadding.subscribe((value) => (cardState.leftPadding = value));
	unit.subscribe((value) => (cardState.unit = value));
	// Page
	pageHeight.subscribe((value) => (printState.pageHeight = value));
	pageWidth.subscribe((value) => (printState.pageWidth = value));

	let rowsPerPage = derived([height, pageHeight], ([$height, $pageHeight]) =>
		Math.floor($pageHeight / $height)
	);

	rowsPerPage.subscribe((value) => (printState.rowsPerPage = value));

	let columnGap = 0.5;
	let rowGap = 0.5;
</script>

<div class="flex row print-container">
	<div
		class="preview"
		style="--column-gap: {columnGap + (cardState.unit || 'in')}; 
            --row-gap: {rowGap + (cardState.unit || 'in')}; 
            --card-width: {(cardState.width || 2.44) + (cardState.unit || 'in')};
            --page-height: {printState.pageHeight + (cardState.unit || 'in')};
            --page-width: {printState.pageWidth + (cardState.unit || 'in')};
            --rows-per-page: {printState.rowsPerPage};"
	>
		{#if uploadedCards}
			{#each uploadedCards as card}
				<div
					class="card-template"
					style="--card-height: {(cardState.height || 3.43) + (cardState.unit || 'in')}; 
                        --card-width: {(cardState.width || 2.44) + (cardState.unit || 'in')}; 
                        --card-border-color: {cardState.borderColor}; 
                        --card-border-width: {(cardState.borderWidth || 0) +
						(cardState.unit || 'in')}; 
                        --card-border-radius: {cardState.borderRadius}%; 
                        --card-background-color: {cardState.backgroundColor}; 
                        --card-top-padding: {(cardState.topPadding || 0) +
						(cardState.unit || 'in')};
                        --card-right-padding: {(cardState.rightPadding || 0) +
						(cardState.unit || 'in')};
                        --card-bottom-padding: {(cardState.bottomPadding || 0) +
						(cardState.unit || 'in')};
                        --card-left-padding: {(cardState.leftPadding || 0) +
						(cardState.unit || 'in')};
                        "
				>
					<div class="overlay" />
					{#each cardState.textElements as textElement}
						<div
							class="text-element-container"
							class:positioned={!!textElement.leftTransform || !!textElement.topTransform}
							style="--color: {textElement.color}; 
                                --font-size: {(textElement.fontSize || 0.22) +
								(cardState.unit || 'in')}; 
                                --transform-left: {(textElement.leftTransform || 0) / 96 +
								(cardState.unit || 'in')};
                                --transform-top: {(textElement.topTransform || 0) / 96 +
								(cardState.unit || 'in')};
                                --font-weight: {textElement.fontWeight};
                                --font-style: {textElement.fontStyle || 'normal'};
                                --text-decoration: {textElement.textDecoration || 'normal'};
                                --top-padding: {textElement.topPadding + (cardState.unit || 'in')};
                                --right-padding: {textElement.rightPadding +
								(cardState.unit || 'in')};
                                --bottom-padding: {textElement.bottomPadding +
								(cardState.unit || 'in')};
                                --left-padding: {textElement.leftPadding * 96}px;
                                "
						>
							<span class="text-element"
								>{card[textElement.title.toLowerCase().split(' ').join('-')]}</span
							>
						</div>
					{/each}
				</div>
			{/each}
		{/if}
	</div>
	<div class="container flex row print-layout">
		<div class="flex column">
			<h3>Print Layout</h3>
			<div class="flex column">
				<label for="column-gap">Column gap</label>
				<input id="column-gap" type="number" bind:value={columnGap} step="0.1" />
			</div>
		</div>
	</div>
</div>

<style>
	.print-container {
		position: relative;
		gap: 0;
	}
	.print-layout {
		position: sticky;
		top: 0;
		right: 0;
		z-index: 1;
		margin-bottom: auto;
		background-color: white;
		filter: drop-shadow(-1px 2px 2px RGBA(0, 0, 0, 0.24));
	}
	.preview {
		max-width: var(--page-width);
		min-width: var(--page-width);
		display: grid;
		grid-template-columns: repeat(
			auto-fill,
			minmax(calc(var(--card-width) + var(--column-gap)), 1fr)
		);
		grid-auto-rows: calc(var(--page-height) / var(--rows-per-page));
		background-image: linear-gradient(
			to bottom,
			transparent calc(var(--page-height) - 1px),
			red var(--page-height)
		);
		background-size: 5px var(--page-height);
		background-repeat: space repeat;
		border: 1px dashed red;
		box-sizing: border-box;
	}
	.card-template {
		margin: auto;
		position: relative;
		height: var(--card-height);
		width: var(--card-width);
		border-radius: var(--card-border-radius);
		background-color: var(--card-background-color);
		transform-origin: top left;
		overflow: hidden;
		padding: var(--card-top-padding) var(--card-right-padding) var(--card-bottom-padding)
			var(--card-left-padding);
		box-sizing: border-box;
		-webkit-print-color-adjust: exact !important;
		print-color-adjust: exact !important;
	}

	.card-template .overlay {
		position: absolute;
		height: 100%;
		width: 100%;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		border: var(--card-border-width) solid var(--card-border-color);
		box-sizing: border-box;
		border-radius: var(--card-border-radius);
	}

	.text-element-container {
		color: var(--color);
		font-size: var(--font-size);
		border: 1px solid transparent;
		cursor: move;
		padding: var(--top-padding) var(--right-padding) var(--bottom-padding) var(--left-padding);
		width: calc(100% - var(--right-padding) - var(--left-padding));
	}
	.text-element-container.positioned {
		position: absolute;
		transform: translate3d(var(--transform-left), var(--transform-top), 0);
	}
	.text-element {
		font-weight: var(--font-weight);
		font-style: var(--font-style, 'normal');
		text-decoration: var(--text-decoration, 'normal');
	}
	@media print {
		.print-layout {
			display: none;
		}
		.preview {
			background: none;
			border: none;
			overflow: visible;
		}
	}
</style>
