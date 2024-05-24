import { browser } from "$app/environment";
import { cardTemplate, setting, tab } from "$lib/api";
import { activeTabs, cardTemplates, darkTheme, selectedCardTemplate } from "$lib/store";
import { get } from "svelte/store";

export function load() {
	cardTemplate.getAll().then(templates => {
		cardTemplates.set(templates);
		if (!get(selectedCardTemplate)) {
			selectedCardTemplate.set(templates[0]?.id);
		}
	}).catch((reason) => console.error({ reason }));

	setting.get('darkTheme').then(value => {
		if (value) {
			darkTheme.set(true);
		}
	});

	tab.getAll().then(tabs => {
		activeTabs.set(tabs);
	}).catch(error => console.error(error));
};


