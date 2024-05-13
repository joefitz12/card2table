import { db } from "$lib/db";
import { TextElement } from "$lib/models/TextElement";
import { dbTextElements } from "$lib/store";
import { UITextElement } from "$lib/utils/uiTextElement";
import { error } from "@sveltejs/kit";
import { get, type Writable } from "svelte/store";

export const textElement = {
    add: function ({ templateId }: { templateId: number }) {
        db.open((db) => {
            // Init add Card Template transaction
            const transaction = db.transaction(['textElement'], 'readwrite');
            const textElements = transaction.objectStore('textElement');

            const addTextElement = textElements.add(new TextElement({ templateId }));

            addTextElement.onsuccess = () => {
                this.getAllByTemplateId(templateId);
            };
        });
    },
    update: function (textElement: UITextElement) {
        db.open(db => {
            // Init add Text Element transaction
            const transaction = db.transaction(['textElement'], 'readwrite');
            const textElements = transaction.objectStore('textElement');
            const {
                onMouseleave,
                onMouseover,
                template,
                getControl,
                getTemplate,
                ..._textElement
            } = textElement;

            const updateTextElement = textElements.put(_textElement);

            updateTextElement.onsuccess = () => {
                // Open cursor on textElements
                this.getAllByTemplateId(_textElement.templateId);
            }

            updateTextElement.onerror = () => {
                console.log('error updating text element');
            }
        });
    },
    getAllByTemplateId: function (templateId: string | number | undefined) {
        if (!templateId) {
            return error(404, {
                message: 'Empty templateId'
            })
        }

        db.open((db) => {
            // Init textElement transaction
            const transaction = db.transaction('textElement');
            const textElements = transaction.objectStore('textElement').index('templateId');

            // Open cursor on textElements
            const openCursorRequest = textElements.openCursor(typeof templateId === 'string' ? parseInt(templateId) : templateId);
            openCursorRequest.onsuccess = () => {
                // Retrieve the cursor from the result
                let cursor = openCursorRequest.result as IDBCursorWithValue;

                // Cursor is empty
                if (!cursor) {
                    return db.close();
                }

                // No template match
                const isNotTemplateMatch = (cursor.value as TextElement).templateId !== templateId;


                // if (isNotTemplateMatch) {
                //     console.log('not a match!!!');
                //     cursor.continue();
                // }
                // else {
                dbTextElements.update($dbTextElements => $dbTextElements.set(parseInt(cursor.value.id), cursor.value));
                cursor.continue();
                // }

            };
            openCursorRequest.onerror = () => {
                console.error({ error: openCursorRequest })
            }
        });
    },
    delete: function ({ id }: { id: number | string }) {
        db.open((db) => {
            console.log({
                'get(dbTextElements)': get(dbTextElements)
            });
            console.log('deleting!!!');
            console.log({ id });
            // Init textElement transaction
            const transaction = db.transaction('textElement', 'readwrite');
            const textElements = transaction.objectStore('textElement');

            const deleteTextElement = textElements.delete(id);

            deleteTextElement.onsuccess = () => {
                console.log('text element successfully deleted!');

                db.close();

                dbTextElements.update($dbTextElements => {
                    console.log({ $dbTextElements });
                    console.log({ '$dbTextElements.get(typeof id === "string" ? parseInt(id) : id)': $dbTextElements.get(typeof id === 'string' ? parseInt(id) : id) });
                    $dbTextElements.delete(typeof id === 'string' ? parseInt(id) : id);
                    return $dbTextElements;
                });
            }
            deleteTextElement.onerror = () => {
                console.log('error deleting text element');
                console.log({ deleteTextElement });
            }
        })
    }
}