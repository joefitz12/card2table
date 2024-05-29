import { b as cardTemplate, c as cardTemplates, s as selectedCardTemplate } from "../../../chunks/store.js";
import { f as get_store_value } from "../../../chunks/index2.js";
function load({ params }) {
  cardTemplate.getAll().then((templates) => {
    cardTemplates.set(templates);
    if (!get_store_value(selectedCardTemplate)) {
      selectedCardTemplate.set(templates[0]?.id);
    }
  }).catch((reason) => console.error({ reason }));
  console.log({ params });
}
export {
  load
};
