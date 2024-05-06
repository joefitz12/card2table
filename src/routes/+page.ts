import { browser } from "$app/environment";
import { db } from "$lib/db";

// import { browser } from "$app/environment"
export function load() {
	if (browser && window.indexedDB) {
		db.open(() => console.log('open db'))
	}
}


