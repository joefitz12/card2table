import type { Margin, PositionalProps } from "$lib/types";

export class TextElement {
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
    constructor() {
        this.title = `Text Element`
        this.color = '#000000';
        this.fontSize = 0.22;
        this.fontWeight = '400';
        this.fontStyle = '';
        this.textDecoration = '';
        this.padding = { top: 0, right: 0, bottom: 0, left: 0 };
        this.border = {
            color: '#000000',
            width: { top: 0, right: 0, bottom: 0, left: 0 },
            radius: { topLeft: 0, topRight: 0, bottomRight: 0, bottomLeft: 0 },
        }
        this.margin = { top: 0, right: 0, bottom: 0, left: 0 };
    }
}