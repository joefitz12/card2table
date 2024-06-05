

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/faq/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/6.75a4cf44.js","_app/immutable/chunks/scheduler.c84470be.js","_app/immutable/chunks/index.54138c63.js"];
export const stylesheets = ["_app/immutable/assets/6.0a7df33b.css"];
export const fonts = [];
