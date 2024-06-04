<script lang="ts">
	import '../../../drawer.css';
	import { template, textElements } from '$lib/store';
	import TextElementControl from './TextElementControl.svelte';
	import { textElement } from '$lib/api/textElement';
	import { UITextElement } from '$lib/utils/uiTextElement';
	import type { TextElement } from '$lib/models/TextElement';

	$: templateId = parseInt($template?.id.toString());

	const addTextElement = () => {
		console.log('add text element');
		textElement
			.add({ templateId })
			.then(() => {
				return textElement.getAllByTemplateId(templateId);
			})
			.then((data) => {
				textElements.update(($textElements) => {
					Array.from($textElements.keys()).forEach((textElement) => {
						if (!data.get(parseInt(textElement.toString()))) {
							$textElements.delete(textElement);
						}
					});

					if (data) {
						Array.from(data.keys()).forEach((key) => {
							if (!$textElements.get(key)) {
								$textElements.set(
									key,
									new UITextElement(data.get(key) as TextElement & { id: number })
								);
							}
						});
					}

					return $textElements;
				});
			});
	};
</script>

<div class="text-element-container flex column">
	<div class="flex row header">
		<h3>Text Elements</h3>
		<button type="button" class="create" on:click={() => addTextElement()}>+</button>
	</div>

	{#if $textElements}
		<ul class="flex column">
			{#each Array.from($textElements.keys()) as key}
				{#key key}
					<TextElementControl id={parseInt(key.toString())} />
				{/key}
			{/each}
		</ul>
	{/if}
</div>

<style>
	.text-element-container {
		gap: 0;
		flex-direction: column-reverse;
	}
	.header {
		padding-bottom: 0.25rem;
	}
	ul {
		margin: 0;
		padding: 0;
	}
</style>
