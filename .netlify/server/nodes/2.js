

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/template/_error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.153aa62f.js","_app/immutable/chunks/index.3ce593a5.js","_app/immutable/chunks/stores.bc06e2bf.js","_app/immutable/chunks/singletons.e22b4096.js","_app/immutable/chunks/paths.7faf0f52.js"];
export const stylesheets = [];
export const fonts = [];
