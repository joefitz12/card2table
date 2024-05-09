import { browser } from "$app/environment"

export function open(callback: (db: IDBDatabase) => void) {
    if (browser && window.indexedDB) {
        const openRequest = indexedDB.open("Card2Table2", 1);
        openRequest.onerror = () => {
            console.error(`Cannot connect: ${openRequest.error}`);
        };
        openRequest.onsuccess = () => {
            // console.log('connected to db');
            callback(openRequest.result)
        };

        // This event is only implemented in recent browsers
        openRequest.onupgradeneeded = () => {
            // Save the IDBDatabase interface
            const db = openRequest.result;

            try {
                // Create an objectStore for templates
                const templateStore = db.createObjectStore('template', { autoIncrement: true });

                // Add indexes to templateStore
                // templateStore.createIndex('title', 'title', { unique: false });
                // templateStore.createIndex('unit', 'unit', { unique: false });
                // templateStore.createIndex('height', 'height', { unique: false });
                // templateStore.createIndex('width', 'width', { unique: false });
                // templateStore.createIndex('color', 'color', { unique: false });
                // templateStore.createIndex('backgroundColor', 'backgroundColor', { unique: false });
                // templateStore.createIndex('padding', 'padding', { unique: false });
                // templateStore.createIndex('border', 'border', { unique: false });

            }
            catch (e) {
                console.error(e)
            }

            try {

                // Create an objectStore for textElements
                const textElementStore = db.createObjectStore('textElement', { autoIncrement: true });

                // Add indexes to textElementStore
                // textElementStore.createIndex('templateId', 'templateId');
                // textElementStore.createIndex('textElements', 'textElements', { unique: false });
                // textElementStore.createIndex('title', 'title', { unique: false });
                // textElementStore.createIndex('color', 'color', { unique: false });
                // textElementStore.createIndex('fontSize', 'fontSize', { unique: false });
                // textElementStore.createIndex('fontWeight', 'fontWeight', { unique: false });
                // textElementStore.createIndex('fontStyle', 'fontStyle', { unique: false });
                // textElementStore.createIndex('textDecoration', 'textDecoration', { unique: false });
                // textElementStore.createIndex('padding', 'padding', { unique: false });
                // textElementStore.createIndex('border', 'border', { unique: false });
                // textElementStore.createIndex('margin', 'margin', { unique: false });
            }
            catch (e) {
                console.error(e);
            }

        };
    }
}
