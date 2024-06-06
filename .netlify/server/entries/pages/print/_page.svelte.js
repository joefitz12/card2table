import { c as create_ssr_component, v as validate_component } from '../../../chunks/ssr.js';
import '../../../chunks/store.js';
/* empty css                                                            */ import '../../../chunks/index.js';
import { P as PrintLayout } from '../../../chunks/PrintLayout.js';
import 'papaparse';
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	return `${validate_component(PrintLayout, 'PrintLayout').$$render($$result, {}, {}, {})}`;
});
export { Page as default };
