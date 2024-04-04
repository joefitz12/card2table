import { type PositionalProps } from "$lib/types";

interface Props {
    id: string,
    color?: string,
    borderColor?: string
}

export class TextElement {
    id: string;
    title: string;
    color: string;
    fontSize: number;
    fontWeight: '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
    fontStyle: string;
    textDecoration: string;
    padding: PositionalProps;
    borderWidth: Pick<PositionalProps, 'top' | 'right' | 'bottom' | 'left'>;
    borderRadius: Pick<PositionalProps, 'topLeft' | 'topRight' | 'bottomRight' | 'bottomLeft'>;
    borderColor: string;
    constructor({ id, color, borderColor }: Props) {
        this.id = id;
        this.title = `Text Element ${id}`
        this.color = color || '#000000';
        this.borderColor = borderColor || '#000000'
        this.fontSize = 0.22;
        this.fontWeight = '400';
        this.fontStyle = '';
        this.textDecoration = '';
        this.padding = { top: 0, right: 0, bottom: 0, left: 0 };
        this.borderWidth = { top: 0, right: 0, bottom: 0, left: 0 };
        this.borderRadius = { topLeft: 0, topRight: 0, bottomRight: 0, bottomLeft: 0 };
    }
}