<script lang="ts">
	import '../styles/app.css';
	import { onNavigate } from '$app/navigation';

	interface ExtendedDocument extends Document {
		startViewTransition: any;
	}

	onNavigate((navigation) => {
		if (!('startViewTransition' in document)) return;

		return new Promise((resolve) => {
			(document as ExtendedDocument).startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	// const handleFileUpload = (e: Event) => {
	// 	const input = e.target as HTMLInputElement;
	// 	const file = input.files ? input.files[0] : null;
	// 	if (!file) {
	// 		return;
	// 	}
</script>

<div class="main-container">
	<nav>
		<ul>
			<li>
				<a href="/">Home</a>
			</li>
			<!-- <li>
				<a href="/collection">Collections</a>
			</li> -->
			<li>
				<a href="/template">Templates</a>
			</li>
			<li>
				<a href="/print">Print</a>
			</li>
		</ul>
	</nav>
	<main class="flex column">
		<slot />
	</main>
</div>

<style>
	.main-container {
		height: 100vh;
		display: flex;
		flex-direction: column;
		max-width: 100vw;
		overflow-x: clip;
	}
	nav {
		view-transition-name: header-nav;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	main {
		flex-grow: 1;
		min-height: 0;
	}

	@media print {
		nav {
			display: none;
		}
	}
</style>
