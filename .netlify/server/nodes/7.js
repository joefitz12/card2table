import * as universal from '../entries/pages/print/_page.ts.js';

export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/print/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/print/+page.ts";
export const imports = ["_app/immutable/nodes/7.a9459e83.js","_app/immutable/chunks/store.0b2ccfc2.js","_app/immutable/chunks/paths.7faf0f52.js","_app/immutable/chunks/index.3ce593a5.js","_app/immutable/chunks/control.c2cf8273.js","_app/immutable/chunks/PrintLayout.e7e72c8c.js","_app/immutable/chunks/TemplateEditor.svelte_svelte_type_style_lang.c734c474.js"];
export const stylesheets = ["_app/immutable/assets/TemplateEditor.e23fec1a.css"];
export const fonts = [];
