import { db } from '$lib/db';
import { CardTemplate } from '$lib/models/CardTemplate';
import { Tab } from '$lib/models/Tab';
import { error } from '@sveltejs/kit';

const tab = {
	add: function (tab: Tab) {
		return new Promise<IDBValidKey>((resolve, reject) => {
			db.open((db) => {
				// check for existing tab first
				this.get({
					itemId: tab.itemId,
					type: tab.type,
				}).then((result) => {
					if (!result) {
						// Init add Tab transaction
						const transaction = db.transaction(['tabList'], 'readwrite');
						const tabListStore = transaction.objectStore('tabList');

						// Add Tab
						const addRequest = tabListStore.add(tab);

						addRequest.onsuccess = () => {
							return resolve(addRequest.result);
						};
						addRequest.onerror = () => {
							return reject({ addRequest });
						};
					} else {
						resolve(result.id);
					}
				});
			});
		});
	},
	get: function ({ type, itemId }: { type: 'template' | 'palette'; itemId: IDBValidKey }) {
		return new Promise<(Tab & { id: IDBValidKey }) | undefined>((resolve, reject) => {
			db.open((db) => {
				// Init get Tab transaction
				const transaction = db.transaction(['tabList'], 'readwrite');
				const tabListStore = transaction.objectStore('tabList');

				const itemIdIndex = tabListStore.index('itemId');

				// Get all matching on itemId
				const openCursorRequest = itemIdIndex.openCursor(itemId);
				openCursorRequest.onsuccess = () => {
					// Retrieve the cursor from the result
					let cursor = openCursorRequest.result as IDBCursorWithValue;

					if (openCursorRequest.result?.value.type === type) {
						return resolve(openCursorRequest.result.value);
					}

					if (cursor) {
						cursor.continue();
					} else {
						return resolve(undefined);
					}
				};
				openCursorRequest.onerror = () => {
					return reject({ openCursorRequest });
				};
			});
		});
	},
	getAll: function () {
		return new Promise<Map<IDBValidKey, Tab & { id: IDBValidKey }>>((resolve, reject) => {
			db.open((db) => {
				// Init Tab transaction
				const transaction = db.transaction(['tabList']);
				const templates = transaction.objectStore('tabList');
				const promiseTabs: Map<number, Tab & { id: IDBValidKey }> = new Map();

				// Get all tabs
				const openCursorRequest = templates.openCursor();
				openCursorRequest.onsuccess = () => {
					// Retrieve the cursor from the result
					let cursor = openCursorRequest.result as IDBCursorWithValue;

					if (cursor) {
						promiseTabs.set(parseInt(cursor.key.toString()), cursor.value);

						cursor.continue();
					} else {
						return resolve(promiseTabs);
					}
				};
				openCursorRequest.onerror = () => {
					return reject({ openCursorRequest });
				};
			});
		});
	},
	update: function (tab: Partial<Tab> & { id: IDBValidKey }) {
		return new Promise<IDBValidKey>((resolve, reject) => {
			if (!tab.itemId) {
				return error(404, { message: 'Cannot update, no id' });
			}
			db.open((db) => {
				// Init add Card Template transaction
				const transaction = db.transaction(['tabList'], 'readwrite');
				const templateObjectStore = transaction.objectStore('tabList');

				// Update Card
				const updateRequest = templateObjectStore.put(tab);

				updateRequest.onsuccess = () => {
					return resolve(updateRequest.result);
				};
				updateRequest.onerror = () => {
					return reject({ updateRequest });
				};
			});
		});
	},
	delete: function (id: IDBValidKey) {
		return new Promise<void>((resolve, reject) => {
			db.open((db) => {
				// Init Tab transaction
				const transaction = db.transaction(['tabList'], 'readwrite');
				const tabListStore = transaction.objectStore('tabList');

				const deleteRequest = tabListStore.delete(id);

				deleteRequest.onsuccess = () => {
					return resolve();
				};
				deleteRequest.onerror = () => {
					return reject({ deleteRequest });
				};
			});
		});
	},
};

export { tab };
