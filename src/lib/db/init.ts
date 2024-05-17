export function init(db: IDBDatabase) {
    /////////////////////////////
    //////// Template ///////////
    /////////////////////////////
    try {
        // @todo - remove for production
        db.deleteObjectStore('template');
    }
    catch (e) {
        console.error(e);
    }
    try {
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
        db.deleteObjectStore('templateList');
    }
    catch (e) {
        console.error(e);
    }
    try {
        // Create an objectStore for templates
        const templateListStore = db.createObjectStore('templateList', {
            keyPath: 'id'
        });
    }
    catch (e) {
        console.error(e)
    }

    /////////////////////////////
    //////// Text Element ///////
    /////////////////////////////
    try {
        // @todo - remove for production
        db.deleteObjectStore('textElement');
    }
    catch (e) {
        console.error(e);
    }
    try {
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

    /////////////////////////////
    ////////// CSV //////////////
    /////////////////////////////
    try {
        // @todo - remove for production
        db.deleteObjectStore('csv');
    }
    catch (e) {
        console.error(e);
    }
    try {
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
        // @todo - remove for production
        db.deleteObjectStore('card');
    }
    catch (e) {
        console.error(e);
    }
    try {
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

    /////////////////////////////
    //////// Collection /////////
    /////////////////////////////
    // try {
    //     // Create an objectStore for collections
    //     const collectionStore = db.createObjectStore('collection', { autoIncrement: true });
    // }
    // catch (e) {
    //     console.error(e);
    // }

    /////////////////////////////
    ////////// Palette //////////
    /////////////////////////////   
    // try {
    //     // Create an objectStore for palettes
    //     const palleteStore = db.createObjectStore('palette', { autoIncrement: true });
    // }
    // catch (e) {
    //     console.error(e);
    // }

    /////////////////////////////
    /////////// UI //////////////
    /////////////////////////////
    try {
        // @todo - remove for production
        db.deleteObjectStore('tabList');
    }
    catch (e) {
        console.error(e);
    }
    try {
        // Create an objectStore for tabList
        const tabList = db.createObjectStore('tabList', {
            keyPath: 'id',
            autoIncrement: true
        });
        tabList.createIndex('itemId', 'itemId');
    }
    catch (e) {
        console.error(e)
    }
}