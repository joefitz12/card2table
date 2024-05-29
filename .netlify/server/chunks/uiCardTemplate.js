import { h as textElements, l as state } from "./store.js";
import { f as get_store_value } from "./index2.js";
class CardTemplate {
  unit;
  height;
  width;
  title;
  color;
  backgroundColor;
  padding;
  border;
  relativeUnit;
  constructor() {
    this.unit = "in";
    this.height = 3.43;
    this.width = 2.44;
    this.title = `Card Template`;
    this.color = "#000000";
    this.backgroundColor = "#1E91D6";
    this.padding = { top: 0, right: 0, bottom: 0, left: 0 };
    this.border = {
      color: "#000000",
      width: { top: 0, right: 0, bottom: 0, left: 0 },
      radius: { topLeft: 0.15, topRight: 0.15, bottomRight: 0.15, bottomLeft: 0.15 }
    };
    this.relativeUnit = 0;
  }
}
class UICardTemplate extends CardTemplate {
  id;
  textElementId;
  handleDrop;
  handleDragover;
  constructor({
    id,
    unit,
    height,
    width,
    title,
    color,
    backgroundColor,
    padding,
    border
  }) {
    super();
    this.id = id;
    this.unit = unit;
    this.height = height;
    this.width = width;
    this.title = title;
    this.color = color;
    this.backgroundColor = backgroundColor;
    this.padding = padding;
    this.border = border;
    this.relativeUnit = 0;
    this.textElementId = "0";
    this.handleDrop = (e) => {
      e.stopPropagation();
      if (!(e.target instanceof HTMLElement) || !e.dataTransfer) {
        return;
      }
      const textElementId = e.dataTransfer.getData("text");
      textElements.update(($textElements) => {
        const textElement = $textElements.get(textElementId);
        [...$textElements.values()].findIndex(
          (element) => element.template.id == textElementId
        );
        if (!textElement) {
          return $textElements;
        }
        const cardOffset = {
          // @ts-ignore
          offsetX: e.target.nodeName === "SPAN" ? e.layerX || e.offsetX : e.offsetX,
          // @ts-ignore
          offsetY: e.target.nodeName === "SPAN" ? e.layerY || e.offsetX : e.offsetY
        };
        if (!Math.abs(cardOffset.offsetX - get_store_value(state).drag.offsetX) || !Math.abs(cardOffset.offsetY - get_store_value(state).drag.offsetY)) {
          return $textElements;
        }
        textElement.leftTransform = cardOffset.offsetX - get_store_value(state).drag.offsetX;
        textElement.topTransform = cardOffset.offsetY - get_store_value(state).drag.offsetY;
        return $textElements;
      });
      state.update(($state) => {
        return {
          ...$state,
          drag: {
            ...$state.drag,
            isInProgress: false,
            elementId: ""
          }
        };
      });
    };
    this.handleDragover = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (!(e.target instanceof HTMLElement) || !e.dataTransfer) {
        return;
      }
      e.dataTransfer.dropEffect = "move";
      state.update((state2) => {
        return {
          ...state2,
          feedback: {
            ...state2.feedback,
            textElement: {
              ...state2.feedback.textElement,
              drag: {
                // @ts-ignore
                offsetX: e.layerX || e.offsetX,
                // @ts-ignore
                offsetY: e.layerY || e.offsetY
              }
            }
          }
        };
      });
    };
  }
}
export {
  CardTemplate as C,
  UICardTemplate as U
};
