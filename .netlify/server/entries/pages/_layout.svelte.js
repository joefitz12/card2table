import { c as create_ssr_component, a as subscribe, b as add_attribute, e as each, d as escape, v as validate_component } from "../../chunks/index2.js";
import { d as darkTheme, m as menuExpanded, c as cardTemplates, a as activeTabs, t as template } from "../../chunks/store.js";
/* empty css                                                         */import { d as derived } from "../../chunks/index.js";
import { s as setting, t as tab } from "../../chunks/tab.js";
import "papaparse";
import { p as page } from "../../chunks/stores.js";
const app = "";
function client_method(key) {
  {
    if (key === "before_navigate" || key === "after_navigate" || key === "on_navigate") {
      return () => {
      };
    } else {
      const name_lookup = {
        disable_scroll_handling: "disableScrollHandling",
        preload_data: "preloadData",
        preload_code: "preloadCode",
        invalidate_all: "invalidateAll"
      };
      return () => {
        throw new Error(`Cannot call ${name_lookup[key] ?? key}(...) on the server`);
      };
    }
  }
}
const onNavigate = /* @__PURE__ */ client_method("on_navigate");
const afterNavigate = /* @__PURE__ */ client_method("after_navigate");
const css$4 = {
  code: '.theme-container[data-theme=dark].svelte-19qtoee .dark-theme.svelte-19qtoee{opacity:1}.theme-container[data-theme=dark].svelte-19qtoee .light-theme.svelte-19qtoee{opacity:0}.theme-container[data-theme=dark].svelte-19qtoee .bottom-portion.svelte-19qtoee{background-image:linear-gradient(to bottom, var(--dark-theme-background-color) 0%, var(--dark-theme-color) 100%)}.theme-container[data-theme=light].svelte-19qtoee .light-theme.svelte-19qtoee{opacity:1}.theme-container[data-theme=light].svelte-19qtoee .dark-theme.svelte-19qtoee{opacity:0}.theme-container[data-theme=light].svelte-19qtoee .bottom-portion.svelte-19qtoee{background-image:linear-gradient(to bottom, var(--light-theme-background-color) 0%, var(--light-theme-color) 100%)}.background.svelte-19qtoee.svelte-19qtoee{content:" ";position:absolute;top:0;right:0;bottom:0;left:0;height:100vh;width:100vw;max-width:100vw;transition:opacity 150ms ease-in-out}@keyframes svelte-19qtoee-drift{from{background-position-x:0px;background-position-y:0px}to{background-position-x:var(--graph-unit);background-position-y:calc(-2 * var(--graph-unit))}}.top-portion.svelte-19qtoee.svelte-19qtoee{content:" ";position:absolute;top:0;left:0;right:0;height:70vh;width:100vw;max-width:100vw;background-image:radial-gradient(circle, pink 1px, rgba(0, 0, 0, 0) 1px);background-size:var(--graph-unit) var(--graph-unit);animation:svelte-19qtoee-drift 10000ms infinite linear}.bottom-portion.svelte-19qtoee.svelte-19qtoee{content:" ";position:absolute;bottom:0;left:0;right:0;height:30vh;width:100vw;max-width:100vw}',
  map: null
};
const Background = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $darkTheme, $$unsubscribe_darkTheme;
  $$unsubscribe_darkTheme = subscribe(darkTheme, (value) => $darkTheme = value);
  $$result.css.add(css$4);
  $$unsubscribe_darkTheme();
  return `<div class="${"theme-container flex column svelte-19qtoee"}"${add_attribute("data-theme", $darkTheme ? "dark" : "light", 0)}><div class="${"background light-theme svelte-19qtoee"}"><div class="${"top-portion svelte-19qtoee"}"></div>
		<div class="${"bottom-portion svelte-19qtoee"}"></div></div>
	<div class="${"background dark-theme svelte-19qtoee"}"><div class="${"top-portion svelte-19qtoee"}"></div>
		<div class="${"bottom-portion svelte-19qtoee"}"></div></div>
</div>`;
});
const css$3 = {
  code: "header.svelte-1hzxw4u.svelte-1hzxw4u{view-transition-name:header;justify-content:space-between;padding:0 0.5rem;z-index:1;position:sticky;top:0}nav.svelte-1hzxw4u.svelte-1hzxw4u{display:flex;justify-content:space-between;align-items:center;height:48px;min-height:48px}button.menu.svelte-1hzxw4u.svelte-1hzxw4u{justify-content:center;background:transparent;border:none;width:3rem;height:3rem;font-size:2rem;gap:0}a.title.svelte-1hzxw4u.svelte-1hzxw4u{font-size:1.75rem}ul.svelte-1hzxw4u.svelte-1hzxw4u{padding:0;gap:0.5rem}li.svelte-1hzxw4u.svelte-1hzxw4u{margin:0}.theme.svelte-1hzxw4u.svelte-1hzxw4u{display:inline-block;height:calc(1.5rem + 2px);position:relative;width:calc(2.75rem + 2px)}.theme.svelte-1hzxw4u input.svelte-1hzxw4u{display:none}.slider.svelte-1hzxw4u.svelte-1hzxw4u{bottom:0;cursor:pointer;left:0;position:absolute;right:0;top:0;transition:0.4s;border:1px solid #ccc;border-radius:1.5rem}.slider.dark-theme.svelte-1hzxw4u.svelte-1hzxw4u{background-color:#2b2b2b}.slider.dark-theme.svelte-1hzxw4u.svelte-1hzxw4u:before{box-shadow:inset 0.35rem -0.25rem 0 0.01rem #f3d076;background-color:transparent;bottom:0.125rem;left:0.125rem;content:' ';height:1.25rem;width:1.25rem;position:absolute;transition:0.4s}.slider.light-theme.svelte-1hzxw4u.svelte-1hzxw4u:before{background-color:#f3d076;background-image:radial-gradient(#f3d076, orange);border:1px dashed orange;box-sizing:border-box;bottom:0.125rem;left:0.125rem;content:' ';height:1.25rem;width:1.25rem;position:absolute;transition:0.4s}input.svelte-1hzxw4u:checked+.slider.svelte-1hzxw4u{background-color:#2b2b2b}input.svelte-1hzxw4u:checked+.slider.svelte-1hzxw4u:after,input.svelte-1hzxw4u:checked+.slider.svelte-1hzxw4u:before{transform:translateX(1.25rem)}.slider.round.svelte-1hzxw4u.svelte-1hzxw4u{border-radius:1.5rem}.slider.round.svelte-1hzxw4u.svelte-1hzxw4u:after,.slider.round.svelte-1hzxw4u.svelte-1hzxw4u:before{border-radius:50%}@media print{header.svelte-1hzxw4u.svelte-1hzxw4u{display:none}}",
  map: null
};
const Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $darkTheme, $$unsubscribe_darkTheme;
  $$unsubscribe_darkTheme = subscribe(darkTheme, (value) => $darkTheme = value);
  darkTheme.subscribe((value) => {
    if (value) {
      setting.add({ id: "darkTheme" }).then((success) => console.log(success)).catch((error) => console.error(error));
    } else if (value !== void 0) {
      setting.delete("darkTheme").then((success) => console.log(success));
    }
  });
  $$result.css.add(css$3);
  $$unsubscribe_darkTheme();
  return `<header class="${"flex align-center svelte-1hzxw4u"}"><nav id="${"main-nav"}" class="${"svelte-1hzxw4u"}"><ul class="${"flex align-center svelte-1hzxw4u"}"><li class="${"svelte-1hzxw4u"}"><button class="${"menu flex align-center svelte-1hzxw4u"}">☰</button></li>
			<li class="${"svelte-1hzxw4u"}"><a class="${"title svelte-1hzxw4u"}" href="${"/"}">card2table</a></li>
			
			
			</ul></nav>
	<label class="${"theme svelte-1hzxw4u"}" for="${"theme-toggle"}"><input type="${"checkbox"}" id="${"theme-toggle"}" class="${"svelte-1hzxw4u"}"${add_attribute("checked", $darkTheme, 1)}>
		<div class="${[
    "slider round svelte-1hzxw4u",
    ($darkTheme ? "dark-theme" : "") + " " + (!$darkTheme ? "light-theme" : "")
  ].join(" ").trim()}"></div></label>
</header>`;
});
const css$2 = {
  code: ".overlay.svelte-d6jr5n.svelte-d6jr5n{width:100%;height:calc(100vh - 48px);max-height:calc(100vh - 48px);position:absolute;top:0;right:0;bottom:0;left:0;pointer-events:none}.overlay.expanded.svelte-d6jr5n.svelte-d6jr5n{z-index:3;pointer-events:all}.menu.svelte-d6jr5n.svelte-d6jr5n{view-transition-name:menu;position:absolute;top:0;left:0;height:calc(100vh - 48px);max-height:calc(100vh - 48px);width:300px;padding:1rem;gap:0.5rem;transition:transform 60ms ease-in-out, opacity 60ms ease-in-out;background-color:var(--transparent-background-color);z-index:4;row-gap:0.5rem;transform:translateX(-100%);opacity:0}.menu.expanded.svelte-d6jr5n.svelte-d6jr5n{transform:translateX(0);opacity:1}.menu.svelte-d6jr5n h2.svelte-d6jr5n{margin:0}.menu.svelte-d6jr5n ol.svelte-d6jr5n{padding:0;margin:0;row-gap:0.25rem}.menu.svelte-d6jr5n li.svelte-d6jr5n{width:100%;margin:0;justify-content:space-between;--column-gap:8px;column-gap:var(--column-gap)}.menu.svelte-d6jr5n li a.svelte-d6jr5n{flex-grow:1;font-size:1.25rem;line-height:1.25rem;max-width:calc(100% - 24px - var(--column-gap));overflow:hidden;text-overflow:ellipsis}",
  map: null
};
const Menu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $menuExpanded, $$unsubscribe_menuExpanded;
  let $cardTemplates, $$unsubscribe_cardTemplates;
  $$unsubscribe_menuExpanded = subscribe(menuExpanded, (value) => $menuExpanded = value);
  $$unsubscribe_cardTemplates = subscribe(cardTemplates, (value) => $cardTemplates = value);
  $$result.css.add(css$2);
  $$unsubscribe_menuExpanded();
  $$unsubscribe_cardTemplates();
  return `<div class="${["overlay svelte-d6jr5n", $menuExpanded ? "expanded" : ""].join(" ").trim()}"></div>
<div class="${["menu flex column svelte-d6jr5n", $menuExpanded ? "expanded" : ""].join(" ").trim()}"><div class="${"flex row align-center"}"><h2 class="${"svelte-d6jr5n"}">Templates</h2>
		<button aria-label="${"create new card template"}" title="${"create new card template"}" class="${"create"}">+</button></div>
	<ol class="${"flex column svelte-d6jr5n"}">${$cardTemplates ? `${each($cardTemplates, (template2) => {
    return `<li class="${"template flex align-center svelte-d6jr5n"}"><a${add_attribute("aria-label", `Edit ${template2.title}`, 0)}${add_attribute("href", `/template/${template2.id}`, 0)} class="${"svelte-d6jr5n"}">${escape(template2.title)}</a>
					<button type="${"button"}"${add_attribute("aria-label", `Remove ${template2.title}`, 0)} class="${"delete"}">✕</button>
				</li>`;
  })}` : ``}</ol>
</div>`;
});
const css$1 = {
  code: "ol.svelte-14x8pzf.svelte-14x8pzf{margin:0;padding:0;min-width:0;overflow-x:auto;overflow-y:clip;max-width:100%;position:sticky;gap:0;top:48px;height:34px;min-height:34px}ol.svelte-14x8pzf li.svelte-14x8pzf{margin:0;color:lightgrey;padding-right:0.5rem}ol.svelte-14x8pzf li a.svelte-14x8pzf{padding:0.5rem;white-space:nowrap;max-width:5rem;overflow:hidden;text-overflow:ellipsis}ol.svelte-14x8pzf li.svelte-14x8pzf:has(a.active){background:lightblue}ol.svelte-14x8pzf li.svelte-14x8pzf:hover{background:lightsteelblue}button.delete.svelte-14x8pzf.svelte-14x8pzf{background:transparent}button.delete.svelte-14x8pzf.svelte-14x8pzf:hover{background:transparent;box-shadow:rgba(99, 99, 99, 0.2) 0px 2px 8px 0px}@media print{ol.tabs.svelte-14x8pzf.svelte-14x8pzf{display:none}}",
  map: null
};
const Tabs = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $activeTabs, $$unsubscribe_activeTabs;
  let $menuExpanded, $$unsubscribe_menuExpanded;
  let $page, $$unsubscribe_page;
  $$unsubscribe_activeTabs = subscribe(activeTabs, (value) => $activeTabs = value);
  $$unsubscribe_menuExpanded = subscribe(menuExpanded, (value) => $menuExpanded = value);
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  const templateTitle = derived(template, ($template) => {
    if (!$template) {
      return void 0;
    }
    return { title: $template.title, id: $template.id };
  });
  templateTitle.subscribe((value) => {
    if (value) {
      tab.get({ type: "template", itemId: value.id }).then(($tab) => {
        if ($tab) {
          return tab.update({ ...$tab, title: value.title });
        }
      }).then((res) => {
        if (res) {
          return tab.getAll();
        }
      }).then((tabs2) => {
        if (tabs2) {
          return activeTabs.set(tabs2);
        }
      }).catch((error) => console.error(error));
    }
  });
  afterNavigate((navigation) => {
    if (navigation.to?.url.toString().includes("template") && $menuExpanded) {
      menuExpanded.set(false);
    }
  });
  let tabs = $activeTabs;
  activeTabs.subscribe((value) => tabs = value);
  $$result.css.add(css$1);
  $$unsubscribe_activeTabs();
  $$unsubscribe_menuExpanded();
  $$unsubscribe_page();
  return `<ol class="${"tabs flex svelte-14x8pzf"}">${tabs.size ? `${each(Array.from(tabs.values()), ({ id, itemId, title, type }) => {
    return `<li class="${"template flex align-center svelte-14x8pzf"}"><a${add_attribute("aria-label", `Edit ${title}`, 0)}${add_attribute("href", `/${type}/${itemId}`, 0)} class="${[
      "svelte-14x8pzf",
      [`/${type}/${itemId}`, `/${type}/${itemId}/`].includes($page.url.pathname) ? "active" : ""
    ].join(" ").trim()}">${escape(title)}</a>
				<button type="${"button"}"${add_attribute("aria-label", `Close template ${title}`, 0)} class="${"delete svelte-14x8pzf"}">✕</button>
			</li>`;
  })}` : ``}
</ol>`;
});
const _layout_svelte_svelte_type_style_lang = "";
const css = {
  code: ":root{--graph-unit:65px}.main-container.svelte-1rnw6jh{gap:0;height:100vh;max-width:100vw;overflow-x:clip;transition:color 150ms ease-in-out, background-color 150ms ease-in-out;background-color:var(--background-color);color:var(--color);position:relative;overflow:clip}.main-container[data-theme=dark].svelte-1rnw6jh{--color:var(--dark-theme-color);--background-color:var(--dark-theme-background-color);--transparent-background-color:var(--dark-theme-transparent-background-color)}main.svelte-1rnw6jh{z-index:1;flex-grow:1;gap:0;position:relative}",
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $darkTheme, $$unsubscribe_darkTheme;
  let $page, $$unsubscribe_page;
  $$unsubscribe_darkTheme = subscribe(darkTheme, (value) => $darkTheme = value);
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  onNavigate((navigation) => {
    if (!("startViewTransition" in document))
      return;
    return new Promise((resolve) => {
      document.startViewTransition(async () => {
        resolve();
        await navigation.complete;
      });
    });
  });
  $$result.css.add(css);
  $$unsubscribe_darkTheme();
  $$unsubscribe_page();
  return `<div class="${"main-container flex column svelte-1rnw6jh"}"${add_attribute("data-theme", $darkTheme ? "dark" : "light", 0)}>${!$page.url.pathname.includes("template") ? `${validate_component(Background, "Background").$$render($$result, {}, {}, {})}` : ``}
	${validate_component(Header, "Header").$$render($$result, {}, {}, {})}
	<main class="${"flex column svelte-1rnw6jh"}">${validate_component(Menu, "Menu").$$render($$result, {}, {}, {})}
		${validate_component(Tabs, "Tabs").$$render($$result, {}, {}, {})}
		${slots.default ? slots.default({}) : ``}</main>
</div>`;
});
export {
  Layout as default
};
