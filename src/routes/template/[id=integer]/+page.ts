import { cardTemplate } from "$lib/api/cardTemplate";
import { textElement } from "$lib/api/textElement.js";
import { TextElement } from "$lib/models/TextElement.js";
import { state, template, textElements } from "$lib/store";
import { UICardTemplate } from "$lib/utils/uiCardTemplate.js";
import { UITextElement } from "$lib/utils/uiTextElement";
import { get } from "svelte/store";

export function load({ params }) {
    cardTemplate.getById(params.id)
        .then((data) => {
            template.update($template => {
                return {
                    ...$template,
                    ...new UICardTemplate({ ...data, textElements: [] }),
                }
            });
            console.log('getting template');
        }).then(() => {
            return textElement.getAllByTemplateId(params.id)
        }).then(data => {
            textElements.update($textElements => {
                Array.from($textElements.keys()).forEach(textElement => {
                    if (!data.get(parseInt(textElement.toString()))) {
                        $textElements.delete(textElement)
                    }
                });

                if (data) {
                    Array.from(data.keys()).forEach(key => {
                        if (!$textElements.get(key)) {
                            $textElements.set(key, new UITextElement(data.get(key) as TextElement & { id: number }));
                        }
                    })
                }

                return $textElements;
            });
        });
}