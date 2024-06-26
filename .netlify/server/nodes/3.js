import * as universal from '../entries/pages/_page.ts.js';

export const index = 3;
let component_cache;
export const component = async () =>
	(component_cache ??= (await import('../entries/pages/_page.svelte.js')).default);
export { universal };
export const universal_id = 'src/routes/+page.ts';
export const imports = [
	'_app/immutable/nodes/3.1ddc6b8a.js',
	'_app/immutable/chunks/scheduler.c84470be.js',
	'_app/immutable/chunks/store.4f448f04.js',
	'_app/immutable/chunks/paths.65f1b00d.js',
	'_app/immutable/chunks/control.c2cf8273.js',
	'_app/immutable/chunks/tab.27d68194.js',
	'_app/immutable/chunks/index.54138c63.js',
	'_app/immutable/chunks/TemplateEditor.svelte_svelte_type_style_lang.e2650e22.js',
	'_app/immutable/chunks/uiCardTemplate.00d3eab7.js',
	'_app/immutable/chunks/navigation.69e21e97.js',
	'_app/immutable/chunks/singletons.f132a438.js',
];
export const stylesheets = ['_app/immutable/assets/TemplateEditor.50f4602b.css'];
export const fonts = [];
