<script lang="ts">
	import { textElements } from './store';
	export let id: number;
	export let title: string;
	export let fontSize: number;
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
			if (currentControl.title !== title) {
				currentControl.title = title;
				update = true;
			}
			if (currentControl.fontSize !== fontSize) {
				currentControl.fontSize = fontSize;
				update = true;
			}
			if (currentControl.color !== color) {
				currentControl.color = color;
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
	<div class="flex row">
		{#if !isTitleEditable}
			<span
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
				}}>{title}</span
			>
		{/if}
		{#if isTitleEditable}
			<input type="text" bind:value={title} class="title" use:focus />
		{/if}
		<button type="button" on:click={handleRemove} aria-label={`Remove ${title}`} class="delete"
			>&#10005;</button
		>
	</div>
	<div class="flex row">
		<div class="flex column">
			<label for={`text-element-${id}-font-size`}>Font size</label>
			<input type="number" id={`text-element-${id}`} step="0.01" bind:value={fontSize} />
		</div>
		<div class="flex column">
			<label for={`text-element-${id}-color`}>Color</label>
			<input type="color" id={`text-element-${id}-color`} bind:value={color} />
		</div>
	</div>
</div>

<style>
	.container {
		/* animation: 90ms cubic-bezier(0.4, 0, 1, 1) both fade-in,
            300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-from-right; */
		animation: 50ms ease both fade-in, 300ms ease both slide-from-right;
	}
	input.title {
		border: none;
		font-size: 1rem;
	}
	input.title:focus-visible {
		outline: none;
	}
	button.delete {
		margin-left: auto;
		background-color: transparent;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		display: flex;
		align-items: center;
	}
	button.delete:hover {
		background-color: whitesmoke;
	}
</style>
