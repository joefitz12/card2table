import { derived, writable } from 'svelte/store';
import type { FontSizes, TextElement, Unit } from './Template/types';
import { goto } from '$app/navigation';

export let title = writable<string>('Card template #1');
export let unit = writable<Unit>('in');
export let height = writable<number>(3.43);
export let width = writable<number>(2.44);
export let topPadding = writable<number>(0);
export let rightPadding = writable<number>(0);
export let bottomPadding = writable<number>(0);
export let leftPadding = writable<number>(0);
export let backgroundColor = writable<string>('#C43636');
export let color = writable<string>('#000000');
export let borderColor = writable<string>();
export let borderRadius = writable<number>(5);
export let borderWidth = writable<number>(0.05);
export let textElements = writable<TextElement[]>([]);
export let textElementTemplateId = writable<number>(0);
textElements.subscribe(value => {
    if (value.length > 0) {
        textElementTemplateId.set(parseInt(value[value.length - 1].id) + 1)
    }
})


export let cards = writable<{ [x: string]: string }[]>();

export let count = writable<number>(0);

cards.subscribe((value) => {
    if (!value) { return }
    goto('/print')
})

export let pageHeight = writable<number>(8.5);
export let pageWidth = writable<number>(11);