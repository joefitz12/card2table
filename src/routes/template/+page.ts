import { cardTemplate } from "$lib/api/cardTemplate";
import { cardTemplates, selectedCardTemplate } from "$lib/store";
import { get } from "svelte/store";

export function load({ params }) {
    cardTemplate.getAll().then(templates => {
        cardTemplates.set(templates);
        if (!get(selectedCardTemplate)) {
            selectedCardTemplate.set(templates[0]?.id);
        }
    }).catch((reason) => console.error({ reason }));

    console.log({ params });
}
