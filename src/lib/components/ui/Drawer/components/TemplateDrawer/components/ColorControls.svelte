<script lang="ts">
	import '../../../drawer.css';
	import { template } from '$lib/store';
</script>

<div class="flex column">
	<fieldset class="flex column container">
		<legend>Default palette</legend>
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
	</fieldset>
</div>
