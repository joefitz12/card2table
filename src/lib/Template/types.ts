export type Unit = 'in' | 'cm';
export type FontSizes = {
	[x: string]: number;
};
export type CardState = {
	unit?: Unit;
	borderRadius?: string;
	width?: number;
	height?: number;
	fontSizes?: FontSizes;
	backgroundColor?: string;
};

export type ViewerState = {
	scale?: number;
};
