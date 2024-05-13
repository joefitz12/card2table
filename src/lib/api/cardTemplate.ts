import { goto } from "$app/navigation";
import { db } from "$lib/db";
import { CardTemplate } from "$lib/models/CardTemplate";
import { dbTemplates, dbTextElements, state } from "$lib/store";
import { processCursor } from "$lib/utils/processCursor";
import { UICardTemplate } from "$lib/utils/uiCardTemplate";
import { error } from "@sveltejs/kit";
import { textElement } from "./textElement";

const cardTemplate = {
    add: function () {
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
                            console.log('NAVIGATING');
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
    getById: function (id: string | number | undefined) {
        if (!id) {
            return error(404, {
                message: 'Not found'
            })
        }
        db.open((db) => {
            const transaction = db.transaction(['template']);
            const templates = transaction.objectStore('template');
            const getTemplate = templates.get(typeof id === 'string' ? parseInt(id) : id);

            getTemplate.onsuccess = () => {
                const template = getTemplate.result;

                if (!template) {
                    console.log('did not find');
                    return;
                }

                state.update(($state) => {
                    return {
                        ...$state,
                        template: {
                            ...new UICardTemplate({
                                ...template,
                            }),
                        },
                    };
                });

                db.close()

                dbTextElements.update($dbTextElements => {
                    $dbTextElements.clear();
                    return $dbTextElements;
                });

                textElement.getAllByTemplateId(id);
            };
        });
    },
    getAll: function () {
        db.open((db) => {
            dbTemplates.update($dbTemplates => {
                $dbTemplates.clear();
                return $dbTemplates;
            });

            // Init template transaction
            const transaction = db.transaction('template');
            const templates = transaction.objectStore('template');

            // Get all cards
            const openCursorRequest = templates.openCursor();
            openCursorRequest.onsuccess = () => {
                // Retrieve the cursor from the result
                let cursor = openCursorRequest.result as IDBCursorWithValue;

                if (!cursor) {
                    return;
                }

                // Update the collection (`dbTemplates`) with the data from the cursor
                dbTemplates.update(($dbTemplates) => $dbTemplates.set(cursor.value.id, cursor.value));

                cursor.continue()
            };
        });
    },
    updateById: function ({ template }: { template: InstanceType<typeof CardTemplate> & { id: string | number | undefined } }) {
        if (!template.id) {
            return error(404, { message: 'Cannot update, no ID' });
        }
        db.open(db => {
            // Init add Card Template transaction
            const transaction = db.transaction(['template'], 'readwrite');
            const templateObjectStore = transaction.objectStore('template');

            // Update Card
            const updateRequest = templateObjectStore.put(template);

            updateRequest.onsuccess = (event) => {
                // console.log('success!!!', event);
            };
            updateRequest.onerror = (event) => {
                console.log('fail', event);
            };
        })
    },
    delete: function ({ id }: { id: number }) {
        db.open(db => {
            // Init add Card Template transaction
            const transaction = db.transaction(['template'], 'readwrite');
            const templateObjectStore = transaction.objectStore('template');

            const deleteRequest = templateObjectStore.delete(id);

            deleteRequest.onsuccess = () => {
                this.getAll();
            }
            deleteRequest.onerror = () => {
                console.error({ deleteRequest });
            }
        })
    }
};

export { cardTemplate };