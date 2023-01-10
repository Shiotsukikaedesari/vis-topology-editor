import merge from "webpack-merge";
import basicBroken from "../../line/theme/basicBroken";

const commonStructure = () => {
  return {
    framework: {
      shape: "circleShape",
      widget: "",
    },
    size: {
      width: 50,
      height: 50,
    },
    anchor: {
      x: 25,
      y: 25,
    },
    configure: {
      connector: { hover: false },
    },
    widget: {
      cssStyle: {
        padding: "2px 4px",
        "box-sizing": "border-box",
      },
    },
    shape: {
      cssStyle: {
        fill: "rgba(255, 255, 255, 0)",
        stroke: "rgba(0, 0, 0, 1)",
        strokeWidth: 0,
      },
    },
    connector: [
      {
        interface: "p1",
        direction: { x: 0, y: -1 },
        component: "circleConnector",
        size: {
          width: 10,
          height: 10,
        },
        translate: {
          x: 0.5,
          y: 1,
        },
        offset: {
          x: 0,
          y: 0,
        },
        cssStyle: {
          fill: "rgba(255, 255, 255, 1)",
          stroke: "rgba(0, 0, 0, 1)",
          strokeWidth: 2,
          cursor: "crosshair",
        },
      },
    ],
    line: basicBroken().structure,
  };
};

const inventoryList = [
  {
    name: "youmuKonpaku",
    label: "魂魄妖梦",
    structure: {
      configure: {
        backgroundImage: "image/avatar/1.jpg",
      },
    },
  },
  {
    name: "marisaKirisame",
    label: "雾雨魔理沙",
    structure: {
      configure: {
        backgroundImage: "image/avatar/3.jpg",
      },
    },
  },
];

export default () => {
  return {
    name: "basicPicture",
    label: "基础图片",
    desp: "图片节点",
    inventory: inventoryList.map((item) => {
      item.structure = merge(commonStructure(), item.structure);
      return item;
    }),
  };
};
