import { c as create_ssr_component, b as add_attribute } from "../../../../chunks/index2.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let title = "Collection #1";
  return `<div class="${"flex column template-container"}"><div class="${"title"}"><button type="${"button"}">☰</button>
		<input id="${"card-title"}" type="${"text"}"${add_attribute("value", title, 0)}></div></div>`;
});
export {
  Page as default
};
