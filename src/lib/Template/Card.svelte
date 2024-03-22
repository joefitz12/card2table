<script lang="ts">
	import type { CardState } from './types';
	import {
		backgroundColor,
		borderColor,
		borderRadius,
		borderWidth,
		color,
		height,
		textElements,
		title,
		width,
		topPadding,
		rightPadding,
		bottomPadding,
		leftPadding
	} from './store';

	export let scale: Number;

	export let cardState: CardState = {
		title: undefined,
		// unit: undefined,
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

	title.subscribe((value) => (cardState.title = value));
	// unit.subscribe((value) => (cardState.unit = value));
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

	$: {
		if (cardState.title) {
			title.set(cardState.title);
		}
	}

	let isTitleEditable = false;

	function setTitleIsNotEditable(e: Event) {
		if (e.target && 'id' in e.target && e.target.id !== 'card-title') {
			isTitleEditable = false;
			document.removeEventListener('click', setTitleIsNotEditable);
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

		// need to find replacement for layer
		const cardOffset = {
			offsetX: e.target.nodeName === 'SPAN' ? e.layerX : e.offsetX,
			offsetY: e.target.nodeName === 'SPAN' ? e.layerY : e.offsetY
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
</script>

<div class="template-container">
	<div class="title">
		<input id="card-title" type="text" bind:value={cardState.title} use:focus />
	</div>
	<div
		id="card-template"
		style="--height: {(cardState.height || 3.43) * 96}px; 
			--width: {(cardState.width || 2.44) * 96}px; 
			--border-color: {cardState.borderColor}; 
			--border-width: {(cardState.borderWidth || 0) * 96}px; 
			--border-radius: {cardState.borderRadius}%; 
			--background-color: {cardState.backgroundColor}; 
			--scale: {scale};
			--top-padding: {(cardState.topPadding || 0) * 96}px;
			--right-padding: {(cardState.rightPadding || 0) * 96}px;
			--bottom-padding: {(cardState.bottomPadding || 0) * 96}px;
			--left-padding: {(cardState.leftPadding || 0) * 96}px;
			"
		on:drop={handleDrop}
		on:dragover={handleDragover}
	>
		<div class="overlay" />
		{#each cardState.textElements as textElement}
			<div
				class="text-element-container"
				draggable="true"
				on:dragstart={handleDragStart}
				id={textElement.id}
				style="--color: {textElement.color}; 
					--font-size: {(textElement.fontSize || 0.22) * 96}px; 
					--transform-left: {textElement.leftTransform || 0}px; 
					--transform-top: {textElement.topTransform || 0}px;
					--font-weight: {textElement.fontWeight};
					--font-style: {textElement.fontStyle || 'normal'};
					--text-decoration: {textElement.textDecoration || 'normal'};
					--top-padding: {textElement.topPadding * 96}px;
					--right-padding: {textElement.rightPadding * 96}px;
					--bottom-padding: {textElement.bottomPadding * 96}px;
					--left-padding: {textElement.leftPadding * 96}px;
					"
			>
				<span>&#123;</span><span class="text-element"
					>{textElement.title.toLowerCase().split(' ').join('-')}</span
				><span>&#125;</span>
			</div>
		{/each}
	</div>
</div>

<style>
	.template-container {
		padding: 1rem;
	}
	.title input {
		font-size: 2rem;
		font-weight: 400;
		margin: 0 0 16px 0;
		padding: 0;
	}
	.title input {
		border: none;
		outline: none !important;
	}
	#card-template {
		margin: 0 auto;
		position: relative;
		height: var(--height);
		width: var(--width);
		border-radius: var(--border-radius);
		background-color: var(--background-color);
		transform: scale(var(--scale));
		transform-origin: top left;
		/* filter: drop-shadow(0.35rem 0.35rem 0.4rem rgba(0, 0, 0, 0.5)); */
		--shadow-color: 0deg 0% 60%;
		--box-shadow: 0px 0.4px 0.6px hsl(var(--shadow-color) / 0.1),
			0px 1.9px 2.7px -0.2px hsl(var(--shadow-color) / 0.24),
			0px 4px 5.6px -0.4px hsl(var(--shadow-color) / 0.39),
			0.1px 8.6px 12.1px -0.6px hsl(var(--shadow-color) / 0.53);
		box-shadow: var(--box-shadow);
		overflow: hidden;
		padding: var(--top-padding) var(--right-padding) var(--bottom-padding) var(--left-padding);
		box-sizing: border-box;
	}

	#card-template .overlay {
		position: absolute;
		height: 100%;
		width: 100%;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		border: var(--border-width) solid var(--border-color);
		box-sizing: border-box;
		border-radius: var(--border-radius);
	}

	.text-element-container {
		position: absolute;
		transform: translate3d(var(--transform-left), var(--transform-top), 0);
		color: var(--color);
		font-size: var(--font-size);
		/* font-weight: var(--font-weight);
		font-style: var(--font-style, 'normal');
		text-decoration: var(--text-decoration, 'normal'); */
		border: 1px solid transparent;
		cursor: move;
		/* */
		/* display: flex; */
		transition: border-color 75ms ease-in-out;
		padding: var(--top-padding) var(--right-padding) var(--bottom-padding) var(--left-padding);
	}
	.text-element-container:hover {
		border: 1px dashed var(--color);
	}
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
