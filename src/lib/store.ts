import { derived, get, writable } from 'svelte/store';
import { browser } from "$app/environment"
import type { PositionalProps } from './types';
import { UITextElement } from './utils/uiTextElement';
import { cardTemplate } from './api/cardTemplate';
import { TextElement } from './models/TextElement';
import { UICardTemplate } from './utils/uiCardTemplate';

export let count = writable<number>(0);

export const dbTemplates = writable<Map<number, any>>(new Map());

export const uiTemplates = derived(dbTemplates, $dbTemplates => {
    return new Map(Array.from($dbTemplates).map(([id, cardTemplate]) => [id, new UICardTemplate(cardTemplate)]
    ))
})

export const dbTextElements = writable<Map<number, TextElement & { id: number }>>(new Map());

dbTextElements.subscribe(() => console.log('updating'));

export const uiTextElements = derived(dbTextElements, ($dbTextElements) => {
    const newTextElements = new Map(Array.from($dbTextElements).map(([id, textElement]) => {
        console.log({ id, textElement });
        return [id, new UITextElement({ ...textElement })];
    }
    ));
    return newTextElements;
});

export type CardTemplateState = {
    id: number,
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
    selectedTemplate?: CardTemplateState['id'];
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

export let print = writable<PrintState>({
    height: 8.5,
    width: 11,
    columnGap: 0.5,
    selectedCsv: '',
});

export let selectedTextElements = writable<Map<number, TextElement>>();

const template = derived(state, ($state) => {
    return $state.template;
});

template.subscribe(($template) => {
    if (!$template) {
        return;
    }
    const { handleDrop, handleDragover, textElementId, ...template } = $template;

    cardTemplate.updateById({
        template,
    });
});


// @todo: remove bonus store
export const textElementsStore = writable<{ templateId: string, textElements: UITextElement[] }>({ templateId: '', textElements: [] });

textElementsStore.subscribe(($textElements) => {
    if (!get(state).template) {
        return;
    }
    const {
        textElements,
    } = $textElements;

    if (!textElements.length) {
        console.log('EMPTY SET!!!!');
    }
    // textElement.update({ templateId: parseInt(get(state).template.id), textElements });
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