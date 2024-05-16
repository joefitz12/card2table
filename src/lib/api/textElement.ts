import { db } from "$lib/db";
import { TextElement } from "$lib/models/TextElement";
import { dbTextElements } from "$lib/store";
import { UITextElement } from "$lib/utils/uiTextElement";
import { error } from "@sveltejs/kit";
import { get, type Writable } from "svelte/store";

export const textElement = {
    add: function ({ templateId }: { templateId: number }) {
        return new Promise<IDBValidKey>((resolve, reject) => {
            db.open((db) => {
                // Init add Card Template transaction
                const transaction = db.transaction(['textElement'], 'readwrite');
                const textElements = transaction.objectStore('textElement');

                const addTextElement = textElements.add(new TextElement({ templateId }));

                addTextElement.onsuccess = () => {
                    resolve(addTextElement.result)
                };

                addTextElement.onerror = () => {
                    reject({ addTextElement })
                }
            });
        });
    },
    update: function (textElement: UITextElement) {
        return new Promise<IDBValidKey>((resolve, reject) => {
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
                    resolve(updateTextElement.result)
                }

                updateTextElement.onerror = () => {
                    reject({ updateTextElement })
                }
            });
        });
    },
    getById: function (id: IDBValidKey) {
        return new Promise<TextElement & { id: IDBValidKey }>((resolve, reject) => {
            if (!id) {
                return error(404, {
                    message: 'Empty templateId'
                })
            }
            db.open((db) => {
                // Init textElement transaction
                const transaction = db.transaction('textElement');
                const textElementObjectStore = transaction.objectStore('textElement');

                // Open cursor on textElements
                const getTextElement = textElementObjectStore.get(parseInt(id.toString()));
                getTextElement.onsuccess = () => {
                    return resolve(getTextElement.result)

                };
                getTextElement.onerror = () => {
                    return reject({ getTextElement })
                }
            });

        });
    },
    getAllByTemplateId: function (templateId: IDBValidKey) {
        return new Promise<Map<number, TextElement>>((resolve, reject) => {
            if (!templateId) {
                return error(404, {
                    message: 'Empty templateId'
                })
            }

            db.open((db) => {
                // Init textElement transaction
                const transaction = db.transaction('textElement');
                const textElementObjectStore = transaction.objectStore('textElement').index('templateId');
                const textElements = new Map();

                // Open cursor on textElements
                const openCursorRequest = textElementObjectStore.openCursor(typeof templateId === 'string' ? parseInt(templateId) : templateId);
                openCursorRequest.onsuccess = () => {
                    // Retrieve the cursor from the result
                    let cursor = openCursorRequest.result as IDBCursorWithValue;

                    // Cursor is empty
                    if (cursor) {
                        // dbTextElements.update($dbTextElements => $dbTextElements.set(parseInt(cursor.value.id), cursor.value));
                        textElements.set(parseInt(cursor.value.id), cursor.value);
                        cursor.continue();
                    }
                    else {
                        db.close();
                        return resolve(textElements)
                    }
                };
                openCursorRequest.onerror = () => {
                    return reject({ error: openCursorRequest })
                }
            });
        })
    },
    delete: function ({ id }: { id: IDBValidKey }) {
        return new Promise<void>((resolve, reject) => {
            db.open((db) => {
                // console.log({
                //     'get(dbTextElements)': get(dbTextElements)
                // });
                // console.log('deleting!!!');
                // console.log({ id });
                // Init textElement transaction
                const transaction = db.transaction('textElement', 'readwrite');
                const textElements = transaction.objectStore('textElement');

                const deleteTextElement = textElements.delete(id);

                deleteTextElement.onsuccess = () => {
                    console.log('text element successfully deleted!');

                    db.close();

                    return resolve();
                }
                deleteTextElement.onerror = () => {
                    console.log('error deleting text element');
                    return reject({ deleteTextElement });
                }
            })
        });
    }
}