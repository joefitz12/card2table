import { cardTemplate, setting, tab, textElement } from '$lib/api';
import type { TextElement } from '$lib/models';
import { activeTabs, darkTheme, template, textElements } from '$lib/store';
import { UICardTemplate, UITextElement } from '$lib/utils';
import { get } from 'svelte/store';

export function load({ params }) {
	try {
		cardTemplate
			.getById(params.id)
			.then((data) => {
				template.update(($template) => {
					return {
						...$template,
						...new UICardTemplate({ ...data }),
					};
				});
			})
			.then(() => textElement.getAllByTemplateId(params.id))
			.then((data) => {
				// update text elements
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

				// add link to tablist
				return tab.add({
					itemId: parseInt(params.id),
					type: 'template',
					title: get(template).title,
				});
			})
			.then(() => tab.getAll())
			.then((tabs) => activeTabs.set(tabs))
			.catch((error) => console.error(error));
	} catch (error) {
		console.error(error);
	}
	try {
		setting.get('darkTheme').then((value) => {
			if (value) {
				darkTheme.set(true);
			}
		});
	} catch (error) {
		console.error(error);
	}
}
