import merge from "webpack-merge";
import basicLinear from "../../line/theme/basicLinear";
const commonStructure = () => {
  return {
    framework: {
      shape: "",
      widget: "",
      connector: 1,
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
      connector: { hover: true },
      backgroundImage: "",
      icon: "",
    },
    shape: {
      cssStyle: {
        fill: "rgba(56, 117, 232)",
        stroke: "rgba(0, 0, 0, 1)",
        strokeWidth: 2,
      },
    },
    widget: "",
    connector: [
      {
        interface: "p1",
        direction: { x: 0, y: 0 },
        component: "circleConnector",
        size: {
          width: 10,
          height: 10,
        },
        translate: {
          x: 0.5,
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
    line: basicLinear().structure,
  };
};

const inventoryList = [
  {
    name: "basicRect",
    label: "基础矩形",
    structure: {
      framework: {
        shape: "rectShape",
      },
    },
  },
  {
    name: "basicCircle",
    label: "基础圆形",
    structure: {
      framework: {
        shape: "circleShape",
      },
    },
  },
];

export default () => {
  return {
    name: "basicShape",
    label: "基础图形",
    desp: "形状与单节点",
    inventory: inventoryList.map((item) => {
      item.structure = merge(commonStructure(), item.structure);
      return item;
    }),
  };
};
