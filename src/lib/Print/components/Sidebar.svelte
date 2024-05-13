<script lang="ts">
	import PapaParse from 'papaparse';
	import { dbTemplates, state, print } from '$lib/store';
	import '../../../styles/controls.css';
	import { cardTemplate } from '$lib/api/cardTemplate';
	import { csv } from '$lib/api/csv';
	import { card } from '$lib/api/card';
	import { writable } from 'svelte/store';

	let collapsed: boolean;

	const updateSidebar = (sidebarUpdates: { collapsed?: boolean }) =>
		state.update(
			(value) =>
				(value = {
					...value,
					sidebar: {
						...value.sidebar,
						...sidebarUpdates,
					},
				})
		);

	// on chage
	print.subscribe(($print) => {
		if ($print.selectedTemplate) {
			cardTemplate.getById($print.selectedTemplate);
		}
	});

	const csvs = writable<
		{
			filename: string;
			id: number;
		}[]
	>([]);

	csv.getAllItems().then((data) => {
		csvs.set(data);
	});

	const handleFileUpload = (e: Event) => {
		const input = e.target as HTMLInputElement;
		const file = input.files ? input.files[0] : null;
		if (!file) {
			return;
		}

		PapaParse.parse(file, {
			header: true,
			complete: (results) => {
				const cards = results.data as { [x: string]: string }[];
				csv
					.add({
						filename: file.name,
					})
					.then((csvId) => {
						card.addMany({ csvId, cards });
					});
			},
		});
	};
</script>

<div
	class="flex column sidebar"
	class:collapsed={$state.sidebar.collapsed}
	class:expanded={!$state.sidebar.collapsed}
>
	<button on:click={() => updateSidebar({ collapsed: !$state.sidebar.collapsed })}
		>{$state.sidebar.collapsed ? '<' : '>'}</button
	>
	<!-- <div class="flex row collapsible">
		<button on:click={() => updateSidebar({ activeMenu: 'card' })}>card</button>
		<button on:click={() => updateSidebar({ activeMenu: 'color' })}>color</button>
		<button on:click={() => updateSidebar({ activeMenu: 'text' })}>text</button>
		<button on:click={() => updateSidebar({ activeMenu: 'image' })}>image</button>
	</div> -->
	<div
		class="collapsible"
		class:collapsed={$state.sidebar.collapsed}
		class:expanded={!$state.sidebar.collapsed}
	>
		<div class="flex column controls-container">
			<fieldset class="flex column container">
				<legend>Choose CSV</legend>
				<input type="file" accept="text/csv" on:change={handleFileUpload} />
				{#each $csvs as { filename, id }}
					<div class="flex row">
						<input
							bind:group={$print.selectedCsv}
							value={filename}
							id={`csv-${id}`}
							type="radio"
							name="choose-csv"
						/>
						<label for={`csv-${id}`}>{filename}</label>
					</div>
				{/each}
			</fieldset>
			<fieldset class="flex column container">
				<legend>Choose Template</legend>
				{#if $dbTemplates}
					{#each Array.from($dbTemplates) as [id, template]}
						<div class="flex row">
							<input
								bind:group={$print.selectedTemplate}
								value={id}
								id={`${id}`}
								type="radio"
								name="choose-template"
							/>
							<label for={`${id}`}>{template.title}</label>
						</div>
					{/each}
				{/if}
			</fieldset>
			<fieldset class="flex column container">
				<legend>Page layout</legend>
				<div class="flex row">
					<div class="flex column">
						<label for="page-width">Page width</label>
						<input id="page-width" type="number" bind:value={$print.width} step="0.1" />
					</div>
					<div class="flex column">
						<label for="page-height">Page height</label>
						<input id="page-height" type="number" bind:value={$print.height} step="0.1" />
					</div>
					<div class="flex column">
						<label for="column-gap">Column gap</label>
						<input id="column-gap" type="number" bind:value={$print.columnGap} step="0.1" />
					</div>
				</div>
				<div />
			</fieldset>
		</div>
	</div>
</div>

<style>
	.sidebar {
		padding: 1rem;
		gap: 0.5rem;
		animation: 60ms ease both fade-in, 300ms ease both slide-from-right;
		position: relative;
		background-color: rgba(255, 255, 255, 0.5);
	}
	.sidebar::after {
		content: ' ';
		position: absolute;
		height: 100%;
		right: 0;
		width: 1rem;
	}
	.collapsible {
		overflow: visible;
	}
	.controls-container {
		min-width: 300px;
	}
	@keyframes collapse {
		from {
			max-width: 300px;
		}
		to {
			max-width: 0px;
		}
	}
	.collapsed .collapsible {
		animation: 300ms ease both collapse, 300ms ease both fade-out;
	}
	@keyframes expand {
		from {
			max-width: 0px;
		}
		to {
			max-width: 300px;
		}
	}
	.expanded .collapsible {
		animation: 300ms ease both expand, 300ms ease both fade-in;
	}
</style>
