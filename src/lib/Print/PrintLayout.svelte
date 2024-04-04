<script lang="ts">
	import type { CardState } from '$lib/types';
	import {
		cards,
		height,
		width,
		color,
		borderColor,
		borderRadius,
		borderWidth,
		backgroundColor,
		textElements,
		title,
		unit,
		pageHeight,
		pageWidth,
		columnGap,
		padding
	} from '$lib/store';
	import { derived } from 'svelte/store';

	let uploadedCards: Array<{ [x: string]: string }>;
	let cardState: CardState = {
		unit: 'in',
		borderColor: undefined,
		padding: { top: 0, right: 0, bottom: 0, left: 0 },
		borderWidth: { top: 0, right: 0, bottom: 0, left: 0 },
		borderRadius: { topLeft: 5, topRight: 5, bottomRight: 5, bottomLeft: 5 },
		width: undefined,
		height: undefined,
		backgroundColor: undefined,
		color: undefined,
		textElements: []
	};
	let printState = {
		pageHeight: 8.5,
		pageWidth: 11,
		rowsPerPage: 2,
		columnGap: 0.5
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
	padding.subscribe((value) => (cardState.padding = value));
	unit.subscribe((value) => (cardState.unit = value));
	// Page
	pageHeight.subscribe((value) => (printState.pageHeight = value));
	pageWidth.subscribe((value) => (printState.pageWidth = value));
	columnGap.subscribe((value) => (printState.columnGap = value));

	let rowsPerPage = derived([height, pageHeight], ([$height, $pageHeight]) =>
		Math.floor($pageHeight / $height)
	);

	rowsPerPage.subscribe((value) => (printState.rowsPerPage = value));

	// let columnGap = 0.5;
	let rowGap = 0.5;
</script>

<div class="flex row print-container">
	<div
		class="preview"
		style="--column-gap: {printState.columnGap + (cardState.unit || 'in')}; 
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
						--card-border-top-width: {(cardState.borderWidth.top || 0) + (cardState.unit || 'in')};
						--card-border-right-width: {(cardState.borderWidth.right || 0) + (cardState.unit || 'in')};
						--card-border-bottom-width: {(cardState.borderWidth.bottom || 0) + (cardState.unit || 'in')};
						--card-border-left-width: {(cardState.borderWidth.left || 0) + (cardState.unit || 'in')};
                        --card-border-top-left-radius: {(cardState.borderRadius.topLeft || 0) +
						(cardState.unit || 'in')}; 
						--card-border-top-right-radius: {(cardState.borderRadius.topRight || 0) +
						(cardState.unit || 'in')}; 
						--card-border-bottom-right-radius: {(cardState.borderRadius.bottomRight || 0) +
						(cardState.unit || 'in')};
						--card-border-bottom-left-radius: {(cardState.borderRadius.bottomLeft || 0) +
						(cardState.unit || 'in')};
                        --card-background-color: {cardState.backgroundColor}; 
                        --card-top-padding: {(cardState.padding.top || 0) +
						(cardState.unit || 'in')};
                        --card-right-padding: {(cardState.padding.right || 0) +
						(cardState.unit || 'in')};
                        --card-bottom-padding: {(cardState.padding.bottom || 0) +
						(cardState.unit || 'in')};
                        --card-left-padding: {(cardState.padding.left || 0) +
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
                                --top-padding: {(textElement.padding.top || 0) +
								(cardState.unit || 'in')};
                                --right-padding: {(textElement.padding.right || 0) +
								(cardState.unit || 'in')};
                                --bottom-padding: {(textElement.padding.bottom || 0) +
								(cardState.unit || 'in')};
                                --left-padding: {(textElement.padding.left || 0) +
								(cardState.unit || 'in')};
                                --border-top-width: {(textElement.borderWidth.top || 0) +
								(cardState.unit || 'in')};
								--border-right-width: {(textElement.borderWidth.right || 0) + (cardState.unit || 'in')};
								--border-bottom-width: {(textElement.borderWidth.bottom || 0) + (cardState.unit || 'in')};
								--border-left-width: {(textElement.borderWidth.left || 0) + (cardState.unit || 'in')};
								--border-top-left-radius: {(textElement.borderRadius.topLeft || 0) + (cardState.unit || 'in')}; 
								--border-top-right-radius: {(textElement.borderRadius.topRight || 0) + (cardState.unit || 'in')}; 
								--border-bottom-right-radius: {(textElement.borderRadius.bottomRight || 0) +
								(cardState.unit || 'in')};
								--border-bottom-left-radius: {(textElement.borderRadius.bottomLeft || 0) +
								(cardState.unit || 'in')};
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
				<label for="page-width">Page width</label>
				<input id="page-width" type="number" bind:value={printState.pageWidth} step="0.1" />
			</div>
			<div class="flex column">
				<label for="page-height">Page height</label>
				<input id="page-height" type="number" bind:value={printState.pageHeight} step="0.1" />
			</div>
			<div class="flex column">
				<label for="column-gap">Column gap</label>
				<input id="column-gap" type="number" bind:value={printState.columnGap} step="0.1" />
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
		border-top-left-radius: var(--card-border-top-left-radius);
		border-top-right-radius: var(--card-border-top-right-radius);
		border-bottom-right-radius: var(--card-border-bottom-right-radius);
		border-bottom-left-radius: var(--card-border-bottom-left-radius);
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
		border-style: solid;
		border-color: var(--card-border-color);
		border-top-width: var(--card-border-top-width);
		border-right-width: var(--card-border-right-width);
		border-bottom-width: var(--card-border-bottom-width);
		border-left-width: var(--card-border-left-width);
		box-sizing: border-box;
		border-top-left-radius: var(--card-border-top-left-radius);
		border-top-right-radius: var(--card-border-top-right-radius);
		border-bottom-right-radius: var(--card-border-bottom-right-radius);
		border-bottom-left-radius: var(--card-border-bottom-left-radius);
	}

	.text-element-container {
		color: var(--color);
		font-size: var(--font-size);
		cursor: move;
		padding: var(--top-padding) var(--right-padding) var(--bottom-padding) var(--left-padding);
		width: var(--card-width) - calc(var(--card-left-padding) + var(--card-right-padding));
		box-sizing: border-box;
		border: solid var(--color);
		border-top-width: var(--border-top-width);
		border-right-width: var(--border-right-width);
		border-bottom-width: var(--border-bottom-width);
		border-left-width: var(--border-left-width);
		border-top-left-radius: var(--border-top-left-radius);
		border-top-right-radius: var(--border-top-right-radius);
		border-bottom-right-radius: var(--border-bottom-right-radius);
		border-bottom-left-radius: var(--border-bottom-left-radius);
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
