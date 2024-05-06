<script lang="ts">
	import '../../../styles/new.css';
	import { state } from '../../store';
	import { onMount } from 'svelte';

	function focus(input: HTMLInputElement) {
		input.focus();
	}

	// convert to pixels
	let cardContainer: HTMLDivElement;

	onMount(() => {
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

		state.update((state) => {
			if (state.template.relativeUnit * (state.template.width || 2.44) > maxCardWidth) {
				return {
					...state,
					template: {
						...state.template,
						relativeUnit: Math.floor(maxCardWidth / ($state.template.width || 2.44)),
					},
				};
			} else {
				return {
					...state,
					template: {
						...state.template,
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
				{#each $state.template.textElements as textElement}
					<div
						class="text-element-container"
						class:positioned={!!textElement.leftTransform || !!textElement.topTransform}
						draggable="true"
						on:dragstart={(e) => {
							console.log(textElement);
							textElement.template.onDragstart(e);
						}}
						on:mouseover={textElement.onMouseover}
						on:mouseleave={textElement.onMouseleave}
						on:focus={() => console.log('focus')}
						id={`text-element-${textElement.id}-template`}
						style="--color: {textElement.color}; 
						--font-size: {(textElement.fontSize || 0.22) * $state.template.relativeUnit}px; 
						--transform-left: {textElement.leftTransform || 0}px; 
						--transform-top: {textElement.topTransform || 0}px;
						--font-weight: {textElement.fontWeight};
						--font-style: {textElement.fontStyle || 'normal'};
						--text-decoration: {textElement.textDecoration || 'normal'};
						--padding-top: {(textElement.padding.top || 0) * $state.template.relativeUnit}px;
						--padding-right: {(textElement.padding.right || 0) * $state.template.relativeUnit}px;
						--padding-bottom: {(textElement.padding.bottom || 0) * $state.template.relativeUnit}px;
						--padding-left: {(textElement.padding.left || 0) * $state.template.relativeUnit}px;
						--margin-top: {typeof textElement.margin.top === 'number'
							? `${(textElement.margin.top || 0) * $state.template.relativeUnit}px`
							: textElement.margin.top};
						--margin-right: {typeof textElement.margin.right === 'number'
							? `${(textElement.margin.right || 0) * $state.template.relativeUnit}px`
							: textElement.margin.right};
						--margin-bottom: {typeof textElement.margin.bottom === 'number'
							? `${(textElement.margin.bottom || 0) * $state.template.relativeUnit}px`
							: textElement.margin.bottom};
						--margin-left: {typeof textElement.margin.left === 'number'
							? `${(textElement.margin.left || 0) * $state.template.relativeUnit}px`
							: textElement.margin.left};
						--border-top-width: {(textElement.border.width.top || 0) * $state.template.relativeUnit}px;
						--border-right-width: {(textElement.border.width.right || 0) * $state.template.relativeUnit}px;
						--border-bottom-width: {(textElement.border.width.bottom || 0) * $state.template.relativeUnit}px;
						--border-left-width: {(textElement.border.width.left || 0) * $state.template.relativeUnit}px;
						--border-top-left-radius: {(textElement.border.radius.topLeft || 0) *
							$state.template.relativeUnit}px;
						--border-top-right-radius: {(textElement.border.radius.topRight || 0) *
							$state.template.relativeUnit}px; 
						--border-bottom-right-radius: {(textElement.border.radius.bottomRight || 0) *
							$state.template.relativeUnit}px; 
						--border-bottom-left-radius: {(textElement.border.radius.bottomLeft || 0) *
							$state.template.relativeUnit}px;
						"
					>
						<span>&#123;</span><span class="text-element"
							>{textElement.title?.toLowerCase().split(' ').join('-')}</span
						><span>&#125;</span>
					</div>
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

	.text-element-container {
		position: relative;
		color: var(--color);
		font-size: var(--font-size);
		cursor: move;
		transition: border-color 75ms ease-in-out;
		padding: var(--padding-top) var(--padding-right) var(--padding-bottom) var(--padding-left);
		margin: var(--margin-top) var(--margin-right) var(--margin-bottom) var(--margin-left);
		width: var(--card-width) - calc(var(--card-left-padding) + var(--card-right-padding));
		box-sizing: border-box;
		border: solid var(--color);
		border-top-width: var(--border-top-width);
		border-right-width: var(--border-right-width);
		border-bottom-width: var(--border-bottom-width);
		border-left-width: var(--border-left-width);
		border-top-left-radius: var(--border-top-left-radius);
		border-top-right-radius: var(--border-top-right-radius);
		border-bottom-right-radius: var(--border-bottom-right-radius);
		border-bottom-left-radius: var(--border-bottom-left-radius);
	}
	.text-element-container.positioned {
		position: absolute;
		transform: translate3d(var(--transform-left), var(--transform-top), 0);
	}
	/* .text-element-container .overlay {
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
	} */
	.text-element {
		font-weight: var(--font-weight);
		font-style: var(--font-style, 'normal');
		text-decoration: var(--text-decoration, 'normal');
	}

	/* WIP: Hide selected drag element, use custom image */
	/* .text-element.is-being-dragged {
		pointer-events: none;
		opacity: 0;
	} */
</style>
