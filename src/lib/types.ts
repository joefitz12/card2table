import { UITextElement } from "./utils/uiTextElement";

export type Unit = 'in' | 'cm';
export type FontSizes = {
	[x: string]: number;
};

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
	color: string;
	radius: BorderRadius;
	width: BorderWidth;
}

export type Margin = {
	top: number | 'auto',
	right: number | 'auto',
	bottom: number | 'auto',
	left: number | 'auto'
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
	border?: {
		color?: string;
		radius?: BorderRadius;
		width?: BorderWidth;
	}
	textElements: UITextElement[];
};



export type TextElement = Font & {
	id: string;
	title: string;
	color: string;
	textDecoration: string;
	border: Border;
	padding: PositionalProps;
	leftTransform?: number;
	topTransform?: number;
	margin: Margin;
	onMouseover: () => void;
	onMouseleave: () => void;
	template: {
		onDragstart: (e: DragEvent) => void;
		id: string;
	};
	control: {
		id: string;
	}
};

