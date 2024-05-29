import { c as create_ssr_component, a as subscribe, e as each, b as add_attribute, d as escape } from "../../../chunks/index2.js";
/* empty css                    */import { c as cardTemplates } from "../../../chunks/store.js";
import "../../../chunks/index.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $cardTemplates, $$unsubscribe_cardTemplates;
  $$unsubscribe_cardTemplates = subscribe(cardTemplates, (value) => $cardTemplates = value);
  $$unsubscribe_cardTemplates();
  return `<header><h1>Templates</h1>
	<button aria-label="${"create new card template"}" title="${"create new card template"}">+</button></header>
<div class="${"flex column"}">${$cardTemplates ? `${each($cardTemplates, (template) => {
    return `<div class="${"flex"}"><a${add_attribute("aria-label", `Edit ${template.title}`, 0)}${add_attribute("href", `/template/${template.id}`, 0)}>${escape(template.title)}</a>
				<button type="${"button"}"${add_attribute("aria-label", `Remove ${template.title}`, 0)} class="${"delete"}">✕</button>
			</div>`;
  })}` : ``}</div>`;
});
export {
  Page as default
};
