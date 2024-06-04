<script lang="ts">
	import PapaParse from 'papaparse';
	import { csvs, selectedCsv, print, cards } from '$lib/store';
	import '../sidebar.css';
	import { card, csv } from '$lib/api';
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
				csv
					.add({
						filename: file.name,
					})
					.then((csvId) =>
						card.addMany({ csvId, cards: results.data as { [x: string]: string }[] })
					)
					.then((csvId) => {
						selectedCsv.set(csvId);

						return card.getAllByCsvId(csvId);
					})
					.then((data) => {
						cards.set(data);

						return csv.getAll();
					})
					.then((data) => csvs.set(data));
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
		if ($selectedCsv) {
			card.getAllByCsvId($selectedCsv).then((_cards) => cards.set(_cards));
		}
	});

	selectedCsv.subscribe((csvId) => {
		if (csvId) {
			card.getAllByCsvId(csvId).then((_cards) => cards.set(_cards));
		}
	});
</script>

<fieldset class="flex column container">
	<legend>Choose CSV</legend>
	<input type="file" accept="text/csv" on:change={handleFileUpload} />
	{#if $csvs.length}
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
	{/if}
</fieldset>
<fieldset class="flex column container">
	<legend>Page layout</legend>
	<div class="flex row wrap">
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
</fieldset>
