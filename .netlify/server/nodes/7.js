import * as universal from '../entries/pages/print/_page.ts.js';

export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/print/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/print/+page.ts";
export const imports = ["_app/immutable/nodes/7.9592429d.js","_app/immutable/chunks/store.4f448f04.js","_app/immutable/chunks/paths.65f1b00d.js","_app/immutable/chunks/scheduler.c84470be.js","_app/immutable/chunks/control.c2cf8273.js","_app/immutable/chunks/PrintLayout.67d53bc7.js","_app/immutable/chunks/index.54138c63.js","_app/immutable/chunks/each.e59479a4.js","_app/immutable/chunks/TemplateEditor.svelte_svelte_type_style_lang.e2650e22.js"];
export const stylesheets = ["_app/immutable/assets/TemplateEditor.50f4602b.css"];
export const fonts = [];
