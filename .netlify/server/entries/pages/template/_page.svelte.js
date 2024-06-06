import { s as subscribe } from '../../../chunks/utils.js';
import {
	c as create_ssr_component,
	b as each,
	a as add_attribute,
	e as escape,
} from '../../../chunks/ssr.js';
/* empty css                    */ import { a as cardTemplates } from '../../../chunks/store.js';
import '../../../chunks/index.js';
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $cardTemplates, $$unsubscribe_cardTemplates;
	$$unsubscribe_cardTemplates = subscribe(cardTemplates, (value) => ($cardTemplates = value));
	$$unsubscribe_cardTemplates();
	return `<header><h1 data-svelte-h="svelte-1cbb7ib">Templates</h1> <button aria-label="create new card template" title="create new card template" data-svelte-h="svelte-xjl07i">+</button></header> <div class="flex column">${
		$cardTemplates
			? `${each($cardTemplates, (template) => {
					return `<div class="flex"><a${add_attribute(
						'aria-label',
						`Edit ${template.title}`,
						0
					)}${add_attribute('href', `/template/${template.id}`, 0)}>${escape(
						template.title
					)}</a> <button type="button"${add_attribute(
						'aria-label',
						`Remove ${template.title}`,
						0
					)} class="delete">✕</button> </div>`;
			  })}`
			: ``
	}</div>`;
});
export { Page as default };
