import { db } from "$lib/db"
import { card } from "./card";

export const csv = {
    add: function ({ filename }: { filename: string }) {
        return new Promise<IDBValidKey>((resolve, reject) => {
            db.open((db) => {
                const csvTransaction = db.transaction('csv', 'readwrite');
                const csvObjectStore = csvTransaction.objectStore('csv');
                const addCsv = csvObjectStore.add({ filename });

                addCsv.onsuccess = () => {
                    return resolve(addCsv.result);
                }
                addCsv.onerror = () => {
                    return reject('Failed to add CSV');
                }
            });
        });
    },
    getAllItems: function () {
        return new Promise<{ filename: string, id: number }[]>((resolve, reject) => {
            db.open(db => {
                const cursorRequest =
                    db.transaction('csv').objectStore('csv').openCursor();
                const items: any[] = [];

                cursorRequest.onerror = () => {
                    reject('Failed to retrieve items');
                };

                cursorRequest.onsuccess = () => {
                    const cursor = cursorRequest.result;
                    if (cursor) {
                        items.push(cursor.value);
                        cursor.continue();
                    } else {
                        // Resolve the promise once the cursor is done
                        resolve(items);
                    }
                };
            });
        });
    }
}