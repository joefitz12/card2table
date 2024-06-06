import {
	c as create_ssr_component,
	a as add_attribute,
	v as validate_component,
	e as escape,
	b as each,
} from '../../../../chunks/ssr.js';
import { s as subscribe } from '../../../../chunks/utils.js';
import {
	t as template,
	g as activeElement,
	h as textElements,
	i as activeSidebarMenu,
	c as cardTemplate,
	a as cardTemplates,
	j as activeView,
} from '../../../../chunks/store.js';
/* empty css                                                               */ import '../../../../chunks/index.js';
import { P as PrintLayout } from '../../../../chunks/PrintLayout.js';
import { t as textElement, U as UITextElement } from '../../../../chunks/uiTextElement.js';
import 'papaparse';
const CardControls = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $template, $$unsubscribe_template;
	$$unsubscribe_template = subscribe(template, (value) => ($template = value));
	$$unsubscribe_template();
	return `${
		$template
			? `<div class="flex column"><div class="flex column"><div class="flex row header" data-svelte-h="svelte-mtmd0k"><h3>Dimensions</h3></div> <div class="flex column container"><div class="flex row"><div class="flex column"><label for="card-template-width" data-svelte-h="svelte-16owgvg">Width</label> <input type="number" id="card-template-width" step="0.01" min="0"${add_attribute(
					'value',
					$template.width,
					0
			  )}></div> <div class="flex column"><label for="card-template-height" data-svelte-h="svelte-eldnic">Height</label> <input type="number" id="card-template-height" step="0.01" min="0"${add_attribute(
					'value',
					$template.height,
					0
			  )}></div> <div class="flex row"><div class="flex column"><label for="card-template-unit" data-svelte-h="svelte-cxavw">Unit</label> <select id="card-template-unit"><option selected value="in" data-svelte-h="svelte-1h4qxg6">in</option><option value="cm" data-svelte-h="svelte-gmh55k">cm</option></select></div></div></div> <fieldset class="flex column container padding"><legend data-svelte-h="svelte-1qp1cxt">Padding</legend> <div class="flex row"><div class="flex column"><label${add_attribute(
					'for',
					`card-template-padding-top`,
					0
			  )} data-svelte-h="svelte-167tatq">Top</label> <input type="number"${add_attribute(
					'id',
					`card-template-padding-top`,
					0
			  )} step="0.01" min="0"${add_attribute(
					'value',
					$template.padding.top,
					0
			  )}></div> <div class="flex column"><label${add_attribute(
					'for',
					`card-template-padding-right`,
					0
			  )} data-svelte-h="svelte-18kwima">Right</label> <input type="number"${add_attribute(
					'id',
					`card-template-padding-right`,
					0
			  )} step="0.01" min="0"${add_attribute(
					'value',
					$template.padding.right,
					0
			  )}></div> <div class="flex column"><label${add_attribute(
					'for',
					`card-template-padding-bottom`,
					0
			  )} data-svelte-h="svelte-nolgsa">Bottom</label> <input type="number"${add_attribute(
					'id',
					`card-template-padding-bottom`,
					0
			  )} step="0.01" min="0"${add_attribute(
					'value',
					$template.padding.bottom,
					0
			  )}></div> <div class="flex column"><label${add_attribute(
					'for',
					`card-template-padding-left`,
					0
			  )} data-svelte-h="svelte-9ovb76">Left</label> <input type="number"${add_attribute(
					'id',
					`card-template-padding-left`,
					0
			  )} step="0.01" min="0"${add_attribute(
					'value',
					$template.padding.left,
					0
			  )}></div></div></fieldset></div></div> <div class="flex column"><div class="flex row header"><input type="color"${add_attribute(
					'id',
					`border-color`,
					0
			  )}${add_attribute(
					'value',
					$template.border.color,
					0
			  )}> <h3 data-svelte-h="svelte-13jgrfy">Border</h3></div> <fieldset class="flex column container"><legend data-svelte-h="svelte-uc2uzi">Width</legend> <div class="flex row"><div class="flex column"><label${add_attribute(
					'for',
					`card-template-border-width-top`,
					0
			  )} data-svelte-h="svelte-be8b1q">Top</label> <input type="number"${add_attribute(
					'id',
					`card-template-border-width-top`,
					0
			  )} step="0.01" min="0"${add_attribute(
					'value',
					$template.border.width.top,
					0
			  )}></div> <div class="flex column"><label${add_attribute(
					'for',
					`card-template-border-width-right`,
					0
			  )} data-svelte-h="svelte-j27ple">Right</label> <input type="number"${add_attribute(
					'id',
					`card-template-border-width-right`,
					0
			  )} step="0.01" min="0"${add_attribute(
					'value',
					$template.border.width.right,
					0
			  )}></div> <div class="flex column"><label${add_attribute(
					'for',
					`card-template-border-width-bottom`,
					0
			  )} data-svelte-h="svelte-1qa32my">Bottom</label> <input type="number"${add_attribute(
					'id',
					`card-template-border-width-bottom`,
					0
			  )} step="0.01" min="0"${add_attribute(
					'value',
					$template.border.width.bottom,
					0
			  )}></div> <div class="flex column"><label${add_attribute(
					'for',
					`card-template-border-width-left`,
					0
			  )} data-svelte-h="svelte-147m1aa">Left</label> <input type="number"${add_attribute(
					'id',
					`card-template-border-width-left`,
					0
			  )} step="0.01" min="0"${add_attribute(
					'value',
					$template.border.width.left,
					0
			  )}></div></div></fieldset> <fieldset class="flex column container"><legend data-svelte-h="svelte-qpq1rq">Radius</legend> <div class="flex row"><div class="flex column"><div class="flex column"><label${add_attribute(
					'for',
					`card-template-border-radius-top`,
					0
			  )} data-svelte-h="svelte-z5srf7">Top Left</label> <input type="number"${add_attribute(
					'id',
					`card-template-border-radius-top`,
					0
			  )} step="0.01" min="0"${add_attribute(
					'value',
					$template.border.radius.topLeft,
					0
			  )}></div> <div class="flex column"><label${add_attribute(
					'for',
					`card-template-border-radius-left`,
					0
			  )} data-svelte-h="svelte-ab289t">Bottom Left</label> <input type="number"${add_attribute(
					'id',
					`card-template-border-radius-left`,
					0
			  )} step="0.01" min="0"${add_attribute(
					'value',
					$template.border.radius.bottomLeft,
					0
			  )}></div></div> <div class="flex column"><div class="flex column"><label${add_attribute(
					'for',
					`card-template-border-radius-right`,
					0
			  )} data-svelte-h="svelte-zpll2r">Top Right</label> <input type="number"${add_attribute(
					'id',
					`card-template-border-radius-right`,
					0
			  )} step="0.01" min="0"${add_attribute(
					'value',
					$template.border.radius.topRight,
					0
			  )}></div> <div class="flex column"><label${add_attribute(
					'for',
					`card-template-border-radius-bottom`,
					0
			  )} data-svelte-h="svelte-1eb7ie6">Bottom Right</label> <input type="number"${add_attribute(
					'id',
					`card-template-border-radius-bottom`,
					0
			  )} step="0.01" min="0"${add_attribute(
					'value',
					$template.border.radius.bottomRight,
					0
			  )}></div></div></div></fieldset></div></div>`
			: ``
	}`;
});
const ColorControls = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $template, $$unsubscribe_template;
	$$unsubscribe_template = subscribe(template, (value) => ($template = value));
	$$unsubscribe_template();
	return `<div class="flex column"><div class="flex row header" data-svelte-h="svelte-ge6l3p"><h3>Colors</h3></div> <div class="flex column container"><div class="flex row"><div class="flex column"><label for="card-template-background-color" data-svelte-h="svelte-1d0plhu">Background</label> <input type="color" id="card-template-background-color"${add_attribute(
		'value',
		$template.backgroundColor,
		0
	)}></div> <div class="flex column"><label for="card-template-color" data-svelte-h="svelte-67bdxs">Text</label> <input type="color" id="card-template-color"${add_attribute(
		'value',
		$template.color,
		0
	)}></div></div></div></div>`;
});
const css$7 = {
	code: '.container.svelte-1u6e3cf.svelte-1u6e3cf{flex-shrink:0;padding-top:0px}.header.svelte-1u6e3cf.svelte-1u6e3cf{flex-shrink:0;padding-top:0.75rem}.header.svelte-1u6e3cf input[type=color].svelte-1u6e3cf{border:none;background:none;min-width:1.5rem;width:1.5rem;height:1.5rem;cursor:pointer}.header.svelte-1u6e3cf input.title.svelte-1u6e3cf{font-size:1rem;flex-grow:1}.header.svelte-1u6e3cf input.title.svelte-1u6e3cf:focus-visible{outline:none}.header.svelte-1u6e3cf button.delete.svelte-1u6e3cf,button.minimize.svelte-1u6e3cf.svelte-1u6e3cf{background-color:transparent;border:none;border-radius:4px;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:1rem;height:1.5rem;width:1.5rem}button.minimize.svelte-1u6e3cf.svelte-1u6e3cf{transition:opacity 150ms ease-in-out}.minimized.svelte-1u6e3cf button.minimize span.svelte-1u6e3cf{transform:translateY(0.0625rem)}.container-controls.svelte-1u6e3cf.svelte-1u6e3cf{position:relative}.content.svelte-1u6e3cf.svelte-1u6e3cf{display:grid;grid-template-rows:1fr;transition:grid-template-rows 150ms ease-in-out, opacity 150ms ease-in-out}.minimized.svelte-1u6e3cf .content.svelte-1u6e3cf{margin-top:-0.25rem;opacity:0;grid-template-rows:0fr;overflow:hidden;pointer-events:none}.formatting.svelte-1u6e3cf .flex.row.svelte-1u6e3cf{align-items:center}.formatting.svelte-1u6e3cf label.svelte-1u6e3cf,.formatting.svelte-1u6e3cf input.svelte-1u6e3cf{cursor:pointer}.formatting.svelte-1u6e3cf .italic.svelte-1u6e3cf{font-style:italic}.formatting.svelte-1u6e3cf .underline.svelte-1u6e3cf{text-decoration:underline}.formatting.svelte-1u6e3cf .strikethrough.svelte-1u6e3cf{text-decoration:line-through}@media screen and (min-width: 640px){button.delete.svelte-1u6e3cf.svelte-1u6e3cf:hover,button.minimize.svelte-1u6e3cf.svelte-1u6e3cf:hover{background-color:var(--color);color:var(--background-color)}}',
	map: null,
};
const TextElementControl = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $$unsubscribe_activeElement;
	let $textElements, $$unsubscribe_textElements;
	$$unsubscribe_activeElement = subscribe(activeElement, (value) => value);
	$$unsubscribe_textElements = subscribe(textElements, (value) => ($textElements = value));
	let { id } = $$props;
	let title;
	let textElementState = {
		italic: false,
		underline: false,
		lineThrough: false,
	};
	let template2 = { ...$textElements.get(id) };
	if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
	$$result.css.add(css$7);
	{
		{
			if (template2) {
				textElement
					.update(template2)
					.then(() => {
						return textElement.getById(id);
					})
					.then((data) => {
						textElements.update(($textElements2) => {
							$textElements2.set(
								data.id,
								new UITextElement({
									...data,
									id: parseInt(data.id.toString()),
								})
							);
							return $textElements2;
						});
					});
			}
		}
	}
	$$unsubscribe_activeElement();
	$$unsubscribe_textElements();
	return `   ${
		template2
			? `<li class="${[
					'flex column container svelte-1u6e3cf',
					template2.minimized ? 'minimized' : '',
			  ]
					.join(' ')
					.trim()}"${add_attribute(
					'id',
					`text-element-${id}-control`,
					0
			  )} tabindex="0"><div class="flex row header svelte-1u6e3cf"><input type="color"${add_attribute(
					'id',
					`text-element-${id}-color`,
					0
			  )} class="svelte-1u6e3cf"${add_attribute(
					'value',
					template2.color,
					0
			  )}> <input type="text" class="title svelte-1u6e3cf"${add_attribute(
					'value',
					template2.title,
					0
			  )}${add_attribute(
					'this',
					title,
					0
			  )}> <div class="container-controls svelte-1u6e3cf"><button type="button"${add_attribute(
					'aria-label',
					`${template2.minimized ? 'Expand' : 'Minimize'} ${template2.title}`,
					0
			  )} class="minimize svelte-1u6e3cf"><span class="svelte-1u6e3cf">${
					template2.minimized ? `+` : ``
			  } ${
					!template2.minimized ? `—` : ``
			  }</span></button></div> <button type="button"${add_attribute(
					'aria-label',
					`Remove ${template2.title}`,
					0
			  )} class="delete svelte-1u6e3cf">✕</button></div> <div class="${[
					'content svelte-1u6e3cf',
					template2.minimized ? 'minimized' : '',
			  ]
					.join(' ')
					.trim()}"><div class="flex column"><div class="flex row"><div class="flex column"><label${add_attribute(
					'for',
					`text-element-${id}-font-size`,
					0
			  )}>Size</label> <input type="number"${add_attribute(
					'id',
					`text-element-${id}-font-size`,
					0
			  )} step="0.01" min="0"${add_attribute(
					'value',
					template2.fontSize,
					0
			  )}></div> <div class="flex column"><label${add_attribute(
					'for',
					`text-element-${id}-font-weight`,
					0
			  )}>Weight</label> <select${add_attribute(
					'id',
					`text-element-${id}-font-weight`,
					0
			  )}><option value="100" data-svelte-h="svelte-5jcfa7">100</option><option value="200" data-svelte-h="svelte-181x5js">200</option><option value="300" data-svelte-h="svelte-l4fqv1">300</option><option selected value="400" data-svelte-h="svelte-qwpw0x">400</option><option value="500" data-svelte-h="svelte-95tr37">500</option><option value="600" data-svelte-h="svelte-1ryyh5o">600</option><option value="700" data-svelte-h="svelte-1401nxt">700</option><option value="800" data-svelte-h="svelte-1vvxlka">800</option><option value="900" data-svelte-h="svelte-saffqf">900</option></select></div></div> <div class="flex row wrap formatting svelte-1u6e3cf"> <label class="flex row svelte-1u6e3cf"><input type="checkbox" class="svelte-1u6e3cf"${add_attribute(
					'checked',
					textElementState.italic,
					1
			  )}><span class="italic svelte-1u6e3cf" data-svelte-h="svelte-cocp0l">italic</span></label> <label class="flex row svelte-1u6e3cf"><input type="checkbox" class="svelte-1u6e3cf"${add_attribute(
					'checked',
					textElementState.underline,
					1
			  )}><span class="underline svelte-1u6e3cf" data-svelte-h="svelte-fwl345">underline</span></label> <label class="flex row svelte-1u6e3cf"><input type="checkbox" class="svelte-1u6e3cf"${add_attribute(
					'checked',
					textElementState.lineThrough,
					1
			  )}><span class="strikethrough svelte-1u6e3cf" data-svelte-h="svelte-l247qj">strikethrough</span></label></div>  <fieldset class="flex column container svelte-1u6e3cf"><legend data-svelte-h="svelte-1qp1cxt">Padding</legend> <div class="flex row wrap"><div class="flex column"><label${add_attribute(
					'for',
					`text-element-${id}-padding-top`,
					0
			  )}>Top</label> <input type="number"${add_attribute(
					'id',
					`text-element-${id}-padding-top`,
					0
			  )} step="0.01" min="0"${add_attribute(
					'value',
					template2.padding.top,
					0
			  )}></div> <div class="flex column"><label${add_attribute(
					'for',
					`text-element-${id}-padding-right`,
					0
			  )}>Right</label> <input type="number"${add_attribute(
					'id',
					`text-element-${id}-padding-right`,
					0
			  )} step="0.01" min="0"${add_attribute(
					'value',
					template2.padding.right,
					0
			  )}></div> <div class="flex column"><label${add_attribute(
					'for',
					`text-element-${id}-padding-bottom`,
					0
			  )}>Bottom</label> <input type="number"${add_attribute(
					'id',
					`text-element-${id}-padding-bottom`,
					0
			  )} step="0.01" min="0"${add_attribute(
					'value',
					template2.padding.bottom,
					0
			  )}></div> <div class="flex column"><label${add_attribute(
					'for',
					`text-element-${id}-padding-left`,
					0
			  )}>Left</label> <input type="number"${add_attribute(
					'id',
					`text-element-${id}-padding-left`,
					0
			  )} step="0.01" min="0"${add_attribute(
					'value',
					template2.padding.left,
					0
			  )}></div></div></fieldset> <fieldset class="flex column container svelte-1u6e3cf"><div class="flex row header align-center svelte-1u6e3cf"><input type="color"${add_attribute(
					'id',
					`text-element-${id}-border-color`,
					0
			  )} class="svelte-1u6e3cf"${add_attribute(
					'value',
					template2.border.color,
					0
			  )}> <legend data-svelte-h="svelte-80fsa2">Border</legend></div> <fieldset class="flex column container svelte-1u6e3cf"><legend data-svelte-h="svelte-uc2uzi">Width</legend> <div class="flex row wrap"><div class="flex column"><label${add_attribute(
					'for',
					`text-element-${id}-border-width-top`,
					0
			  )}>Top</label> <input type="number"${add_attribute(
					'id',
					`text-element-${id}-border-width-top`,
					0
			  )} step="0.01" min="0"${add_attribute(
					'value',
					template2.border.width.top,
					0
			  )}></div> <div class="flex column"><label${add_attribute(
					'for',
					`text-element-${id}-border-width-right`,
					0
			  )}>Right</label> <input type="number"${add_attribute(
					'id',
					`text-element-${id}-border-width-right`,
					0
			  )} step="0.01" min="0"${add_attribute(
					'value',
					template2.border.width.right,
					0
			  )}></div> <div class="flex column"><label${add_attribute(
					'for',
					`text-element-${id}-border-width-bottom`,
					0
			  )}>Bottom</label> <input type="number"${add_attribute(
					'id',
					`text-element-${id}-border-width-bottom`,
					0
			  )} step="0.01" min="0"${add_attribute(
					'value',
					template2.border.width.bottom,
					0
			  )}></div> <div class="flex column"><label${add_attribute(
					'for',
					`text-element-${id}-border-width-left`,
					0
			  )}>Left</label> <input type="number"${add_attribute(
					'id',
					`text-element-${id}-border-width-left`,
					0
			  )} step="0.01" min="0"${add_attribute(
					'value',
					template2.border.width.left,
					0
			  )}></div></div></fieldset> <fieldset class="flex column container svelte-1u6e3cf"><legend data-svelte-h="svelte-qpq1rq">Radius</legend> <div class="flex row"><div class="flex column"><div class="flex column"><label${add_attribute(
					'for',
					`card-template-border-radius-top`,
					0
			  )} data-svelte-h="svelte-z5srf7">Top Left</label> <input type="number"${add_attribute(
					'id',
					`card-template-border-radius-top`,
					0
			  )} step="0.01" min="0"${add_attribute(
					'value',
					template2.border.radius.topLeft,
					0
			  )}></div> <div class="flex column"><label${add_attribute(
					'for',
					`card-template-border-radius-left`,
					0
			  )} data-svelte-h="svelte-ab289t">Bottom Left</label> <input type="number"${add_attribute(
					'id',
					`card-template-border-radius-left`,
					0
			  )} step="0.01" min="0"${add_attribute(
					'value',
					template2.border.radius.bottomLeft,
					0
			  )}></div></div> <div class="flex column"><div class="flex column"><label${add_attribute(
					'for',
					`card-template-border-radius-right`,
					0
			  )} data-svelte-h="svelte-zpll2r">Top Right</label> <input type="number"${add_attribute(
					'id',
					`card-template-border-radius-right`,
					0
			  )} step="0.01" min="0"${add_attribute(
					'value',
					template2.border.radius.topRight,
					0
			  )}></div> <div class="flex column"><label${add_attribute(
					'for',
					`card-template-border-radius-bottom`,
					0
			  )} data-svelte-h="svelte-1eb7ie6">Bottom Right</label> <input type="number"${add_attribute(
					'id',
					`card-template-border-radius-bottom`,
					0
			  )} step="0.01" min="0"${add_attribute(
					'value',
					template2.border.radius.bottomRight,
					0
			  )}></div></div></div></fieldset></fieldset></div></div></li>`
			: ``
	}`;
});
const css$6 = {
	code: '.text-element-container.svelte-vy7yog{gap:0}',
	map: null,
};
const TextElementControls = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $template, $$unsubscribe_template;
	$$unsubscribe_template = subscribe(template, (value) => ($template = value));
	$$result.css.add(css$6);
	parseInt($template?.id.toString());
	$$unsubscribe_template();
	return `<div class="text-element-container flex row svelte-vy7yog"><div class="flex row"><button type="button" data-svelte-h="svelte-lj5ts2">Add text element</button> <button type="button" data-svelte-h="svelte-1morisj">See all</button></div>  </div>`;
});
const css$5 = {
	code: '.container.svelte-172mpsw{background-color:var(--transparent-background-color)}',
	map: null,
};
const TemplateDrawer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $activeSidebarMenu, $$unsubscribe_activeSidebarMenu;
	let $activeElement, $$unsubscribe_activeElement;
	$$unsubscribe_activeSidebarMenu = subscribe(
		activeSidebarMenu,
		(value) => ($activeSidebarMenu = value)
	);
	$$unsubscribe_activeElement = subscribe(activeElement, (value) => ($activeElement = value));
	$$result.css.add(css$5);
	$$unsubscribe_activeSidebarMenu();
	$$unsubscribe_activeElement();
	return `${
		$activeSidebarMenu && !$activeElement
			? `<div class="container svelte-172mpsw">${
					$activeSidebarMenu === 'card'
						? `${validate_component(CardControls, 'CardControls').$$render($$result, {}, {}, {})}`
						: ``
			  } ${
					$activeSidebarMenu === 'color'
						? `${validate_component(ColorControls, 'ColorControls').$$render($$result, {}, {}, {})}`
						: ``
			  } ${
					$activeSidebarMenu === 'text' && !$activeElement
						? `${validate_component(TextElementControls, 'TextElementControls').$$render(
								$$result,
								{},
								{},
								{}
						  )}`
						: ``
			  }</div>`
			: ``
	} ${
		$activeElement
			? `${validate_component(TextElementControl, 'TextElementControl').$$render(
					$$result,
					{ id: $activeElement },
					{},
					{}
			  )}`
			: ``
	}`;
});
const css$4 = {
	code: '.drawer.svelte-18exqho{position:relative}.menu.svelte-18exqho{position:relative;z-index:1;padding:0.5rem}.controls-container.svelte-18exqho{--gutter:0.5rem;position:absolute;left:var(--gutter);right:var(--gutter);bottom:100%;max-height:85vh;overflow:scroll}.controls.svelte-18exqho{width:calc(100vw - 2 * var(--gutter));box-sizing:border-box;border-radius:4px}button.svelte-18exqho{height:3rem;flex-grow:1;border-radius:8px}',
	map: null,
};
const Drawer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $activeSidebarMenu, $$unsubscribe_activeSidebarMenu;
	let $activeElement, $$unsubscribe_activeElement;
	$$unsubscribe_activeSidebarMenu = subscribe(
		activeSidebarMenu,
		(value) => ($activeSidebarMenu = value)
	);
	$$unsubscribe_activeElement = subscribe(activeElement, (value) => ($activeElement = value));
	$$result.css.add(css$4);
	$$unsubscribe_activeSidebarMenu();
	$$unsubscribe_activeElement();
	return `<div class="column drawer svelte-18exqho">${
		$activeSidebarMenu || $activeElement
			? `<div class="controls-container svelte-18exqho"><div class="flex column controls svelte-18exqho"> ${validate_component(
					TemplateDrawer,
					'TemplateDrawer'
			  ).$$render($$result, {}, {}, {})} </div></div>`
			: ``
	} <div class="flex row menu svelte-18exqho"><button class="svelte-18exqho" data-svelte-h="svelte-1tfwtwm">card</button> <button class="svelte-18exqho" data-svelte-h="svelte-dd9f4q">color</button> <button class="svelte-18exqho" data-svelte-h="svelte-132gp7m">text</button> <button class="svelte-18exqho" data-svelte-h="svelte-1lbxntu">image</button></div> </div>`;
});
const css$3 = {
	code: ".text-element-container.svelte-1ehv8iu{position:relative;color:var(--color);font-size:var(--font-size);cursor:move;transition:border-color 75ms ease-in-out;padding:var(--padding-top) var(--padding-right) var(--padding-bottom) var(--padding-left);margin:var(--margin-top) var(--margin-right) var(--margin-bottom) var(--margin-left);width:var(--card-width) - calc(var(--card-left-padding) + var(--card-right-padding));box-sizing:border-box;border:solid var(--border-color);border-top-width:var(--border-top-width);border-right-width:var(--border-right-width);border-bottom-width:var(--border-bottom-width);border-left-width:var(--border-left-width);border-top-left-radius:var(--border-top-left-radius);border-top-right-radius:var(--border-top-right-radius);border-bottom-right-radius:var(--border-bottom-right-radius);border-bottom-left-radius:var(--border-bottom-left-radius)}.text-element-container.positioned.svelte-1ehv8iu{position:absolute;transform:translate3d(var(--transform-left), var(--transform-top), 0)}.text-element.svelte-1ehv8iu{font-weight:var(--font-weight);font-style:var(--font-style, 'normal');text-decoration:var(--text-decoration, 'normal')}",
	map: null,
};
const TextElement = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let textElement2;
	let $textElements, $$unsubscribe_textElements;
	let $template, $$unsubscribe_template;
	$$unsubscribe_textElements = subscribe(textElements, (value) => ($textElements = value));
	$$unsubscribe_template = subscribe(template, (value) => ($template = value));
	let { id } = $$props;
	let textElementContainer;
	if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
	$$result.css.add(css$3);
	textElement2 = $textElements.get(id);
	$$unsubscribe_textElements();
	$$unsubscribe_template();
	return `<div class="${[
		'text-element-container svelte-1ehv8iu',
		!!textElement2.leftTransform || !!textElement2.topTransform ? 'positioned' : '',
	]
		.join(' ')
		.trim()}" draggable="true"${add_attribute('id', `text-element-${id}-template`, 0)} style="${
		'--color: ' +
		escape(textElement2.color, true) +
		'; --font-size: ' +
		escape((textElement2.fontSize || 0.22) * $template.relativeUnit, true) +
		'px; --transform-left: ' +
		escape(textElement2.leftTransform || 0, true) +
		'px; --transform-top: ' +
		escape(textElement2.topTransform || 0, true) +
		'px; --font-weight: ' +
		escape(textElement2.fontWeight, true) +
		'; --font-style: ' +
		escape(textElement2.fontStyle || 'normal', true) +
		'; --text-decoration: ' +
		escape(textElement2.textDecoration || 'normal', true) +
		'; --padding-top: ' +
		escape((textElement2.padding.top || 0) * $template.relativeUnit, true) +
		'px; --padding-right: ' +
		escape((textElement2.padding.right || 0) * $template.relativeUnit, true) +
		'px; --padding-bottom: ' +
		escape((textElement2.padding.bottom || 0) * $template.relativeUnit, true) +
		'px; --padding-left: ' +
		escape((textElement2.padding.left || 0) * $template.relativeUnit, true) +
		'px; --margin-top: ' +
		escape(
			typeof textElement2.margin.top === 'number'
				? `${(textElement2.margin.top || 0) * $template.relativeUnit}px`
				: textElement2.margin.top,
			true
		) +
		'; --margin-right: ' +
		escape(
			typeof textElement2.margin.right === 'number'
				? `${(textElement2.margin.right || 0) * $template.relativeUnit}px`
				: textElement2.margin.right,
			true
		) +
		'; --margin-bottom: ' +
		escape(
			typeof textElement2.margin.bottom === 'number'
				? `${(textElement2.margin.bottom || 0) * $template.relativeUnit}px`
				: textElement2.margin.bottom,
			true
		) +
		'; --margin-left: ' +
		escape(
			typeof textElement2.margin.left === 'number'
				? `${(textElement2.margin.left || 0) * $template.relativeUnit}px`
				: textElement2.margin.left,
			true
		) +
		'; --border-color: ' +
		escape(textElement2.border.color, true) +
		'; --border-top-width: ' +
		escape((textElement2.border.width.top || 0) * $template.relativeUnit, true) +
		'px; --border-right-width: ' +
		escape((textElement2.border.width.right || 0) * $template.relativeUnit, true) +
		'px; --border-bottom-width: ' +
		escape((textElement2.border.width.bottom || 0) * $template.relativeUnit, true) +
		'px; --border-left-width: ' +
		escape((textElement2.border.width.left || 0) * $template.relativeUnit, true) +
		'px; --border-top-left-radius: ' +
		escape((textElement2.border.radius.topLeft || 0) * $template.relativeUnit, true) +
		'px; --border-top-right-radius: ' +
		escape((textElement2.border.radius.topRight || 0) * $template.relativeUnit, true) +
		'px; --border-bottom-right-radius: ' +
		escape((textElement2.border.radius.bottomRight || 0) * $template.relativeUnit, true) +
		'px; --border-bottom-left-radius: ' +
		escape((textElement2.border.radius.bottomLeft || 0) * $template.relativeUnit, true) +
		'px;'
	}"${add_attribute(
		'this',
		textElementContainer,
		0
	)}><span data-svelte-h="svelte-1izv1wo">{</span><span class="text-element svelte-1ehv8iu">${escape(
		textElement2.title?.toLowerCase().split(' ').join('-')
	)}</span><span data-svelte-h="svelte-ax6d22">}</span> </div>`;
});
const css$2 = {
	code: '.template-container.svelte-77wbfi.svelte-77wbfi{height:100%}.card-container.svelte-77wbfi.svelte-77wbfi{flex-grow:1}.title.svelte-77wbfi.svelte-77wbfi{display:flex;align-items:center;column-gap:8px}.title.svelte-77wbfi input.svelte-77wbfi{flex-grow:1;font-size:2rem;font-weight:400;padding:0.5rem 1rem;border:none;outline:none !important;background:none !important}.card.svelte-77wbfi.svelte-77wbfi{margin:auto;position:relative;display:flex;flex-direction:column;height:var(--card-height);width:var(--card-width);border-top-left-radius:var(--card-border-top-left-radius);border-top-right-radius:var(--card-border-top-right-radius);border-bottom-right-radius:var(--card-border-bottom-right-radius);border-bottom-left-radius:var(--card-border-bottom-left-radius);background-color:var(--card-background-color);transform-origin:top left;overflow:hidden;padding:var(--card-top-padding) var(--card-right-padding) var(--card-bottom-padding)\n			var(--card-left-padding);box-sizing:border-box}.card.svelte-77wbfi .overlay.svelte-77wbfi{position:absolute;height:100%;width:100%;top:0;right:0;bottom:0;left:0;border-style:solid;border-color:var(--card-border-color);border-top-width:var(--card-border-top-width);border-right-width:var(--card-border-right-width);border-bottom-width:var(--card-border-bottom-width);border-left-width:var(--card-border-left-width);box-sizing:border-box;border-top-left-radius:var(--card-border-top-left-radius);border-top-right-radius:var(--card-border-top-right-radius);border-bottom-right-radius:var(--card-border-bottom-right-radius);border-bottom-left-radius:var(--card-border-bottom-left-radius);pointer-events:none}@media screen and (min-width: 640px){.card.svelte-77wbfi.svelte-77wbfi{margin:auto auto 3rem}}',
	map: null,
};
const Card = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $template, $$unsubscribe_template;
	let $textElements, $$unsubscribe_textElements;
	$$unsubscribe_template = subscribe(template, (value) => ($template = value));
	$$unsubscribe_textElements = subscribe(textElements, (value) => ($textElements = value));
	let cardContainer;
	$$result.css.add(css$2);
	{
		{
			if ($template?.title) {
				cardTemplate
					.getAll()
					.then(($cardTemplates) => cardTemplates.set($cardTemplates))
					.catch((error) => console.error(error));
			}
		}
	}
	$$unsubscribe_template();
	$$unsubscribe_textElements();
	return ` ${
		$template
			? `<div class="flex column template-container svelte-77wbfi"><div class="title svelte-77wbfi"><input id="card-title" type="text" class="svelte-77wbfi"${add_attribute(
					'value',
					$template.title,
					0
			  )}></div> <div class="flex card-container svelte-77wbfi"${add_attribute(
					'this',
					cardContainer,
					0
			  )}><div class="card svelte-77wbfi" style="${
					'--card-height: ' +
					escape($template.height * $template.relativeUnit, true) +
					'px; --card-width: ' +
					escape($template.width * $template.relativeUnit, true) +
					'px; --card-border-color: ' +
					escape($template.border.color, true) +
					'; --card-border-top-width: ' +
					escape(($template.border.width.top || 0) * $template.relativeUnit, true) +
					'px; --card-border-right-width: ' +
					escape(($template.border.width.right || 0) * $template.relativeUnit, true) +
					'px; --card-border-bottom-width: ' +
					escape(($template.border.width.bottom || 0) * $template.relativeUnit, true) +
					'px; --card-border-left-width: ' +
					escape(($template.border.width.left || 0) * $template.relativeUnit, true) +
					'px; --card-border-top-left-radius: ' +
					escape(($template.border.radius.topLeft || 0) * $template.relativeUnit, true) +
					'px; --card-border-top-right-radius: ' +
					escape(($template.border.radius.topRight || 0) * $template.relativeUnit, true) +
					'px; --card-border-bottom-right-radius: ' +
					escape(($template.border.radius.bottomRight || 0) * $template.relativeUnit, true) +
					'px; --card-border-bottom-left-radius: ' +
					escape(($template.border.radius.bottomLeft || 0) * $template.relativeUnit, true) +
					'px; --card-background-color: ' +
					escape($template.backgroundColor, true) +
					'; --card-top-padding: ' +
					escape(($template.padding.top || 0) * $template.relativeUnit, true) +
					'px; --card-right-padding: ' +
					escape(($template.padding.right || 0) * $template.relativeUnit, true) +
					'px; --card-bottom-padding: ' +
					escape(($template.padding.bottom || 0) * $template.relativeUnit, true) +
					'px; --card-left-padding: ' +
					escape(($template.padding.left || 0) * $template.relativeUnit, true) +
					'px;'
			  }"><div class="overlay svelte-77wbfi"></div> ${each(
					Array.from($textElements.keys()),
					(id) => {
						return `${validate_component(TextElement, 'TextElement').$$render(
							$$result,
							{ id: parseInt(id.toString()) },
							{},
							{}
						)}`;
					}
			  )}</div></div></div>`
			: ``
	}`;
});
const css$1 = {
	code: '.template-editor.svelte-oevn3t{flex-grow:1;position:relative}.card.svelte-oevn3t{flex-grow:1;position:relative;min-width:0}@media screen and (min-width: 640px){.template-editor.svelte-oevn3t{display:flex}}',
	map: null,
};
const TemplateEditor = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	$$result.css.add(css$1);
	return `<div class="flex template-editor svelte-oevn3t"><div class="card svelte-oevn3t">${validate_component(
		Card,
		'Card'
	).$$render($$result, {}, {}, {})}</div> </div>`;
});
const EditTemplate_svelte_svelte_type_style_lang = '';
const css = {
	code: '.editor.svelte-1hnp8r8{flex-grow:1;min-height:0}.main.svelte-1hnp8r8{flex-grow:1;position:relative;min-width:0}.sidebar.svelte-1hnp8r8{display:none}@media screen and (min-width: 640px){.drawer.svelte-1hnp8r8{display:none}.sidebar.svelte-1hnp8r8{display:block}}',
	map: null,
};
const EditTemplate = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $activeView, $$unsubscribe_activeView;
	$$unsubscribe_activeView = subscribe(activeView, (value) => ($activeView = value));
	$$result.css.add(css);
	$$unsubscribe_activeView();
	return ` <div class="flex column editor svelte-1hnp8r8"><div class="main flex svelte-1hnp8r8">${
		$activeView === 'template'
			? `${validate_component(TemplateEditor, 'TemplateEditor').$$render($$result, {}, {}, {})}`
			: ``
	} ${
		$activeView === 'print'
			? `${validate_component(PrintLayout, 'PrintLayout').$$render($$result, {}, {}, {})}`
			: ``
	}</div> ${``} ${`<div class="drawer svelte-1hnp8r8">${validate_component(
		Drawer,
		'Drawer'
	).$$render($$result, {}, {}, {})}</div>`} </div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	return `${validate_component(EditTemplate, 'EditTemplate').$$render($$result, {}, {}, {})}`;
});
export { Page as default };
