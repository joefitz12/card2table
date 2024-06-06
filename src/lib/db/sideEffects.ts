import { tab } from '$lib/api/tab';
import { activeTabs, template } from '$lib/store';
import { derived } from 'svelte/store';

function updateTabTitle() {
	const templateTitle = derived(template, ($template) => {
		if (!$template) {
			return undefined;
		}
		return {
			title: $template.title,
			id: $template.id,
		};
	});

	templateTitle.subscribe((value) => {
		if (value) {
			tab
				.get({ type: 'template', itemId: value.id })
				.then(($tab) => {
					if ($tab) {
						return tab.update({
							...$tab,
							title: value.title,
						});
					}
				})
				.then((res) => {
					if (res) {
						return tab.getAll();
					}
				})
				.then((tabs) => {
					if (tabs) {
						return activeTabs.set(tabs);
					}
				})
				.catch((error) => console.error(error));
		}
	});
}

export function runSideEffects() {
	updateTabTitle();
}
