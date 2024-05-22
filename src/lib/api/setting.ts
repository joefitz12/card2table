import { db } from "$lib/db";

export const setting = {
    add: function (setting: { id: IDBValidKey, [x: string]: any }) {
        return new Promise<any>((resolve, reject) => {
            db.open(db => {
                const settingObjectStore =
                    db.transaction('setting', 'readwrite').objectStore('setting');

                const getSetting = settingObjectStore.get(setting.id);


                getSetting.onsuccess = () => {
                    if (!getSetting.result) {
                        const addSetting = settingObjectStore.add(setting)

                        addSetting.onerror = () => {
                            reject({ addSetting });
                        };

                        addSetting.onsuccess = () => {
                            resolve(addSetting.result)
                        };
                    }
                }
            });
        });
    },
    get: function (id: IDBValidKey) {
        return new Promise<any>((resolve, reject) => {
            db.open(db => {
                const settingObjectStore =
                    db.transaction('setting').objectStore('setting');
                const getSetting = settingObjectStore.get(id)

                getSetting.onerror = () => {
                    reject({ getSetting });
                };

                getSetting.onsuccess = () => {
                    resolve(getSetting.result)
                };
            });
        });
    },
    getAll: function () {
        return new Promise<{ [x: string]: any }>((resolve, reject) => {
            db.open(db => {
                const cursorRequest =
                    db.transaction('setting').objectStore('setting').openCursor();
                const settings: { [x: string]: any } = {};

                cursorRequest.onerror = () => {
                    reject('Failed to retrieve items');
                };

                cursorRequest.onsuccess = () => {
                    const cursor = cursorRequest.result;
                    if (cursor) {
                        const {
                            id,
                            ...setting
                        } = cursorRequest.result.value;
                        settings[id] = setting;
                        cursor.continue();
                    } else {
                        // Resolve the promise once the cursor is done
                        resolve(settings);
                    }
                };
            });
        });
    },
    delete: function (id: IDBValidKey) {
        return new Promise<string>((resolve, reject) => {
            db.open(db => {
                const settingObjectStore =
                    db.transaction('setting', 'readwrite').objectStore('setting');
                const deleteSetting = settingObjectStore.delete(id);

                deleteSetting.onerror = () => {
                    reject({ deleteSetting });
                };

                deleteSetting.onsuccess = () => {
                    resolve(`Successfully deleted ${id}`);
                };
            });
        });
    },
}