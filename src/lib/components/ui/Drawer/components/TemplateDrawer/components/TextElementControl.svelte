<script lang="ts">
	import { textElement } from '$lib/api/textElement';
	import { UITextElement } from '$lib/utils/uiTextElement';
	import { activeElement, textElements } from '$lib/store';
	import { beforeUpdate } from 'svelte';
	export let id: IDBValidKey;

	let title: HTMLInputElement;

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

	let template = { ...($textElements.get(id) as UITextElement) };

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
			textElement
				.update(template)
				.then(() => {
					return textElement.getById(id);
				})
				.then((data) => {
					textElements.update(($textElements) => {
						$textElements.set(
							data.id,
							new UITextElement({ ...data, id: parseInt(data.id.toString()) })
						);
						return $textElements;
					});
				});
		}
	}

	function deleteTextElement(id: IDBValidKey) {
		textElement
			.delete({ id })
			.then(() => {
				textElements.update(($textElements) => {
					$textElements.delete(id);

					return $textElements;
				});
			})
			.catch((e) => console.log(e));
	}

	function toggleMinimize() {
		template.minimized = !template.minimized;
		template = template;
	}

	function focus(input: HTMLInputElement) {
		input.focus();
		input.scrollIntoView({
			behavior: 'smooth',
			block: 'start',
		});
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
{#if template}
	<li
		class="flex column container"
		class:minimized={template.minimized}
		id={`text-element-${id}-control`}
		tabindex="0"
	>
		<div class="flex row header">
			<input type="color" id={`text-element-${id}-color`} bind:value={template.color} />
			<input type="text" bind:value={template.title} class="title" bind:this={title} />
			<div class="container-controls">
				<button
					type="button"
					on:click={() => toggleMinimize()}
					aria-label={`${template.minimized ? 'Expand' : 'Minimize'} ${template.title}`}
					class="minimize"
				>
					<span>
						{#if template.minimized}
							+
						{/if}
						{#if !template.minimized}
							&#8212;
						{/if}
					</span>
				</button>
			</div>
			<button
				type="button"
				on:click={() => deleteTextElement(id)}
				aria-label={`Remove ${template.title}`}
				class="delete">&#10005;</button
			>
		</div>
		<div class="content" class:minimized={template.minimized}>
			<div class="flex column">
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
					<div class="flex row header align-center">
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
		</div>
	</li>
{/if}

<style lang="scss">
	.container {
		// animation: 60ms ease both fade-in, 300ms ease both slide-from-right;
		animation: 120ms ease both fade-in;
		flex-shrink: 0;
		padding-top: 0px;
	}
	.header {
		// margin-top: 0.75rem;
		flex-shrink: 0;
		padding-top: 0.75rem;
		input[type='color'] {
			border: none;
			background: none;
			min-width: 1.5rem;
			width: 1.5rem;
			height: 1.5rem;
			cursor: pointer;
		}
		input.title {
			font-size: 1rem;
			flex-grow: 1;

			&:focus-visible {
				outline: none;
			}
		}
	}
	.header button.delete,
	button.minimize {
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
	button.minimize {
		transition: opacity 150ms ease-in-out;
		span {
			// transform: translateY(calc(-1rem / 16));
			.minimized & {
				transform: translateY(calc(1rem / 16));
				// transform: translateY(0);
			}
		}
	}
	.container-controls {
		position: relative;
	}
	.content {
		display: grid;
		grid-template-rows: 1fr;
		transition: grid-template-rows 150ms ease-in-out, opacity 150ms ease-in-out;
		.minimized & {
			margin-top: -0.25rem;
			opacity: 0;
			grid-template-rows: 0fr;
			overflow: hidden;
			pointer-events: none;
		}
	}
	.formatting {
		.flex.row {
			align-items: center;
		}
		label,
		input {
			cursor: pointer;
		}
		.italic {
			font-style: italic;
		}
		.underline {
			text-decoration: underline;
		}
		.strikethrough {
			text-decoration: line-through;
		}
	}

	@media screen and (min-width: 640px) {
		button.delete,
		button.minimize {
			&:hover {
				background-color: var(--color);
				color: var(--background-color);
			}
		}
	}
</style>
