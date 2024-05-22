import { browser } from "$app/environment";
import { cardTemplate, setting } from "$lib/api";
import { cardTemplates, darkTheme, selectedCardTemplate } from "$lib/store";
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
};


