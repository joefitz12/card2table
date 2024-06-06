import { s as subscribe } from '../../../chunks/utils.js';
import { c as create_ssr_component, e as escape } from '../../../chunks/ssr.js';
import { p as page } from '../../../chunks/stores.js';
const Error = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $page, $$unsubscribe_page;
	$$unsubscribe_page = subscribe(page, (value) => ($page = value));
	const { status, error } = $page;
	$$unsubscribe_page();
	return `<h1>${escape(status)}: ${escape(error?.message)}</h1>`;
});
export { Error as default };
