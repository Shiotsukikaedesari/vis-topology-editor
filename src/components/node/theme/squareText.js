import merge from "webpack-merge";
import basicBroken from "../../line/theme/basicBroken";

const commonStructure = () => {
  return {
    framework: {
      shape: "",
      widget: "textAreaWidget",
      connector: "square",
    },
    size: {
      width: 70,
      height: 50,
    },
    anchor: {
      x: 35,
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
        fill: "rgba(255, 255, 255, 1)",
        stroke: "rgba(0, 0, 0, 1)",
        strokeWidth: 2,
      },
    },
    connector: [
      {
        interface: "p1",
        direction: { x: 0, y: 1 },
        component: "circleConnector",
        size: {
          width: 10,
          height: 10,
        },
        translate: {
          x: 0.5,
          y: 0,
        },
        offset: {
          x: 0,
          y: 0,
        },
        cssStyle: {
          fill: "rgba(255, 255, 255, 1)",
          stroke: "rgba(0, 0, 255, 1)",
          strokeWidth: 1,
          cursor: "crosshair",
        },
      },
      {
        interface: "p2",
        direction: { x: 1, y: 0 },
        component: "circleConnector",
        size: {
          width: 10,
          height: 10,
        },
        translate: {
          x: 1,
          y: 0.5,
        },
        offset: {
          x: 0,
          y: 0,
        },
        cssStyle: {
          fill: "rgba(255, 255, 255, 1)",
          stroke: "rgba(0, 0, 255, 1)",
          strokeWidth: 1,
          cursor: "crosshair",
        },
      },
      {
        interface: "p3",
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
          stroke: "rgba(0, 0, 255, 1)",
          strokeWidth: 1,
          cursor: "crosshair",
        },
      },
      {
        interface: "p4",
        direction: { x: -1, y: 0 },
        component: "circleConnector",
        size: {
          width: 10,
          height: 10,
        },
        translate: {
          x: 0,
          y: 0.5,
        },
        offset: {
          x: 0,
          y: 0,
        },
        cssStyle: {
          fill: "rgba(255, 255, 255, 1)",
          stroke: "rgba(0, 0, 255, 1)",
          strokeWidth: 1,
          cursor: "crosshair",
        },
      },
    ],
    line: basicBroken().structure,
  };
};

const inventoryList = [
  {
    name: "squareRect",
    label: "四方矩形",
    structure: {
      framework: {
        shape: "rectShape",
      },
    },
  },
  {
    name: "squareCircle",
    label: "四方圆形",
    structure: {
      framework: {
        shape: "circleShape",
      },
    },
  },
];

export default () => {
  return {
    name: "squareText",
    label: "四方表单",
    desp: "形状表单与四方节点",
    inventory: inventoryList.map((item) => {
      item.structure = merge(commonStructure(), item.structure);
      return item;
    }),
  };
};
