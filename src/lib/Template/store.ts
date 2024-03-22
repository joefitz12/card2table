import { writable } from 'svelte/store';
import type { FontSizes, TextElement, Unit } from './types';

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
export let borderColor = writable<string>('transparent');
export let borderRadius = writable<number>(5);
export let borderWidth = writable<number>(0.05);
export let textElements = writable<TextElement[]>([]);

export let scale = writable<number>(1);