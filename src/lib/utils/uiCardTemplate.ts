import { state, textElements } from '$lib/store';
import { get } from 'svelte/store';
import { CardTemplate } from '$lib/models/CardTemplate';
import { TextElement } from '$lib/models/TextElement';

export class UICardTemplate extends CardTemplate {
	id: IDBValidKey;
	textElementId: string;
	handleDrop: (e: DragEvent) => void;
	handleDragover: (e: DragEvent) => void;
	constructor({
		id,
		unit,
		height,
		width,
		title,
		color,
		backgroundColor,
		padding,
		border,
	}: InstanceType<typeof CardTemplate> & {
		id: IDBValidKey;
	}) {
		super();
		this.id = id;
		this.unit = unit;
		this.height = height;
		this.width = width;
		this.title = title;
		this.color = color;
		this.backgroundColor = backgroundColor;
		this.padding = padding;
		this.border = border;
		this.relativeUnit = 0;
		this.textElementId = '0';
		this.handleDrop = (e: DragEvent) => {
			e.stopPropagation();
			if (!(e.target instanceof HTMLElement) || !e.dataTransfer) {
				return;
			}

			// Update text element id offset
			const textElementId = e.dataTransfer.getData('text');

			textElements.update(($textElements) => {
				const textElement = $textElements.get(textElementId);
				const textElementIndex = [...$textElements.values()].findIndex(
					(element) => element.template.id == textElementId
				);

				if (!textElement) {
					return $textElements;
				}

				// @TODO: find replacement for layerX / layerY
				// this is needed to capture offset from card
				// if user drops text element on top of another text element,
				// e.offsetX / e.offsetY references the offset on that text element (not the card)
				// Remove ts-ignore
				const cardOffset = {
					// @ts-ignore
					offsetX: e.target.nodeName === 'SPAN' ? e.layerX || e.offsetX : e.offsetX,
					// @ts-ignore
					offsetY: e.target.nodeName === 'SPAN' ? e.layerY || e.offsetX : e.offsetY,
				};

				if (
					!Math.abs(cardOffset.offsetX - get(state).drag.offsetX) ||
					!Math.abs(cardOffset.offsetY - get(state).drag.offsetY)
				) {
					return $textElements;
				}

				textElement.leftTransform = cardOffset.offsetX - get(state).drag.offsetX;
				textElement.topTransform = cardOffset.offsetY - get(state).drag.offsetY;

				return $textElements;
				// return {
				//     ...$textElements,
				//     textElements: $textElements.textElements.toSpliced(textElementIndex, 1, textElement)
				// };
			});
			state.update(($state) => {
				return {
					...$state,
					drag: {
						...$state.drag,
						isInProgress: false,
						elementId: '',
					},
				};
			});
		};
		this.handleDragover = (e: DragEvent) => {
			e.preventDefault();
			e.stopPropagation();

			if (!(e.target instanceof HTMLElement) || !e.dataTransfer) {
				return;
			}

			// Set the dropEffect to move
			e.dataTransfer.dropEffect = 'move';

			state.update((state) => {
				return {
					...state,
					feedback: {
						...state.feedback,
						textElement: {
							...state.feedback.textElement,
							drag: {
								// @ts-ignore
								offsetX: e.layerX || e.offsetX,
								// @ts-ignore
								offsetY: e.layerY || e.offsetY,
							},
						},
					},
				};
			});
		};
	}
}
