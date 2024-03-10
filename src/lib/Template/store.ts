import { writable } from 'svelte/store';
import type { FontSizes, Unit } from './types';

export let title = writable<string>();
export let unit = writable<Unit>('in');
export let borderRadius = writable<string>('5%');
export let height = writable<number>(3.43);
export let width = writable<number>(2.44);
export let backgroundColor = writable<string>('#C43636');
export let color = writable<string>('#000000');
export let textElements = writable<any[]>([]);

export let scale = writable<number>(1);
