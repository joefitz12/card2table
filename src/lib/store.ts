import { derived, writable } from 'svelte/store';
import { browser } from "$app/environment"
import type { PositionalProps, TextElement } from './types';
import { db } from './db';
import { UITextElement } from './utils/uiTextElement';

export let count = writable<number>(0);

export const dbTemplates = writable<Map<number, any>>(new Map());

export type CardTemplateState = {
    id: string,
    title: string,
    unit: 'in' | 'cm' | 'mm',
    height: number,
    width: number,
    padding: Pick<PositionalProps, 'top' | 'right' | 'bottom' | 'left'>,
    backgroundColor: string,
    color: string,
    border: {
        color: string,
        width: Pick<PositionalProps, 'top' | 'right' | 'bottom' | 'left'>,
        radius: Pick<PositionalProps, 'topLeft' | 'topRight' | 'bottomRight' | 'bottomLeft'>
    },
    relativeUnit: number;
    textElements: TextElement[],
    textElementId: string,
    handleDrop: (e: DragEvent) => void,
    handleDragover: (e: DragEvent) => void
}

type Csv = {
    id: string,
    name: string,
    cards: { [x: string]: any }[]
}

type Card = {
    csvId: Csv['id'],
    cardTemplateId: CardTemplateState['id']
}

type DragState = {
    isInProgress: boolean,
    offsetX: number,
    offsetY: number,
    elementId: string,
}

type FeedbackState = {
    textElement: {
        control: undefined | HTMLElement | null,
        template: undefined | HTMLElement | null,
        drag?: {
            offsetX?: number,
            offsetY?: number,
        }
    }
}

type SidebarState = {
    collapsed: boolean,
    activeMenu: 'card' | 'color' | 'text' | 'image' | 'print'
}

type PrintState = {
    height: number;
    width: number;
    columnGap: number;
    selectedCsv: Csv['id'];
    selectedTemplate: CardTemplateState['id']
}

export type State = {
    cards: Card[],
    csvs: Csv[],
    drag: DragState,
    feedback: FeedbackState,
    sidebar: SidebarState,
    templates: Map<string, CardTemplateState>,
    template: CardTemplateState,
    templateId: string,
    print: PrintState
}

// update template 
// templates.set(template.id, template);

export let state = writable<State>((browser && localStorage.getItem('card') && JSON.parse(localStorage.getItem('card')!)) || {
    cards: [],
    csvs: [],
    drag: {
        isInProgress: false,
        offsetX: 0,
        offsetY: 0,
        elementId: ''
    },
    feedback: {
        textElement: {
            control: undefined,
            template: undefined,
            drag: {
                offsetX: 0,
                offsetY: 0,
            }
        }
    },
    sidebar: {
        collapsed: false,
        activeMenu: 'text'
    },
    // template: new CardTemplate({}),
    templates: new Map(),
    templateId: '0',
    print: {
        height: 8.5,
        width: 11,
        columnGap: 0.5,
        selectedTemplate: ''
    }
});
// export let state = writable<State>({
//     cards: [],
//     csvs: [],
//     drag: {
//         isInProgress: false,
//         offsetX: 0,
//         offsetY: 0,
//         elementId: ''
//     },
//     feedback: {
//         textElement: {
//             control: undefined,
//             template: undefined,
//             drag: {
//                 offsetX: 0,
//                 offsetY: 0,
//             }
//         }
//     },
//     sidebar: {
//         collapsed: false,
//         activeMenu: 'text'
//     },
//     template: new CardTemplate(),
//     templates: new Map(),
//     templateId: '0',
//     print: {
//         height: 8.5,
//         width: 11,
//         columnGap: 0.5,
//         selectedTemplate: '',
//         selectedCsv: ''
//     }
// });

const template = derived(state, ($state) => {
    return $state.template;
})

template.subscribe(($template) => {
    if (!$template) {
        return;
    }
    const { handleDrop, handleDragover, id, textElements, textElementId, ...template } = $template;

    db.open(db => {
        // Init add Card Template transaction
        const transaction = db.transaction(['template'], 'readwrite');
        const templateObjectStore = transaction.objectStore('template');

        // Update Card
        const updateRequest = templateObjectStore.put(template, parseInt(id));

        updateRequest.onsuccess = (event) => {
            console.log('success!!!', event);
        };
        updateRequest.onerror = (event) => {
            console.log('fail', event);
        };
    })
});

const textElements = derived(state, ($state) => {
    if (!$state.template) {
        return;
    }
    return {
        templateId: $state.template.id,
        textElements: $state.template.textElements
    };
})

textElements.subscribe(($textElements) => {
    if (!$textElements) {
        return;
    }
    const {
        templateId,
        textElements: _textElements
    } = $textElements;

    const textElements = _textElements.map(_textElement => {
        const {
            // @ts-ignore
            delete,
            onMouseover,
            onMouseleave,
            getTemplate,
            getControl,
            template,
            control,
            ...textElement
        } = _textElement as InstanceType<typeof UITextElement>;

        return textElement;
    });

    db.open(db => {
        // Init add Text Element transaction
        const transaction = db.transaction(['textElement'], 'readwrite');
        const textElementObjectStore = transaction.objectStore('textElement');

        // Update Text Elements
        const updateRequest = textElementObjectStore.put(textElements, parseInt(templateId));

        updateRequest.onsuccess = (event) => {
            console.log('success!!!', event);
        };
        updateRequest.onerror = (event) => {
            console.log('fail', event);
        };
    })


});

state.subscribe((value) => {
    const {
        template,
        print,
        csvs,
    } = value;
    // automatically select first csv
    if (((!print.selectedCsv && csvs.length) || !print.selectedTemplate) && template) {
        state.update(($state) => {
            return {
                ...$state,
                print: {
                    ...$state.print,
                    ...(!print.selectedTemplate && { selectedTemplate: $state.template.id }),
                    ...((!print.selectedCsv && csvs.length) && { selectedCsv: csvs[0].id }),
                }
            }
        })
    }

    // set local storage
    // if (browser) {
    //     localStorage.setItem('card', JSON.stringify(value));
    //     // @ts-ignore -- remove this in production
    //     window['card2table'] = value;
    // }
});