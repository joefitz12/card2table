<script lang="ts">
	import '../../../drawer.css';
	import { activeElement, activeSidebarMenu, template, textElements } from '$lib/store';
	import TextElementControl from './TextElementControl.svelte';
	import { textElement } from '$lib/api/textElement';
	import { UITextElement } from '$lib/utils/uiTextElement';
	import type { TextElement } from '$lib/models/TextElement';

	$: templateId = parseInt($template?.id.toString());

	const addTextElement = () => {
		let addedElementId: IDBValidKey;

		console.log('add text element');
		textElement
			.add({ templateId, minimized: true })
			.then((id) => {
				addedElementId = id;
				return textElement.getAllByTemplateId(templateId);
			})
			.then((data) => {
				// Get all elements
				textElements.update(($textElements) => {
					// Delete any elements that do not exist in query response
					Array.from($textElements.keys()).forEach((textElement) => {
						if (!data.get(parseInt(textElement.toString()))) {
							$textElements.delete(textElement);
						}
					});

					// Add any elements missing in state that exist in query response
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
				// Set element as active
				activeSidebarMenu.set(null);
				activeElement.set(addedElementId);
			});
	};
</script>

<div class="text-element-container flex column">
	<div class="flex row">
		<button type="button" on:click={() => addTextElement()}>Add text element</button>
		<button type="button">See all</button>
	</div>

	<!-- {#if $textElements}
		<ul class="flex column">
			{#each Array.from($textElements.keys()) as key}
				{#key key}
					<TextElementControl id={parseInt(key.toString())} />
				{/key}
			{/each}
		</ul>
	{/if} -->
</div>

<style>
	.text-element-container {
		gap: 0;
	}
</style>
