import { c as create_ssr_component, a as subscribe, e as each, b as add_attribute, d as escape, v as validate_component } from "../../../../chunks/index2.js";
import { f as selectedCsv, e as csvs, p as print, g as cards, t as template, h as textElements, r as refreshElement, i as sidebarExpanded, j as activeSidebarMenu, k as activeView, b as cardTemplate, c as cardTemplates } from "../../../../chunks/store.js";
/* empty css                                                               */import "../../../../chunks/index.js";
import { P as PrintLayout } from "../../../../chunks/PrintLayout.js";
import "papaparse";
import { t as textElement, U as UITextElement } from "../../../../chunks/uiTextElement.js";
const card = {
  add: function({ csvId, cards: cards2 }) {
    return new Promise((resolve, reject) => {
    });
  },
  addMany: function({ csvId, cards: cards2 }) {
    return new Promise((resolve, reject) => {
    });
  },
  getAllByCsvId: function(id) {
    return new Promise((resolve, reject) => {
    });
  }
};
const css$7 = {
  code: ".fade-in.svelte-8weiyg{animation:300ms ease both fade-in}",
  map: null
};
const PrintSidebar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $selectedCsv, $$unsubscribe_selectedCsv;
  let $csvs, $$unsubscribe_csvs;
  let $print, $$unsubscribe_print;
  $$unsubscribe_selectedCsv = subscribe(selectedCsv, (value) => $selectedCsv = value);
  $$unsubscribe_csvs = subscribe(csvs, (value) => $csvs = value);
  $$unsubscribe_print = subscribe(print, (value) => $print = value);
  selectedCsv.subscribe((csvId) => {
    if (csvId) {
      card.getAllByCsvId(csvId).then((_cards) => cards.set(_cards));
    }
  });
  $$result.css.add(css$7);
  $$unsubscribe_selectedCsv();
  $$unsubscribe_csvs();
  $$unsubscribe_print();
  return `<div class="${"flex column fade-in svelte-8weiyg"}"><fieldset class="${"flex column container"}"><legend>Choose CSV</legend>
		<input type="${"file"}" accept="${"text/csv"}">
		<div class="${"flex column"}">${each($csvs, ({ filename, id }) => {
    return `<div class="${"flex row"}"><input${add_attribute("value", id, 0)}${add_attribute("id", `csv-${id}`, 0)} type="${"radio"}" name="${"choose-csv"}"${id === $selectedCsv ? add_attribute("checked", true, 1) : ""}>
					<label${add_attribute("for", `csv-${id}`, 0)}>${escape(filename)}</label>
				</div>`;
  })}</div></fieldset>
	<fieldset class="${"flex column container"}"><legend>Page layout</legend>
		<div class="${"flex row"}"><div class="${"flex column"}"><label for="${"page-width"}">Page width</label>
				<input id="${"page-width"}" type="${"number"}" step="${"0.1"}"${add_attribute("value", $print.width, 0)}></div>
			<div class="${"flex column"}"><label for="${"page-height"}">Page height</label>
				<input id="${"page-height"}" type="${"number"}" step="${"0.1"}"${add_attribute("value", $print.height, 0)}></div>
			<div class="${"flex column"}"><label for="${"column-gap"}">Column gap</label>
				<input id="${"column-gap"}" type="${"number"}" step="${"0.1"}"${add_attribute("value", $print.columnGap, 0)}></div></div>
		<div></div></fieldset>
</div>`;
});
const CardControls = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $template, $$unsubscribe_template;
  $$unsubscribe_template = subscribe(template, (value) => $template = value);
  $$unsubscribe_template();
  return `${$template ? `<div class="${"flex column"}"><div class="${"flex column"}"><div class="${"flex row header"}"><h3>Dimensions</h3></div>
			<div class="${"flex column container"}"><div class="${"flex row"}"><div class="${"flex column"}"><label for="${"card-template-unit"}">Unit</label>
						<select id="${"card-template-unit"}"><option selected value="${"in"}">in</option><option value="${"cm"}">cm</option></select></div></div>
				<div class="${"flex row"}"><div class="${"flex column"}"><label for="${"card-template-width"}">Width</label>
						<input type="${"number"}" id="${"card-template-width"}" step="${"0.01"}" min="${"0"}"${add_attribute("value", $template.width, 0)}></div>
					<div class="${"flex column"}"><label for="${"card-template-height"}">Height</label>
						<input type="${"number"}" id="${"card-template-height"}" step="${"0.01"}" min="${"0"}"${add_attribute("value", $template.height, 0)}></div></div>
				<fieldset class="${"flex column container padding"}"><legend>Padding</legend>
					<div class="${"flex row"}"><div class="${"flex column"}"><label${add_attribute("for", `card-template-padding-top`, 0)}>Top</label>
							<input type="${"number"}"${add_attribute("id", `card-template-padding-top`, 0)} step="${"0.01"}" min="${"0"}"${add_attribute("value", $template.padding.top, 0)}></div>
						<div class="${"flex column"}"><label${add_attribute("for", `card-template-padding-right`, 0)}>Right</label>
							<input type="${"number"}"${add_attribute("id", `card-template-padding-right`, 0)} step="${"0.01"}" min="${"0"}"${add_attribute("value", $template.padding.right, 0)}></div>
						<div class="${"flex column"}"><label${add_attribute("for", `card-template-padding-bottom`, 0)}>Bottom</label>
							<input type="${"number"}"${add_attribute("id", `card-template-padding-bottom`, 0)} step="${"0.01"}" min="${"0"}"${add_attribute("value", $template.padding.bottom, 0)}></div>
						<div class="${"flex column"}"><label${add_attribute("for", `card-template-padding-left`, 0)}>Left</label>
							<input type="${"number"}"${add_attribute("id", `card-template-padding-left`, 0)} step="${"0.01"}" min="${"0"}"${add_attribute("value", $template.padding.left, 0)}></div></div></fieldset></div></div>
		<div class="${"flex column"}"><div class="${"flex row header"}"><input type="${"color"}"${add_attribute("id", `border-color`, 0)}${add_attribute("value", $template.border.color, 0)}>
				<h3>Border</h3></div>
		<fieldset class="${"flex column container"}"><legend>Width</legend>
			<div class="${"flex row"}"><div class="${"flex column"}"><label${add_attribute("for", `card-template-border-width-top`, 0)}>Top</label>
					<input type="${"number"}"${add_attribute("id", `card-template-border-width-top`, 0)} step="${"0.01"}" min="${"0"}"${add_attribute("value", $template.border.width.top, 0)}></div>
				<div class="${"flex column"}"><label${add_attribute("for", `card-template-border-width-right`, 0)}>Right</label>
					<input type="${"number"}"${add_attribute("id", `card-template-border-width-right`, 0)} step="${"0.01"}" min="${"0"}"${add_attribute("value", $template.border.width.right, 0)}></div>
				<div class="${"flex column"}"><label${add_attribute("for", `card-template-border-width-bottom`, 0)}>Bottom</label>
					<input type="${"number"}"${add_attribute("id", `card-template-border-width-bottom`, 0)} step="${"0.01"}" min="${"0"}"${add_attribute("value", $template.border.width.bottom, 0)}></div>
				<div class="${"flex column"}"><label${add_attribute("for", `card-template-border-width-left`, 0)}>Left</label>
					<input type="${"number"}"${add_attribute("id", `card-template-border-width-left`, 0)} step="${"0.01"}" min="${"0"}"${add_attribute("value", $template.border.width.left, 0)}></div></div></fieldset>
		<fieldset class="${"flex column container"}"><legend>Radius</legend>
			<div class="${"flex row"}"><div class="${"flex column"}"><div class="${"flex column"}"><label${add_attribute("for", `card-template-border-radius-top`, 0)}>Top Left</label>
						<input type="${"number"}"${add_attribute("id", `card-template-border-radius-top`, 0)} step="${"0.01"}" min="${"0"}"${add_attribute("value", $template.border.radius.topLeft, 0)}></div>
					<div class="${"flex column"}"><label${add_attribute("for", `card-template-border-radius-left`, 0)}>Bottom Left</label>
						<input type="${"number"}"${add_attribute("id", `card-template-border-radius-left`, 0)} step="${"0.01"}" min="${"0"}"${add_attribute("value", $template.border.radius.bottomLeft, 0)}></div></div>
				<div class="${"flex column"}"><div class="${"flex column"}"><label${add_attribute("for", `card-template-border-radius-right`, 0)}>Top Right</label>
						<input type="${"number"}"${add_attribute("id", `card-template-border-radius-right`, 0)} step="${"0.01"}" min="${"0"}"${add_attribute("value", $template.border.radius.topRight, 0)}></div>
					<div class="${"flex column"}"><label${add_attribute("for", `card-template-border-radius-bottom`, 0)}>Bottom Right</label>
						<input type="${"number"}"${add_attribute("id", `card-template-border-radius-bottom`, 0)} step="${"0.01"}" min="${"0"}"${add_attribute("value", $template.border.radius.bottomRight, 0)}></div></div></div></fieldset></div></div>` : ``}`;
});
const ColorControls = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $template, $$unsubscribe_template;
  $$unsubscribe_template = subscribe(template, (value) => $template = value);
  $$unsubscribe_template();
  return `<div class="${"flex column"}"><div class="${"flex row header"}"><h3>Colors</h3></div>
	<div class="${"flex column container"}"><div class="${"flex row"}"><div class="${"flex column"}"><label for="${"card-template-background-color"}">Background</label>
				<input type="${"color"}" id="${"card-template-background-color"}"${add_attribute("value", $template.backgroundColor, 0)}></div>
			<div class="${"flex column"}"><label for="${"card-template-color"}">Text</label>
				<input type="${"color"}" id="${"card-template-color"}"${add_attribute("value", $template.color, 0)}></div></div></div></div>`;
});
const css$6 = {
  code: ".container.svelte-v58ms3.svelte-v58ms3{animation:60ms ease both fade-in}.header.svelte-v58ms3 input[type=color].svelte-v58ms3{border:none;background:none;min-width:1.5rem;width:1.5rem;height:1.5rem;cursor:pointer}input.title.svelte-v58ms3.svelte-v58ms3{font-size:1rem;flex-grow:1}input.title.svelte-v58ms3.svelte-v58ms3:focus-visible{outline:none}button.delete.svelte-v58ms3.svelte-v58ms3,button.minimize.svelte-v58ms3.svelte-v58ms3{background-color:transparent;border:none;border-radius:4px;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:1rem;height:1.5rem;width:1.5rem}button.minimize.svelte-v58ms3.svelte-v58ms3{transition:opacity 150ms ease-in-out}button.minimize.svelte-v58ms3 span.svelte-v58ms3{transform:translateY(-0.0625rem)}.minimized.svelte-v58ms3 button.minimize span.svelte-v58ms3{transform:translateY(0)}.container-controls.svelte-v58ms3.svelte-v58ms3{position:relative}.content.svelte-v58ms3.svelte-v58ms3{display:grid;grid-template-rows:1fr;transition:all 150ms ease-in-out}.minimized.svelte-v58ms3 .content.svelte-v58ms3{margin-top:-0.25rem;opacity:0;grid-template-rows:0fr;overflow:hidden;pointer-events:none}.formatting.svelte-v58ms3 .flex.row.svelte-v58ms3{align-items:center}.formatting.svelte-v58ms3 label.svelte-v58ms3,.formatting.svelte-v58ms3 input.svelte-v58ms3{cursor:pointer}.formatting.svelte-v58ms3 .italic.svelte-v58ms3{font-style:italic}.formatting.svelte-v58ms3 .underline.svelte-v58ms3{text-decoration:underline}.formatting.svelte-v58ms3 .strikethrough.svelte-v58ms3{text-decoration:line-through}@media screen and (min-width: 600px){button.delete.svelte-v58ms3.svelte-v58ms3:hover,button.minimize.svelte-v58ms3.svelte-v58ms3:hover{background-color:var(--color);color:var(--background-color)}}",
  map: null
};
function focus(input) {
  input.focus();
  input.scrollIntoView({ behavior: "smooth", block: "start" });
}
const TextElementControl = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $textElements, $$unsubscribe_textElements;
  $$unsubscribe_textElements = subscribe(textElements, (value) => $textElements = value);
  let { id } = $$props;
  let title;
  let textElementState = {
    italic: false,
    underline: false,
    lineThrough: false
  };
  let template2 = { ...$textElements.get(id) };
  refreshElement.subscribe(($refreshElement) => {
    if (id === $refreshElement) {
      template2.minimized = false;
      refreshElement.set(null);
    }
  });
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  $$result.css.add(css$6);
  {
    {
      if (template2) {
        textElement.update(template2).then(() => {
          return textElement.getById(id);
        }).then((data) => {
          textElements.update(($textElements2) => {
            $textElements2.set(data.id, new UITextElement({
              ...data,
              id: parseInt(data.id.toString())
            }));
            return $textElements2;
          });
          focus(title);
        });
      }
    }
  }
  $$unsubscribe_textElements();
  return `


${template2 ? `<div class="${["flex column container svelte-v58ms3", template2.minimized ? "minimized" : ""].join(" ").trim()}"${add_attribute("id", `text-element-${id}-control`, 0)} tabindex="${"0"}"><div class="${"flex row header svelte-v58ms3"}"><input type="${"color"}"${add_attribute("id", `text-element-${id}-color`, 0)} class="${"svelte-v58ms3"}"${add_attribute("value", template2.color, 0)}>
			<input type="${"text"}" class="${"title svelte-v58ms3"}"${add_attribute("value", template2.title, 0)}${add_attribute("this", title, 0)}>
			<div class="${"container-controls svelte-v58ms3"}"><button type="${"button"}"${add_attribute("aria-label", `${template2.minimized ? "Expand" : "Minimize"} ${template2.title}`, 0)} class="${"minimize svelte-v58ms3"}"><span class="${"svelte-v58ms3"}">${template2.minimized ? `+` : ``}
						${!template2.minimized ? `—` : ``}</span></button></div>
			<button type="${"button"}"${add_attribute("aria-label", `Remove ${template2.title}`, 0)} class="${"delete svelte-v58ms3"}">✕</button></div>
		<div class="${["content svelte-v58ms3", template2.minimized ? "minimized" : ""].join(" ").trim()}"><div class="${"flex column"}"><div class="${"flex row"}"><div class="${"flex column"}"><label${add_attribute("for", `text-element-${id}-font-size`, 0)}>Size</label>
						<input type="${"number"}"${add_attribute("id", `text-element-${id}-font-size`, 0)} step="${"0.01"}" min="${"0"}"${add_attribute("value", template2.fontSize, 0)}></div>
					<div class="${"flex column"}"><label${add_attribute("for", `text-element-${id}-font-weight`, 0)}>Weight</label>
						<select${add_attribute("id", `text-element-${id}-font-weight`, 0)}><option value="${"100"}">100</option><option value="${"200"}">200</option><option value="${"300"}">300</option><option selected value="${"400"}">400</option><option value="${"500"}">500</option><option value="${"600"}">600</option><option value="${"700"}">700</option><option value="${"800"}">800</option><option value="${"900"}">900</option></select></div></div>
				<div class="${"flex row wrap formatting svelte-v58ms3"}">
					<label class="${"flex row svelte-v58ms3"}"><input type="${"checkbox"}" class="${"svelte-v58ms3"}"${add_attribute("checked", textElementState.italic, 1)}><span class="${"italic svelte-v58ms3"}">italic</span></label>
					<label class="${"flex row svelte-v58ms3"}"><input type="${"checkbox"}" class="${"svelte-v58ms3"}"${add_attribute("checked", textElementState.underline, 1)}><span class="${"underline svelte-v58ms3"}">underline</span></label>
					<label class="${"flex row svelte-v58ms3"}"><input type="${"checkbox"}" class="${"svelte-v58ms3"}"${add_attribute("checked", textElementState.lineThrough, 1)}><span class="${"strikethrough svelte-v58ms3"}">strikethrough</span></label></div>
				
				<fieldset class="${"flex column container svelte-v58ms3"}"><legend>Padding</legend>
					<div class="${"flex row wrap"}"><div class="${"flex column"}"><label${add_attribute("for", `text-element-${id}-padding-top`, 0)}>Top</label>
							<input type="${"number"}"${add_attribute("id", `text-element-${id}-padding-top`, 0)} step="${"0.01"}" min="${"0"}"${add_attribute("value", template2.padding.top, 0)}></div>
						<div class="${"flex column"}"><label${add_attribute("for", `text-element-${id}-padding-right`, 0)}>Right</label>
							<input type="${"number"}"${add_attribute("id", `text-element-${id}-padding-right`, 0)} step="${"0.01"}" min="${"0"}"${add_attribute("value", template2.padding.right, 0)}></div>
						<div class="${"flex column"}"><label${add_attribute("for", `text-element-${id}-padding-bottom`, 0)}>Bottom</label>
							<input type="${"number"}"${add_attribute("id", `text-element-${id}-padding-bottom`, 0)} step="${"0.01"}" min="${"0"}"${add_attribute("value", template2.padding.bottom, 0)}></div>
						<div class="${"flex column"}"><label${add_attribute("for", `text-element-${id}-padding-left`, 0)}>Left</label>
							<input type="${"number"}"${add_attribute("id", `text-element-${id}-padding-left`, 0)} step="${"0.01"}" min="${"0"}"${add_attribute("value", template2.padding.left, 0)}></div></div></fieldset>
				<fieldset class="${"flex column container svelte-v58ms3"}"><div class="${"flex row header align-center svelte-v58ms3"}"><input type="${"color"}"${add_attribute("id", `text-element-${id}-border-color`, 0)} class="${"svelte-v58ms3"}"${add_attribute("value", template2.border.color, 0)}>
						<legend>Border</legend></div>
					<fieldset class="${"flex column container svelte-v58ms3"}"><legend>Width</legend>
						<div class="${"flex row wrap"}"><div class="${"flex column"}"><label${add_attribute("for", `text-element-${id}-border-width-top`, 0)}>Top</label>
								<input type="${"number"}"${add_attribute("id", `text-element-${id}-border-width-top`, 0)} step="${"0.01"}" min="${"0"}"${add_attribute("value", template2.border.width.top, 0)}></div>
							<div class="${"flex column"}"><label${add_attribute("for", `text-element-${id}-border-width-right`, 0)}>Right</label>
								<input type="${"number"}"${add_attribute("id", `text-element-${id}-border-width-right`, 0)} step="${"0.01"}" min="${"0"}"${add_attribute("value", template2.border.width.right, 0)}></div>
							<div class="${"flex column"}"><label${add_attribute("for", `text-element-${id}-border-width-bottom`, 0)}>Bottom</label>
								<input type="${"number"}"${add_attribute("id", `text-element-${id}-border-width-bottom`, 0)} step="${"0.01"}" min="${"0"}"${add_attribute("value", template2.border.width.bottom, 0)}></div>
							<div class="${"flex column"}"><label${add_attribute("for", `text-element-${id}-border-width-left`, 0)}>Left</label>
								<input type="${"number"}"${add_attribute("id", `text-element-${id}-border-width-left`, 0)} step="${"0.01"}" min="${"0"}"${add_attribute("value", template2.border.width.left, 0)}></div></div></fieldset>
					<fieldset class="${"flex column container svelte-v58ms3"}"><legend>Radius</legend>
						<div class="${"flex row"}"><div class="${"flex column"}"><div class="${"flex column"}"><label${add_attribute("for", `card-template-border-radius-top`, 0)}>Top Left</label>
									<input type="${"number"}"${add_attribute("id", `card-template-border-radius-top`, 0)} step="${"0.01"}" min="${"0"}"${add_attribute("value", template2.border.radius.topLeft, 0)}></div>
								<div class="${"flex column"}"><label${add_attribute("for", `card-template-border-radius-left`, 0)}>Bottom Left</label>
									<input type="${"number"}"${add_attribute("id", `card-template-border-radius-left`, 0)} step="${"0.01"}" min="${"0"}"${add_attribute("value", template2.border.radius.bottomLeft, 0)}></div></div>
							<div class="${"flex column"}"><div class="${"flex column"}"><label${add_attribute("for", `card-template-border-radius-right`, 0)}>Top Right</label>
									<input type="${"number"}"${add_attribute("id", `card-template-border-radius-right`, 0)} step="${"0.01"}" min="${"0"}"${add_attribute("value", template2.border.radius.topRight, 0)}></div>
								<div class="${"flex column"}"><label${add_attribute("for", `card-template-border-radius-bottom`, 0)}>Bottom Right</label>
									<input type="${"number"}"${add_attribute("id", `card-template-border-radius-bottom`, 0)} step="${"0.01"}" min="${"0"}"${add_attribute("value", template2.border.radius.bottomRight, 0)}></div></div></div></fieldset></fieldset></div></div></div>` : ``}`;
});
const TextElementControls = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $template, $$unsubscribe_template;
  let $textElements, $$unsubscribe_textElements;
  $$unsubscribe_template = subscribe(template, (value) => $template = value);
  $$unsubscribe_textElements = subscribe(textElements, (value) => $textElements = value);
  parseInt($template?.id.toString());
  $$unsubscribe_template();
  $$unsubscribe_textElements();
  return `<div class="${"flex column"}"><div class="${"flex row header"}"><h3>Text Elements</h3>
		<button type="${"button"}" class="${"create"}">+</button></div>
	${$textElements ? `${each(Array.from($textElements.keys()), (key) => {
    return `${validate_component(TextElementControl, "TextElementControl").$$render($$result, { id: parseInt(key.toString()) }, {}, {})}`;
  })}` : ``}</div>`;
});
const css$5 = {
  code: ".fade-in.svelte-154join{animation:300ms ease both fade-in}button.svelte-154join{flex-grow:1}",
  map: null
};
const TemplateSidebar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $sidebarExpanded, $$unsubscribe_sidebarExpanded;
  let $activeSidebarMenu, $$unsubscribe_activeSidebarMenu;
  $$unsubscribe_sidebarExpanded = subscribe(sidebarExpanded, (value) => $sidebarExpanded = value);
  $$unsubscribe_activeSidebarMenu = subscribe(activeSidebarMenu, (value) => $activeSidebarMenu = value);
  $$result.css.add(css$5);
  $$unsubscribe_sidebarExpanded();
  $$unsubscribe_activeSidebarMenu();
  return `<div class="${"flex column fade-in svelte-154join"}"><div class="${"flex row"}"><button class="${"svelte-154join"}">card</button>
		<button class="${"svelte-154join"}">color</button>
		<button class="${"svelte-154join"}">text</button>
		<button class="${"svelte-154join"}">image</button></div>
	<div class="${[
    "collapsible",
    (!$sidebarExpanded ? "collapsed" : "") + " " + ($sidebarExpanded ? "expanded" : "")
  ].join(" ").trim()}"><div class="${"controls-container " + escape($activeSidebarMenu, true) + " svelte-154join"}">${$activeSidebarMenu === "card" ? `${validate_component(CardControls, "CardControls").$$render($$result, {}, {}, {})}` : ``}
			${$activeSidebarMenu === "color" ? `${validate_component(ColorControls, "ColorControls").$$render($$result, {}, {}, {})}` : ``}
			${$activeSidebarMenu === "text" ? `${validate_component(TextElementControls, "TextElementControls").$$render($$result, {}, {}, {})}` : ``}</div></div>
</div>`;
});
const css$4 = {
  code: ".sidebar.svelte-1ukz75g.svelte-1ukz75g{align-items:flex-end;justify-content:flex-end;z-index:0;position:absolute;right:0.5rem;top:0;max-height:calc(100vh - 48px);gap:0.5rem;animation:60ms ease both fade-in}button.options.svelte-1ukz75g.svelte-1ukz75g{flex-shrink:0;font-size:2rem;font-weight:400;height:2rem;width:2rem;background-color:transparent;border:1px solid transparent;border-radius:4px;cursor:pointer;display:flex;align-items:center;justify-content:center;box-sizing:border-box;overflow:hidden}button.options.active.svelte-1ukz75g.svelte-1ukz75g{border-color:lightgray;transition:0.2s}.inner-sidebar.svelte-1ukz75g.svelte-1ukz75g{padding:1rem;border-radius:0.25rem;border:1px solid lightgray;background-color:var(--transparent-background-color);gap:0.5rem;transform-origin:95% 0%;width:min(350px, 100vw - 1rem);box-sizing:border-box;max-height:100%;overflow-y:scroll;scrollbar-width:thin}.choose-editor.svelte-1ukz75g.svelte-1ukz75g{gap:0.5rem}.choose-editor.svelte-1ukz75g button.svelte-1ukz75g{flex-grow:1;white-space:nowrap}@keyframes svelte-1ukz75g-minimize{from{transform:scale(1)}to{transform:scale(0)}}@keyframes svelte-1ukz75g-maximize{from{transform:scale(0)}to{transform:scale(1)}}.collapsed.svelte-1ukz75g.svelte-1ukz75g{animation:150ms ease both svelte-1ukz75g-minimize, 175ms ease both fade-out}.expanded.svelte-1ukz75g.svelte-1ukz75g{animation:150ms ease both svelte-1ukz75g-maximize, 175ms ease both fade-in}@media screen and (min-width: 600px){button.options.svelte-1ukz75g.svelte-1ukz75g:hover{background-color:var(--color);color:var(--background-color);border-color:var(--color);transition:0.2s}}@media print{.sidebar.svelte-1ukz75g.svelte-1ukz75g{display:none}}",
  map: null
};
const Sidebar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $sidebarExpanded, $$unsubscribe_sidebarExpanded;
  let $activeView, $$unsubscribe_activeView;
  $$unsubscribe_sidebarExpanded = subscribe(sidebarExpanded, (value) => $sidebarExpanded = value);
  $$unsubscribe_activeView = subscribe(activeView, (value) => $activeView = value);
  let sidebar;
  $$result.css.add(css$4);
  $$unsubscribe_sidebarExpanded();
  $$unsubscribe_activeView();
  return `<div class="${"sidebar flex column svelte-1ukz75g"}"${add_attribute("this", sidebar, 0)}><button type="${"button"}" class="${["options svelte-1ukz75g", $sidebarExpanded ? "active" : ""].join(" ").trim()}">⚙</button>
	<div class="${[
    "inner-sidebar flex column collapsible svelte-1ukz75g",
    (!$sidebarExpanded ? "collapsed" : "") + " " + ($sidebarExpanded ? "expanded" : "")
  ].join(" ").trim()}"><div class="${"choose-editor flex svelte-1ukz75g"}"><button type="${"button"}" class="${"svelte-1ukz75g"}">print</button>
			<button type="${"button"}" class="${"svelte-1ukz75g"}">edit template</button></div>
		${$activeView === "template" ? `${validate_component(TemplateSidebar, "TemplateSidebar").$$render($$result, {}, {}, {})}` : ``}
		${$activeView === "print" ? `${validate_component(PrintSidebar, "PrintSidebar").$$render($$result, {}, {}, {})}` : ``}</div>
</div>`;
});
const css$3 = {
  code: ".text-element-container.svelte-1ehv8iu{position:relative;color:var(--color);font-size:var(--font-size);cursor:move;transition:border-color 75ms ease-in-out;padding:var(--padding-top) var(--padding-right) var(--padding-bottom) var(--padding-left);margin:var(--margin-top) var(--margin-right) var(--margin-bottom) var(--margin-left);width:var(--card-width) - calc(var(--card-left-padding) + var(--card-right-padding));box-sizing:border-box;border:solid var(--border-color);border-top-width:var(--border-top-width);border-right-width:var(--border-right-width);border-bottom-width:var(--border-bottom-width);border-left-width:var(--border-left-width);border-top-left-radius:var(--border-top-left-radius);border-top-right-radius:var(--border-top-right-radius);border-bottom-right-radius:var(--border-bottom-right-radius);border-bottom-left-radius:var(--border-bottom-left-radius)}.text-element-container.positioned.svelte-1ehv8iu{position:absolute;transform:translate3d(var(--transform-left), var(--transform-top), 0)}.text-element.svelte-1ehv8iu{font-weight:var(--font-weight);font-style:var(--font-style, 'normal');text-decoration:var(--text-decoration, 'normal')}",
  map: null
};
const TextElement = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let textElement2;
  let $textElements, $$unsubscribe_textElements;
  let $template, $$unsubscribe_template;
  $$unsubscribe_textElements = subscribe(textElements, (value) => $textElements = value);
  $$unsubscribe_template = subscribe(template, (value) => $template = value);
  let { id } = $$props;
  let textElementContainer;
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  $$result.css.add(css$3);
  textElement2 = $textElements.get(id);
  $$unsubscribe_textElements();
  $$unsubscribe_template();
  return `<div class="${[
    "text-element-container svelte-1ehv8iu",
    !!textElement2.leftTransform || !!textElement2.topTransform ? "positioned" : ""
  ].join(" ").trim()}" draggable="${"true"}"${add_attribute("id", `text-element-${id}-template`, 0)} style="${"--color: " + escape(textElement2.color, true) + "; --font-size: " + escape((textElement2.fontSize || 0.22) * $template.relativeUnit, true) + "px; --transform-left: " + escape(textElement2.leftTransform || 0, true) + "px; --transform-top: " + escape(textElement2.topTransform || 0, true) + "px; --font-weight: " + escape(textElement2.fontWeight, true) + "; --font-style: " + escape(textElement2.fontStyle || "normal", true) + "; --text-decoration: " + escape(textElement2.textDecoration || "normal", true) + "; --padding-top: " + escape((textElement2.padding.top || 0) * $template.relativeUnit, true) + "px; --padding-right: " + escape((textElement2.padding.right || 0) * $template.relativeUnit, true) + "px; --padding-bottom: " + escape((textElement2.padding.bottom || 0) * $template.relativeUnit, true) + "px; --padding-left: " + escape((textElement2.padding.left || 0) * $template.relativeUnit, true) + "px; --margin-top: " + escape(
    typeof textElement2.margin.top === "number" ? `${(textElement2.margin.top || 0) * $template.relativeUnit}px` : textElement2.margin.top,
    true
  ) + "; --margin-right: " + escape(
    typeof textElement2.margin.right === "number" ? `${(textElement2.margin.right || 0) * $template.relativeUnit}px` : textElement2.margin.right,
    true
  ) + "; --margin-bottom: " + escape(
    typeof textElement2.margin.bottom === "number" ? `${(textElement2.margin.bottom || 0) * $template.relativeUnit}px` : textElement2.margin.bottom,
    true
  ) + "; --margin-left: " + escape(
    typeof textElement2.margin.left === "number" ? `${(textElement2.margin.left || 0) * $template.relativeUnit}px` : textElement2.margin.left,
    true
  ) + "; --border-color: " + escape(textElement2.border.color, true) + "; --border-top-width: " + escape((textElement2.border.width.top || 0) * $template.relativeUnit, true) + "px; --border-right-width: " + escape((textElement2.border.width.right || 0) * $template.relativeUnit, true) + "px; --border-bottom-width: " + escape((textElement2.border.width.bottom || 0) * $template.relativeUnit, true) + "px; --border-left-width: " + escape((textElement2.border.width.left || 0) * $template.relativeUnit, true) + "px; --border-top-left-radius: " + escape((textElement2.border.radius.topLeft || 0) * $template.relativeUnit, true) + "px; --border-top-right-radius: " + escape((textElement2.border.radius.topRight || 0) * $template.relativeUnit, true) + "px; --border-bottom-right-radius: " + escape((textElement2.border.radius.bottomRight || 0) * $template.relativeUnit, true) + "px; --border-bottom-left-radius: " + escape((textElement2.border.radius.bottomLeft || 0) * $template.relativeUnit, true) + "px;"}"${add_attribute("this", textElementContainer, 0)}><span>{</span><span class="${"text-element svelte-1ehv8iu"}">${escape(textElement2.title?.toLowerCase().split(" ").join("-"))}</span><span>}</span>
</div>`;
});
const setRelativeUnit = (cardContainer) => {
  if (!cardContainer) {
    return;
  }
  let maxCardHeight = cardContainer.clientHeight - 2 * 48;
  let maxCardWidth = cardContainer.clientWidth - 2 * 16;
  template.update(($template) => {
    if ($template.relativeUnit * ($template.width || 2.44) > maxCardWidth) {
      return {
        ...$template,
        relativeUnit: Math.floor(maxCardWidth / ($template.width || 2.44))
      };
    } else {
      return {
        ...$template,
        relativeUnit: Math.floor(maxCardHeight / ($template.height || 3.43))
      };
    }
  });
};
const css$2 = {
  code: ".template-container.svelte-1nglge4.svelte-1nglge4{height:100%}.card-container.svelte-1nglge4.svelte-1nglge4{flex-grow:1}.title.svelte-1nglge4.svelte-1nglge4{display:flex;align-items:center;column-gap:8px}.title.svelte-1nglge4 input.svelte-1nglge4{flex-grow:1;font-size:2rem;font-weight:400;padding:0.5rem 1rem;border:none;outline:none !important;background:none !important}.card.svelte-1nglge4.svelte-1nglge4{margin:auto auto 3rem;position:relative;display:flex;flex-direction:column;height:var(--card-height);width:var(--card-width);border-top-left-radius:var(--card-border-top-left-radius);border-top-right-radius:var(--card-border-top-right-radius);border-bottom-right-radius:var(--card-border-bottom-right-radius);border-bottom-left-radius:var(--card-border-bottom-left-radius);background-color:var(--card-background-color);transform-origin:top left;overflow:hidden;padding:var(--card-top-padding) var(--card-right-padding) var(--card-bottom-padding)\n			var(--card-left-padding);box-sizing:border-box}.card.svelte-1nglge4 .overlay.svelte-1nglge4{position:absolute;height:100%;width:100%;top:0;right:0;bottom:0;left:0;border-style:solid;border-color:var(--card-border-color);border-top-width:var(--card-border-top-width);border-right-width:var(--card-border-right-width);border-bottom-width:var(--card-border-bottom-width);border-left-width:var(--card-border-left-width);box-sizing:border-box;border-top-left-radius:var(--card-border-top-left-radius);border-top-right-radius:var(--card-border-top-right-radius);border-bottom-right-radius:var(--card-border-bottom-right-radius);border-bottom-left-radius:var(--card-border-bottom-left-radius);pointer-events:none}",
  map: null
};
const Card = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $template, $$unsubscribe_template;
  let $textElements, $$unsubscribe_textElements;
  $$unsubscribe_template = subscribe(template, (value) => $template = value);
  $$unsubscribe_textElements = subscribe(textElements, (value) => $textElements = value);
  let cardContainer;
  $$result.css.add(css$2);
  {
    {
      if ($template?.width || $template?.height) {
        setRelativeUnit(cardContainer);
      }
      if ($template?.title) {
        cardTemplate.getAll().then(($cardTemplates) => cardTemplates.set($cardTemplates)).catch((error) => console.error(error));
      }
    }
  }
  $$unsubscribe_template();
  $$unsubscribe_textElements();
  return `

${$template ? `<div class="${"flex column template-container svelte-1nglge4"}"><div class="${"title svelte-1nglge4"}"><input id="${"card-title"}" type="${"text"}" class="${"svelte-1nglge4"}"${add_attribute("value", $template.title, 0)}></div>
		<div class="${"flex card-container svelte-1nglge4"}"${add_attribute("this", cardContainer, 0)}><div class="${"card svelte-1nglge4"}" style="${"--card-height: " + escape($template.height * $template.relativeUnit, true) + "px; --card-width: " + escape($template.width * $template.relativeUnit, true) + "px; --card-border-color: " + escape($template.border.color, true) + "; --card-border-top-width: " + escape(($template.border.width.top || 0) * $template.relativeUnit, true) + "px; --card-border-right-width: " + escape(($template.border.width.right || 0) * $template.relativeUnit, true) + "px; --card-border-bottom-width: " + escape(($template.border.width.bottom || 0) * $template.relativeUnit, true) + "px; --card-border-left-width: " + escape(($template.border.width.left || 0) * $template.relativeUnit, true) + "px; --card-border-top-left-radius: " + escape(($template.border.radius.topLeft || 0) * $template.relativeUnit, true) + "px; --card-border-top-right-radius: " + escape(($template.border.radius.topRight || 0) * $template.relativeUnit, true) + "px; --card-border-bottom-right-radius: " + escape(($template.border.radius.bottomRight || 0) * $template.relativeUnit, true) + "px; --card-border-bottom-left-radius: " + escape(($template.border.radius.bottomLeft || 0) * $template.relativeUnit, true) + "px; --card-background-color: " + escape($template.backgroundColor, true) + "; --card-top-padding: " + escape(($template.padding.top || 0) * $template.relativeUnit, true) + "px; --card-right-padding: " + escape(($template.padding.right || 0) * $template.relativeUnit, true) + "px; --card-bottom-padding: " + escape(($template.padding.bottom || 0) * $template.relativeUnit, true) + "px; --card-left-padding: " + escape(($template.padding.left || 0) * $template.relativeUnit, true) + "px;"}"><div class="${"overlay svelte-1nglge4"}"></div>
				${each(Array.from($textElements.keys()), (id) => {
    return `${validate_component(TextElement, "TextElement").$$render($$result, { id: parseInt(id.toString()) }, {}, {})}`;
  })}</div></div></div>` : ``}`;
});
const css$1 = {
  code: ".template-editor.svelte-7ewr5x{flex-grow:1;position:relative}.card.svelte-7ewr5x{flex-grow:1;position:relative;min-width:0}@media screen and (min-width: 680px){.template-editor.svelte-7ewr5x{display:flex}}",
  map: null
};
const TemplateEditor = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$1);
  return `<div class="${"flex template-editor svelte-7ewr5x"}"><div class="${"card svelte-7ewr5x"}">${validate_component(Card, "Card").$$render($$result, {}, {}, {})}</div>
</div>`;
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".editor.svelte-1b5iygv{flex-grow:1;min-height:0}.main.svelte-1b5iygv{flex-grow:1;position:relative;min-width:0}@media screen and (min-width: 680px){.editor.svelte-1b5iygv{display:flex}}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $activeView, $$unsubscribe_activeView;
  $$unsubscribe_activeView = subscribe(activeView, (value) => $activeView = value);
  $$result.css.add(css);
  $$unsubscribe_activeView();
  return `<div class="${"flex editor svelte-1b5iygv"}"><div class="${"main flex svelte-1b5iygv"}">${$activeView === "template" ? `${validate_component(TemplateEditor, "TemplateEditor").$$render($$result, {}, {}, {})}` : ``}
		${$activeView === "print" ? `${validate_component(PrintLayout, "PrintLayout").$$render($$result, {}, {}, {})}` : ``}</div>
	${validate_component(Sidebar, "Sidebar").$$render($$result, {}, {}, {})}
</div>`;
});
export {
  Page as default
};
