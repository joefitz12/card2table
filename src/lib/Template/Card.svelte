<script lang="ts">
	import type { CardState } from './types';
	import { backgroundColor, borderRadius, color, height, title, unit, width } from './store';

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
	unit.subscribe((value) => (cardState.unit = value));
	borderRadius.subscribe((value) => (cardState.borderRadius = value));
	height.subscribe((value) => (cardState.height = value));
	width.subscribe((value) => (cardState.width = value));
	backgroundColor.subscribe((value) => (cardState.backgroundColor = value));
	color.subscribe((value) => (cardState.color = value));

	$: {
		if (cardState.title) {
			title.set(cardState.title);
		}
	}

	export let isTitleEditable = false;

	export function setTitleIsNotEditable(e: Event) {
		console.log('okay okay okay');
		if (e.target && 'id' in e.target && e.target.id !== 'card-title') {
			isTitleEditable = false;
			document.removeEventListener('click', setTitleIsNotEditable);
		}
	}

	function focus(input: HTMLInputElement) {
		input.focus();
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
	style="--height: {cardState.height}{cardState.unit}; --width: {cardState.width}{cardState.unit}; --border-radius: {cardState.borderRadius}; --background-color: {cardState.backgroundColor}; --scale: {scale}"
/>

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
		height: var(--height);
		width: var(--width);
		border-radius: var(--border-radius);
		background-color: var(--background-color);
		transform: scale(var(--scale));
		transform-origin: top left;
	}
</style>
