<script lang="ts">
	import type { CardState } from './types';
	import { backgroundColor, borderRadius, height, unit, width } from './store';

	export let scale: Number;

	export let cardState: Omit<CardState, 'borderRadius'> & { borderRadius?: string } = {
		unit: undefined,
		borderRadius: undefined,
		width: undefined,
		height: undefined,
		fontSizes: undefined,
		backgroundColor: undefined
	};

	unit.subscribe((value) => (cardState.unit = value));
	borderRadius.subscribe((value) => (cardState.borderRadius = value));
	height.subscribe((value) => (cardState.height = value));
	width.subscribe((value) => (cardState.width = value));
	backgroundColor.subscribe((value) => (cardState.backgroundColor = value));
</script>

<div
	id="card-template"
	style="--height: {cardState.height}{cardState.unit}; --width: {cardState.width}{cardState.unit}; --border-radius: {cardState.borderRadius}; --background-color: {cardState.backgroundColor}; --scale: {scale}"
/>

<style>
	#card-template {
		height: var(--height);
		width: var(--width);
		border-radius: var(--border-radius);
		background-color: var(--background-color);
		transform: scale(var(--scale));
		transform-origin: top left;
	}
</style>
