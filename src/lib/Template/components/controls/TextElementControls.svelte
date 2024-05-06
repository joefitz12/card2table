<script lang="ts">
	import '../../../../styles/controls.css';
	import { state } from '$lib/store';
	import TextElementControl from './TextElementControl.svelte';
	import { db } from '$lib/db';
	import { TextElement } from '$lib/api/TextElement.ts/TextElement';
	import { UITextElement } from '$lib/utils/uiTextElement';

	function createTextElement() {
		const templateId = parseInt($state.template.id);

		db.open((db) => {
			// Init add Card Template transaction
			const transaction = db.transaction(['textElement'], 'readwrite');
			const textElements = transaction.objectStore('textElement');

			// get text elements
			const getTextElement = textElements.get(templateId);

			getTextElement.onsuccess = () => {
				console.log(getTextElement);

				if (!getTextElement.result) {
					// Create new record on object store
					const transaction = db.transaction(['textElement'], 'readwrite');
					const textElements = transaction.objectStore('textElement');
					const addTextElement = textElements.add([new TextElement()], templateId);
					addTextElement.onsuccess = () => {
						// Get all text elements and set to state
						const transaction = db.transaction(['textElement']);
						const textElements = transaction.objectStore('textElement');
						const getTextElements = textElements.get(templateId);

						getTextElements.onsuccess = () => {
							state.update(($state) => {
								return {
									...$state,
									template: {
										...$state.template,
										textElements: getTextElements.result.map(
											(element: InstanceType<typeof TextElement>, i: number) =>
												new UITextElement({ ...element, id: i.toString() })
										),
									},
								};
							});
						};
					};
				} else {
					// Update existing record
					const transaction = db.transaction(['textElement'], 'readwrite');
					const textElements = transaction.objectStore('textElement');
					const putTextElement = textElements.put(
						[...getTextElement.result, new TextElement()],
						templateId
					);

					putTextElement.onsuccess = () => {
						// Get all text elements and set to state
						const transaction = db.transaction(['textElement']);
						const textElements = transaction.objectStore('textElement');
						const getTextElements = textElements.get(templateId);

						getTextElements.onsuccess = () => {
							state.update(($state) => {
								return {
									...$state,
									template: {
										...$state.template,
										textElements: getTextElements.result.map(
											(element: InstanceType<typeof TextElement>, i: number) =>
												new UITextElement({ ...element, id: i.toString() })
										),
									},
								};
							});
						};
					};
				}
			};
		});
	}
</script>

<div class="flex column">
	<div class="flex row header">
		<h3>Text Elements</h3>
		<button type="button" class="create" on:click={() => createTextElement()}>+</button>
	</div>
	{#if $state.template}
		{#each $state.template.textElements as textElement, i}
			<TextElementControl id={i.toString()} />
		{/each}
	{/if}
</div>
