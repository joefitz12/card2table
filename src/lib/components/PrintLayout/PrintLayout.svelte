<script lang="ts">
	import { csv } from '$lib/api/csv';
	import { cards, csvs, print, selectedCsv, template, textElements } from '$lib/store';

	let rowsPerPage: Number;

	$: {
		rowsPerPage = $template ? Math.floor($print.height / $template.height) : 0;
	}

	// let columnGap = 0.5;
	let rowGap = 0.5;

	// get all CSVs
	csv
		.getAll()
		.then((files) => {
			csvs.set(files);
			if (!$selectedCsv) {
				selectedCsv.set(files[0]?.id);
			}
		})
		.catch((reason) => console.error({ reason }));
</script>

<div class="flex row print-container">
	{#if $template}
		<div
			class="preview"
			class:empty={$print.width < $template.width || $print.height < $template.height}
			style="--column-gap: {$print.columnGap + ($template.unit || 'in')}; 
            --row-gap: {rowGap + ($template.unit || 'in')}; 
            --card-width: {($template.width || 2.44) + ($template.unit || 'in')};
            --page-height: {$print.height + ($template.unit || 'in')};
            --page-width: {$print.width + ($template.unit || 'in')};
            --rows-per-page: {rowsPerPage};"
		>
			{#if $print.width < $template.width || $print.height < $template.height}
				<div class="flex column align-center"><span>Page too small =(</span></div>
			{/if}
			{#if $csvs.length && !($print.width < $template.width || $print.height < $template.height)}
				{#each [...$cards.values()] as card}
					<div
						class="card-template"
						style="--card-height: {($template.height || 3.43) + ($template.unit || 'in')}; 
                        --card-width: {($template.width || 2.44) + ($template.unit || 'in')}; 
                        --card-border-color: {$template.border.color}; 
						--card-border-top-width: {($template.border.width.top || 0) + ($template.unit || 'in')};
						--card-border-right-width: {($template.border.width.right || 0) + ($template.unit || 'in')};
						--card-border-bottom-width: {($template.border.width.bottom || 0) + ($template.unit || 'in')};
						--card-border-left-width: {($template.border.width.left || 0) + ($template.unit || 'in')};
                        --card-border-top-left-radius: {($template.border.radius.topLeft || 0) +
							($template.unit || 'in')}; 
						--card-border-top-right-radius: {($template.border.radius.topRight || 0) +
							($template.unit || 'in')}; 
						--card-border-bottom-right-radius: {($template.border.radius.bottomRight || 0) +
							($template.unit || 'in')};
						--card-border-bottom-left-radius: {($template.border.radius.bottomLeft || 0) +
							($template.unit || 'in')};
                        --card-background-color: {$template.backgroundColor}; 
                        --card-top-padding: {($template.padding.top || 0) +
							($template.unit || 'in')};
                        --card-right-padding: {($template.padding.right || 0) +
							($template.unit || 'in')};
                        --card-bottom-padding: {($template.padding.bottom || 0) +
							($template.unit || 'in')};
                        --card-left-padding: {($template.padding.left || 0) +
							($template.unit || 'in')};
                        "
					>
						<div class="overlay" />
						{#each Array.from($textElements) as [key, textElement]}
							<div
								class="text-element-container"
								class:positioned={!!textElement.leftTransform || !!textElement.topTransform}
								style="--color: {textElement.color}; 
                                	--font-size: {(textElement.fontSize || 0.22) +
									($template.unit || 'in')}; 
                                	--transform-left: {(textElement.leftTransform || 0) /
									$template.relativeUnit +
									($template.unit || 'in')};
                               		--transform-top: {(textElement.topTransform || 0) /
									$template.relativeUnit +
									($template.unit || 'in')};
									--font-weight: {textElement.fontWeight};
									--font-style: {textElement.fontStyle || 'normal'};
									--text-decoration: {textElement.textDecoration || 'normal'};
									--padding-top: {(textElement.padding.top || 0) + ($template.unit || 'in')};
									--padding-right: {(textElement.padding.right || 0) + ($template.unit || 'in')};
									--padding-bottom: {(textElement.padding.bottom || 0) + ($template.unit || 'in')};
									--padding-left: {(textElement.padding.left || 0) + ($template.unit || 'in')};
									--border-top-width: {(textElement.border.width.top || 0) + ($template.unit || 'in')};
									--border-right-width: {(textElement.border.width.right || 0) + ($template.unit || 'in')};
									--border-bottom-width: {(textElement.border.width.bottom || 0) + ($template.unit || 'in')};
									--border-left-width: {(textElement.border.width.left || 0) + ($template.unit || 'in')};
									--border-top-left-radius: {(textElement.border.radius.topLeft || 0) + ($template.unit || 'in')}; 
									--border-top-right-radius: {(textElement.border.radius.topRight || 0) + ($template.unit || 'in')}; 
									--border-bottom-right-radius: {(textElement.border.radius.bottomRight || 0) +
									($template.unit || 'in')};
									--border-bottom-left-radius: {(textElement.border.radius.bottomLeft || 0) +
									($template.unit || 'in')};
									"
							>
								<span class="text-element"
									>{card[textElement.title.toLowerCase().split(' ').join('-')]}</span
								>
							</div>
						{/each}
					</div>
				{/each}
			{/if}
		</div>
	{/if}
</div>

<style>
	.print-container {
		position: relative;
		gap: 0;
		overflow: scroll;
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
		height: min-content;
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
		.preview {
			background: none;
			border: none;
			overflow: visible;
		}
	}
</style>
