import {
	c as create_ssr_component,
	e as escape,
	a as add_attribute,
	v as validate_component,
} from '../../chunks/ssr.js';
import { d as darkTheme } from '../../chunks/store.js';
/* empty css                                                         */ import '../../chunks/index.js';
import { s as subscribe } from '../../chunks/utils.js';
import { U as UICardTemplate, C as CardTemplate } from '../../chunks/uiCardTemplate.js';
import 'papaparse';
const css = {
	code: '.template-container.svelte-1jencmz{height:100%}.card-container.svelte-1jencmz{flex-grow:1}.outer-card.svelte-1jencmz{margin:auto;position:relative;border-top-left-radius:var(--card-border-top-left-radius);border-top-right-radius:var(--card-border-top-right-radius);border-bottom-right-radius:var(--card-border-bottom-right-radius);border-bottom-left-radius:var(--card-border-bottom-left-radius)}.card.svelte-1jencmz{position:relative;display:flex;flex-direction:column;height:var(--card-height);width:var(--card-width);border-top-left-radius:var(--card-border-top-left-radius);border-top-right-radius:var(--card-border-top-right-radius);border-bottom-right-radius:var(--card-border-bottom-right-radius);border-bottom-left-radius:var(--card-border-bottom-left-radius);background-color:var(--card-background-color);transform-origin:top left;overflow:hidden;padding:calc(var(--base-font-size) / 4) calc(var(--base-font-size) / 2);box-sizing:border-box;z-index:3}.shadow.svelte-1jencmz{position:absolute;width:100%;height:100%;top:0;right:0;bottom:0;left:0;border-radius:inherit;background-color:#18206f;background-image:linear-gradient(to right, pink 1px, transparent 2px), linear-gradient(to bottom, pink 2px, transparent 2px);background-size:10% 10%;transform:rotate3d(1, 0, 0, 78deg) skew(8deg);transform-origin:bottom;transition:transform 0.4s, opacity 0.4s;opacity:0.8;z-index:2}.shadow[data-theme=light].svelte-1jencmz{transform:rotate3d(1, 0, 0, 78deg) skew(-16deg);opacity:0.5}.title.svelte-1jencmz{gap:0;font-size:calc(var(--base-font-size) * 1.5);color:pink}.type.svelte-1jencmz{font-style:italic;font-size:calc(var(--base-font-size) / 2);color:var(--color)}.button-container.svelte-1jencmz{padding-top:calc(var(--card-height) / 12);justify-content:space-around}@keyframes svelte-1jencmz-pulse{from{--pulse:-50%}to{--pulse:150%}}button.svelte-1jencmz{--pulse:-50%;--x:50%;--y:50%;height:calc(var(--card-height) / 4);width:calc(var(--card-height) / 4);background-color:var(--card-background-color);background-image:radial-gradient(circle at var(--x) var(--y), var(--card-background-color) 0%, var(--card-background-color) max(var(--pulse) - 50%, 0%), transparent max(var(--pulse), 0%), var(--card-background-color) calc(var(--pulse) + 50%), var(--card-background-color) 100%), linear-gradient(to right, lightgreen 2px, transparent 2px), linear-gradient(to bottom, lightgreen 1px, transparent 2px);background-size:cover, 10% 10%, 10% 10%;border-radius:0.5rem;border:5px solid pink;font-size:calc(var(--base-font-size) / 2)}button.svelte-1jencmz:hover{animation:svelte-1jencmz-pulse 2000ms infinite ease-out}@media screen and (min-width: 640px){.outer-card.svelte-1jencmz{margin:auto auto 3rem}.card.svelte-1jencmz{height:var(--card-height);width:var(--card-width)}}',
	map: null,
};
const Home = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $$unsubscribe_darkTheme;
	$$unsubscribe_darkTheme = subscribe(darkTheme, (value) => value);
	const card = new UICardTemplate({ ...new CardTemplate(), id: '' });
	let cardContainer;
	let relativeUnit;
	$$result.css.add(css);
	$$unsubscribe_darkTheme();
	return ` ${
		card
			? `<div class="flex column template-container svelte-1jencmz" style="${
					'--relative-unit: ' + escape(relativeUnit, true)
			  }"><div class="flex card-container svelte-1jencmz"${add_attribute(
					'this',
					cardContainer,
					0
			  )}>${``}</div></div>`
			: ``
	}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	return `${validate_component(Home, 'Home').$$render($$result, {}, {}, {})}`;
});
export { Page as default };
