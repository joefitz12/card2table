import { b as cardTemplate, s as selectedCardTemplate, e as csvs, f as selectedCsv, c as cardTemplates } from "../../../chunks/store.js";
import { c as csv } from "../../../chunks/csv.js";
import { f as get_store_value } from "../../../chunks/index2.js";
function load() {
  cardTemplate.getAll().then((templates) => {
    cardTemplates.set(templates);
    if (!get_store_value(selectedCardTemplate)) {
      selectedCardTemplate.set(templates[0]?.id);
    }
  }).catch((reason) => console.error({ reason }));
  csv.getAll().then((files) => {
    csvs.set(files);
    if (!get_store_value(selectedCsv)) {
      selectedCsv.set(files[0]?.id);
    }
  }).catch((reason) => console.error({ reason }));
}
export {
  load
};
