export class Tab {
	itemId: IDBValidKey;
	title: string;
	type: 'template' | 'palette';
	constructor({
		itemId,
		title,
		type,
	}: {
		itemId: IDBValidKey;
		title: string;
		type: 'template' | 'palette';
	}) {
		this.itemId = itemId;
		this.title = title;
		this.type = type;
	}
}
