import { browser } from "$app/environment"
import { init } from "./init";

export function open(callback: (db: IDBDatabase) => void) {
    if (browser && window.indexedDB) {
        // init db
        const openRequest = indexedDB.open("Card2Table", 1);
        openRequest.onerror = () => {
            console.error(`Cannot connect: ${openRequest.error}`);
        };
        openRequest.onsuccess = () => {
            callback(openRequest.result);

            // Close db if 
            openRequest.result.onversionchange = function (e) {
                if (e.target && e.newVersion === null) { // An attempt is made to delete the db
                    (e.target as IDBDatabase).close(); // Manually close our connection to the db
                }
            };
        };
        // This event is only implemented in recent browsers
        openRequest.onupgradeneeded = () => {
            init(openRequest.result);
        };
    }
}
