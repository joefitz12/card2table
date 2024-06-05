

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/collection/new/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.9fcc6038.js","_app/immutable/chunks/scheduler.c84470be.js","_app/immutable/chunks/index.54138c63.js"];
export const stylesheets = [];
export const fonts = [];
