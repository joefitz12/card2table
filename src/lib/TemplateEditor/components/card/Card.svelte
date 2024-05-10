<script lang="ts">
	import '../../../../styles/new.css';
	import { uiTextElements, state } from '$lib/store';
	import { afterUpdate } from 'svelte';
	import { TextElement } from './components';

	function focus(input: HTMLInputElement) {
		input.focus();
	}

	// convert to pixels
	let cardContainer: HTMLDivElement;

	afterUpdate(() => {
		setRelativeUnit();
	});

	$: {
		if ($state.template?.width || $state.template?.height) {
			setRelativeUnit();
		}
	}

	const setRelativeUnit = () => {
		if (!cardContainer) {
			return;
		}
		let maxCardHeight = cardContainer.clientHeight - 2 * 48;
		let maxCardWidth = cardContainer.clientWidth - 2 * 16;

		state.update(($state) => {
			if ($state.template.relativeUnit * ($state.template.width || 2.44) > maxCardWidth) {
				return {
					...$state,
					template: {
						...$state.template,
						relativeUnit: Math.floor(maxCardWidth / ($state.template.width || 2.44)),
					},
				};
			} else {
				return {
					...$state,
					template: {
						...$state.template,
						relativeUnit: Math.floor(maxCardHeight / ($state.template.height || 3.43)),
					},
				};
			}
		});
	};
	// @todo -- check if this is unnecessary
	$: {
		if ($state.template) {
			state.update(($state) => {
				return {
					...$state,
					templates:
						$state.templates && $state.templates.set
							? $state.templates.set($state.template.id, $state.template)
							: new Map([[$state.template.id, $state.template]]),
				};
			});
		}
	}
</script>

<svelte:window on:resize={setRelativeUnit} />

{#if $state.template}
	<div class="flex column template-container">
		<div class="title">
			<button type="button">&#9776;</button>
			<input id="card-title" type="text" bind:value={$state.template.title} use:focus />
		</div>
		<div class="flex card-container" bind:this={cardContainer}>
			<div
				class="card"
				style="--card-height: {$state.template.height * $state.template.relativeUnit}px; 
				--card-width: {$state.template.width * $state.template.relativeUnit}px; 
				--card-border-color: {$state.template.border.color}; 
				--card-border-top-width: {($state.template.border.width.top || 0) *
					$state.template.relativeUnit}px; 
				--card-border-right-width: {($state.template.border.width.right || 0) *
					$state.template.relativeUnit}px; 
				--card-border-bottom-width: {($state.template.border.width.bottom || 0) *
					$state.template.relativeUnit}px; 
				--card-border-left-width: {($state.template.border.width.left || 0) *
					$state.template.relativeUnit}px; 
				--card-border-top-left-radius: {($state.template.border.radius.topLeft || 0) *
					$state.template.relativeUnit}px;  
				--card-border-top-right-radius: {($state.template.border.radius.topRight || 0) *
					$state.template.relativeUnit}px; 
				--card-border-bottom-right-radius: {($state.template.border.radius.bottomRight || 0) *
					$state.template.relativeUnit}px;  
				--card-border-bottom-left-radius: {($state.template.border.radius.bottomLeft || 0) *
					$state.template.relativeUnit}px; 
				--card-background-color: {$state.template.backgroundColor}; 
				--card-top-padding: {($state.template.padding.top || 0) * $state.template.relativeUnit}px;
				--card-right-padding: {($state.template.padding.right || 0) * $state.template.relativeUnit}px;
				--card-bottom-padding: {($state.template.padding.bottom || 0) * $state.template.relativeUnit}px;
				--card-left-padding: {($state.template.padding.left || 0) * $state.template.relativeUnit}px;
				"
				on:drop={$state.template.handleDrop}
				on:dragover={$state.template.handleDragover}
			>
				<div class="overlay" />
				{#each Array.from($uiTextElements.keys()) as id}
					{#key id}
						<TextElement {id} />
					{/key}
				{/each}
			</div>
		</div>
	</div>
{/if}

<style>
	.template-container {
		--padding: 1rem;
		height: calc(100% - 2 * var(--padding));
	}

	.card-container {
		flex-grow: 1;
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
