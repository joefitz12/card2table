<script lang="ts">
	import Template from '$lib/Template/Template.svelte';
	import { db } from '$lib/db/index.js';
	import { state } from '$lib/store';
	import { CardTemplate } from '$lib/utils/cardTemplate.js';
	import { UITextElement } from '$lib/utils/uiTextElement.js';
	export let data;

	db.open((db) => {
		const transaction = db.transaction(['template']);
		const templates = transaction.objectStore('template');
		const getTemplate = templates.get(parseInt(data.id));

		getTemplate.onsuccess = (event) => {
			console.log(getTemplate);
			console.log(getTemplate.result);
			const template = getTemplate.result;

			if (!template) {
				return;
			}

			const transaction = db.transaction(['textElement']);
			const textElements = transaction.objectStore('textElement');
			const getTextElements = textElements.get(parseInt(data.id));

			getTextElements.onsuccess = () => {
				const textElements = Array.isArray(getTextElements.result)
					? getTextElements.result.map((textElement, index) => {
							return new UITextElement({
								...textElement,
								id: index,
							});
					  })
					: [];
				console.log({ textElements });
				state.update(($state) => {
					console.log();
					return {
						...$state,
						template: {
							...$state.template,
							...new CardTemplate({
								...template,
								textElements: textElements,
								id: data.id,
							}),
						},
					};
				});
			};
		};
	});
</script>

<Template />
