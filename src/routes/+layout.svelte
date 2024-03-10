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
</script>

<div class="main-container">
	<nav>
		<ul>
			<li>
				<a href="/">Home</a>
			</li>
			<li>
				<a href="/template">+ Template</a>
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
	}
	nav {
		view-transition-name: header-nav;
	}
	main {
		flex-grow: 1;
	}
</style>
