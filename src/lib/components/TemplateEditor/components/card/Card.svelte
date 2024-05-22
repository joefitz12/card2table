<script lang="ts">
	import { cardTemplates, template, textElements } from '$lib/store';
	import { afterUpdate } from 'svelte';
	import { TextElement } from './components';
	import { setRelativeUnit } from '$lib/utils/setRelativeUnit';
	import { cardTemplate } from '$lib/api/cardTemplate';

	function focus(input: HTMLInputElement) {
		input.focus();
	}

	// convert to pixels
	let cardContainer: HTMLDivElement;

	afterUpdate(() => {
		setRelativeUnit(cardContainer);
	});

	$: {
		if ($template?.width || $template?.height) {
			setRelativeUnit(cardContainer);
		}
		if ($template?.title) {
			cardTemplate
				.getAll()
				.then(($cardTemplates) => cardTemplates.set($cardTemplates))
				.catch((error) => console.error(error));
		}
	}
</script>

<svelte:window on:resize={() => setRelativeUnit(cardContainer)} />

{#if $template}
	<div class="flex column template-container">
		<div class="title">
			<input id="card-title" type="text" bind:value={$template.title} use:focus />
		</div>
		<div class="flex card-container" bind:this={cardContainer}>
			<div
				class="card"
				style="--card-height: {$template.height * $template.relativeUnit}px; 
				--card-width: {$template.width * $template.relativeUnit}px; 
				--card-border-color: {$template.border.color}; 
				--card-border-top-width: {($template.border.width.top || 0) * $template.relativeUnit}px; 
				--card-border-right-width: {($template.border.width.right || 0) * $template.relativeUnit}px; 
				--card-border-bottom-width: {($template.border.width.bottom || 0) * $template.relativeUnit}px; 
				--card-border-left-width: {($template.border.width.left || 0) * $template.relativeUnit}px; 
				--card-border-top-left-radius: {($template.border.radius.topLeft || 0) *
					$template.relativeUnit}px;  
				--card-border-top-right-radius: {($template.border.radius.topRight || 0) *
					$template.relativeUnit}px; 
				--card-border-bottom-right-radius: {($template.border.radius.bottomRight || 0) *
					$template.relativeUnit}px;  
				--card-border-bottom-left-radius: {($template.border.radius.bottomLeft || 0) *
					$template.relativeUnit}px; 
				--card-background-color: {$template.backgroundColor}; 
				--card-top-padding: {($template.padding.top || 0) * $template.relativeUnit}px;
				--card-right-padding: {($template.padding.right || 0) * $template.relativeUnit}px;
				--card-bottom-padding: {($template.padding.bottom || 0) * $template.relativeUnit}px;
				--card-left-padding: {($template.padding.left || 0) * $template.relativeUnit}px;
				"
				on:drop={$template.handleDrop}
				on:dragover={$template.handleDragover}
			>
				<div class="overlay" />
				{#each Array.from($textElements.keys()) as id}
					{#key id}
						<TextElement id={parseInt(id.toString())} />
					{/key}
				{/each}
			</div>
		</div>
	</div>
{/if}

<style>
	.template-container {
		height: 100%;
	}
	.card-container {
		flex-grow: 1;
	}
	.title {
		display: flex;
		align-items: center;
		column-gap: 8px;
	}
	.title input {
		flex-grow: 1;
		font-size: 2rem;
		font-weight: 400;
		padding: 0.5rem 1rem;
		border: none;
		outline: none !important;
		background: none !important;
	}
	.card {
		margin: auto auto 3rem;
		position: relative;
		display: flex;
		flex-direction: column;
		height: var(--card-height);
		width: var(--card-width);
		border-top-left-radius: var(--card-border-top-left-radius);
		border-top-right-radius: var(--card-border-top-right-radius);
		border-bottom-right-radius: var(--card-border-bottom-right-radius);
		border-bottom-left-radius: var(--card-border-bottom-left-radius);
		background-color: var(--card-background-color);
		transform-origin: top left;
		--shadow-color: 0deg 0% 60%;
		--box-shadow: 0px 0.4px 0.6px hsl(var(--shadow-color) / 0.1),
			0px 1.9px 2.7px -0.2px hsl(var(--shadow-color) / 0.24),
			0px 4px 5.6px -0.4px hsl(var(--shadow-color) / 0.39),
			0.1px 8.6px 12.1px -0.6px hsl(var(--shadow-color) / 0.53);
		box-shadow: var(--box-shadow);
		overflow: hidden;
		padding: var(--card-top-padding) var(--card-right-padding) var(--card-bottom-padding)
			var(--card-left-padding);
		box-sizing: border-box;
	}
	.card .overlay {
		position: absolute;
		height: 100%;
		width: 100%;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		border-style: solid;
		border-color: var(--card-border-color);
		border-top-width: var(--card-border-top-width);
		border-right-width: var(--card-border-right-width);
		border-bottom-width: var(--card-border-bottom-width);
		border-left-width: var(--card-border-left-width);
		box-sizing: border-box;
		border-top-left-radius: var(--card-border-top-left-radius);
		border-top-right-radius: var(--card-border-top-right-radius);
		border-bottom-right-radius: var(--card-border-bottom-right-radius);
		border-bottom-left-radius: var(--card-border-bottom-left-radius);
		pointer-events: none;
	}
</style>
