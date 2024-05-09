import { goto } from "$app/navigation";
import { db } from "$lib/db";
import { CardTemplate } from "$lib/models/CardTemplate";
import { dbTemplates, dbTextElements, state } from "$lib/store";
import { processCursor } from "$lib/utils/processCursor";
import { UICardTemplate } from "$lib/utils/uiCardTemplate";
import { textElement } from "./textElement";

const cardTemplate = {
    add: () => {
        let templateId: IDBValidKey;

        db.open((db) => {
            // Init add Card Template transaction
            const transaction = db.transaction(['template'], 'readwrite');
            const template = transaction.objectStore('template');

            // Add Card
            const addRequest = template.add(new CardTemplate());

            addRequest.onsuccess = () => {
                templateId = addRequest.result;
                // Init add to textElement
                // const textElementTransaction = db.transaction(['textElement'], 'readwrite');
                // const textElements = textElementTransaction.objectStore('textElement');
                // const addTextElement = textElements.add([], templateId);

                // addTextElement.onsuccess = () => {
                // Init get all cards transaction
                const templateTransaction = db.transaction('template');
                const templates = templateTransaction.objectStore('template');

                // Get all cards
                const openCursorRequest = templates.openCursor();
                openCursorRequest.onsuccess = () => {
                    // Retrieve the cursor from the result
                    let cursor = openCursorRequest.result as IDBCursorWithValue;
                    const templates = new Map();

                    // Process the cursor and return a promise
                    processCursor(cursor, (cursor) => {
                        // Update the collection (`templates`) with the data from the cursor
                        templates.set(parseInt(cursor.key.toString()), cursor.value);
                    })
                        .then(() => {
                            dbTemplates.set(templates);
                            goto(`/template/${templateId}`);
                        })
                        .catch((error) => {
                            console.error('Error processing cursor:', error);
                        });
                };
                openCursorRequest.onerror = (event) => {
                    console.log('Open Cursor Request error: ', event);
                };
                // }
            };
            addRequest.onerror = (event) => {
                console.log('fail', event);
            };
        });
    },
    getById: ({ id }: { id: string }) => {
        db.open((db) => {
            const transaction = db.transaction(['template']);
            const templates = transaction.objectStore('template');
            const getTemplate = templates.get(parseInt(id));

            getTemplate.onsuccess = () => {
                const template = getTemplate.result;

                if (!template) {
                    return;
                }

                state.update(($state) => {
                    return {
                        ...$state,
                        template: {
                            ...new UICardTemplate({
                                ...template,
                                id,
                            }),
                        },
                    };
                });

                db.close()

                dbTextElements.update($dbTextElements => {
                    $dbTextElements.clear();
                    return $dbTextElements;
                });

                textElement.getAllByTemplateId({ templateId: parseInt(id) });
            };
        });
    },
    getAll: () => {
        db.open((db) => {
            // Init template transaction
            const transaction = db.transaction('template');
            const templates = transaction.objectStore('template');
            let templatesMap = new Map();

            // Get all cards
            const openCursorRequest = templates.openCursor();
            openCursorRequest.onsuccess = () => {
                // Retrieve the cursor from the result
                let cursor = openCursorRequest.result as IDBCursorWithValue;

                if (!cursor) {
                    return;
                }

                // Update the collection (`dbTemplates`) with the data from the cursor
                templatesMap.set(cursor.key.toString(), cursor.value);
                dbTemplates.update(($dbTemplates) => $dbTemplates.set(parseInt(cursor.key.toString()), cursor.value));

                cursor.continue()
            };
        });
    },
    updateById: ({ id, template }: { id: number, template: InstanceType<typeof CardTemplate> }) => {
        db.open(db => {
            // Init add Card Template transaction
            const transaction = db.transaction(['template'], 'readwrite');
            const templateObjectStore = transaction.objectStore('template');

            // Update Card
            const updateRequest = templateObjectStore.put(template, id);

            updateRequest.onsuccess = (event) => {
                // console.log('success!!!', event);
            };
            updateRequest.onerror = (event) => {
                console.log('fail', event);
            };
        })
    }
};

export { cardTemplate };