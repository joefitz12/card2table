<script lang="ts">
	import { derived } from 'svelte/store';
	import { afterNavigate, goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { tab } from '$lib/api/tab';
	import { activeTabs, menuExpanded, template } from '$lib/store';

	function closeTab(id: IDBValidKey) {
		function nextTab(previousIndex: number) {
			const tabs = [...$activeTabs.values()];
			const nextActiveTab = tabs[previousIndex] ? tabs[previousIndex] : tabs[previousIndex - 1];
			return `/${nextActiveTab.type}/${nextActiveTab.itemId}`;
		}

		const { itemId, type } = $activeTabs.get(id)!;
		const tabIndex = [...$activeTabs.keys()].findIndex((key) => key === id);
		const isActiveTab = $page.url.pathname === `/${type}/${itemId}`;

		tab.delete(id).then(() => {
			activeTabs.update(($activeTabs) => {
				$activeTabs.delete(id);
				return $activeTabs;
			});

			// if no more active tabs
			if ($activeTabs.size === 0) {
				menuExpanded.set(true);
				return goto('/');
			}
			// handle if user closes current tab
			if (isActiveTab) {
				return goto(nextTab(tabIndex));
			}
		});
	}

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

	afterNavigate((navigation) => {
		if (navigation.to?.url.toString().includes('template') && $menuExpanded) {
			menuExpanded.set(false);
		}
	});

	let tabs = $activeTabs;

	activeTabs.subscribe((value) => (tabs = value));
</script>

<ol class="tabs flex">
	{#if tabs.size}
		{#each Array.from(tabs.values()) as { id, itemId, title, type }}
			<li class="template flex align-center">
				<a
					class:active={[`/${type}/${itemId}`, `/${type}/${itemId}/`].includes($page.url.pathname)}
					aria-label={`Edit ${title}`}
					href={`/${type}/${itemId}`}>{title}</a
				>
				<button
					type="button"
					on:click={() => closeTab(id)}
					aria-label={`Close template ${title}`}
					class="delete">&#10005;</button
				>
			</li>
		{/each}
	{/if}
</ol>

<style lang="scss">
	ol {
		min-width: 0;
		overflow-x: auto;
		overflow-y: clip;
		max-width: 100%;
		position: sticky;
		/* z-index: 1; */
		gap: 0;
		/* background: beige; */
		/* @TODO - set dynamic values */
		top: 48px;
		height: 34px;
		min-height: 34px;
	}
	li {
		color: lightgrey;
		padding-right: 0.5rem;

		&:hover {
			background: lightsteelblue;
		}

		&:has(a.active) {
			background: lightblue;
		}
	}
	a {
		padding: 0.5rem;
		max-width: 5rem;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	button.delete {
		background: transparent;

		&:hover {
			background: transparent;
			box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
		}
	}
	@media print {
		ol.tabs {
			display: none;
		}
	}
</style>
