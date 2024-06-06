function processCursor(cursor: IDBCursorWithValue, callback: (cursor: IDBCursorWithValue) => void) {
	return new Promise<void>((resolve, reject) => {
		// If there are no more records, resolve the promise
		if (!cursor) {
			resolve();
			return;
		}

		// Run callback with cursor param
		if (callback) {
			callback(cursor);
		}

		// Move the cursor to the next record
		cursor.continue();

		// Resolve the promise after processing the cursor
		resolve();
	});
}

export { processCursor };
