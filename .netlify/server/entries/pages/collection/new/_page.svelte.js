import { c as create_ssr_component, a as add_attribute } from "../../../../chunks/ssr.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let title = "Collection #1";
  return `<div class="flex column template-container"><div class="title"><button type="button" data-svelte-h="svelte-jqfasq">☰</button> <input id="card-title" type="text"${add_attribute("value", title, 0)}></div></div>`;
});
export {
  Page as default
};
