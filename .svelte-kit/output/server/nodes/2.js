

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.BYLGkXTe.js","_app/immutable/chunks/disclose-version.yZ1RdqRG.js","_app/immutable/chunks/runtime.q96lkfRn.js","_app/immutable/chunks/render.BFyDhuu6.js","_app/immutable/chunks/if.BuwVjZQ7.js","_app/immutable/chunks/legacy.CcqOJQNb.js"];
export const stylesheets = ["_app/immutable/assets/2.DLbKV355.css"];
export const fonts = [];
