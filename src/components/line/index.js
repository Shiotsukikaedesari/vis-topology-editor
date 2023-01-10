import merge from "webpack-merge";
import { components as shapeComponents } from "./shape";
import { components as widgetComponents } from "./widget";

import connectLine from "./connectLine.vue";
import { getComponentPropStructure } from "../../assets/js/utils";

import basicLinear from "./theme/basicLinear";
import basicBroken from "./theme/basicBroken";

export const mergeLineStructure = function (structure) {
  const mergeStructure = merge({}, getComponentPropStructure(connectLine), structure);

  const framework = mergeStructure.framework;

  if (framework.shape && shapeComponents[framework.shape]) {
    mergeStructure.shape = merge(
      getComponentPropStructure(shapeComponents[framework.shape]),
      mergeStructure.shape
    );
  }

  if (framework.markerStart && widgetComponents[framework.markerStart]) {
    mergeStructure.markerStart = merge(
      getComponentPropStructure(widgetComponents[framework.markerStart]),
      mergeStructure.markerStart
    );
  }

  if (framework.markerMid && widgetComponents[framework.markerMid]) {
    mergeStructure.markerMid = merge(
      getComponentPropStructure(widgetComponents[framework.markerMid]),
      mergeStructure.markerMid
    );
  }

  if (framework.markerEnd && widgetComponents[framework.markerEnd]) {
    mergeStructure.markerEnd = merge(
      getComponentPropStructure(widgetComponents[framework.markerEnd]),
      mergeStructure.markerEnd
    );
  }

  return mergeStructure;
};

const getThemeConfigure = function (theme) {
  return Object.assign({}, theme, {
    structure: mergeLineStructure(theme.structure),
  });
};

export const themeMenu = [getThemeConfigure(basicLinear()), getThemeConfigure(basicBroken())];

// console.log(themeMenu);
