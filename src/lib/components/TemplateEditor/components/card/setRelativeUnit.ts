import { template } from "$lib/store";

export const setRelativeUnit = (cardContainer: HTMLDivElement) => {
    if (!cardContainer) {
        return;
    }
    let maxCardHeight = cardContainer.clientHeight - 2 * 48;
    let maxCardWidth = cardContainer.clientWidth - 2 * 16;

    template.update(($template) => {
        if ($template.relativeUnit * ($template.width || 2.44) > maxCardWidth) {
            return {
                ...$template,
                relativeUnit: Math.floor(maxCardWidth / ($template.width || 2.44)),
            };
        } else {
            return {
                ...$template,
                relativeUnit: Math.floor(maxCardHeight / ($template.height || 3.43)),
            };
        }
    });
};