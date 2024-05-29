import * as universal from '../entries/pages/template/_page.ts.js';

export const index = 8;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/template/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/template/+page.ts";
export const imports = ["_app/immutable/nodes/8.300dd931.js","_app/immutable/chunks/store.0b2ccfc2.js","_app/immutable/chunks/paths.7faf0f52.js","_app/immutable/chunks/index.3ce593a5.js","_app/immutable/chunks/control.c2cf8273.js","_app/immutable/chunks/navigation.fd32c1c8.js","_app/immutable/chunks/singletons.e22b4096.js"];
export const stylesheets = ["_app/immutable/assets/list.1835859b.css"];
export const fonts = [];
