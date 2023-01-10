export default {
  props: {
    offset: {
      type: Object,
      default: () => {
        return {
          x: 25,
          y: 25,
        };
      },
    },
    svgStyle: {
      type: Object,
      default: () => {
        return {
          show: true,
          fill: "white",
          stroke: "blue",
          strokeWidth: 2,
          cursor: "crosshair",
        };
      },
    },
    // 作用节点
    node: {
      type: String,
      default: "",
    },
    // 线
    line: {
      type: Array,
      default: [],
    },
  },
};
