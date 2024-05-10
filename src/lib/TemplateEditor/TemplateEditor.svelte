<script lang="ts">
	// import { Canvas, Card, Sidebar } from './components';
	import { Card, Sidebar } from './components';
</script>

<div class="flex template-editor">
	<!-- <Menu /> -->
	<div class="card">
		<Card />
	</div>
	<div class="sidebar">
		<Sidebar />
	</div>
	<!-- <div class="canvas">
		<Canvas />
	</div> -->
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
	.sidebar {
		border-radius: 4px;
		overflow: hidden;
		z-index: 0;
		position: absolute;
		right: 0;
	}
	.canvas {
		position: absolute;
		height: 100%;
		width: 100%;
		pointer-events: none;
	}
	@media screen and (min-width: 680px) {
		.template-editor {
			display: flex;
		}
	}
</style>
