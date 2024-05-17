<script lang="ts">
	import '../styles/app.css';
	import '../styles/controls.css';
	import { onNavigate } from '$app/navigation';
	import { menuExpanded } from '$lib/store';
	import { Menu, Tabs } from '$lib/components';

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

<div class="main-container flex column">
	<nav>
		<ul class="flex align-center">
			<li>
				<button on:click={() => menuExpanded.update(($menuExpanded) => !$menuExpanded)}>Menu</button
				>
			</li>
			<li>
				<a href="/">Home</a>
			</li>
			<!-- <li>
				<a href="/collection">Collections</a>
			</li> -->
			<!-- <li>
				<a href="/template">Templates</a>
			</li> -->
			<li>
				<a href="/print">Print</a>
			</li>
		</ul>
	</nav>
	<main class="flex column">
		<Menu />
		<Tabs />
		<slot />
	</main>
</div>

<style>
	.main-container {
		gap: 0;
		height: 100vh;
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
		position: relative;
	}

	@media print {
		nav {
			display: none;
		}
	}
</style>
