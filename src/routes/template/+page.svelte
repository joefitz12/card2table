<script lang="ts">
	import { dbTemplates } from '$lib/store';
	import '../../styles/list.css';
	import { onMount } from 'svelte';
	import { CardTemplate } from '$lib/api/CardTemplate/CardTemplate';
	import { db } from '$lib/db';
	import { goto } from '$app/navigation';

	onMount(() => {
		db.open((db) => {
			const transaction = db.transaction('template');
			const templates = transaction.objectStore('template');
			const openCursorRequest = templates.openCursor();
			openCursorRequest.onsuccess = () => {
				let cursor = openCursorRequest.result as IDBCursorWithValue;

				if (!cursor) {
					return;
				}

				dbTemplates.update(($dbTemplates) =>
					$dbTemplates.set(parseInt(cursor.key.toString()), cursor.value)
				);
				cursor.continue();
			};
		});
	});

	function processCursor(cursor: IDBCursorWithValue) {
		return new Promise<void>((resolve, reject) => {
			// If there are no more records, resolve the promise
			if (!cursor) {
				resolve();
				return;
			}

			// Update the collection (`dbTemplates`) with the data from the cursor
			dbTemplates.update(($dbTemplates) =>
				$dbTemplates.set(parseInt(cursor.key.toString()), cursor.value)
			);

			// Move the cursor to the next record
			cursor.continue();

			// Resolve the promise after processing the cursor
			resolve();
		});
	}

	function createCard() {
		db.open((db) => {
			// Init add Card Template transaction
			const transaction = db.transaction(['template'], 'readwrite');
			const template = transaction.objectStore('template');

			// Add Card
			const addRequest = template.add(new CardTemplate());

			addRequest.onsuccess = () => {
				// Init get all cards transaction
				const templateTransaction = db.transaction('template');
				const templates = templateTransaction.objectStore('template');

				// Get all cards
				const openCursorRequest = templates.openCursor();
				openCursorRequest.onsuccess = () => {
					// Retrieve the cursor from the result
					let cursor = openCursorRequest.result as IDBCursorWithValue;

					// Process the cursor and return a promise
					processCursor(cursor)
						.then(() => {
							console.log('Cursor processing complete.');
							goto(`/template/${Array.from($dbTemplates)[$dbTemplates.size - 1][0]}`);
						})
						.catch((error) => {
							console.error('Error processing cursor:', error);
						});
				};
				openCursorRequest.onerror = (event) => {
					console.log('Open Cursor Request error: ', event);
				};
			};
			addRequest.onerror = (event) => {
				console.log('fail', event);
			};
		});
	}
</script>

<header>
	<h1>Templates</h1>
	<button
		aria-label="create new card template"
		title="create new card template"
		on:click={() => createCard()}>+</button
	>
</header>
<div class="flex column">
	{#if $dbTemplates}
		{#each [...($dbTemplates.entries() || [])] as [id, template]}
			<a aria-label={`Edit ${template.title}`} href={`/template/${id}`}>{template.title}</a>
		{/each}
	{/if}
</div>
