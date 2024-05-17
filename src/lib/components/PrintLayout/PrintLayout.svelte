<script lang="ts">
	import { print, state, uiTextElements } from '$lib/store';
	import type { UICardTemplate } from '$lib/utils/uiCardTemplate';
	import type { UITextElement } from '$lib/utils/uiTextElement';
	import { Sidebar } from './components';

	let selectedTemplate: UICardTemplate | undefined;
	let textElements: Map<number, UITextElement>;
	let rowsPerPage: Number;

	$: {
		rowsPerPage = selectedTemplate ? Math.floor($print.height / selectedTemplate.height) : 0;
	}

	// let columnGap = 0.5;
	let rowGap = 0.5;

	uiTextElements.subscribe(($uiTextElements) => {
		textElements = $uiTextElements;
	});
</script>

<div class="flex row print-container">
	{#if selectedTemplate}
		<div
			class="preview"
			class:empty={$print.width < selectedTemplate.width || $print.height < selectedTemplate.height}
			style="--column-gap: {$print.columnGap + (selectedTemplate.unit || 'in')}; 
            --row-gap: {rowGap + (selectedTemplate.unit || 'in')}; 
            --card-width: {(selectedTemplate.width || 2.44) + (selectedTemplate.unit || 'in')};
            --page-height: {$print.height + (selectedTemplate.unit || 'in')};
            --page-width: {$print.width + (selectedTemplate.unit || 'in')};
            --rows-per-page: {rowsPerPage};"
		>
			{#if $print.width < selectedTemplate.width || $print.height < selectedTemplate.height}
				<div class="flex column align-center"><span>Page too small =(</span></div>
			{/if}
			{#if $state.csvs.length && !($print.width < selectedTemplate.width || $print.height < selectedTemplate.height)}
				{#each $state.csvs.find((csv) => parseInt(csv.id) === $print.selectedTemplate)?.cards || $state.csvs[0].cards as card}
					<div
						class="card-template"
						style="--card-height: {(selectedTemplate.height || 3.43) +
							(selectedTemplate.unit || 'in')}; 
                        --card-width: {(selectedTemplate.width || 2.44) +
							(selectedTemplate.unit || 'in')}; 
                        --card-border-color: {selectedTemplate.border.color}; 
						--card-border-top-width: {(selectedTemplate.border.width.top || 0) +
							(selectedTemplate.unit || 'in')};
						--card-border-right-width: {(selectedTemplate.border.width.right || 0) +
							(selectedTemplate.unit || 'in')};
						--card-border-bottom-width: {(selectedTemplate.border.width.bottom || 0) +
							(selectedTemplate.unit || 'in')};
						--card-border-left-width: {(selectedTemplate.border.width.left || 0) +
							(selectedTemplate.unit || 'in')};
                        --card-border-top-left-radius: {(selectedTemplate.border.radius.topLeft ||
							0) + (selectedTemplate.unit || 'in')}; 
						--card-border-top-right-radius: {(selectedTemplate.border.radius.topRight || 0) +
							(selectedTemplate.unit || 'in')}; 
						--card-border-bottom-right-radius: {(selectedTemplate.border.radius.bottomRight || 0) +
							(selectedTemplate.unit || 'in')};
						--card-border-bottom-left-radius: {(selectedTemplate.border.radius.bottomLeft || 0) +
							(selectedTemplate.unit || 'in')};
                        --card-background-color: {selectedTemplate.backgroundColor}; 
                        --card-top-padding: {(selectedTemplate.padding.top || 0) +
							(selectedTemplate.unit || 'in')};
                        --card-right-padding: {(selectedTemplate.padding.right || 0) +
							(selectedTemplate.unit || 'in')};
                        --card-bottom-padding: {(selectedTemplate.padding.bottom || 0) +
							(selectedTemplate.unit || 'in')};
                        --card-left-padding: {(selectedTemplate.padding.left || 0) +
							(selectedTemplate.unit || 'in')};
                        "
					>
						<div class="overlay" />
						{#if selectedTemplate}
							{#each Array.from(textElements) as [key, textElement]}
								<div
									class="text-element-container"
									class:positioned={!!textElement.leftTransform || !!textElement.topTransform}
									style="--color: {textElement.color}; 
                                	--font-size: {(textElement.fontSize || 0.22) +
										(selectedTemplate.unit || 'in')}; 
                                	--transform-left: {(textElement.leftTransform || 0) /
										selectedTemplate.relativeUnit +
										(selectedTemplate.unit || 'in')};
                               		--transform-top: {(textElement.topTransform || 0) /
										selectedTemplate.relativeUnit +
										(selectedTemplate.unit || 'in')};
									--font-weight: {textElement.fontWeight};
									--font-style: {textElement.fontStyle || 'normal'};
									--text-decoration: {textElement.textDecoration || 'normal'};
									--padding-top: {(textElement.padding.top || 0) + (selectedTemplate.unit || 'in')};
									--padding-right: {(textElement.padding.right || 0) + (selectedTemplate.unit || 'in')};
									--padding-bottom: {(textElement.padding.bottom || 0) + (selectedTemplate.unit || 'in')};
									--padding-left: {(textElement.padding.left || 0) + (selectedTemplate.unit || 'in')};
									--border-top-width: {(textElement.border.width.top || 0) + (selectedTemplate.unit || 'in')};
									--border-right-width: {(textElement.border.width.right || 0) + (selectedTemplate.unit || 'in')};
									--border-bottom-width: {(textElement.border.width.bottom || 0) + (selectedTemplate.unit || 'in')};
									--border-left-width: {(textElement.border.width.left || 0) + (selectedTemplate.unit || 'in')};
									--border-top-left-radius: {(textElement.border.radius.topLeft || 0) +
										(selectedTemplate.unit || 'in')}; 
									--border-top-right-radius: {(textElement.border.radius.topRight || 0) +
										(selectedTemplate.unit || 'in')}; 
									--border-bottom-right-radius: {(textElement.border.radius.bottomRight || 0) +
										(selectedTemplate.unit || 'in')};
									--border-bottom-left-radius: {(textElement.border.radius.bottomLeft || 0) +
										(selectedTemplate.unit || 'in')};
									"
								>
									<span class="text-element"
										>{card[textElement.title.toLowerCase().split(' ').join('-')]}</span
									>
								</div>
							{/each}
						{/if}
					</div>
				{/each}
			{/if}
		</div>
	{/if}

	<div class="sidebar">
		<Sidebar />
	</div>
</div>

<style>
	.print-container {
		position: relative;
		gap: 0;
	}
	/* .print-layout {
		position: sticky;
		top: 0;
		right: 0;
		z-index: 1;
		margin-bottom: auto;
		background-color: white;
		filter: drop-shadow(-1px 2px 2px RGBA(0, 0, 0, 0.24));
	} */
	.sidebar {
		border-radius: 4px;
		overflow: hidden;
		z-index: 0;
		position: absolute;
		right: 0;
	}
	.preview:not(.empty) {
		max-width: var(--page-width);
		min-width: var(--page-width);
		display: grid;
		grid-template-columns: repeat(
			auto-fill,
			minmax(calc(var(--card-width) + var(--column-gap)), 1fr)
		);
		grid-auto-rows: calc(var(--page-height) / var(--rows-per-page));
		background-image: linear-gradient(
			to bottom,
			transparent calc(var(--page-height) - 1px),
			red var(--page-height)
		);
		background-size: 5px var(--page-height);
		background-repeat: space repeat;
		border: 1px dashed red;
		box-sizing: border-box;
	}
	.card-template {
		margin: auto;
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
		overflow: hidden;
		padding: var(--card-top-padding) var(--card-right-padding) var(--card-bottom-padding)
			var(--card-left-padding);
		box-sizing: border-box;
		-webkit-print-color-adjust: exact !important;
		print-color-adjust: exact !important;
	}

	.card-template .overlay {
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
	}

	.text-element-container {
		color: var(--color);
		font-size: var(--font-size);
		cursor: move;
		padding: var(--padding-top) var(--padding-right) var(--padding-bottom) var(--padding-left);
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
	.text-element {
		font-weight: var(--font-weight);
		font-style: var(--font-style, 'normal');
		text-decoration: var(--text-decoration, 'normal');
	}
	@media print {
		.print-layout {
			display: none;
		}
		.preview {
			background: none;
			border: none;
			overflow: visible;
		}
	}
</style>
