import { db } from "$lib/db"

export const card = {
    add: function ({ csvId, cards }: { csvId: number, cards: { [x: string]: string }[] }) {
        db.open((db) => {
            const cardTransaction = db.transaction('card', 'readwrite');
            const cardObjectStore = cardTransaction.objectStore('card');

            const addCard = cardObjectStore.add(card);

            addCard.onsuccess = () => {
                console.log('card added successfully');
            }
            addCard.onerror = () => {
                console.error('Error adding card');
                console.error({
                    addCard
                });
            }
        });
    },
    addMany: function ({ csvId, cards }: { csvId: IDBValidKey, cards: { [x: string]: string }[] }) {
        db.open((db) => {
            cards.forEach(card => {
                const cardTransaction = db.transaction('card', 'readwrite');
                const cardObjectStore = cardTransaction.objectStore('card');

                const addCard = cardObjectStore.add(card);

                addCard.onsuccess = () => {
                    console.log('card added successfully');
                }
                addCard.onerror = () => {
                    console.error('Error adding card');
                    console.error({
                        addCard
                    });
                }
            });
        });
    }
}