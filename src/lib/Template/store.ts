import { writable } from 'svelte/store';
import type { FontSizes, Unit } from './types';

export let unit = writable<Unit>('in');
export let borderRadius = writable<string>('5%');
export let height = writable<number>(3.43);
export let width = writable<number>(2.44);
export let fontSizes = writable<FontSizes>({
	title: 1.2
});
export let backgroundColor = writable<string>('#C43636');

export let scale = writable<number>(1);
