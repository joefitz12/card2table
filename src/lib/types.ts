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

export type PositionalProps = {
	top?: number,
	right?: number,
	bottom?: number,
	left?: number,
	topLeft?: number,
	topRight?: number,
	bottomRight?: number,
	bottomLeft?: number
}

type BorderWidth = Pick<PositionalProps, 'top' | 'right' | 'bottom' | 'left'>;
type BorderRadius = Pick<PositionalProps, 'topLeft' | 'topRight' | 'bottomRight' | 'bottomLeft'>;

type Border = {
	borderColor: string;
	borderRadius: BorderRadius;
	borderWidth: BorderWidth;
}

export type Margin = {
	top: number | 'auto', right: number | 'auto', bottom: number | 'auto', left: number | 'auto'
}

export type Font = {
	fontSize: number;
	fontStyle: string;
	fontWeight: '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'
}

export type CardState = {
	title?: string;
	unit?: Unit;
	width?: number;
	height?: number;
	padding: PositionalProps;
	backgroundColor?: string;
	color?: string;
	borderColor?: string;
	borderRadius: BorderRadius;
	borderWidth: BorderWidth;
	textElements: TextElement[];
};



export type TextElement = Font & Border & {
	id: string;
	title: string;
	color: string;
	textDecoration: string;
	padding: PositionalProps;
	leftTransform?: number;
	topTransform?: number;
	margin: Margin;
};

export type ViewerState = {
	scale?: number;
};
