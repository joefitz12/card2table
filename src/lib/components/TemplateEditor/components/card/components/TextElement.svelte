<script lang="ts">
	import { textElements, template } from '$lib/store';
	export let id: number;

	$: textElement = $textElements.get(id)!;
</script>

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
	id={`text-element-${id}-template`}
	style="--color: {textElement.color}; 
	--font-size: {(textElement.fontSize || 0.22) * $template.relativeUnit}px; 
	--transform-left: {textElement.leftTransform || 0}px; 
	--transform-top: {textElement.topTransform || 0}px;
	--font-weight: {textElement.fontWeight};
	--font-style: {textElement.fontStyle || 'normal'};
	--text-decoration: {textElement.textDecoration || 'normal'};
	--padding-top: {(textElement.padding.top || 0) * $template.relativeUnit}px;
	--padding-right: {(textElement.padding.right || 0) * $template.relativeUnit}px;
	--padding-bottom: {(textElement.padding.bottom || 0) * $template.relativeUnit}px;
	--padding-left: {(textElement.padding.left || 0) * $template.relativeUnit}px;
	--margin-top: {typeof textElement.margin.top === 'number'
		? `${(textElement.margin.top || 0) * $template.relativeUnit}px`
		: textElement.margin.top};
	--margin-right: {typeof textElement.margin.right === 'number'
		? `${(textElement.margin.right || 0) * $template.relativeUnit}px`
		: textElement.margin.right};
	--margin-bottom: {typeof textElement.margin.bottom === 'number'
		? `${(textElement.margin.bottom || 0) * $template.relativeUnit}px`
		: textElement.margin.bottom};
	--margin-left: {typeof textElement.margin.left === 'number'
		? `${(textElement.margin.left || 0) * $template.relativeUnit}px`
		: textElement.margin.left};
	--border-color: {textElement.border.color};
	--border-top-width: {(textElement.border.width.top || 0) * $template.relativeUnit}px;
	--border-right-width: {(textElement.border.width.right || 0) * $template.relativeUnit}px;
	--border-bottom-width: {(textElement.border.width.bottom || 0) * $template.relativeUnit}px;
	--border-left-width: {(textElement.border.width.left || 0) * $template.relativeUnit}px;
	--border-top-left-radius: {(textElement.border.radius.topLeft || 0) * $template.relativeUnit}px;
	--border-top-right-radius: {(textElement.border.radius.topRight || 0) * $template.relativeUnit}px; 
	--border-bottom-right-radius: {(textElement.border.radius.bottomRight || 0) *
		$template.relativeUnit}px; 
	--border-bottom-left-radius: {(textElement.border.radius.bottomLeft || 0) *
		$template.relativeUnit}px;
	"
>
	<span>&#123;</span><span class="text-element"
		>{textElement.title?.toLowerCase().split(' ').join('-')}</span
	><span>&#125;</span>
</div>

<style>
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
		border: solid var(--border-color);
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
