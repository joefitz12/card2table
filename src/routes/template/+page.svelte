<script lang="ts">
	import Card from '$lib/Template/Card.svelte';
	import Controls from '$lib/Template/Controls.svelte';
</script>

<div class="template-editor">
	<!-- <Menu /> -->
	<div class="card-container">
		<Card />
	</div>
	<div class="controls-container">
		<Controls />
	</div>
</div>

<style>
	.template-editor {
		flex-grow: 1;
	}
	.card-container {
		flex-grow: 1;
		position: relative;
	}
	.controls-container {
		border-radius: 4px;
		overflow: hidden;
		z-index: 0;
	}
	/* .card-container input {
		position: absolute;
		right: 0;
		top: 0;
		opacity: 0;
		transition: opacity 250ms ease;
	} */
	/* .card-container:hover input {
		opacity: 1;
	} */
	@media screen and (min-width: 680px) {
		.template-editor {
			display: flex;
		}
	}
</style>
