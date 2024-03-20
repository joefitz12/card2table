<script lang="ts">
	import Card from '$lib/Template/Card.svelte';
	import Controls from '$lib/Template/Controls.svelte';
	import { writable } from 'svelte/store';

	let scale = writable(1);
</script>

<div class="template-editor">
	<div class="card-container">
		<Card scale={$scale} />
		<input type="number" bind:value={$scale} step={0.1} />
	</div>
	<div class="controls-container">
		<Controls />
	</div>
</div>

<style>
	.template-editor {
		display: flex;
		padding: 1rem;
		flex-grow: 1;
	}
	.card-container {
		flex-grow: 1;
		position: relative;
	}
	.card-container input {
		position: absolute;
		right: 0;
		top: 0;
		opacity: 0;
		transition: opacity 250ms ease;
	}
	/* .card-container:hover input {
		opacity: 1;
	} */
</style>
