import { f as get_store_value } from "../../chunks/index2.js";
import { b as cardTemplate, c as cardTemplates, s as selectedCardTemplate, d as darkTheme, a as activeTabs } from "../../chunks/store.js";
import { s as setting, t as tab } from "../../chunks/tab.js";
import "../../chunks/index.js";
function load() {
  try {
    cardTemplate.getAll().then((templates) => {
      cardTemplates.set(templates);
      if (!get_store_value(selectedCardTemplate)) {
        selectedCardTemplate.set(templates[0]?.id);
      }
    }).catch((reason) => console.error({ reason }));
  } catch (error) {
    console.error(error);
  }
  try {
    setting.get("darkTheme").then((value) => {
      if (value) {
        darkTheme.set(true);
      }
    });
  } catch (error) {
    console.error(error);
  }
  try {
    tab.getAll().then((tabs) => {
      activeTabs.set(tabs);
    }).catch((error) => console.error(error));
  } catch (error) {
    console.error(error);
  }
}
export {
  load
};
