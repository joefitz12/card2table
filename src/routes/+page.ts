import { get } from "svelte/store";
import { cardTemplate, setting, tab } from "$lib/api";
import { activeTabs, cardTemplates, darkTheme, selectedCardTemplate } from "$lib/store";

export function load() {
	try {
		cardTemplate.getAll().then(templates => {
			cardTemplates.set(templates);
			if (!get(selectedCardTemplate)) {
				selectedCardTemplate.set(templates[0]?.id);
			}
		}).catch((reason) => console.error({ reason }));
	}
	catch (error) {
		console.error(error);
	}
	try {
		setting.get('darkTheme').then(value => {
			if (value) {
				darkTheme.set(true);
			}
		});
	}
	catch (error) {
		console.error(error);
	}
	try {
		tab.getAll().then(tabs => {
			activeTabs.set(tabs);
		}).catch(error => console.error(error));
	}
	catch (error) {
		console.error(error);
	}
};


