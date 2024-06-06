import { e as error, w as writable } from './index.js';
const cardTemplate = {
	add: function () {
		return new Promise((resolve, reject) => {});
	},
	getById: function (id) {
		return new Promise((resolve, reject) => {
			if (!id) {
				reject(
					error(404, {
						message: 'Not found',
					})
				);
			}
		});
	},
	getAll: function () {
		return new Promise((resolve, reject) => {});
	},
	updateById: function ({ template: template2 }) {
		if (!template2.id) {
			return error(404, { message: 'Cannot update, no ID' });
		}
	},
	delete: function ({ id }) {
		return new Promise((resolve, reject) => {});
	},
};
let state = writable({
	cards: [],
	csvs: [],
	drag: {
		isInProgress: false,
		offsetX: 0,
		offsetY: 0,
		elementId: '',
	},
	feedback: {
		textElement: {
			control: void 0,
			template: void 0,
			drag: {
				offsetX: 0,
				offsetY: 0,
			},
		},
	},
	sidebar: {
		collapsed: false,
		activeMenu: 'text',
	},
	// template: new CardTemplate({}),
	templates: /* @__PURE__ */ new Map(),
	templateId: '0',
	print: {
		height: 8.5,
		width: 11,
		columnGap: 0.5,
		selectedTemplate: '',
	},
});
let print = writable({
	height: 8.5,
	width: 11,
	columnGap: 0.5,
	selectedCsv: '',
});
state.subscribe((value) => {
	const { template: template2, print: print2, csvs: csvs2 } = value;
	if (((!print2.selectedCsv && csvs2.length) || !print2.selectedTemplate) && template2) {
		state.update(($state) => {
			return {
				...$state,
				print: {
					...$state.print,
					...(!print2.selectedTemplate && { selectedTemplate: $state.template.id }),
					...(!print2.selectedCsv && csvs2.length && { selectedCsv: csvs2[0].id }),
				},
			};
		});
	}
});
const darkTheme = writable();
const sidebarExpanded = writable(true);
const activeSidebarMenu = writable('card');
const activeTabs = writable(/* @__PURE__ */ new Map());
const activeView = writable('template');
const csvs = writable([]);
const selectedCsv = writable();
const selectedCardTemplate = writable();
const cardTemplates = writable();
const cards = writable(/* @__PURE__ */ new Map());
const template = writable();
template.subscribe(($template) => {
	if (!$template) {
		return;
	}
	const { handleDrop, handleDragover, textElementId, ...template2 } = $template;
	cardTemplate.updateById({
		template: template2,
	});
});
const textElements = writable(/* @__PURE__ */ new Map());
const activeElement = writable(void 0);
export {
	cardTemplates as a,
	activeTabs as b,
	cardTemplate as c,
	darkTheme as d,
	csvs as e,
	selectedCsv as f,
	activeElement as g,
	textElements as h,
	activeSidebarMenu as i,
	activeView as j,
	cards as k,
	state as l,
	sidebarExpanded as m,
	print as p,
	selectedCardTemplate as s,
	template as t,
};
