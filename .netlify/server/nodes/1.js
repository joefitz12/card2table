

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.57fb47cd.js","_app/immutable/chunks/scheduler.c84470be.js","_app/immutable/chunks/index.54138c63.js","_app/immutable/chunks/stores.072b236c.js","_app/immutable/chunks/singletons.f132a438.js","_app/immutable/chunks/paths.65f1b00d.js"];
export const stylesheets = [];
export const fonts = [];
