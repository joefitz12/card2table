<script lang="ts">
	import { onMount } from 'svelte';

	let width = 0;
	let height = 0;
	let color = '';

	let canvas: HTMLCanvasElement;
	let context;

	let ui = {
		top: 0,
		left: 0
	};

	onMount(() => {
		context = canvas.getContext('2d');

		if (!context) {
			return;
		}

		context.lineWidth = 3;
		context.strokeStyle = '#99EDCC';

		handleSize();
	});

	const handleSize = () => {
		const { top, left } = canvas.getBoundingClientRect();
		ui.top = top;
		ui.left = left;
		ui = ui;
		console.log('ui', ui);
	};
</script>

<svelte:window on:resize={handleSize} />

<canvas id="feedback-canvas" bind:this={canvas} />

<style>
	canvas {
		position: absolute;
		width: 100%;
		height: 100%;
	}
</style>
