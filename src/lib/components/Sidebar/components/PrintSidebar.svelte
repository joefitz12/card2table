<script lang="ts">
	import PapaParse from 'papaparse';
	import { cardTemplates, csvs, selectedCardTemplate, selectedCsv, print } from '$lib/store';
	import '../sidebar.css';
	import { csv } from '$lib/api/csv';
	import { card } from '$lib/api/card';
	import { onMount } from 'svelte';

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

	onMount(() => {
		csv
			.getAll()
			.then((data) => {
				csvs.set(data);
			})
			.catch((error) => console.error({ error }));
	});
</script>

<div class="flex column fade-in">
	<fieldset class="flex column container">
		<legend>Choose CSV</legend>
		<input type="file" accept="text/csv" on:change={handleFileUpload} />
		<div class="flex column">
			{#each $csvs as { filename, id }}
				<div class="flex row">
					<input
						bind:group={$selectedCsv}
						value={id}
						id={`csv-${id}`}
						type="radio"
						name="choose-csv"
					/>
					<label for={`csv-${id}`}>{filename}</label>
				</div>
			{/each}
		</div>
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

<style>
	.fade-in {
		animation: 300ms ease both fade-in;
	}
</style>
