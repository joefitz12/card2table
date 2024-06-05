

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/template/_error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.35f5a48e.js","_app/immutable/chunks/scheduler.c84470be.js","_app/immutable/chunks/index.54138c63.js","_app/immutable/chunks/stores.072b236c.js","_app/immutable/chunks/singletons.f132a438.js","_app/immutable/chunks/paths.65f1b00d.js"];
export const stylesheets = [];
export const fonts = [];
