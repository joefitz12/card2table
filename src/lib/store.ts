import { writable } from 'svelte/store';
import type { PositionalProps, CardState, TextElement, Unit } from './types';
import { goto } from '$app/navigation';

export let title = writable<string>('Card template #1');
export let unit = writable<Unit>('in');
export let height = writable<number>(3.43);
export let width = writable<number>(2.44);
export let padding = writable<PositionalProps>({ top: 0, right: 0, bottom: 0, left: 0 });
export let backgroundColor = writable<string>('#C43636');
export let color = writable<string>('#000000');
export let borderColor = writable<string>();
export let borderRadius = writable<PositionalProps>({ topLeft: .15, topRight: .15, bottomRight: .15, bottomLeft: .15 });
export let borderWidth = writable<CardState['borderWidth']>({ top: 0, right: 0, bottom: 0, left: 0 });

export let borderWidthTop = writable<number>(0);
export let borderWidthRight = writable<number>(0);
export let borderWidthBottom = writable<number>(0);
export let borderWidthLeft = writable<number>(0);

export let textElements = writable<TextElement[]>([]);
export let textElementsMap = writable(new Map());
export let textElementTemplateId = writable<number>(0);
textElements.subscribe(value => {
    if (value.length > 0) {
        textElementTemplateId.set(parseInt(value[value.length - 1].id) + 1);
    }
})
// textElements.subscribe(value => console.log(value))

export let cards = writable<{ [x: string]: string }[]>();

export let count = writable<number>(0);

cards.subscribe((value) => {
    if (!value) { return }
    goto('/print')
})



export let pageHeight = writable<number>(8.5);
export let pageWidth = writable<number>(11);
export let columnGap = writable<number>(0.5);