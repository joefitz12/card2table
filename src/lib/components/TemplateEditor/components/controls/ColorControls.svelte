<script lang="ts">
	import '../../../../../styles/controls.css';
	import { template } from '$lib/store';
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
					bind:value={$template.backgroundColor}
				/>
			</div>
			<div class="flex column">
				<label for="card-template-color">Text</label>
				<input type="color" id="card-template-color" bind:value={$template.color} />
			</div>
		</div>
	</div>
</div>
