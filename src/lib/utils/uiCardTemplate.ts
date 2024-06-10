import { state, textElements } from '$lib/store';
import { get } from 'svelte/store';
import { CardTemplate } from '$lib/models/CardTemplate';
import { TextElement } from '$lib/models/TextElement';
import { textElement } from '$lib/api';

export class UICardTemplate extends CardTemplate {
	id: IDBValidKey;
	textElementId: string;
	handleDrop: (e: DragEvent) => void;
	handleDragover: (e: DragEvent) => void;
	_getTransform: (e: DragEvent) => { topTransform: number; leftTransform: number };
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
			if (
				!(e.target instanceof HTMLElement) ||
				!e.dataTransfer ||
				!e.dataTransfer.getData('text')
			) {
				return;
			}

			// Update text element id offset
			// @todo -- remove ! from .match
			const textElementId = e.dataTransfer.getData('text');
			const id = textElementId.match(/\d+/) ? parseInt(textElementId.match(/\d+/)![0]) : null;

			if (!id) {
				return;
			}

			const droppedTextElement = get(textElements).get(id);

			if (!droppedTextElement) {
				throw 'text element does not exist';
			}

			const { leftTransform, topTransform } = this._getTransform(e);

			const updatedTextElement = { ...droppedTextElement, topTransform, leftTransform };

			textElement
				.update(updatedTextElement)
				.then(() => {
					textElements.update(($textElements) => {
						return $textElements.set(id, updatedTextElement);
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
				})
				.catch((error) => console.error({ error }));
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
		this._getTransform = (e) => {
			// Establish offset and transform
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
				throw 'invalid drop';
			}

			return {
				leftTransform: cardOffset.offsetX - get(state).drag.offsetX,
				topTransform: cardOffset.offsetY - get(state).drag.offsetY,
			};
		};
	}
}
