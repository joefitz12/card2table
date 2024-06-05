import { s as subscribe } from "./utils.js";
import { c as create_ssr_component, e as escape, b as each } from "./ssr.js";
import { c as csv } from "./csv.js";
import { f as selectedCsv, t as template, p as print, e as csvs, k as cards, h as textElements } from "./store.js";
/* empty css                                              */const css = {
  code: ".print-container.svelte-ng6bob.svelte-ng6bob{position:relative;gap:0;overflow:scroll}.preview.svelte-ng6bob.svelte-ng6bob:not(.empty){max-width:var(--page-width);min-width:var(--page-width);display:grid;grid-template-columns:repeat(\n			auto-fill,\n			minmax(calc(var(--card-width) + var(--column-gap)), 1fr)\n		);grid-auto-rows:calc(var(--page-height) / var(--rows-per-page));background-image:linear-gradient(\n			to bottom,\n			transparent calc(var(--page-height) - 1px),\n			red var(--page-height)\n		);background-size:5px var(--page-height);background-repeat:space repeat;border:1px dashed red;box-sizing:border-box;height:min-content}.card-template.svelte-ng6bob.svelte-ng6bob{margin:auto;position:relative;display:flex;flex-direction:column;height:var(--card-height);width:var(--card-width);border-top-left-radius:var(--card-border-top-left-radius);border-top-right-radius:var(--card-border-top-right-radius);border-bottom-right-radius:var(--card-border-bottom-right-radius);border-bottom-left-radius:var(--card-border-bottom-left-radius);background-color:var(--card-background-color);transform-origin:top left;overflow:hidden;padding:var(--card-top-padding) var(--card-right-padding) var(--card-bottom-padding)\n			var(--card-left-padding);box-sizing:border-box;-webkit-print-color-adjust:exact !important;print-color-adjust:exact !important}.card-template.svelte-ng6bob .overlay.svelte-ng6bob{position:absolute;height:100%;width:100%;top:0;right:0;bottom:0;left:0;border-style:solid;border-color:var(--card-border-color);border-top-width:var(--card-border-top-width);border-right-width:var(--card-border-right-width);border-bottom-width:var(--card-border-bottom-width);border-left-width:var(--card-border-left-width);box-sizing:border-box;border-top-left-radius:var(--card-border-top-left-radius);border-top-right-radius:var(--card-border-top-right-radius);border-bottom-right-radius:var(--card-border-bottom-right-radius);border-bottom-left-radius:var(--card-border-bottom-left-radius)}.text-element-container.svelte-ng6bob.svelte-ng6bob{color:var(--color);font-size:var(--font-size);cursor:move;padding:var(--padding-top) var(--padding-right) var(--padding-bottom) var(--padding-left);width:var(--card-width) - calc(var(--card-left-padding) + var(--card-right-padding));box-sizing:border-box;border:solid var(--color);border-top-width:var(--border-top-width);border-right-width:var(--border-right-width);border-bottom-width:var(--border-bottom-width);border-left-width:var(--border-left-width);border-top-left-radius:var(--border-top-left-radius);border-top-right-radius:var(--border-top-right-radius);border-bottom-right-radius:var(--border-bottom-right-radius);border-bottom-left-radius:var(--border-bottom-left-radius)}.text-element-container.positioned.svelte-ng6bob.svelte-ng6bob{position:absolute;transform:translate3d(var(--transform-left), var(--transform-top), 0)}.text-element.svelte-ng6bob.svelte-ng6bob{font-weight:var(--font-weight);font-style:var(--font-style, 'normal');text-decoration:var(--text-decoration, 'normal')}@media print{.preview.svelte-ng6bob.svelte-ng6bob{background:none !important;border:none !important;overflow:visible}}",
  map: null
};
let rowGap = 0.5;
const PrintLayout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $selectedCsv, $$unsubscribe_selectedCsv;
  let $template, $$unsubscribe_template;
  let $print, $$unsubscribe_print;
  let $csvs, $$unsubscribe_csvs;
  let $cards, $$unsubscribe_cards;
  let $textElements, $$unsubscribe_textElements;
  $$unsubscribe_selectedCsv = subscribe(selectedCsv, (value) => $selectedCsv = value);
  $$unsubscribe_template = subscribe(template, (value) => $template = value);
  $$unsubscribe_print = subscribe(print, (value) => $print = value);
  $$unsubscribe_csvs = subscribe(csvs, (value) => $csvs = value);
  $$unsubscribe_cards = subscribe(cards, (value) => $cards = value);
  $$unsubscribe_textElements = subscribe(textElements, (value) => $textElements = value);
  let rowsPerPage;
  csv.getAll().then((files) => {
    csvs.set(files);
    if (!$selectedCsv) {
      selectedCsv.set(files[0]?.id);
    }
  }).catch((reason) => console.error({ reason }));
  $$result.css.add(css);
  {
    {
      rowsPerPage = $template ? Math.floor($print.height / $template.height) : 0;
    }
  }
  $$unsubscribe_selectedCsv();
  $$unsubscribe_template();
  $$unsubscribe_print();
  $$unsubscribe_csvs();
  $$unsubscribe_cards();
  $$unsubscribe_textElements();
  return `<div class="flex row print-container svelte-ng6bob">${$template ? `<div class="${[
    "preview svelte-ng6bob",
    $print.width < $template.width || $print.height < $template.height ? "empty" : ""
  ].join(" ").trim()}" style="${"--column-gap: " + escape($print.columnGap + ($template.unit || "in"), true) + "; --row-gap: " + escape(rowGap + ($template.unit || "in"), true) + "; --card-width: " + escape(($template.width || 2.44) + ($template.unit || "in"), true) + "; --page-height: " + escape($print.height + ($template.unit || "in"), true) + "; --page-width: " + escape($print.width + ($template.unit || "in"), true) + "; --rows-per-page: " + escape(rowsPerPage, true) + ";"}">${$print.width < $template.width || $print.height < $template.height ? `<div class="flex column align-center" data-svelte-h="svelte-7m0czx"><span>Page too small =(</span></div>` : ``} ${$csvs.length && !($print.width < $template.width || $print.height < $template.height) ? `${each([...$cards.values()], (card) => {
    return `<div class="card-template svelte-ng6bob" style="${"--card-height: " + escape(($template.height || 3.43) + ($template.unit || "in"), true) + "; --card-width: " + escape(($template.width || 2.44) + ($template.unit || "in"), true) + "; --card-border-color: " + escape($template.border.color, true) + "; --card-border-top-width: " + escape(($template.border.width.top || 0) + ($template.unit || "in"), true) + "; --card-border-right-width: " + escape(($template.border.width.right || 0) + ($template.unit || "in"), true) + "; --card-border-bottom-width: " + escape(($template.border.width.bottom || 0) + ($template.unit || "in"), true) + "; --card-border-left-width: " + escape(($template.border.width.left || 0) + ($template.unit || "in"), true) + "; --card-border-top-left-radius: " + escape(($template.border.radius.topLeft || 0) + ($template.unit || "in"), true) + "; --card-border-top-right-radius: " + escape(($template.border.radius.topRight || 0) + ($template.unit || "in"), true) + "; --card-border-bottom-right-radius: " + escape(($template.border.radius.bottomRight || 0) + ($template.unit || "in"), true) + "; --card-border-bottom-left-radius: " + escape(($template.border.radius.bottomLeft || 0) + ($template.unit || "in"), true) + "; --card-background-color: " + escape($template.backgroundColor, true) + "; --card-top-padding: " + escape(($template.padding.top || 0) + ($template.unit || "in"), true) + "; --card-right-padding: " + escape(($template.padding.right || 0) + ($template.unit || "in"), true) + "; --card-bottom-padding: " + escape(($template.padding.bottom || 0) + ($template.unit || "in"), true) + "; --card-left-padding: " + escape(($template.padding.left || 0) + ($template.unit || "in"), true) + ";"}"><div class="overlay svelte-ng6bob"></div> ${each(Array.from($textElements), ([key, textElement]) => {
      return `<div class="${[
        "text-element-container svelte-ng6bob",
        !!textElement.leftTransform || !!textElement.topTransform ? "positioned" : ""
      ].join(" ").trim()}" style="${"--color: " + escape(textElement.color, true) + "; --font-size: " + escape((textElement.fontSize || 0.22) + ($template.unit || "in"), true) + "; --transform-left: " + escape((textElement.leftTransform || 0) / $template.relativeUnit + ($template.unit || "in"), true) + "; --transform-top: " + escape((textElement.topTransform || 0) / $template.relativeUnit + ($template.unit || "in"), true) + "; --font-weight: " + escape(textElement.fontWeight, true) + "; --font-style: " + escape(textElement.fontStyle || "normal", true) + "; --text-decoration: " + escape(textElement.textDecoration || "normal", true) + "; --padding-top: " + escape((textElement.padding.top || 0) + ($template.unit || "in"), true) + "; --padding-right: " + escape((textElement.padding.right || 0) + ($template.unit || "in"), true) + "; --padding-bottom: " + escape((textElement.padding.bottom || 0) + ($template.unit || "in"), true) + "; --padding-left: " + escape((textElement.padding.left || 0) + ($template.unit || "in"), true) + "; --border-top-width: " + escape((textElement.border.width.top || 0) + ($template.unit || "in"), true) + "; --border-right-width: " + escape((textElement.border.width.right || 0) + ($template.unit || "in"), true) + "; --border-bottom-width: " + escape((textElement.border.width.bottom || 0) + ($template.unit || "in"), true) + "; --border-left-width: " + escape((textElement.border.width.left || 0) + ($template.unit || "in"), true) + "; --border-top-left-radius: " + escape((textElement.border.radius.topLeft || 0) + ($template.unit || "in"), true) + "; --border-top-right-radius: " + escape((textElement.border.radius.topRight || 0) + ($template.unit || "in"), true) + "; --border-bottom-right-radius: " + escape((textElement.border.radius.bottomRight || 0) + ($template.unit || "in"), true) + "; --border-bottom-left-radius: " + escape((textElement.border.radius.bottomLeft || 0) + ($template.unit || "in"), true) + ";"}"><span class="text-element svelte-ng6bob">${escape(card[textElement.title.toLowerCase().split(" ").join("-")])}</span> </div>`;
    })} </div>`;
  })}` : ``}</div>` : ``} </div>`;
});
export {
  PrintLayout as P
};
