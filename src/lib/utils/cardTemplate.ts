import type { PositionalProps, TextElement } from "$lib/types";
import { state } from "$lib/store";

interface Props {
    id: string,
    unit: 'in' | 'cm' | 'mm',
    height: number,
    width: number,
    title: string,
    color: string,
    backgroundColor: string,
    padding: Pick<PositionalProps, 'top' | 'right' | 'bottom' | 'left'>;
    border: {
        color: string,
        width: Pick<PositionalProps, 'top' | 'right' | 'bottom' | 'left'>,

        radius: Pick<PositionalProps, 'topLeft' | 'topRight' | 'bottomRight' | 'bottomLeft'>,
    };
    textElements: TextElement[]
}

export class CardTemplate {
    id: string;
    unit: 'in' | 'cm' | 'mm'
    height: number;
    width: number;
    title: string;
    color: string;
    backgroundColor: string;
    padding: Pick<PositionalProps, 'top' | 'right' | 'bottom' | 'left'>;
    border: {
        color: string,
        width: Pick<PositionalProps, 'top' | 'right' | 'bottom' | 'left'>,

        radius: Pick<PositionalProps, 'topLeft' | 'topRight' | 'bottomRight' | 'bottomLeft'>,
    }
    relativeUnit: number;
    textElements: TextElement[];
    textElementId: string;
    handleDrop: (e: DragEvent) => void;
    handleDragover: (e: DragEvent) => void;
    constructor({ id, unit, height, width, title, color, backgroundColor, padding, border, textElements }: Props) {
        this.id = id || '0';
        this.unit = unit || 'in';
        this.height = height || 3.43;
        this.width = width || 2.44;
        this.title = title || `Card Template ${id}`;
        this.color = color || '#000000'
        this.backgroundColor = backgroundColor || '#1E91D6'
        this.padding = padding || { top: 0, right: 0, bottom: 0, left: 0 };
        this.border = border || {
            color: '#000000',
            width: { top: 0, right: 0, bottom: 0, left: 0 },
            radius: { topLeft: .15, topRight: 0.15, bottomRight: 0.15, bottomLeft: 0.15 }
        };
        this.relativeUnit = 0;
        this.textElements = textElements || [];
        this.textElementId = '0';
        this.handleDrop = (e: DragEvent) => {
            e.stopPropagation();
            if (!(e.target instanceof HTMLElement) || !e.dataTransfer) {
                return;
            }

            // Update text element id offset
            const textElementId = e.dataTransfer.getData('text');


            state.update((state) => {
                const textElement = state.template.textElements.find(
                    (element) => element.template.id == textElementId
                );
                const textElementIndex = state.template.textElements.findIndex(
                    (element) => element.template.id == textElementId
                );

                if (!textElement) {
                    return state;
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
                    !Math.abs(cardOffset.offsetX - state.drag.offsetX) ||
                    !Math.abs(cardOffset.offsetY - state.drag.offsetY)
                ) {
                    return state;
                }

                textElement.leftTransform = cardOffset.offsetX - state.drag.offsetX;
                textElement.topTransform = cardOffset.offsetY - state.drag.offsetY;

                return {
                    ...state,
                    template: {
                        ...state.template,
                        textElements: state.template.textElements.toSpliced(textElementIndex, 1, textElement),
                    },
                    drag: {
                        ...state.drag,
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

            // console.log('dragover', e);

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
        // this.onDrop =
        // this.textElements = $textElements;
        // this.handleDragover = (e: DragEvent) => {
        //     e.preventDefault();
        //     e.stopPropagation();

        //     if (!(e.target instanceof HTMLElement) || !e.dataTransfer) {
        //         return;
        //     }

        //     // Set the dropEffect to move
        //     e.dataTransfer.dropEffect = 'move';
        // };
        // this.handleDrop = (e: DragEvent) => {
        //     e.stopPropagation();
        //     if (!(e.target instanceof HTMLElement)) {
        //         return;
        //     }

        //     if (!e.dataTransfer) {
        //         return;
        //     }

        //     state.update((state) => {
        //         return {
        //             ...state,
        //             drag: {
        //                 ...state.drag,
        //                 isInProgress: false,
        //                 elementId: ''
        //             }
        //         };
        //     });

        //     const textElementId = e.dataTransfer.getData('text');
        //     const textElement = $textElements.find((element) => element.template.id == textElementId);

        //     if (!textElement) {
        //         return;
        //     }

        //     // @TODO: find replacement for layerX / layerY
        //     // this is needed to capture offset from card
        //     // if user drops text element on top of another text element,
        //     // e.offsetX / e.offsetY references the offset on that text element (not the card)
        //     // Remove ts-ignore
        //     const cardOffset = {
        //         // @ts-ignore
        //         offsetX: e.target.nodeName === 'SPAN' ? e.layerX || e.offsetX : e.offsetX,
        //         // @ts-ignore
        //         offsetY: e.target.nodeName === 'SPAN' ? e.layerY || e.offsetX : e.offsetY
        //     };

        //     if (
        //         !Math.abs(cardOffset.offsetX - $state.drag.offsetX) ||
        //         !Math.abs(cardOffset.offsetY - $state.drag.offsetY)
        //     ) {
        //         return;
        //     }

        //     textElement.leftTransform = cardOffset.offsetX - $state.drag.offsetX;
        //     textElement.topTransform = cardOffset.offsetY - $state.drag.offsetY;

        //     textElements.update((textElements) => {
        //         textElements[
        //             textElements.findIndex((element: TextElement) => textElement.id === element.id)
        //         ] = textElement;

        //         return textElements;
        //     });
        // }
    }
}