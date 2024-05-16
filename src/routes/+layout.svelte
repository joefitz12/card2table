<script lang="ts">
	import '../styles/app.css';
	import '../styles/controls.css';
	import { onNavigate } from '$app/navigation';
	import { menuExpanded, openedTemplates } from '$lib/store';
	import Menu from '$lib/components/Menu/Menu.svelte';
	import { page } from '$app/stores';

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
	<ol class="flex">
		{#if $openedTemplates}
			{#each Array.from($openedTemplates.entries()) as [id, title]}
				<li class="template flex align-center">
					<a
						class:active={$page.url.pathname.includes(`/template/${id}`)}
						aria-label={`Edit ${title}`}
						href={`/template/${id}`}>{title}</a
					>
					<button
						type="button"
						on:click={() =>
							openedTemplates.update(($openedTemplates) => {
								$openedTemplates.delete(id);
								return $openedTemplates;
							})}
						aria-label={`Close template # ${title}`}
						class="delete">&#10005;</button
					>
				</li>
			{/each}
		{/if}
	</ol>
	<main class="flex column">
		<Menu />
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
	ol {
		margin: 0;
		padding: 0;
		min-width: 0;
		overflow-x: auto;
		max-width: 100%;
	}

	ol li {
		margin: 0;
	}
	ol li a {
		padding: 0.5rem;
		white-space: nowrap;
		max-width: 5rem;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	ol li:has(a.active) {
		background: lightblue;
	}
	ol li:hover {
		background: lightgrey;
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
