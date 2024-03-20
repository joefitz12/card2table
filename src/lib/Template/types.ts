export type Unit = 'in' | 'cm';
export type FontSizes = {
	[x: string]: number;
};
export type CardState = {
	title?: string;
	unit?: Unit;
	borderRadius?: string;
	width?: number;
	height?: number;
	backgroundColor?: string;
	color?: string;
	borderColor?: string;
	textElements: TextElement[];
};

export type TextElement = {
	id: string;
	title: string;
	fontSize: number;
	fontWeight: string;
	color: string;
	textDecoration: string;
	fontStyle: string;
	leftTransform?: number;
	topTransform?: number;
};

export type ViewerState = {
	scale?: number;
};
