<script lang="ts">
	import { Card } from './components';
</script>

<div class="flex template-editor">
	<div class="card">
		<Card />
	</div>
</div>

<style>
	.template-editor {
		flex-grow: 1;
		position: relative;
	}
	.card {
		flex-grow: 1;
		position: relative;
		min-width: 0;
	}
	@media screen and (min-width: 680px) {
		.template-editor {
			display: flex;
		}
	}
</style>
