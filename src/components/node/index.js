import merge from "webpack-merge";
import { components as connectorComponents } from "./connector";
import { components as shapeComponents } from "./shape";
import { components as widgetComponents } from "./widget";

import basicShape from "./theme/basicShape";
import squareText from "./theme/squareText";
import basicIcon from "./theme/basicIcon";
import basicPicture from "./theme/basicPicture";

import node from "./node.vue";

import { mergeLineStructure } from "../line/index";
import { getComponentPropStructure } from "../../assets/js/utils";

const mergeNodeStructure = function (structure) {
  // 合并节点基础配置
  const mergeStructure = merge({}, getComponentPropStructure(node), structure);

  const framework = mergeStructure.framework;

  if (framework.shape && shapeComponents[framework.shape]) {
    mergeStructure.shape = merge(
      getComponentPropStructure(shapeComponents[framework.shape]),
      mergeStructure.shape
    );
  } else {
    mergeStructure.shape = {};
  }

  if (framework.widget && widgetComponents[framework.widget]) {
    mergeStructure.widget = merge(
      getComponentPropStructure(widgetComponents[framework.widget]),
      mergeStructure.widget
    );
  } else {
    mergeStructure.widget = {};
  }

  if (framework.connector && Array.isArray(mergeStructure.connector)) {
    mergeStructure.connector.forEach((connectorStructure) => {
      if (connectorComponents[connectorStructure.component]) {
        connectorStructure = merge(
          connectorStructure,
          getComponentPropStructure(connectorComponents[connectorStructure.component])
        );
      }
    });
  } else {
    mergeStructure.connector = [];
  }

  if (mergeStructure.line) {
    mergeStructure.line = mergeLineStructure(mergeStructure.line);
  } else {
    mergeStructure.line = {};
  }
  return JSON.parse(JSON.stringify(mergeStructure));
};

// 获取主题配置单
const getThemeConfigure = function (theme) {
  theme.inventory.forEach((item) => {
    item.structure = mergeNodeStructure(item.structure);
  });
  return JSON.parse(JSON.stringify(theme));
};

export const themeMenu = [
  getThemeConfigure(basicShape()),
  getThemeConfigure(squareText()),
  getThemeConfigure(basicIcon()),
  getThemeConfigure(basicPicture()),
];

// console.log(themeMenu);
