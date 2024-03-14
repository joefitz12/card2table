<script lang="ts">
	import type { CardState } from './types';
	import {
		backgroundColor,
		borderRadius,
		color,
		height,
		textElements,
		title,
		unit,
		width
	} from './store';

	export let scale: Number;

	export let cardState: Omit<CardState, 'borderRadius'> & { borderRadius?: string } = {
		title: undefined,
		unit: undefined,
		borderRadius: undefined,
		width: undefined,
		height: undefined,
		backgroundColor: undefined,
		color: undefined,
		textElements: []
	};

	title.subscribe((value) => (cardState.title = value));
	// unit.subscribe((value) => (cardState.unit = value));
	borderRadius.subscribe((value) => (cardState.borderRadius = value));
	height.subscribe((value) => (cardState.height = value));
	width.subscribe((value) => (cardState.width = value));
	backgroundColor.subscribe((value) => (cardState.backgroundColor = value));
	color.subscribe((value) => (cardState.color = value));
	textElements.subscribe((value) => (cardState.textElements = value));

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
		if (!e.dataTransfer) {
			return;
		}

		offsetLeft = e.offsetX;
		offsetTop = e.offsetY;
		isDragInProgress = true;
		dragId = (e.target as HTMLElement).id;

		e.dataTransfer.setData('text/plain', dragId);
		(e.target as HTMLElement).classList.add('hide');
	}

	function handleDrop(e: DragEvent) {
		if (!e.dataTransfer) {
			return;
		}

		isDragInProgress = false;
		const textElementId = e.dataTransfer.getData('text');
		const textElement = cardState.textElements.find((element) => element.id == textElementId);

		if (!Math.abs(e.offsetX - offsetLeft) || !Math.abs(e.offsetY - offsetTop)) {
			return;
		}
		textElement.leftTransform = e.offsetX - offsetLeft;
		textElement.topTransform = e.offsetY - offsetTop;

		cardState.textElements = cardState.textElements;

		(e.target as HTMLElement).classList.remove('hide');
	}

	function handleDragover(e: DragEvent) {
		e.preventDefault();
		if (!e.dataTransfer) {
			return;
		}
		// Set the dropEffect to move
		e.dataTransfer.dropEffect = 'move';
	}
</script>

<div class="title">
	{#if !isTitleEditable}
		<h1
			on:click={(e) => {
				e.stopImmediatePropagation();
				isTitleEditable = true;

				document.addEventListener('click', setTitleIsNotEditable);
			}}
			on:keypress={(e) => {
				if (['Enter', 'Space'].includes(e.code)) {
					isTitleEditable = true;
					document.addEventListener('click', setTitleIsNotEditable);
				}
			}}
		>
			{cardState.title}
		</h1>
	{/if}
	{#if isTitleEditable}
		<input id="card-title" type="text" bind:value={cardState.title} use:focus />
	{/if}
</div>
<div
	id="card-template"
	style="--height: {(cardState.height || 3.43) * 96}px; --width: {(cardState.width || 2.44) *
		96}px; --border-radius: {cardState.borderRadius}; --background-color: {cardState.backgroundColor}; --scale: {scale}"
	on:drop={handleDrop}
	on:dragover={handleDragover}
>
	{#each cardState.textElements as textElement}
		<span
			draggable="true"
			on:dragstart={handleDragStart}
			id={textElement.id}
			class="text-element"
			style="--color: {textElement.color}; 
			--font-size: {(textElement.fontSize || 0.22) * 96}px; 
			--transform-left: {textElement.leftTransform}px; 
			--transform-top: {textElement.topTransform}px;
			">{`{${textElement.title.toLowerCase().split(' ').join('-')}}`}</span
		>
	{/each}
</div>

<style>
	.title h1,
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
		position: relative;
		height: var(--height);
		width: var(--width);
		border-radius: var(--border-radius);
		background-color: var(--background-color);
		transform: scale(var(--scale));
		transform-origin: top left;
	}

	.text-element {
		position: absolute;
		transform: translate3d(var(--transform-left), var(--transform-top), 0);
		color: var(--color);
		font-size: var(--font-size);
		cursor: move;
	}
</style>
