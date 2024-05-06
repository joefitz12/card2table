<script lang="ts">
	import PapaParse from 'papaparse';
	import { state } from '$lib/store';
	import '../../../styles/controls.css';

	let collapsed: boolean;
	let activeMenu: 'card' | 'color' | 'text' | 'image' | 'print' = 'print';
	$: sidebarClass = collapsed ? 'collapsed' : 'expanded';
	const updateSidebar = (sidebarUpdates: { collapsed?: boolean; activeMenu?: typeof activeMenu }) =>
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
	state.subscribe((value) => {
		value.sidebar.collapsed === true ? (collapsed = true) : (collapsed = false);
		activeMenu = value.sidebar.activeMenu;
	});

	const handleFileUpload = (e: Event) => {
		const input = e.target as HTMLInputElement;
		const file = input.files ? input.files[0] : null;
		if (!file) {
			return;
		}

		console.log(file);

		PapaParse.parse(file, {
			header: true,
			complete: (results) => {
				console.log(results);
				state.update(($state) => {
					return {
						...$state,
						print: {
							...$state.print,
							// @todo: generate unique id
							selectedCsv: file.name,
						},
						csvs: [
							...$state.csvs,
							{
								// @TODO: generate unique id
								id: file.name,
								name: file.name,
								cards: results.data as { [x: string]: string }[],
							},
						],
					};
				});
			},
		});
	};
</script>

<div class="flex column sidebar {sidebarClass}">
	<button on:click={() => updateSidebar({ collapsed: !collapsed })}>{collapsed ? '<' : '>'}</button>
	<!-- <div class="flex row collapsible">
		<button on:click={() => updateSidebar({ activeMenu: 'card' })}>card</button>
		<button on:click={() => updateSidebar({ activeMenu: 'color' })}>color</button>
		<button on:click={() => updateSidebar({ activeMenu: 'text' })}>text</button>
		<button on:click={() => updateSidebar({ activeMenu: 'image' })}>image</button>
	</div> -->
	<div class="collapsible {sidebarClass}">
		<div class="flex column controls-container {activeMenu}">
			<fieldset class="flex column container">
				<legend>Choose CSV</legend>
				<input type="file" accept="text/csv" on:change={handleFileUpload} />
				{#each $state.csvs as csv}
					<div class="flex row">
						<input
							bind:group={$state.print.selectedCsv}
							value={csv.name}
							id={`${csv.name}`}
							type="radio"
							name="choose-csv"
						/>
						<label for={`${csv.name}`}>{csv.name}</label>
					</div>
				{/each}
			</fieldset>
			<fieldset class="flex column container">
				<legend>Choose Template</legend>
				{#if $state.templates?.entries}
					{#each Array.from($state.templates.entries()) as [id, template]}
						<div class="flex row">
							<input
								bind:group={$state.print.selectedTemplate}
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
						<input id="page-width" type="number" bind:value={$state.print.width} step="0.1" />
					</div>
					<div class="flex column">
						<label for="page-height">Page height</label>
						<input id="page-height" type="number" bind:value={$state.print.height} step="0.1" />
					</div>
					<div class="flex column">
						<label for="column-gap">Column gap</label>
						<input id="column-gap" type="number" bind:value={$state.print.columnGap} step="0.1" />
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
