import { browser } from "$app/environment";
import { cardTemplate } from "$lib/api/cardTemplate";
import { db } from "$lib/db";
import { cardTemplates, selectedCardTemplate } from "$lib/store";
import { get } from "svelte/store";

export function load() {
	cardTemplate.getAll().then(templates => {
		cardTemplates.set(templates);
		if (!get(selectedCardTemplate)) {
			selectedCardTemplate.set(templates[0]?.id);
		}
	}).catch((reason) => console.error({ reason }));
}


