<script lang="ts">
	import { textElement } from '$lib/api/textElement';
	import { uiTextElements } from '../../../store';
	import { beforeUpdate } from 'svelte';
	export let id: number;

	let textElementState = {
		italic: false,
		underline: false,
		lineThrough: false,
	};

	// let ui = {
	// 	margin: {
	// 		top: {
	// 			auto: false,
	// 			value: 0,
	// 		},
	// 		right: {
	// 			auto: false,
	// 			value: 0,
	// 		},
	// 		bottom: {
	// 			auto: false,
	// 			value: 0,
	// 		},
	// 		left: {
	// 			auto: false,
	// 			value: 0,
	// 		},
	// 	},
	// };

	let template = { ...$uiTextElements.get(id)! };

	beforeUpdate(() => {
		if (template.fontStyle === 'italic') {
			textElementState.italic = true;
		}
		if (template.textDecoration === 'underline') {
			textElementState.underline = true;
		}
		if (template.textDecoration === 'line-through') {
			textElementState.lineThrough = true;
		}
	});

	$: {
		if (template) {
			// template = template;
			textElement.update(template);
		}
	}

	function focus(input: HTMLInputElement) {
		// input.focus();
	}
</script>

<!-- @TODO: Find way to ensure correct interaction without ignoring error -->
<!--svelte-ignore a11y-no-noninteractive-tabindex -->
<!-- on:keypress={() => template.onMouseover()}
on:mousedown={() => currentControl?.onMouseover()}
on:mouseover={() => currentControl?.onMouseover()}
on:mouseleave={() => currentControl?.onMouseleave()}
on:focus={() => currentControl?.onMouseover()}
on:focusin={() => currentControl?.onMouseover()}
on:focusout={() => currentControl?.onMouseleave()} -->
<div class="flex column container" id={`text-element-${id}-control`} tabindex="0">
	<div class="flex row header">
		<input type="color" id={`text-element-${id}-color`} bind:value={template.color} />
		<input type="text" bind:value={template.title} class="title" use:focus />
		<button
			type="button"
			on:click={() => textElement.delete({ id })}
			aria-label={`Remove ${template.title}`}
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
				min="0"
				bind:value={template.fontSize}
			/>
		</div>
		<div class="flex column">
			<label for={`text-element-${id}-font-weight`}>Weight</label>
			<select id={`text-element-${id}-font-weight`} bind:value={template.fontWeight}>
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
	<div class="flex row wrap formatting">
		<!-- <label class="flex row"><input type="checkbox" /><span class="bold">bold</span></label> -->
		<label class="flex row"
			><input
				type="checkbox"
				on:change={(e) => {
					if (!textElementState.italic) {
						template.fontStyle = 'italic';
					} else {
						template.fontStyle = 'normal';
					}
				}}
				bind:checked={textElementState.italic}
			/><span class="italic">italic</span></label
		>
		<label class="flex row"
			><input
				type="checkbox"
				on:change={(e) => {
					if (!textElementState.underline) {
						template.textDecoration = 'underline';
					} else {
						template.textDecoration = 'none';
					}
				}}
				bind:checked={textElementState.underline}
			/><span class="underline">underline</span></label
		>
		<label class="flex row"
			><input
				type="checkbox"
				on:change={(e) => {
					if (!textElementState.lineThrough) {
						template.textDecoration = 'line-through';
					} else {
						template.textDecoration = 'none';
					}
				}}
				bind:checked={textElementState.lineThrough}
			/><span class="strikethrough">strikethrough</span></label
		>
	</div>
	<!-- <fieldset class="flex column container">
		<legend>Margin</legend>
		<div class="flex row wrap">
			<div class="flex column">
				<fieldset class="flex row">
					<legend>Top</legend>

					<label class="flex row">
						<input type="checkbox" bind:checked={ui.margin.top.auto} />
						<span>Auto</span>
					</label>

					<input
						type="number"
						id={`text-element-${id}-margin-top`}
						step="0.01"
						min="0"
						bind:value={ui.margin.top.value}
						disabled={ui.margin.top.auto}
					/>
				</fieldset>
			</div>
			<div class="flex column">
				<fieldset class="flex row">
					<legend>Right</legend>

					<label class="flex row">
						<input type="checkbox" bind:checked={ui.margin.right.auto} />
						<span>Auto</span>
					</label>

					<input
						type="number"
						id={`text-element-${id}-margin-right`}
						step="0.01"
						min="0"
						bind:value={ui.margin.right.value}
						disabled={ui.margin.right.auto}
					/>
				</fieldset>
			</div>
			<div class="flex column">
				<fieldset class="flex row">
					<legend>Bottom</legend>

					<label class="flex row">
						<input type="checkbox" bind:checked={ui.margin.bottom.auto} />
						<span>Auto</span>
					</label>

					<input
						type="number"
						id={`text-element-${id}-margin-bottom`}
						step="0.01"
						min="0"
						bind:value={ui.margin.bottom.value}
						disabled={ui.margin.bottom.auto}
					/>
				</fieldset>
			</div>
			<div class="flex column">
				<fieldset class="flex row">
					<legend>Left</legend>

					<label class="flex row">
						<input type="checkbox" bind:checked={ui.margin.left.auto} />
						<span>Auto</span>
					</label>

					<input
						type="number"
						id={`text-element-${id}-margin-Left`}
						step="0.01"
						min="0"
						bind:value={ui.margin.left.value}
						disabled={ui.margin.left.auto}
					/>
				</fieldset>
			</div>
		</div>
	</fieldset> -->
	<fieldset class="flex column container">
		<legend>Padding</legend>
		<div class="flex row wrap">
			<div class="flex column">
				<label for={`text-element-${id}-padding-top`}>Top</label>
				<input
					type="number"
					id={`text-element-${id}-padding-top`}
					step="0.01"
					min="0"
					bind:value={template.padding.top}
				/>
			</div>
			<div class="flex column">
				<label for={`text-element-${id}-padding-right`}>Right</label>
				<input
					type="number"
					id={`text-element-${id}-padding-right`}
					step="0.01"
					min="0"
					bind:value={template.padding.right}
				/>
			</div>
			<div class="flex column">
				<label for={`text-element-${id}-padding-bottom`}>Bottom</label>
				<input
					type="number"
					id={`text-element-${id}-padding-bottom`}
					step="0.01"
					min="0"
					bind:value={template.padding.bottom}
				/>
			</div>
			<div class="flex column">
				<label for={`text-element-${id}-padding-left`}>Left</label>
				<input
					type="number"
					id={`text-element-${id}-padding-left`}
					step="0.01"
					min="0"
					bind:value={template.padding.left}
				/>
			</div>
		</div>
	</fieldset>
	<fieldset class="flex column container">
		<div class="flex row header">
			<input
				type="color"
				id={`text-element-${id}-border-color`}
				bind:value={template.border.color}
			/>
			<legend>Border</legend>
		</div>
		<fieldset class="flex column container">
			<legend>Width</legend>
			<div class="flex row wrap">
				<div class="flex column">
					<label for={`text-element-${id}-border-width-top`}>Top</label>
					<input
						type="number"
						id={`text-element-${id}-border-width-top`}
						step="0.01"
						min="0"
						bind:value={template.border.width.top}
					/>
				</div>
				<div class="flex column">
					<label for={`text-element-${id}-border-width-right`}>Right</label>
					<input
						type="number"
						id={`text-element-${id}-border-width-right`}
						step="0.01"
						min="0"
						bind:value={template.border.width.right}
					/>
				</div>
				<div class="flex column">
					<label for={`text-element-${id}-border-width-bottom`}>Bottom</label>
					<input
						type="number"
						id={`text-element-${id}-border-width-bottom`}
						step="0.01"
						min="0"
						bind:value={template.border.width.bottom}
					/>
				</div>
				<div class="flex column">
					<label for={`text-element-${id}-border-width-left`}>Left</label>
					<input
						type="number"
						id={`text-element-${id}-border-width-left`}
						step="0.01"
						min="0"
						bind:value={template.border.width.left}
					/>
				</div>
			</div>
		</fieldset>
		<fieldset class="flex column container">
			<legend>Radius</legend>
			<div class="flex row">
				<div class="flex column">
					<div class="flex column">
						<label for={`card-template-border-radius-top`}>Top Left</label>
						<input
							type="number"
							id={`card-template-border-radius-top`}
							step="0.01"
							min="0"
							bind:value={template.border.radius.topLeft}
						/>
					</div>
					<div class="flex column">
						<label for={`card-template-border-radius-left`}>Bottom Left</label>
						<input
							type="number"
							id={`card-template-border-radius-left`}
							step="0.01"
							min="0"
							bind:value={template.border.radius.bottomLeft}
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
							min="0"
							bind:value={template.border.radius.topRight}
						/>
					</div>
					<div class="flex column">
						<label for={`card-template-border-radius-bottom`}>Bottom Right</label>
						<input
							type="number"
							id={`card-template-border-radius-bottom`}
							step="0.01"
							min="0"
							bind:value={template.border.radius.bottomRight}
						/>
					</div>
				</div>
			</div>
		</fieldset>
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
