import { c as create_ssr_component, b as add_attribute, d as escape, v as validate_component } from "../../chunks/index2.js";
import "../../chunks/store.js";
/* empty css                                                         */import "../../chunks/index.js";
import { U as UICardTemplate, C as CardTemplate } from "../../chunks/uiCardTemplate.js";
import "papaparse";
const css = {
  code: ".template-container.svelte-133wr6g{height:100%}.card-container.svelte-133wr6g{flex-grow:1}.outer-card.svelte-133wr6g{margin:auto auto 3rem;position:relative;border-top-left-radius:var(--card-border-top-left-radius);border-top-right-radius:var(--card-border-top-right-radius);border-bottom-right-radius:var(--card-border-bottom-right-radius);border-bottom-left-radius:var(--card-border-bottom-left-radius)}.card.svelte-133wr6g{position:relative;display:flex;flex-direction:column;height:var(--card-height);width:var(--card-width);border-top-left-radius:var(--card-border-top-left-radius);border-top-right-radius:var(--card-border-top-right-radius);border-bottom-right-radius:var(--card-border-bottom-right-radius);border-bottom-left-radius:var(--card-border-bottom-left-radius);background-color:var(--card-background-color);transform-origin:top left;overflow:hidden;padding:calc(var(--base-font-size) / 4) calc(var(--base-font-size) / 2);box-sizing:border-box;z-index:3}.shadow.svelte-133wr6g{position:absolute;width:100%;height:100%;top:0;right:0;bottom:0;left:0;border-radius:inherit;background-color:#18206f;background-image:linear-gradient(to right, pink 1px, transparent 2px),\n			linear-gradient(to bottom, pink 2px, transparent 2px);background-size:10% 10%;transform:rotate3d(1, 0, 0, 78deg) skew(8deg);transform-origin:bottom;z-index:2}.title.svelte-133wr6g{gap:0;font-size:calc(var(--base-font-size) * 1.5);color:pink}.type.svelte-133wr6g{font-style:italic;font-size:calc(var(--base-font-size) / 2);color:var(--color)}.button-container.svelte-133wr6g{padding-top:calc(var(--card-height) / 12);justify-content:space-around}button.svelte-133wr6g{height:calc(var(--card-height) / 4);width:calc(var(--card-height) / 4);background:transparent;border-radius:0.5rem;border:5px solid pink;font-size:calc(var(--base-font-size) / 2);transition:transform 150ms ease-in-out}button.svelte-133wr6g:hover{transform:scale(0.99);transform-origin:bottom}",
  map: null
};
const Home = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let cardContainer;
  let relativeUnit;
  function setRelativeUnit(cardContainer2) {
    if (!cardContainer2) {
      return;
    }
    let maxCardHeight = cardContainer2.clientHeight - 2 * 48;
    let maxCardWidth = cardContainer2.clientWidth - 2 * 16;
    if (relativeUnit * 2.44 > maxCardWidth) {
      relativeUnit = Math.floor(maxCardWidth / 2.44);
    } else {
      relativeUnit = Math.floor(maxCardHeight / 3.43);
    }
  }
  const card = new UICardTemplate({ ...new CardTemplate(), id: "" });
  $$result.css.add(css);
  {
    {
      setRelativeUnit(cardContainer);
    }
  }
  return `

${card ? `<div class="${"flex column template-container svelte-133wr6g"}"><div class="${"flex card-container svelte-133wr6g"}"${add_attribute("this", cardContainer, 0)}><div class="${"outer-card svelte-133wr6g"}" style="${"--card-border-top-left-radius: " + escape((card.border.radius.topLeft || 0) * relativeUnit, true) + "px; --card-border-top-right-radius: " + escape((card.border.radius.topRight || 0) * relativeUnit, true) + "px; --card-border-bottom-right-radius: " + escape((card.border.radius.bottomRight || 0) * relativeUnit, true) + "px; --card-border-bottom-left-radius: " + escape((card.border.radius.bottomLeft || 0) * relativeUnit, true) + "px;"}"><div class="${"card svelte-133wr6g"}" style="${"--card-height: " + escape(card.height * relativeUnit, true) + "px; --card-width: " + escape(card.width * relativeUnit, true) + "px; --card-border-color: " + escape(card.border.color, true) + "; --card-border-top-width: " + escape((card.border.width.top || 5) * relativeUnit, true) + "px; --card-border-right-width: " + escape((card.border.width.right || 5) * relativeUnit, true) + "px; --card-border-bottom-width: " + escape((card.border.width.bottom || 5) * relativeUnit, true) + "px; --card-border-left-width: " + escape((card.border.width.left || 5) * relativeUnit, true) + "px; --card-background-color: " + escape(card.backgroundColor, true) + "; --card-top-padding: " + escape((card.padding.top || 0) * relativeUnit, true) + "px; --card-right-padding: " + escape((card.padding.right || 0) * relativeUnit, true) + "px; --card-bottom-padding: " + escape((card.padding.bottom || 0) * card.relativeUnit, true) + "px; --card-left-padding: " + escape((card.padding.left || 0) * relativeUnit, true) + "px; --base-font-size: " + escape(0.22 * relativeUnit, true) + "px;"}"><div class="${"flex title svelte-133wr6g"}"><span data-content="${"card"}">card</span>
						<span data-content="${"2"}">2</span>
						<span data-content="${"table"}">table</span></div>
					<span class="${"type svelte-133wr6g"}">a Svelte application</span>
					<div class="${"button-container flex svelte-133wr6g"}"><button type="${"button"}" class="${"svelte-133wr6g"}">New card template</button>
						<button type="${"button"}" class="${"svelte-133wr6g"}">Open card template</button></div></div>
				<div class="${"shadow svelte-133wr6g"}"></div></div></div></div>` : ``}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Home, "Home").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
