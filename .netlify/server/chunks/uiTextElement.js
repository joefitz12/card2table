import { e as error } from "./index.js";
import { l as state, h as textElements, r as refreshElement, i as sidebarExpanded, j as activeSidebarMenu } from "./store.js";
class TextElement {
  title;
  color;
  fontSize;
  fontWeight;
  fontStyle;
  textDecoration;
  padding;
  border;
  margin;
  leftTransform;
  topTransform;
  templateId;
  minimized;
  constructor({ templateId }) {
    this.title = `Text Element`;
    this.color = "#000000";
    this.fontSize = 0.22;
    this.fontWeight = "400";
    this.fontStyle = "";
    this.textDecoration = "none";
    this.padding = { top: 0, right: 0, bottom: 0, left: 0 };
    this.border = {
      color: "#000000",
      width: { top: 0, right: 0, bottom: 0, left: 0 },
      radius: { topLeft: 0, topRight: 0, bottomRight: 0, bottomLeft: 0 }
    };
    this.margin = { top: 0, right: 0, bottom: 0, left: 0 };
    this.leftTransform = 0;
    this.topTransform = 0;
    this.templateId = templateId;
    this.minimized = false;
  }
}
const textElement = {
  add: function({ templateId }) {
    return new Promise((resolve, reject) => {
    });
  },
  update: function(textElement2) {
    return new Promise((resolve, reject) => {
    });
  },
  getById: function(id) {
    return new Promise((resolve, reject) => {
      if (!id) {
        return error(404, {
          message: "Empty templateId"
        });
      }
    });
  },
  getAllByTemplateId: function(templateId) {
    return new Promise((resolve, reject) => {
      if (!templateId) {
        return error(404, {
          message: "Empty templateId"
        });
      }
    });
  },
  delete: function({ id }) {
    return new Promise((resolve, reject) => {
    });
  }
};
class UITextElement extends TextElement {
  id;
  onMouseover;
  onMouseleave;
  getControl;
  getTemplate;
  template;
  control;
  constructor({
    id,
    templateId,
    title,
    color,
    fontSize,
    fontWeight,
    fontStyle,
    textDecoration,
    border,
    padding,
    margin,
    minimized
  }) {
    super({ templateId });
    this.id = id;
    this.title = title;
    this.color = color;
    this.fontSize = fontSize;
    this.fontWeight = fontWeight;
    this.fontStyle = fontStyle;
    this.textDecoration = textDecoration;
    this.padding = padding;
    this.border = border;
    this.margin = margin;
    this.onMouseover = () => {
      state.update((state2) => {
        return {
          ...state2,
          feedback: {
            textElement: {
              control: this.getControl(),
              template: this.getTemplate()
            }
          }
        };
      });
    };
    this.onMouseleave = () => {
      state.update((state2) => {
        return {
          ...state2,
          feedback: {
            textElement: {
              control: null,
              template: null
            }
          }
        };
      });
    };
    this.getControl = () => document.getElementById(`text-element-${templateId}-control`);
    this.getTemplate = () => document.getElementById(`text-element-${templateId}-template`);
    this.template = {
      onDragstart: (e) => {
        e.stopPropagation();
        if (!e.dataTransfer || !(e.target instanceof HTMLElement)) {
          return;
        }
        const update = {
          isInProgress: true,
          offsetX: e.offsetX,
          offsetY: e.offsetY,
          elementId: e.target.id
        };
        state.update((state2) => {
          return {
            ...state2,
            drag: {
              ...state2.drag,
              ...update
            },
            feedback: {
              textElement: {
                control: this.getControl(),
                template: this.getTemplate()
              }
            }
          };
        });
        e.dataTransfer.setData("text/plain", update.elementId);
      },
      onClick: (id2) => {
        textElement.getById(id2).then((data) => textElement.update({ ...new UITextElement(data), minimized: false })).then(() => {
          textElements.update(($textElements) => {
            return $textElements.set(id2, { ...$textElements.get(id2), minimized: false });
          });
          refreshElement.set(id2);
          sidebarExpanded.set(true);
          activeSidebarMenu.set("text");
        }).catch((error2) => console.error(error2));
      },
      id: `text-element-${templateId}-template`
    };
    this.control = {
      id: `text-element-${templateId}-color`
    };
    this.minimized = minimized;
  }
}
export {
  UITextElement as U,
  textElement as t
};
