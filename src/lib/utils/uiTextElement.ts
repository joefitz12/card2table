import { browser } from "$app/environment";
import { textElement } from "$lib/api";
import { TextElement } from "$lib/models/TextElement";
import { activeElement, activeSidebarMenu, sidebarExpanded, state, textElements } from "$lib/store";

export class UITextElement extends TextElement {
    id: IDBValidKey;
    onMouseover: () => void;
    onMouseleave: () => void;
    getControl: () => HTMLElement | null;
    getTemplate: () => HTMLElement | null;
    template: {
        onDragstart: (e: DragEvent) => void;
        onClick: (e: MouseEvent, id: IDBValidKey) => void
        id: string;
    };
    control: {
        id: string;
    }
    constructor({
        id,
        templateId,
        title,
        color,
        fontSize,
        fontWeight,
        fontStyle,
        textDecoration,
        border,
        padding,
        margin,
        minimized
    }: InstanceType<typeof TextElement> & { id: IDBValidKey }) {
        super(({ templateId, minimized }));
        this.id = id;
        this.title = title;
        this.color = color;
        this.fontSize = fontSize;
        this.fontWeight = fontWeight;
        this.fontStyle = fontStyle;
        this.textDecoration = textDecoration;
        this.padding = padding;
        this.border = border;
        this.margin = margin;
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
            });
        }
        this.getControl = () => document.getElementById(`text-element-${templateId}-control`);
        this.getTemplate = () => document.getElementById(`text-element-${templateId}-template`);
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
            onClick: (e, id) => {
                e.stopPropagation();
                textElement.getById(id)
                    .then(data => textElement.update({...new UITextElement(data), minimized: false}))
                    .then(() => {
                        textElements.update($textElements => {
                            return $textElements.set(id, {...$textElements.get(id)!, minimized: browser && window.innerWidth <= 640 ? true : false})
                        });
                        activeElement.set(id);
                        sidebarExpanded.set(true);
                        activeSidebarMenu.set(browser && window.innerWidth > 640 ? 'text' : null)
                    })
                    .catch(error => console.error(error));
            },
            id: `text-element-${templateId}-template`
        };
        this.control = {
            id: `text-element-${templateId}-color`
        };
    }
};