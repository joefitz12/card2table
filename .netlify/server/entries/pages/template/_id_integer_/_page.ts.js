import { b as cardTemplate, t as template, h as textElements, a as activeTabs, d as darkTheme } from "../../../../chunks/store.js";
import { t as tab, s as setting } from "../../../../chunks/tab.js";
import { t as textElement, U as UITextElement } from "../../../../chunks/uiTextElement.js";
import { U as UICardTemplate } from "../../../../chunks/uiCardTemplate.js";
import { f as get_store_value } from "../../../../chunks/index2.js";
function load({ params }) {
  try {
    cardTemplate.getById(params.id).then((data) => {
      template.update(($template) => {
        return {
          ...$template,
          ...new UICardTemplate({ ...data })
        };
      });
    }).then(() => textElement.getAllByTemplateId(params.id)).then((data) => {
      textElements.update(($textElements) => {
        Array.from($textElements.keys()).forEach((textElement2) => {
          if (!data.get(parseInt(textElement2.toString()))) {
            $textElements.delete(textElement2);
          }
        });
        if (data) {
          Array.from(data.keys()).forEach((key) => {
            if (!$textElements.get(key)) {
              $textElements.set(key, new UITextElement(data.get(key)));
            }
          });
        }
        return $textElements;
      });
      return tab.add({ itemId: parseInt(params.id), type: "template", title: get_store_value(template).title });
    }).then(() => tab.getAll()).then((tabs) => activeTabs.set(tabs)).catch((error) => console.error(error));
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
}
export {
  load
};
