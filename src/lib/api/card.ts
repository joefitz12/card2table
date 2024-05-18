import { db } from "$lib/db"

export const card = {
    add: function ({ csvId, cards }: { csvId: number, cards: { [x: string]: string }[] }) {
        return new Promise<IDBValidKey>((resolve, reject) => {
            db.open((db) => {
                const cardTransaction = db.transaction('card', 'readwrite');
                const cardObjectStore = cardTransaction.objectStore('card');

                const addCard = cardObjectStore.add(card);

                addCard.onsuccess = () => {
                    console.log('card added successfully');
                    resolve('card added successfully');
                }
                addCard.onerror = () => {
                    console.error('Error adding card');
                    console.error({
                        addCard
                    });
                    reject('failed to add card');
                }
            });
        });
    },
    addMany: function ({ csvId, cards }: { csvId: IDBValidKey, cards: { [x: string]: string }[] }) {
        return new Promise<IDBValidKey>((resolve, reject) => {
            db.open((db) => {
                cards.forEach((card, index) => {
                    const cardTransaction = db.transaction('card', 'readwrite');
                    const cardObjectStore = cardTransaction.objectStore('card');

                    const addCard = cardObjectStore.add({ ...card, csvId });

                    addCard.onsuccess = () => {
                        console.log('card added successfully');
                        console.log({
                            index,
                            length: cards.length
                        })
                        if (index === cards.length - 1) {
                            console.log('we resolving');
                            return resolve(csvId);
                        }
                    }
                    addCard.onerror = () => {
                        console.error('Error adding card');
                        return reject({ message: `Error adding ${card.id}`, addCard });
                    }
                });
            });
        });
    },
    getAllByCsvId: function (id: IDBValidKey) {
        return new Promise<Map<IDBValidKey, { [x: string]: string }>>((resolve, reject) => {
            db.open((db) => {
                const cardTransaction = db.transaction('card');
                const cardObjectStore = cardTransaction.objectStore('card');
                const csvIdIndex = cardObjectStore.index('csvId');
                const openCursorRequest = csvIdIndex.openCursor(id);
                const result = new Map();

                openCursorRequest.onsuccess = () => {
                    const cursor = openCursorRequest.result;
                    if (cursor) {
                        result.set(cursor.value.id, cursor.value);
                        cursor.continue();
                    }
                    else {
                        return resolve(result);
                    }
                }
                openCursorRequest.onerror = () => {
                    console.error('Error getting card');
                    return reject(openCursorRequest);
                }
            });
        });
    }
}