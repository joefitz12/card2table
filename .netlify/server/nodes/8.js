import * as universal from '../entries/pages/template/_page.ts.js';

export const index = 8;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/template/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/template/+page.ts";
export const imports = ["_app/immutable/nodes/8.658d0dba.js","_app/immutable/chunks/store.4f448f04.js","_app/immutable/chunks/paths.65f1b00d.js","_app/immutable/chunks/scheduler.c84470be.js","_app/immutable/chunks/control.c2cf8273.js","_app/immutable/chunks/index.54138c63.js","_app/immutable/chunks/each.e59479a4.js","_app/immutable/chunks/navigation.69e21e97.js","_app/immutable/chunks/singletons.f132a438.js"];
export const stylesheets = ["_app/immutable/assets/list.1835859b.css"];
export const fonts = [];
