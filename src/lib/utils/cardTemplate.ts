import type { PositionalProps } from "$lib/types";

interface Props {
    id: string,
    title: string,
    color?: string,
    backgroundColor?: string,
    borderColor?: string,
    width?: number,
    height?: number
}

export class CardTemplate {
    id: string;
    title: string;
    backgroundColor: string;
    padding: Pick<PositionalProps, 'top' | 'right' | 'bottom' | 'left'>;
    borderWidth: Pick<PositionalProps, 'top' | 'right' | 'bottom' | 'left'>;
    borderRadius: Pick<PositionalProps, 'topLeft' | 'topRight' | 'bottomRight' | 'bottomLeft'>;
    borderColor: string;
    constructor({ id, title, backgroundColor, borderColor }: Props) {
        this.id = id;
        this.title = title;
        this.backgroundColor = backgroundColor || '#ffffff'
        this.borderColor = borderColor || '#000000'
        this.padding = { top: 0, right: 0, bottom: 0, left: 0 };
        this.borderWidth = { top: 0, right: 0, bottom: 0, left: 0 };
        this.borderRadius = { topLeft: 0, topRight: 0, bottomRight: 0, bottomLeft: 0 };
    }
}