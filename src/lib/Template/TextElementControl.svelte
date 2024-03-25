<script lang="ts">
	import { count, textElements } from '../store';
	import type { TextElement } from './types';
	export let id: string;
	export let handleRemove: () => void;

	let state: Partial<TextElement> & {
		italic: boolean;
		underline: boolean;
		lineThrough: boolean;
	} = {
		title: undefined,
		fontSize: undefined,
		fontWeight: undefined,
		fontStyle: undefined,
		italic: false,
		textDecoration: undefined,
		underline: false,
		lineThrough: false,
		color: undefined,
		topPadding: undefined,
		rightPadding: undefined,
		bottomPadding: undefined,
		leftPadding: undefined
	};

	let _textElements: TextElement[];
	let currentControl: TextElement | undefined;

	textElements.subscribe(($textElements) => {
		_textElements = $textElements;
		currentControl = $textElements.find((textElement) => id == textElement.id);
		if (!currentControl) {
			return;
		}
		Object.entries(currentControl).forEach(([key, value]) => {
			const _key = key as keyof typeof state;
			if (Object.hasOwnProperty.call(state, _key) && state[_key] !== value) {
				(state[_key] as string | number) = value;
			}
		});
		console.log(currentControl);
		if (currentControl.textDecoration === 'underline') {
			state.underline = true;
		}
		if (currentControl.textDecoration === 'line-through') {
			state.lineThrough = true;
		}
		if (currentControl.fontStyle === 'italic') {
			state.italic = true;
		}
	});

	let currentCount = 0;
	count.subscribe((value) => (currentCount = value));

	$: {
		if (!currentControl) {
			console.log('id', id);
			console.log('_textElements', _textElements);
		}
		let update = false;

		// if (currentControl && currentCount < 30) {
		if (currentControl) {
			if (state.color && currentControl?.color !== state.color) {
				currentControl.color = state.color;
				update = true;
			}
			if (state.fontSize && currentControl?.fontSize !== state.fontSize) {
				currentControl.fontSize = state.fontSize;
				update = true;
			}
			if (state.fontStyle && currentControl?.fontStyle !== state.fontStyle) {
				currentControl.fontStyle = state.fontStyle;
				update = true;
			}
			if (state.fontWeight && currentControl?.fontWeight !== state.fontWeight) {
				currentControl.fontWeight = state.fontWeight;
				update = true;
			}
			if (state.textDecoration && currentControl?.textDecoration !== state.textDecoration) {
				currentControl.textDecoration = state.textDecoration;
				update = true;
			}
			if (typeof state.title === 'string' && currentControl?.title !== state.title) {
				currentControl.title = state.title;
				update = true;
			}
			if (
				(state.lineThrough && currentControl?.textDecoration !== 'line-through') ||
				(!state.lineThrough && currentControl?.textDecoration === 'line-through')
			) {
				currentControl.textDecoration = state.lineThrough ? 'line-through' : 'normal';
				update = true;
			}
			if (
				(state.underline && currentControl?.textDecoration !== 'underline') ||
				(!state.underline && currentControl?.textDecoration === 'underline')
			) {
				currentControl.textDecoration = state.underline ? 'underline' : 'normal';
				update = true;
			}
			if (
				(state.italic && currentControl?.fontStyle !== 'italic') ||
				(!state.italic && currentControl?.fontStyle === 'italic')
			) {
				currentControl.fontStyle = state.italic ? 'italic' : 'normal';
				update = true;
			}
			if (typeof state.topPadding === 'number' && currentControl?.topPadding !== state.topPadding) {
				currentControl.topPadding = state.topPadding;
				update = true;
			}
			if (
				typeof state.rightPadding === 'number' &&
				currentControl?.rightPadding !== state.rightPadding
			) {
				currentControl.rightPadding = state.rightPadding;
				update = true;
			}
			if (
				typeof state.bottomPadding === 'number' &&
				currentControl?.bottomPadding !== state.bottomPadding
			) {
				currentControl.bottomPadding = state.bottomPadding;
				update = true;
			}
			if (
				typeof state.leftPadding === 'number' &&
				currentControl?.leftPadding !== state.leftPadding
			) {
				currentControl.leftPadding = state.leftPadding;
				update = true;
			}

			if (update) {
				console.log('updating');
				count.set(currentCount + 1);
				textElements.set(_textElements);
			}
		}
	}

	function focus(input: HTMLInputElement) {
		input.focus();
	}
</script>

<div class="flex column container">
	<div class="flex row header">
		<input type="color" id={`text-element-${id}-color`} bind:value={state.color} />
		<input type="text" bind:value={state.title} class="title" use:focus />
		<button
			type="button"
			on:click={handleRemove}
			aria-label={`Remove ${state.title}`}
			class="delete">&#10005;</button
		>
	</div>
	<div class="flex row">
		<div class="flex column">
			<label for={`text-element-${id}-font-size`}>Size</label>
			<input
				type="number"
				id={`text-element-${id}-font-size`}
				step="0.01"
				bind:value={state.fontSize}
			/>
		</div>
		<div class="flex column">
			<label for={`text-element-${id}-font-weight`}>Weight</label>
			<select id={`text-element-${id}-font-weight`} bind:value={state.fontWeight}>
				<option>100</option>
				<option>200</option>
				<option>300</option>
				<option selected>400</option>
				<option>500</option>
				<option>600</option>
				<option>700</option>
				<option>800</option>
				<option>900</option>
			</select>
		</div>
	</div>
	<div class="flex row formatting">
		<!-- <label class="flex row"><input type="checkbox" /><span class="bold">bold</span></label> -->
		<label class="flex row"
			><input
				type="checkbox"
				on:change={(e) => (state.italic = !state.italic)}
				bind:checked={state.italic}
			/><span class="italic">italic</span></label
		>
		<label class="flex row"
			><input
				type="checkbox"
				on:change={(e) => {
					state.underline = !state.underline;
					if (state.underline) {
						state.lineThrough = false;
					}
				}}
				bind:checked={state.underline}
			/><span class="underline">underline</span></label
		>
		<label class="flex row"
			><input
				type="checkbox"
				on:change={(e) => {
					state.lineThrough = !state.lineThrough;
					if (state.lineThrough) {
						state.underline = false;
					}
				}}
				bind:checked={state.lineThrough}
			/><span class="strikethrough">strikethrough</span></label
		>
	</div>
	<fieldset class="flex column padding">
		<legend>Padding</legend>
		<div class="flex row">
			<div class="flex column">
				<label for={`text-element-${id}-padding-top`}>Top</label>
				<input
					type="number"
					id={`text-element-${id}-padding-top`}
					step="0.01"
					bind:value={state.topPadding}
				/>
			</div>
			<div class="flex column">
				<label for={`text-element-${id}-padding-right`}>Right</label>
				<input
					type="number"
					id={`text-element-${id}-padding-right`}
					step="0.01"
					bind:value={state.rightPadding}
				/>
			</div>
			<div class="flex column">
				<label for={`text-element-${id}-padding-bottom`}>Bottom</label>
				<input
					type="number"
					id={`text-element-${id}-padding-bottom`}
					step="0.01"
					bind:value={state.bottomPadding}
				/>
			</div>
			<div class="flex column">
				<label for={`text-element-${id}-padding-left`}>Left</label>
				<input
					type="number"
					id={`text-element-${id}-padding-left`}
					step="0.01"
					bind:value={state.leftPadding}
				/>
			</div>
		</div>
	</fieldset>
</div>

<style>
	.container {
		animation: 60ms ease both fade-in, 300ms ease both slide-from-right;
	}
	.header input[type='color'] {
		border: none;
		background: none;
		width: 1.5rem;
		height: 1.5rem;
		cursor: pointer;
	}
	input.title {
		border: none;
		font-size: 1rem;
		flex-grow: 1;
	}
	input.title:focus-visible {
		outline: none;
	}
	button.delete {
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
	button.delete:hover {
		background-color: whitesmoke;
	}
	.formatting .flex.row {
		align-items: center;
	}
	.formatting label,
	.formatting input {
		cursor: pointer;
	}

	.formatting .italic {
		font-style: italic;
	}
	.formatting .underline {
		text-decoration: underline;
	}
	.formatting .strikethrough {
		text-decoration: line-through;
	}
</style>
