export function init(db: IDBDatabase) {
    try {
        // @todo - remove for production
        db.deleteObjectStore('template');
        // Create an objectStore for templates
        const templateStore = db.createObjectStore('template', {
            keyPath: 'id',
            autoIncrement: true
        });
    }
    catch (e) {
        console.error(e)
    }
    try {
        // @todo - remove for production
        db.deleteObjectStore('textElement');
        // Create an objectStore for textElements
        const textElementStore = db.createObjectStore('textElement', {
            keyPath: 'id',
            autoIncrement: true
        });
        textElementStore.createIndex('templateId', 'templateId');
    }
    catch (e) {
        console.error(e);
    }
    // try {
    //     // Create an objectStore for collections
    //     const collectionStore = db.createObjectStore('collection', { autoIncrement: true });
    // }
    // catch (e) {
    //     console.error(e);
    // }
    try {
        db.deleteObjectStore('csv');
        // Create an objectStore for csvs
        const csvStore = db.createObjectStore('csv', {
            keyPath: 'id',
            autoIncrement: true
        });
    }
    catch (e) {
        console.error(e);
    }
    try {
        db.deleteObjectStore('card');
        // Create an objectStore for cards
        const cardStore = db.createObjectStore('card', {
            keyPath: 'id',
            autoIncrement: true
        });
        cardStore.createIndex('csvId', 'csvId');
    }
    catch (e) {
        console.error(e);
    }
    // try {
    //     // Create an objectStore for palettes
    //     const palleteStore = db.createObjectStore('palette', { autoIncrement: true });
    // }
    // catch (e) {
    //     console.error(e);
    // }
}