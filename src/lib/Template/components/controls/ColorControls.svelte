<script lang="ts">
	import './controls.css';
	import { backgroundColor, color } from '$lib/store';
	import type { CardState } from '$lib/types';

	let cardState: Pick<CardState, 'backgroundColor' | 'color'> = {
		backgroundColor: undefined,
		color: undefined
	};

	backgroundColor.subscribe((value) => (cardState.backgroundColor = value));
	color.subscribe((value) => (cardState.color = value));

	$: {
		if (cardState.backgroundColor) {
			backgroundColor.set(cardState.backgroundColor);
		}
		if (cardState.color) {
			color.set(cardState.color);
		}
	}
</script>

<div class="flex column">
	<div class="flex row header">
		<h3>Colors</h3>
	</div>
	<div class="flex column container">
		<div class="flex row">
			<div class="flex column">
				<label for="card-template-background-color">Background</label>
				<input
					type="color"
					id="card-template-background-color"
					bind:value={cardState.backgroundColor}
				/>
			</div>
			<div class="flex column">
				<label for="card-template-color">Text</label>
				<input type="color" id="card-template-color" bind:value={cardState.color} />
			</div>
		</div>
	</div>
</div>
