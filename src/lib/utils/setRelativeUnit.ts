import { template } from "$lib/store";
import type { UICardTemplate } from "./uiCardTemplate";

export function setRelativeUnit({
    cardContainer,
    card,
}: {
    cardContainer: HTMLDivElement;
    card: UICardTemplate;
}) {
    if (!cardContainer) {
        return;
    }
    let maxCardHeight = cardContainer.getBoundingClientRect().bottom - cardContainer.getBoundingClientRect().top - 2 * 48;
    let maxCardWidth = window.innerWidth - 2 * 16;

    const aspectWidth = card.width;
    const aspectHeight = card.height;

    // Calculate the unit based on width and height constraints
    const unitByWidth = maxCardWidth / aspectWidth;
    const unitByHeight = maxCardHeight / aspectHeight;

    // The maximum relative unit will be the smaller of these two values
    const maxUnit = Math.min(unitByWidth, unitByHeight);

    template.update(($template) => {
            return {
                ...$template,
                relativeUnit: maxUnit
            };
       
    });
};