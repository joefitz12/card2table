<script lang="ts">
	import type { TextElement as ITextElement } from '$lib/types';
	import { onMount } from 'svelte';
	import { count, state } from '../../../store';
	export let id: string;

	let textElementState = {
		italic: false,
		underline: false,
		lineThrough: false,
	};

	let ui = {
		margin: {
			top: {
				auto: false,
				value: 0,
			},
			right: {
				auto: false,
				value: 0,
			},
			bottom: {
				auto: false,
				value: 0,
			},
			left: {
				auto: false,
				value: 0,
			},
		},
	};

	let currentCount = 0;
	count.subscribe((value) => (currentCount = value));
	$: controlIndex = $state.template.textElements.findIndex((element) => element.id == id);
	$: currentControl = $state.template.textElements[controlIndex];

	console.log({ controlIndex });

	$: {
		state.update(($state) => {
			return {
				...$state,
				template: {
					...$state.template,
					textElements: [...$state.template.textElements].toSpliced(controlIndex, 1, {
						...$state.template.textElements[controlIndex],
						fontStyle: textElementState.italic ? 'italic' : 'normal',
						textDecoration:
							(textElementState.underline && 'underline') ||
							(textElementState.lineThrough && 'line-through') ||
							'none',
					}),
				},
			};
		});
	}

	function focus(input: HTMLInputElement) {
		input.focus();
	}

	function deleteTextElement() {
		console.log({ controlIndex });
		state.update((state) => {
			return {
				...state,
				template: {
					...state.template,
					textElements: state.template.textElements.toSpliced(controlIndex, 1),
				},
			};
		});
	}

	onMount(() => {
		console.log({
			currentControl,
			controlIndex,
			id,
		});
	});
</script>

<!-- @TODO: Find way to ensure correct interaction without ignoring error -->
<!--svelte-ignore a11y-no-noninteractive-tabindex -->
<div
	class="flex column container"
	id={`text-element-${id}-control`}
	tabindex="0"
	on:keypress={() => currentControl?.onMouseover()}
	on:mousedown={() => currentControl?.onMouseover()}
	on:mouseover={() => currentControl?.onMouseover()}
	on:mouseleave={() => currentControl?.onMouseleave()}
	on:focus={() => currentControl?.onMouseover()}
	on:focusin={() => currentControl?.onMouseover()}
	on:focusout={() => currentControl?.onMouseleave()}
>
	<div class="flex row header">
		<!-- {console.log({ controlIndex })}
		{console.log(
			'$state.template.textElements[controlIndex]',
			$state.template.textElements[controlIndex]
		)}
		{console.log('$state.template.textElements', $state.template.textElements)} -->
		<input
			type="color"
			id={`text-element-${id}-color`}
			bind:value={$state.template.textElements[controlIndex].color}
		/>
		<input
			type="text"
			bind:value={$state.template.textElements[controlIndex].title}
			class="title"
			use:focus
		/>
		<button
			type="button"
			on:click={() => deleteTextElement()}
			aria-label={`Remove ${$state.template.textElements[controlIndex].title}`}
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
				bind:value={$state.template.textElements[controlIndex].fontSize}
			/>
		</div>
		<div class="flex column">
			<label for={`text-element-${id}-font-weight`}>Weight</label>
			<select
				id={`text-element-${id}-font-weight`}
				bind:value={$state.template.textElements[controlIndex].fontWeight}
			>
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
				on:change={(e) => (textElementState.italic = !textElementState.italic)}
				bind:checked={textElementState.italic}
			/><span class="italic">italic</span></label
		>
		<label class="flex row"
			><input
				type="checkbox"
				on:change={(e) => {
					textElementState.underline = !textElementState.underline;
					if (textElementState.underline) {
						textElementState.lineThrough = false;
					}
				}}
				bind:checked={textElementState.underline}
			/><span class="underline">underline</span></label
		>
		<label class="flex row"
			><input
				type="checkbox"
				on:change={(e) => {
					textElementState.lineThrough = !textElementState.lineThrough;
					if (textElementState.lineThrough) {
						textElementState.underline = false;
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
		<div class="flex row">
			<div class="flex column">
				<label for={`text-element-${id}-padding-top`}>Top</label>
				<input
					type="number"
					id={`text-element-${id}-padding-top`}
					step="0.01"
					min="0"
					bind:value={$state.template.textElements[controlIndex].padding.top}
				/>
			</div>
			<div class="flex column">
				<label for={`text-element-${id}-padding-right`}>Right</label>
				<input
					type="number"
					id={`text-element-${id}-padding-right`}
					step="0.01"
					min="0"
					bind:value={$state.template.textElements[controlIndex].padding.right}
				/>
			</div>
			<div class="flex column">
				<label for={`text-element-${id}-padding-bottom`}>Bottom</label>
				<input
					type="number"
					id={`text-element-${id}-padding-bottom`}
					step="0.01"
					min="0"
					bind:value={$state.template.textElements[controlIndex].padding.bottom}
				/>
			</div>
			<div class="flex column">
				<label for={`text-element-${id}-padding-left`}>Left</label>
				<input
					type="number"
					id={`text-element-${id}-padding-left`}
					step="0.01"
					min="0"
					bind:value={$state.template.textElements[controlIndex].padding.left}
				/>
			</div>
		</div>
	</fieldset>
	<fieldset class="flex column container">
		<legend>Border Width</legend>
		<div class="flex row">
			<div class="flex column">
				<label for={`text-element-${id}-border-width-top`}>Top</label>
				<input
					type="number"
					id={`text-element-${id}-border-width-top`}
					step="0.01"
					min="0"
					bind:value={$state.template.textElements[controlIndex].border.width.top}
				/>
			</div>
			<div class="flex column">
				<label for={`text-element-${id}-border-width-right`}>Right</label>
				<input
					type="number"
					id={`text-element-${id}-border-width-right`}
					step="0.01"
					min="0"
					bind:value={$state.template.textElements[controlIndex].border.width.right}
				/>
			</div>
			<div class="flex column">
				<label for={`text-element-${id}-border-width-bottom`}>Bottom</label>
				<input
					type="number"
					id={`text-element-${id}-border-width-bottom`}
					step="0.01"
					min="0"
					bind:value={$state.template.textElements[controlIndex].border.width.bottom}
				/>
			</div>
			<div class="flex column">
				<label for={`text-element-${id}-border-width-left`}>Left</label>
				<input
					type="number"
					id={`text-element-${id}-border-width-left`}
					step="0.01"
					min="0"
					bind:value={$state.template.textElements[controlIndex].border.width.left}
				/>
			</div>
		</div>
	</fieldset>
	<fieldset class="flex column container">
		<legend>Border Radius</legend>
		<div class="flex row">
			<div class="flex column">
				<div class="flex column">
					<label for={`card-template-border-radius-top`}>Top Left</label>
					<input
						type="number"
						id={`card-template-border-radius-top`}
						step="0.01"
						min="0"
						bind:value={$state.template.textElements[controlIndex].border.radius.topLeft}
					/>
				</div>
				<div class="flex column">
					<label for={`card-template-border-radius-left`}>Bottom Left</label>
					<input
						type="number"
						id={`card-template-border-radius-left`}
						step="0.01"
						min="0"
						bind:value={$state.template.textElements[controlIndex].border.radius.bottomLeft}
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
						bind:value={$state.template.textElements[controlIndex].border.radius.topRight}
					/>
				</div>
				<div class="flex column">
					<label for={`card-template-border-radius-bottom`}>Bottom Right</label>
					<input
						type="number"
						id={`card-template-border-radius-bottom`}
						step="0.01"
						min="0"
						bind:value={$state.template.textElements[controlIndex].border.radius.bottomRight}
					/>
				</div>
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
