<script lang="ts">
	import '../styles/app.css';
	import PapaParse from 'papaparse';
	import { onNavigate } from '$app/navigation';
	import { cards } from '$lib/store';

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

	const handleFileUpload = (e: Event) => {
		const input = e.target as HTMLInputElement;
		const file = input.files ? input.files[0] : null;
		if (!file) {
			return;
		}

		PapaParse.parse(file, {
			header: true,
			complete: (results) => {
				cards.set(results.data as { [x: string]: string }[]);
			}
		});
	};
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
			<li>
				<a href="/print">Print</a>
			</li>
		</ul>
		<input type="file" accept="text/csv" on:change={handleFileUpload} />
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
