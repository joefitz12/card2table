import * as universal from '../entries/pages/_page.ts.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+page.ts";
export const imports = ["_app/immutable/nodes/3.39e6ab79.js","_app/immutable/chunks/index.3ce593a5.js","_app/immutable/chunks/store.0b2ccfc2.js","_app/immutable/chunks/paths.7faf0f52.js","_app/immutable/chunks/control.c2cf8273.js","_app/immutable/chunks/tab.a5f52488.js","_app/immutable/chunks/TemplateEditor.svelte_svelte_type_style_lang.c734c474.js","_app/immutable/chunks/uiCardTemplate.55a690e1.js","_app/immutable/chunks/navigation.fd32c1c8.js","_app/immutable/chunks/singletons.e22b4096.js"];
export const stylesheets = ["_app/immutable/assets/TemplateEditor.e23fec1a.css"];
export const fonts = [];
