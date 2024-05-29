

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.1c25c159.js","_app/immutable/chunks/index.3ce593a5.js","_app/immutable/chunks/stores.bc06e2bf.js","_app/immutable/chunks/singletons.e22b4096.js","_app/immutable/chunks/paths.7faf0f52.js"];
export const stylesheets = [];
export const fonts = [];
