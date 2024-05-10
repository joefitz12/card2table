import { cardTemplate } from "$lib/api/cardTemplate";

export function load() {
    cardTemplate.getAll();
}