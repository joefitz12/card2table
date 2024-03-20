<script lang="ts">
	import { text } from '@sveltejs/kit';
	import { textElements } from './store';
	export let id: string;
	export let title: string;
	export let fontSize: number;
	export let fontWeight: string;
	export let fontStyle: string;
	let italic: boolean = false;
	export let textDecoration: string;
	let underline: boolean = false;
	let lineThrough: boolean = false;
	export let color: string;
	export let handleRemove: () => void;

	let _textElements: any[];

	textElements.subscribe((value) => {
		_textElements = value;
	});

	let count = 0;

	$: {
		const currentControl = _textElements.find((textElement) => id === textElement.id);
		let update = false;

		if (count < 30) {
			if (currentControl.color !== color) {
				currentControl.color = color;
				update = true;
			}
			if (currentControl.fontSize !== fontSize) {
				currentControl.fontSize = fontSize;
				update = true;
			}
			if (currentControl.fontStyle !== fontStyle) {
				currentControl.fontStyle = fontStyle;
				update = true;
			}
			if (currentControl.fontWeight !== fontWeight) {
				currentControl.fontWeight = fontWeight;
				update = true;
			}
			if (currentControl.textDecoration !== textDecoration) {
				currentControl.textDecoration = textDecoration;
				update = true;
			}
			if (currentControl.title !== title) {
				currentControl.title = title;
				update = true;
			}
			if (
				(lineThrough && currentControl.textDecoration !== 'line-through') ||
				(!lineThrough && currentControl.textDecoration === 'line-through')
			) {
				currentControl.textDecoration = lineThrough ? 'line-through' : 'normal';
				update = true;
			}
			if (
				(underline && currentControl.textDecoration !== 'underline') ||
				(!underline && currentControl.textDecoration === 'underline')
			) {
				currentControl.textDecoration = underline ? 'underline' : 'normal';
				update = true;
			}
			if (
				(italic && currentControl.fontStyle !== 'italic') ||
				(!italic && currentControl.fontStyle === 'italic')
			) {
				currentControl.fontStyle = italic ? 'italic' : 'normal';
				update = true;
			}

			if (update) {
				console.log('updating');
				textElements.set(_textElements);
			}
		}
	}

	let isTitleEditable = false;

	function setTitleIsNotEditable(e: Event) {
		console.dir(e.target);
		if (e.target && 'id' in e.target && (e.target as HTMLElement).nodeName !== 'INPUT') {
			isTitleEditable = false;
			document.removeEventListener('click', setTitleIsNotEditable);
		}
	}

	function focus(input: HTMLInputElement) {
		input.focus();
	}
</script>

<div class="flex column container">
	<div class="flex row header">
		<input type="color" id={`text-element-${id}-color`} bind:value={color} />
		<input type="text" bind:value={title} class="title" use:focus />
		<button type="button" on:click={handleRemove} aria-label={`Remove ${title}`} class="delete"
			>&#10005;</button
		>
	</div>
	<div class="flex row">
		<div class="flex column">
			<label for={`text-element-${id}-font-size`}>Size</label>
			<input type="number" id={`text-element-${id}-font-size`} step="0.01" bind:value={fontSize} />
		</div>
		<div class="flex column">
			<label for={`text-element-${id}-font-weight`}>Weight</label>
			<select id={`text-element-${id}-font-weight`} bind:value={fontWeight}>
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
			><input type="checkbox" on:change={(e) => (italic = !italic)} /><span class="italic"
				>italic</span
			></label
		>
		<label class="flex row"
			><input
				type="checkbox"
				on:change={(e) => {
					underline = !underline;
					if (underline) {
						lineThrough = false;
					}
				}}
				bind:checked={underline}
			/><span class="underline">underline</span></label
		>
		<label class="flex row"
			><input
				type="checkbox"
				on:change={(e) => {
					lineThrough = !lineThrough;
					if (lineThrough) {
						underline = false;
					}
				}}
				bind:checked={lineThrough}
			/><span class="strikethrough">strikethrough</span></label
		>
	</div>
</div>

<style>
	.container {
		/* animation: 90ms cubic-bezier(0.4, 0, 1, 1) both fade-in,
            300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-from-right; */
		animation: 60ms ease both fade-in, 300ms ease both slide-from-right;
	}
	.header input[type='color'] {
		border: none;
		background: none;
		width: 1.5rem;
		height: 1.5rem;
		cursor: pointer;
	}
	/* input[type='color']:: */
	::--webkit-color-swatch-wrapper {
		padding: 0;
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
	.formatting label {
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
