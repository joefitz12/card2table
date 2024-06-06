import { db } from '$lib/db';
import { CardTemplate } from '$lib/models/CardTemplate';
import { error } from '@sveltejs/kit';

const cardTemplate = {
	add: function () {
		return new Promise<IDBValidKey>((resolve, reject) => {
			db.open((db) => {
				// Init add Card Template transaction
				const transaction = db.transaction(['template'], 'readwrite');
				const template = transaction.objectStore('template');

				// Add Card
				const addRequest = template.add(new CardTemplate());

				addRequest.onsuccess = () => {
					return resolve(addRequest.result);
				};
				addRequest.onerror = () => {
					return reject({ addRequest });
				};
			});
		});
	},
	getById: function (id: IDBValidKey) {
		return new Promise<CardTemplate & { id: IDBValidKey }>((resolve, reject) => {
			if (!id) {
				reject(
					error(404, {
						message: 'Not found',
					})
				);
			}
			db.open((db) => {
				const transaction = db.transaction(['template']);
				const templates = transaction.objectStore('template');

				const getTemplate = templates.get(typeof id === 'number' ? id : parseInt(id.toString()));

				getTemplate.onsuccess = () => {
					const template = getTemplate.result;

					if (!template) {
						reject('did not find');
					}

					db.close();

					return resolve(template);
				};

				getTemplate.onerror = () => {
					return reject({ getTemplate });
				};
			});
		});
	},
	getAll: function () {
		return new Promise<Array<CardTemplate & { id: number }>>((resolve, reject) => {
			db.open((db) => {
				// Init template transaction
				const transaction = db.transaction('template');
				const templates = transaction.objectStore('template');
				const promiseTemplates: Array<CardTemplate & { id: number }> = [];

				// Get all cards
				const openCursorRequest = templates.openCursor();
				openCursorRequest.onsuccess = () => {
					// Retrieve the cursor from the result
					let cursor = openCursorRequest.result as IDBCursorWithValue;

					if (cursor) {
						promiseTemplates.push(cursor.value);

						cursor.continue();
					} else {
						return resolve(promiseTemplates);
					}
				};
				openCursorRequest.onerror = () => {
					return reject({ openCursorRequest });
				};
			});
		});
	},
	updateById: function ({ template }: { template: CardTemplate & { id: IDBValidKey } }) {
		if (!template.id) {
			return error(404, { message: 'Cannot update, no ID' });
		}
		db.open((db) => {
			// Init add Card Template transaction
			const transaction = db.transaction(['template'], 'readwrite');
			const templateObjectStore = transaction.objectStore('template');

			// Update Card
			const updateRequest = templateObjectStore.put(template);

			updateRequest.onsuccess = (/* event */) => {
				// console.log('success!!!');
			};
			updateRequest.onerror = (event) => {
				console.log('fail', event);
			};
		});
	},
	delete: function ({ id }: { id: number }) {
		return new Promise<void>((resolve, reject) => {
			db.open((db) => {
				// Init add Card Template transaction
				const transaction = db.transaction(['template'], 'readwrite');
				const templateObjectStore = transaction.objectStore('template');

				const deleteRequest = templateObjectStore.delete(id);

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

export { cardTemplate };
