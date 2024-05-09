import type { PositionalProps } from "$lib/types";

export class CardTemplate {
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
    constructor() {
        this.unit = 'in';
        this.height = 3.43;
        this.width = 2.44;
        this.title = `Card Template`;
        this.color = '#000000'
        this.backgroundColor = '#1E91D6'
        this.padding = { top: 0, right: 0, bottom: 0, left: 0 };
        this.border = {
            color: '#000000',
            width: { top: 0, right: 0, bottom: 0, left: 0 },
            radius: { topLeft: .15, topRight: 0.15, bottomRight: 0.15, bottomLeft: 0.15 }
        };
        this.relativeUnit = 0;
    }
}