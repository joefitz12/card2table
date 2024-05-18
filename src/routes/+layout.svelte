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
</script>

<div class="main-container flex column">
	<nav>
		<ul class="flex align-center">
			<li>
				<button
					class="menu flex align-center"
					on:click={() => menuExpanded.update(($menuExpanded) => !$menuExpanded)}>&#9776;</button
				>
			</li>
			<li>
				<a class="title" href="/">card2table</a>
			</li>
			<!-- <li>
				<a href="/faq">FAQ</a>
			</li> -->
			<!-- <li>
				<a href="/template">Templates</a>
			</li> -->
			<!-- <li>
				<a href="/print">Print</a>
			</li> -->
		</ul>
	</nav>
	<main class="flex column">
		<Menu />
		<Tabs />
		<slot />
	</main>
</div>

<style>
	button.menu {
		background: transparent;
		border: none;
		padding: 0rem 1rem;
		font-size: 2rem;
		gap: 0.5rem;
	}
	a.title {
		font-size: 1.75rem;
	}
	.main-container {
		gap: 0;
		height: 100vh;
		max-width: 100vw;
		overflow-x: clip;
	}
	ul {
		padding: 0;
		gap: 0.5rem;
	}
	li {
		margin: 0;
	}
	nav {
		view-transition-name: header-nav;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 48px;
		min-height: 48px;
	}
	main {
		flex-grow: 1;
		gap: 0;
		position: relative;
	}

	@media print {
		nav {
			display: none;
		}
	}
</style>
