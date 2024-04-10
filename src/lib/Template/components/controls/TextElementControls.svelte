<script lang="ts">
	import './controls.css';
	import { color, borderColor, textElementTemplateId, textElements } from '$lib/store';
	import type { CardState } from '$lib/types';
	import { TextElement } from '$lib/utils/textElement';
	import TextElementControl from './TextElementControl.svelte';

	let cardState: Pick<CardState, 'borderColor' | 'color' | 'textElements'> = {
		borderColor: undefined,
		color: undefined,
		textElements: []
	};

	let currentId: number;
	color.subscribe((value) => (cardState.color = value));
	borderColor.subscribe((value) => (cardState.borderColor = value));
	textElementTemplateId.subscribe((value) => (currentId = value));
	textElements.subscribe((value) => (cardState.textElements = value));

	$: {
		if (cardState.textElements) {
			textElements.set(cardState.textElements);
		}
	}
</script>

<div class="flex column">
	<div class="flex row header">
		<h3>Text Elements</h3>
		<button
			type="button"
			class="create"
			on:click={() => {
				cardState.textElements.push(
					new TextElement({
						id: currentId.toString(),
						color: cardState.color,
						borderColor: cardState.borderColor
					})
				);
				cardState.textElements = cardState.textElements;
			}}>+</button
		>
	</div>
	{#each cardState.textElements as textElement, i}
		{@const handleRemove = () => {
			cardState.textElements.splice(
				cardState.textElements.findIndex(
					(cardStateTextElement) => textElement.id === cardStateTextElement.id
				),
				1
			);
			cardState.textElements = cardState.textElements;
		}}
		<TextElementControl id={textElement.id} {handleRemove} />
	{/each}
</div>
