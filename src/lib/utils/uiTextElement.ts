import { state } from "$lib/store";
import type { Margin, PositionalProps } from "$lib/types";

interface Props {
    id: string;
    title: string;
    color: string;
    fontSize: number;
    fontWeight: '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
    fontStyle: string;
    textDecoration: string;
    padding: Pick<PositionalProps, 'top' | 'right' | 'bottom' | 'left'>;
    border: {
        width: Pick<PositionalProps, 'top' | 'right' | 'bottom' | 'left'>,
        radius:
        Pick<PositionalProps, 'topLeft' | 'topRight' | 'bottomRight' | 'bottomLeft'>;
        color: string
    }
    margin: Margin;
}

export class UITextElement {
    id: string;
    title: string;
    color: string;
    fontSize: number;
    fontWeight: '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
    fontStyle: string;
    textDecoration: string;
    padding: Pick<PositionalProps, 'top' | 'right' | 'bottom' | 'left'>;
    border: {
        width: Pick<PositionalProps, 'top' | 'right' | 'bottom' | 'left'>,
        radius:
        Pick<PositionalProps, 'topLeft' | 'topRight' | 'bottomRight' | 'bottomLeft'>;
        color: string
    }
    margin: Margin;
    delete: () => void;
    onMouseover: () => void;
    onMouseleave: () => void;
    getControl: () => HTMLElement | null;
    getTemplate: () => HTMLElement | null;
    template: {
        onDragstart: (e: DragEvent) => void;
        id: string;
    };
    control: {
        id: string;
    }
    constructor({ id, title, color, fontSize, fontWeight, fontStyle, textDecoration, border, padding, margin }: Props) {
        this.id = id;
        this.title = title || `Text Element ${id}`
        this.color = color || '#000000';
        this.fontSize = fontSize || 0.22;
        this.fontWeight = fontWeight || '400';
        this.fontStyle = fontStyle || '';
        this.textDecoration = textDecoration || '';
        this.padding = padding || { top: 0, right: 0, bottom: 0, left: 0 };
        this.border = border || {
            color: '#000000',
            width: { top: 0, right: 0, bottom: 0, left: 0 },
            radius: { topLeft: 0, topRight: 0, bottomRight: 0, bottomLeft: 0 },
        }
        this.margin = margin || { top: 0, right: 0, bottom: 0, left: 0 };

        this.onMouseover = () => {
            state.update(state => {
                return {
                    ...state,
                    feedback: {
                        textElement: {
                            control: this.getControl(),
                            template: this.getTemplate(),
                        }
                    }
                }
            });
        };
        this.onMouseleave = () => {
            state.update(state => {
                return {
                    ...state,
                    feedback: {
                        textElement: {
                            control: null,
                            template: null,
                        }
                    }
                }
            })
        }
        this.getControl = () => document.getElementById(`text-element-${id}-control`);
        this.getTemplate = () => document.getElementById(`text-element-${id}-template`);
        this.template = {
            onDragstart: (e: DragEvent) => {
                e.stopPropagation();

                // document.getElementById('drag-preview')?.remove();
                if (!e.dataTransfer || !(e.target instanceof HTMLElement)) {
                    return;
                }

                const update = {
                    isInProgress: true,
                    offsetX: e.offsetX,
                    offsetY: e.offsetY,
                    elementId: (e.target as HTMLElement).id
                }

                state.update(state => {
                    return {
                        ...state,
                        drag: {
                            ...state.drag,
                            ...update,
                        },
                        feedback: {
                            textElement: {
                                control: this.getControl(),
                                template: this.getTemplate(),
                            }
                        }
                    }
                });
                // WIP create and use separate preview image
                // const dragImage = e.target.cloneNode(true) as HTMLElement;
                // dragImage.setAttribute('id', 'drag-preview');
                // document.body.appendChild(dragImage);

                // e.dataTransfer.setDragImage(dragImage, offsetLeft, offsetTop);
                e.dataTransfer.setData('text/plain', update.elementId);
            },
            id: `text-element-${id}-template`
        };
        this.control = {
            id: `text-element-${id}-color`
        };
        this.delete = () => {
            state.update((state) => {
                return {
                    ...state,
                    template: {
                        ...state.template,
                        textElements: state.template.textElements.toSpliced(
                            state.template.textElements.findIndex((element) => this.id === element.id),
                            1
                        ),
                    },
                };
            });
        }
    }
}