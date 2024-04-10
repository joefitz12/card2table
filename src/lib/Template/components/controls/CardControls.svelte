<script lang="ts">
	import './controls.css';
	import {
		backgroundColor,
		borderColor,
		borderRadius,
		borderWidth,
		color,
		height,
		padding,
		title,
		unit,
		width
	} from '$lib/store';
	import type { CardState } from '$lib/types';

	let cardState: Pick<
		CardState,
		| 'title'
		| 'unit'
		| 'borderRadius'
		| 'borderColor'
		| 'borderWidth'
		| 'backgroundColor'
		| 'padding'
		| 'width'
		| 'height'
		| 'color'
	> = {
		title: undefined,
		unit: undefined,
		borderRadius: { topLeft: 5, topRight: 5, bottomRight: 5, bottomLeft: 5 },
		borderWidth: { top: 0, right: 0, bottom: 0, left: 0 },
		padding: { top: 0, right: 0, bottom: 0, left: 0 },
		width: undefined,
		height: undefined,
		backgroundColor: undefined,
		color: undefined,
		borderColor: undefined
	};

	title.subscribe((value) => (cardState.title = value));
	unit.subscribe((value) => (cardState.unit = value));
	height.subscribe((value) => (cardState.height = value));
	width.subscribe((value) => (cardState.width = value));
	backgroundColor.subscribe((value) => (cardState.backgroundColor = value));
	color.subscribe((value) => (cardState.color = value));
	borderColor.subscribe((value) => (cardState.borderColor = value));
	borderWidth.subscribe((value) => (cardState.borderWidth = value));
	borderRadius.subscribe((value) => (cardState.borderRadius = value));
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
		if (cardState.borderWidth) {
			borderWidth.set(cardState.borderWidth);
		}
		if (cardState.padding) {
			padding.set(cardState.padding);
		}
	}
</script>

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
				<input type="number" id="card-template-height" step="0.01" bind:value={cardState.height} />
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
