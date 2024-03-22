export type Unit = 'in' | 'cm';
export type FontSizes = {
	[x: string]: number;
};

type Padding = {
	topPadding: number,
	rightPadding: number,
	bottomPadding: number,
	leftPadding: number
}

type Border = {
	borderColor: string;
	borderRadius: number;
	borderWidth: number;
}

type Font = {
	fontSize: number;
	fontStyle: string;
	fontWeight: '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'
}

export type CardState = Partial<Padding> & {
	title?: string;
	unit?: Unit;
	width?: number;
	height?: number;
	backgroundColor?: string;
	color?: string;
	borderColor?: string;
	borderRadius?: number;
	borderWidth?: number;
	textElements: TextElement[];
};



export type TextElement = Font & Padding & {
	id: string;
	title: string;
	color: string;
	textDecoration: string;
	leftTransform?: number;
	topTransform?: number;
};

export type ViewerState = {
	scale?: number;
};
