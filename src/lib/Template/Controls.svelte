<script lang="ts">
	import { unit, height, width, borderRadius, backgroundColor } from './store';
	import type { CardState } from './types';

	export let cardState: Omit<CardState, 'borderRadius'> & { borderRadius?: number } = {
		unit: undefined,
		borderRadius: undefined,
		width: undefined,
		height: undefined,
		fontSizes: undefined,
		backgroundColor: undefined
	};

	unit.subscribe((value) => (cardState.unit = value));
	borderRadius.subscribe((value) => (cardState.borderRadius = parseFloat(value.split('%')[0])));
	height.subscribe((value) => (cardState.height = value));
	width.subscribe((value) => (cardState.width = value));
	backgroundColor.subscribe((value) => (cardState.backgroundColor = value));

	$: {
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
				<label for="card-template-color">Background Color</label>
				<input type="color" id="card-template-color" bind:value={cardState.backgroundColor} />
			</div>
		</div>
		<!-- <div class="flex row">
			<div class="flex column">
				<label for="card-template-font-size">Title font size</label>
				<input
					type="number"
					id="card-template-font-size"
					step="0.01"
					bind:value={fontSizes}
				/>
			</div>
		</div> -->
	</div>
</div>

<style>
	.controls {
		gap: 0.5rem;
	}
</style>
