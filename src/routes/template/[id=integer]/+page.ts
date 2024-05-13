import { cardTemplate } from "$lib/api/cardTemplate";

export function load({ params }) {
    cardTemplate.getById(params.id);
}