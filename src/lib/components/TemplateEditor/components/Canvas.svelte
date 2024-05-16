<script lang="ts">
	import { state } from '$lib/store';
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;
	let context: CanvasRenderingContext2D | null;

	let ui = {
		top: 0,
		left: 0,
	};

	// state.subscribe((state) => {
	// 	if (state.feedback.textElement.control && state.feedback.textElement.template) {
	// 		console.log(state.feedback.textElement.control.getBoundingClientRect());
	// 		console.log(state.feedback.textElement.template.getBoundingClientRect());
	// 	}
	// });

	onMount(() => {
		context = canvas.getContext('2d');

		if (!context) {
			return;
		}

		context.lineWidth = 2;
		context.strokeStyle = '#99EDCC';

		handleSize();
	});

	const handleSize = () => {
		const { top, left } = canvas.getBoundingClientRect();
		ui.top = top;
		ui.left = left;
		ui = ui;

		// look up the size the canvas is being displayed
		let width = canvas.clientWidth;
		let height = canvas.clientHeight;

		// If it's resolution does not match change it
		if (canvas.width !== width || canvas.height !== height) {
			canvas.width = width;
			canvas.height = height;
		}
	};

	function highlightPageElement({
		left,
		top,
		width,
		height,
	}: {
		left: number;
		top: number;
		width: number;
		height: number;
	}) {
		if (!context) {
			return;
		}
		context.lineWidth = 3;
		context.strokeStyle = '#99EDCC';
		context.strokeRect(left, top, width, height);
	}

	function highlightControl() {
		if (!context || !$state.feedback.textElement.control) {
			return;
		}
		const control = $state.feedback.textElement.control;
		context.strokeRect(
			control.getBoundingClientRect().left - ui.left,
			control.getBoundingClientRect().top - ui.top,
			control.getBoundingClientRect().width,
			control.getBoundingClientRect().height
		);
	}

	$: {
		if (context && $state.feedback.textElement.control && $state.feedback.textElement.template) {
			context.reset();
			context.lineWidth = 3;
			context.strokeStyle = '#99EDCC';
			context.beginPath();

			const control = $state.feedback.textElement.control;
			const template = $state.feedback.textElement.template;

			context.moveTo(
				control.getBoundingClientRect().left - ui.left,
				control.getBoundingClientRect().bottom - control.getBoundingClientRect().height / 2 - ui.top
			);
			context.lineTo(
				template.getBoundingClientRect().right -
					template.getBoundingClientRect().width / 2 -
					ui.left,
				template.getBoundingClientRect().top <
					control.getBoundingClientRect().bottom -
						control.getBoundingClientRect().height / 2 -
						ui.top
					? template.getBoundingClientRect().bottom - ui.top
					: template.getBoundingClientRect().top - ui.top
			);
			context.stroke();
			highlightPageElement({
				left: template.getBoundingClientRect().left - ui.left,
				top: template.getBoundingClientRect().top - ui.top,
				width: template.getBoundingClientRect().width,
				height: template.getBoundingClientRect().height,
			});

			highlightPageElement({
				left: control.getBoundingClientRect().left - ui.left,
				top: control.getBoundingClientRect().top - ui.top,
				width: control.getBoundingClientRect().width,
				height: control.getBoundingClientRect().height,
			});

			// context.strokeRect(
			// 	control.getBoundingClientRect().left - ui.left,
			// 	control.getBoundingClientRect().top - ui.top,
			// 	control.getBoundingClientRect().width,
			// 	control.getBoundingClientRect().height
			// );
		} else if (context) {
			context.reset();
		}
	}

	$: {
		if (
			context &&
			$state.feedback.textElement.drag &&
			$state.feedback.textElement.template &&
			$state.feedback.textElement.control &&
			$state.feedback.textElement.drag.offsetX &&
			$state.feedback.textElement.drag.offsetY &&
			($state.drag.offsetX || $state.drag.offsetY)
		) {
			// console.log($state.feedback.textElement.drag);
			// console.log($state.feedback.textElement.template?.getBoundingClientRect());

			context.reset();
			context.lineWidth = 3;
			context.strokeStyle = '#99EDCC';
			context.beginPath();

			const control = $state.feedback.textElement.control;
			const template = $state.feedback.textElement.template;

			// draw line
			context.moveTo(
				control.getBoundingClientRect().left - ui.left,
				control.getBoundingClientRect().bottom - control.getBoundingClientRect().height / 2 - ui.top
			);
			context.lineTo(
				template.getBoundingClientRect().right -
					template.getBoundingClientRect().width / 2 -
					ui.left,
				template.getBoundingClientRect().top <
					control.getBoundingClientRect().bottom -
						control.getBoundingClientRect().height / 2 -
						ui.top
					? template.getBoundingClientRect().bottom - ui.top
					: template.getBoundingClientRect().top - ui.top
			);
			context.stroke();
			// end draw line

			// console.log('$state.drag.offsetX', $state.drag.offsetX);
			// console.log(
			// 	'$state.feedback.textElement.drag.offsetX',
			// 	$state.feedback.textElement.drag.offsetX
			// );

			highlightPageElement({
				left:
					template.getBoundingClientRect().left -
					ui.left +
					($state.feedback.textElement.drag.offsetX - $state.drag.offsetX),
				top:
					template.getBoundingClientRect().top -
					ui.top +
					($state.feedback.textElement.drag.offsetY - $state.drag.offsetY),
				width: template.getBoundingClientRect().width,
				height: template.getBoundingClientRect().height,
			});

			highlightPageElement({
				left: control.getBoundingClientRect().left - ui.left,
				top: control.getBoundingClientRect().top - ui.top,
				width: control.getBoundingClientRect().width,
				height: control.getBoundingClientRect().height,
			});
		}
	}
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
