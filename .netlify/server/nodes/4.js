export const index = 4;
let component_cache;
export const component = async () =>
	(component_cache ??= (await import('../entries/pages/collection/_page.svelte.js')).default);
export const imports = [
	'_app/immutable/nodes/4.c86ed951.js',
	'_app/immutable/chunks/scheduler.c84470be.js',
	'_app/immutable/chunks/index.54138c63.js',
];
export const stylesheets = ['_app/immutable/assets/list.1835859b.css'];
export const fonts = [];
