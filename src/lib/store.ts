import { derived, get, writable } from 'svelte/store';
import { browser } from "$app/environment"
import type { PositionalProps } from './types';
import { UITextElement } from './utils/uiTextElement';
import { cardTemplate } from './api/cardTemplate';
import { TextElement } from './models/TextElement';
import { UICardTemplate } from './utils/uiCardTemplate';
import { CardTemplate } from './models/CardTemplate';


export type CardTemplateState = {
    id: IDBValidKey,
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
    templates: Map<IDBValidKey, CardTemplateState>,
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
});

///////////////
///// App /////
///////////////
export const menuExpanded = writable<boolean>(false);
export const sidebarExpanded = writable<boolean>(false);
export const activeSidebarMenu = writable<'card' | 'color' | 'text' | 'image' | 'print'>('card');
export const activeTabs = writable<Map<IDBValidKey, { id: IDBValidKey, itemId: IDBValidKey, title: string, type: 'template' | 'palette', }>>(new Map());
export const activeView = writable<'template' | 'print'>('template');

////////////////////
/////// Print //////
////////////////////
export const csvs = writable<{ filename: string, id: number }[]>([]);
export const selectedCsv = writable<IDBValidKey>();
export const selectedCardTemplate = writable<number>();
export const cardTemplates = writable<Array<CardTemplate & { id: IDBValidKey }>>();
export const cards = writable<Map<IDBValidKey, { [x: string]: string }>>(new Map());
// export const uiTemplates = derived(cardTemplates, $cardTemplates => {
//     return $cardTemplates.map((cardTemplate) => [cardTemplate.id, new UICardTemplate(cardTemplate)]
//     );
// });

////////////////////
///// Template /////
////////////////////
export const template = writable<UICardTemplate>();

template.subscribe(($template) => {
    if (!$template) {
        return;
    }
    const { handleDrop, handleDragover, textElementId, ...template } = $template;

    cardTemplate.updateById({
        template,
    });
});

export const textElements = writable<Map<IDBValidKey, UITextElement>>(new Map());