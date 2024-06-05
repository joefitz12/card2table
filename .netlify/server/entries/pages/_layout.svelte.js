import { s as subscribe } from "../../chunks/utils.js";
import { c as create_ssr_component } from "../../chunks/ssr.js";
import { d as darkTheme } from "../../chunks/store.js";
/* empty css                                                         */import "../../chunks/index.js";
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
const _layout_svelte_svelte_type_style_lang = "";
const css = {
  code: ":root{--graph-unit:65px}.main-container.svelte-vyr9f7{--app-max-height:calc(var(--window-height) * 1px);gap:0;height:var(--app-max-height);max-width:100vw;overflow-x:clip;transition:color 150ms ease-in-out, background-color 150ms ease-in-out;background-color:var(--background-color);color:var(--color);position:relative;overflow:clip}.main-container[data-theme=dark].svelte-vyr9f7{--color:var(--dark-theme-color);--background-color:var(--dark-theme-background-color);--transparent-background-color:var(--dark-theme-transparent-background-color)}main.svelte-vyr9f7{z-index:1;flex-grow:1;gap:0;position:relative}.tabs.svelte-vyr9f7{flex-basis:0;grid-template-rows:0fr;overflow:hidden}@media screen and (min-width: 640px){.tabs.svelte-vyr9f7{flex-basis:auto}}",
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_darkTheme;
  let $$unsubscribe_page;
  $$unsubscribe_darkTheme = subscribe(darkTheme, (value) => value);
  $$unsubscribe_page = subscribe(page, (value) => value);
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
  return ` ${``}`;
});
export {
  Layout as default
};
