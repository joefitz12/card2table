<script lang="ts">
	import type { CardState, PositionalProps } from '../../types';
	import {
		backgroundColor,
		borderColor,
		borderWidth,
		color,
		height,
		textElements,
		title,
		width,
		borderRadius,
		padding
	} from '../../store';
	import { onMount } from 'svelte';

	export let cardState: CardState = {
		title: undefined,
		// unit: undefined,
		padding: { top: 0, right: 0, bottom: 0, left: 0 },
		borderColor: undefined,
		borderWidth: { top: 0, right: 0, bottom: 0, left: 0 },
		borderRadius: { topLeft: 0.15, topRight: 0.15, bottomRight: 0.15, bottomLeft: 0.15 },
		width: undefined,
		height: undefined,
		backgroundColor: undefined,
		color: undefined,
		textElements: []
	};

	title.subscribe((value) => (cardState.title = value));
	// unit.subscribe((value) => (cardState.unit = value));
	height.subscribe((value) => (cardState.height = value));
	width.subscribe((value) => (cardState.width = value));
	backgroundColor.subscribe((value) => (cardState.backgroundColor = value));
	color.subscribe((value) => (cardState.color = value));
	textElements.subscribe((value) => (cardState.textElements = value));
	borderColor.subscribe((value) => (cardState.borderColor = value));
	borderWidth.subscribe((value) => (cardState.borderWidth = value));
	borderRadius.subscribe((value) => (cardState.borderRadius = value));
	padding.subscribe((value) => (cardState.padding = value));

	$: {
		if (cardState.title) {
			title.set(cardState.title);
		}
	}

	function focus(input: HTMLInputElement) {
		input.focus();
	}

	// drag & drop
	let isDragInProgress: boolean;
	let dragId: string;

	let offsetLeft: number;
	let offsetTop: number;

	function handleDragStart(e: DragEvent) {
		e.stopPropagation();

		document.getElementById('drag-preview')?.remove();
		if (!e.dataTransfer || !(e.target instanceof HTMLElement)) {
			return;
		}
		offsetLeft = e.offsetX;
		offsetTop = e.offsetY;
		isDragInProgress = true;
		// WIP create and use separate preview image
		// const dragImage = e.target.cloneNode(true) as HTMLElement;
		// dragImage.setAttribute('id', 'drag-preview');
		// document.body.appendChild(dragImage);

		// e.dataTransfer.setDragImage(dragImage, offsetLeft, offsetTop);

		dragId = (e.target as HTMLElement).id;
		dragId = dragId;
		e.dataTransfer.setData('text/plain', dragId);
	}

	function handleDrop(e: DragEvent) {
		e.stopPropagation();
		if (!(e.target instanceof HTMLElement)) {
			return;
		}

		if (!e.dataTransfer) {
			return;
		}

		isDragInProgress = false;
		const textElementId = e.dataTransfer.getData('text');
		const textElement = cardState.textElements.find((element) => element.id == textElementId);
		if (!textElement) {
			return;
		}

		// @TODO: find replacement for layerX / layerY
		// this is needed to capture offset from card
		// if user drops text element on top of another text element,
		// e.offsetX / e.offsetY references the offset on that text element (not the card)
		// Remove ts-ignore
		const cardOffset = {
			// @ts-ignore
			offsetX: e.target.nodeName === 'SPAN' ? e.layerX || e.offsetX : e.offsetX,
			// @ts-ignore
			offsetY: e.target.nodeName === 'SPAN' ? e.layerY || e.offsetX : e.offsetY
		};

		if (!Math.abs(cardOffset.offsetX - offsetLeft) || !Math.abs(cardOffset.offsetY - offsetTop)) {
			return;
		}

		textElement.leftTransform = cardOffset.offsetX - offsetLeft;
		textElement.topTransform = cardOffset.offsetY - offsetTop;

		dragId = '';

		cardState.textElements = cardState.textElements;
	}

	function handleDragover(e: DragEvent) {
		if (!(e.target instanceof HTMLElement)) {
			return;
		}
		e.preventDefault();
		e.stopPropagation();
		if (!e.dataTransfer) {
			return;
		}
		// Set the dropEffect to move
		e.dataTransfer.dropEffect = 'move';
	}

	// convert to pixels
	let cardContainer: HTMLDivElement;
	let cardHeight: number;
	let cardWidth: number;
	let relativeUnit: number;
	onMount(() => {
		handleSize();
	});

	$: {
		console.log({
			cardHeight,
			cardWidth
		});
	}

	const handleSize = () => {
		console.dir(cardContainer);
		if (!cardContainer) {
			return;
		}
		let maxCardHeight = cardContainer.clientHeight - 2 * 48;
		let maxCardWidth = cardContainer.clientWidth - 2 * 16;

		relativeUnit = Math.floor(maxCardHeight / (cardState.height || 3.43));

		if (relativeUnit * (cardState.width || 2.44) > maxCardWidth) {
			relativeUnit = Math.floor(maxCardWidth / (cardState.width || 2.44));
		}
	};
</script>

<svelte:window on:resize={handleSize} />

<div class="flex column template-container">
	<div class="title">
		<button type="button">&#9776;</button>
		<input id="card-title" type="text" bind:value={cardState.title} use:focus />
	</div>
	<div class="flex card-container" bind:this={cardContainer}>
		<div
			class="card"
			style="--card-height: {(cardState.height || 3.43) * relativeUnit}px; 
				--card-width: {(cardState.width || 2.44) * relativeUnit}px; 
				--card-border-color: {cardState.borderColor}; 
				--card-border-top-width: {(cardState.borderWidth.top || 0) * relativeUnit}px; 
				--card-border-right-width: {(cardState.borderWidth.right || 0) * relativeUnit}px; 
				--card-border-bottom-width: {(cardState.borderWidth.bottom || 0) * relativeUnit}px; 
				--card-border-left-width: {(cardState.borderWidth.left || 0) * relativeUnit}px; 
				--card-border-top-left-radius: {(cardState.borderRadius.topLeft || 0) * relativeUnit}px;  
				--card-border-top-right-radius: {(cardState.borderRadius.topRight || 0) * relativeUnit}px; 
				--card-border-bottom-right-radius: {(cardState.borderRadius.bottomRight || 0) * relativeUnit}px;  
				--card-border-bottom-left-radius: {(cardState.borderRadius.bottomLeft || 0) * relativeUnit}px; 
				--card-background-color: {cardState.backgroundColor}; 
				--card-top-padding: {(cardState.padding.top || 0) * relativeUnit}px;
				--card-right-padding: {(cardState.padding.right || 0) * relativeUnit}px;
				--card-bottom-padding: {(cardState.padding.bottom || 0) * relativeUnit}px;
				--card-left-padding: {(cardState.padding.left || 0) * relativeUnit}px;
				"
			on:drop={handleDrop}
			on:dragover={handleDragover}
		>
			<div class="overlay" />
			{#each cardState.textElements as textElement}
				<div
					class="text-element-container"
					class:positioned={!!textElement.leftTransform || !!textElement.topTransform}
					draggable="true"
					on:dragstart={handleDragStart}
					id={textElement.id}
					style="--color: {textElement.color}; 
						--font-size: {(textElement.fontSize || 0.22) * relativeUnit}px; 
						--transform-left: {textElement.leftTransform || 0}px; 
						--transform-top: {textElement.topTransform || 0}px;
						--font-weight: {textElement.fontWeight};
						--font-style: {textElement.fontStyle || 'normal'};
						--text-decoration: {textElement.textDecoration || 'normal'};
						--padding-top: {(textElement.padding.top || 0) * relativeUnit}px;
						--padding-right: {(textElement.padding.right || 0) * relativeUnit}px;
						--padding-bottom: {(textElement.padding.bottom || 0) * relativeUnit}px;
						--padding-left: {(textElement.padding.left || 0) * relativeUnit}px;
						--margin-top: {typeof textElement.margin.top === 'number'
						? `${(textElement.margin.top || 0) * relativeUnit}px`
						: textElement.margin.top};
						--margin-right: {typeof textElement.margin.right === 'number'
						? `${(textElement.margin.right || 0) * relativeUnit}px`
						: textElement.margin.right};
						--margin-bottom: {typeof textElement.margin.bottom === 'number'
						? `${(textElement.margin.bottom || 0) * relativeUnit}px`
						: textElement.margin.bottom};
						--margin-left: {typeof textElement.margin.left === 'number'
						? `${(textElement.margin.left || 0) * relativeUnit}px`
						: textElement.margin.left};
						--border-top-width: {(textElement.borderWidth.top || 0) * relativeUnit}px;
						--border-right-width: {(textElement.borderWidth.right || 0) * relativeUnit}px;
						--border-bottom-width: {(textElement.borderWidth.bottom || 0) * relativeUnit}px;
						--border-left-width: {(textElement.borderWidth.left || 0) * relativeUnit}px;
						--border-top-left-radius: {(textElement.borderRadius.topLeft || 0) * relativeUnit}px;
						--border-top-right-radius: {(textElement.borderRadius.topRight || 0) * relativeUnit}px; 
						--border-bottom-right-radius: {(textElement.borderRadius.bottomRight || 0) * relativeUnit}px; 
						--border-bottom-left-radius: {(textElement.borderRadius.bottomLeft || 0) * relativeUnit}px;
						"
				>
					<span>&#123;</span><span class="text-element"
						>{textElement.title.toLowerCase().split(' ').join('-')}</span
					><span>&#125;</span>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.template-container {
		--padding: 1rem;
		padding: var(--padding);
		position: sticky;
		top: 3rem;
		height: calc(100% - 2 * var(--padding));
	}
	.title {
		display: flex;
		align-items: center;
		column-gap: 8px;
	}
	.title button {
		border: none;
		background-color: transparent;
		font-size: 1.5rem;
	}
	.title input {
		font-size: 2rem;
		font-weight: 400;
		padding: 0;
		border: none;
		outline: none !important;
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
		padding: var(--card-top-padding) var(--card-right-padding) var(--card-bottom-padding)
			var(--card-left-padding);
		box-sizing: border-box;
	}

	.card .overlay {
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
		pointer-events: none;
	}

	.text-element-container {
		position: relative;
		color: var(--color);
		font-size: var(--font-size);
		cursor: move;
		transition: border-color 75ms ease-in-out;
		padding: var(--padding-top) var(--padding-right) var(--padding-bottom) var(--padding-left);
		margin: var(--margin-top) var(--margin-right) var(--margin-bottom) var(--margin-left);
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
	/* .text-element-container .overlay {
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
		pointer-events: none;
	} */
	.text-element {
		font-weight: var(--font-weight);
		font-style: var(--font-style, 'normal');
		text-decoration: var(--text-decoration, 'normal');
	}

	/* WIP: Hide selected drag element, use custom image */
	/* .text-element.is-being-dragged {
		pointer-events: none;
		opacity: 0;
	} */
</style>
