<script lang="ts">
	let title: string = 'Collection #1';

	function focus(input: HTMLInputElement) {
		input.focus();
	}
</script>

<div class="flex column template-container">
	<div class="title">
		<button type="button">&#9776;</button>
		<input id="card-title" type="text" bind:value={title} use:focus />
	</div>
</div>
