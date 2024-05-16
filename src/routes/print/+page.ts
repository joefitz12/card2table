import { cardTemplate } from "$lib/api/cardTemplate";
import { csv } from "$lib/api/csv";
import { cardTemplates, csvs, selectedCardTemplate, selectedCsv } from "$lib/store";
import { get } from "svelte/store";

export function load() {
    cardTemplate.getAll().then(templates => {
        cardTemplates.set(templates);
        if (!get(selectedCardTemplate)) {
            selectedCardTemplate.set(templates[0]?.id);
        }
    }).catch((reason) => console.error({ reason }));
    // @todo: break out into utility function
    csv.getAll().then((files) => {
        csvs.set(files);
        if (!get(selectedCsv)) {
            selectedCsv.set(files[0]?.id)
        }
    }).catch((reason) => console.error({ reason }));
}