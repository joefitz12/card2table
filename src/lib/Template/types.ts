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
	textElements: any[];
};

export type ViewerState = {
	scale?: number;
};
