import { e as error } from "./index.js";
const setting = {
  add: function(setting2) {
    return new Promise((resolve, reject) => {
    });
  },
  get: function(id) {
    return new Promise((resolve, reject) => {
    });
  },
  getAll: function() {
    return new Promise((resolve, reject) => {
    });
  },
  delete: function(id) {
    return new Promise((resolve, reject) => {
    });
  }
};
const tab = {
  add: function(tab2) {
    return new Promise((resolve, reject) => {
    });
  },
  get: function({ type, itemId }) {
    return new Promise((resolve, reject) => {
    });
  },
  getAll: function() {
    return new Promise((resolve, reject) => {
    });
  },
  update: function(tab2) {
    return new Promise((resolve, reject) => {
      if (!tab2.itemId) {
        return error(404, { message: "Cannot update, no id" });
      }
    });
  },
  delete: function(id) {
    return new Promise((resolve, reject) => {
    });
  }
};
export {
  setting as s,
  tab as t
};
