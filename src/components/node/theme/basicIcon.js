import merge from "webpack-merge";
import basicLinear from "../../line/theme/basicLinear";

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
        direction: { x: 0, y: 1 },
        component: "circleConnector",
        size: {
          width: 10,
          height: 10,
        },
        translate: {
          x: 1,
          y: 0.8,
        },
        offset: {
          x: 0,
          y: 0,
        },
        cssStyle: {
          fill: "rgba(255, 0, 0, 1)",
          stroke: "rgba(255, 255, 255, 1)",
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
          y: 0.2,
        },
        offset: {
          x: 0,
          y: 0,
        },
        cssStyle: {
          fill: "rgba(0, 255, 0, 1)",
          stroke: "rgba(255, 255, 255, 1)",
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
    name: "physicalNetwork",
    label: "物理网络",
    structure: {
      configure: {
        icon: "#vis-wuliwangluo",
      },
    },
  },
  {
    name: "clusterMonitoring",
    label: "集群监控",
    structure: {
      configure: {
        icon: "#vis-icon-test1",
      },
    },
  },
];

export default () => {
  return {
    name: "basicIcon",
    label: "基础图标",
    desp: "svg图标节点",
    inventory: inventoryList.map((item) => {
      item.structure = merge(commonStructure(), item.structure);
      return item;
    }),
  };
};
