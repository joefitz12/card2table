

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/collection/new/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.a42a6793.js","_app/immutable/chunks/index.3ce593a5.js"];
export const stylesheets = [];
export const fonts = [];
