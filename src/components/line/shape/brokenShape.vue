<template>
  <g>
    <path :d="lineShape.start" :style="cssStyle" :marker-start="`url(#${markerStart})`"></path>

    <path :d="lineShape.end" :style="cssStyle" :marker-end="`url(#${markerEnd})`"></path>

    <path :d="lineShape.mid" :style="cssStyle" :marker-mid="`url(#${markerMid})`"></path>
  </g>
</template>

<script>
import basicProps from "./basicProps";
export default {
  name: "brokenLine",
  mixins: [basicProps],
  props: {
    configure: {
      type: Object,
      default: () => {
        return {
          safeDistance: 30,
        };
      },
    },
    cssStyle: {
      type: Object,
      default: () => {
        return {
          fill: "rgba(0, 0, 0, 0)",
          stroke: "rgba(40, 86, 255, 1)",
          strokeWidth: 2,
        };
      },
    },
  },
  data() {
    return {
      startDirection: {
        axis: "x",
        sign: 1,
      },
      endDirection: {
        axis: "x",
        sign: 1,
      },
    };
  },
  computed: {
    // 监听起始的方向
    direction() {
      return {
        start: this.startMessage.direction,
        end: this.endMessage.direction,
      };
    },
    // 线的形状
    lineShape() {
      const startDirection = this.startDirection;
      const endDirection = this.endDirection;

      let lineShape = [];
      // 同轴同向
      if (startDirection.axis === endDirection.axis && startDirection.sign === endDirection.sign) {
        lineShape = this.sameAxisAndDirection(startDirection.axis, startDirection.sign);
      } else if (
        startDirection.axis === endDirection.axis &&
        startDirection.sign !== endDirection.sign
      ) {
        lineShape = this.sameAxisDiffDirection(startDirection.axis, startDirection.sign);
      } else {
        lineShape = this.diffAxis();
      }

      // 双数的线
      let startLineShape = [];
      let midLineShape = [];
      let endLineShape = [];
      const lineNumber = lineShape.length - 1;
      if (lineNumber % 2 === 0) {
        // 把中心的2条线合并并在中间增加个节点
        const middle = lineNumber / 2;

        midLineShape = JSON.parse(JSON.stringify(lineShape.slice(middle - 1, middle + 2)));

        if (middle === 1) {
          startLineShape = midLineShape;
          endLineShape = midLineShape;
        } else {
          startLineShape = JSON.parse(JSON.stringify(lineShape.slice(0, middle)));
          endLineShape = JSON.parse(JSON.stringify(lineShape.slice(middle + 1)));
        }
      } else {
        // 单数找出中间点
        const middle = Math.floor(lineNumber / 2);
        startLineShape = JSON.parse(JSON.stringify(lineShape.slice(0, middle + 1)));
        midLineShape = JSON.parse(
          JSON.stringify([
            lineShape[middle],
            {
              operate: "L",
              position: {
                x:
                  lineShape[middle].position.x +
                  (lineShape[middle + 1].position.x - lineShape[middle].position.x) / 2,
                y:
                  lineShape[middle].position.y +
                  (lineShape[middle + 1].position.y - lineShape[middle].position.y) / 2,
              },
            },
            lineShape[middle + 1],
          ])
        );
        endLineShape = JSON.parse(JSON.stringify(lineShape.slice(middle + 1)));
      }

      midLineShape[0].operate = "M";
      endLineShape[0].operate = "M";
      return {
        start: this.lineShapeToD(startLineShape),
        mid: this.lineShapeToD(midLineShape),
        end: this.lineShapeToD(endLineShape),
      };
    },
    // 起始节点信息
    startNode() {
      if (this.startMessage.node) {
        const startNode = this.$store.getters["component/getNode"](this.startMessage.node);
        if (startNode) {
          return {
            size: { ...startNode.size },
            position: { ...startNode.position },
          };
        }
      }
      return {
        size: {
          width: 0,
          height: 0,
        },
        position: { ...this.startMessage.position },
      };
    },
    // 结束节点信息
    endNode() {
      if (this.endMessage.node) {
        const endNode = this.$store.getters["component/getNode"](this.endMessage.node);
        if (endNode) {
          return {
            size: { ...endNode.size },
            position: { ...endNode.position },
          };
        }
      }
      return {
        size: {
          width: 0,
          height: 0,
        },
        position: { ...this.endMessage.position },
      };
    },
  },
  methods: {
    // 计算折线的形状，折现会取最靠近的直角
    calcDirection() {
      // 基准向量
      const basicVector = { x: 1, y: 0 };
      const startMessage = this.startMessage;
      const endMessage = this.endMessage;
      const startDirection = startMessage.direction;
      const endDirection = {
        x: -endMessage.direction.x || 0,
        y: -endMessage.direction.y || 0,
      };
      // 没有方向给予一个方向
      if (startDirection.x === 0 && startDirection.y === 0) {
        startDirection.x = 1;
        startDirection.y = 0;
      }

      if (endDirection.x === 0 && endDirection.y === 0) {
        endDirection.x = startDirection.x;
        endDirection.y = startDirection.y;
      }

      const getDirection = (direction) => {
        let result = "";
        // 计算夹角 (x1x2+y1y2)/[√[x1^2+y1^2]*√[x2^2+y2^2]] 并归为90倍率
        const cos = Math.round(
          ((basicVector.x * direction.x + basicVector.y * direction.y) /
            Math.sqrt(basicVector.x ** 2 + basicVector.y ** 2)) *
            Math.sqrt(direction.x ** 2 + direction.y ** 2)
        );
        if (cos === 1) {
          result = {
            axis: "x",
            sign: 1,
          };
        } else if (cos === 0) {
          if (direction.y < 0) {
            result = {
              axis: "y",
              sign: -1,
            };
          } else {
            result = {
              axis: "y",
              sign: 1,
            };
          }
        } else {
          result = {
            axis: "x",
            sign: -1,
          };
        }
        return result;
      };

      this.startDirection = getDirection(startDirection);
      this.endDirection = getDirection(endDirection);
    },
    // 节点计算信息
    nodeCalcMessage() {
      const startNode = { ...this.startNode };
      const endNode = { ...this.endNode };

      return {
        min: {
          x: Math.min(startNode.position.x, endNode.position.x),
          y: Math.min(startNode.position.y, endNode.position.y),
        },
        max: {
          x: Math.max(
            startNode.position.x + startNode.size.width,
            endNode.position.x + endNode.size.width
          ),
          y: Math.max(
            startNode.position.y + startNode.size.height,
            endNode.position.y + endNode.size.height
          ),
        },
        intersect: {
          x:
            Math.max(startNode.position.x, endNode.position.x) <=
            Math.min(
              startNode.position.x + startNode.size.width,
              endNode.position.x + endNode.size.width
            ),
          y:
            Math.max(startNode.position.y, endNode.position.y) <=
            Math.min(
              startNode.position.y + startNode.size.height,
              endNode.position.y + endNode.size.height
            ),
        },
      };
    },
    // 同轴同向
    sameAxisAndDirection(axis, sign) {
      const otherAxis = axis === "x" ? "y" : "x";

      axis === "y" && (sign = -sign);

      const startNode = this.startNode;
      startNode.size.x = startNode.size.width;
      startNode.size.y = startNode.size.height;

      const endNode = this.endNode;
      endNode.size.x = endNode.size.width;
      endNode.size.y = endNode.size.height;

      const startPosition = this.startPosition;
      const endPosition = this.endPosition;

      const safeDistance = this.configure.safeDistance;

      const lineShape = [
        {
          operate: "M",
          position: { ...startPosition },
        },
      ];

      //位置与方向一致并有空隙
      if (Math.sign(endPosition[axis] - startPosition[axis]) === sign) {
        const mid = Math.abs((endPosition[axis] - startPosition[axis]) / 2);
        lineShape.push(
          {
            operate: "L",
            position: {
              [axis]: startPosition[axis] + mid * sign,
              [otherAxis]: startPosition[otherAxis],
            },
          },
          {
            operate: "L",
            position: {
              [axis]: startPosition[axis] + mid * sign,
              [otherAxis]: endPosition[otherAxis],
            },
          },
          {
            operate: "L",
            position: { ...endPosition },
          }
        );
        // 位置与方向不一致
      } else {
        const nodeCalcMessage = this.nodeCalcMessage();
        // 根据另外一个轴位置差的方向 判断下一步方向
        let otherAxisSignPosition = 0;
        let otherAxisSign = Math.sign(endPosition[otherAxis] - startPosition[otherAxis]);
        otherAxisSign === 0 && (otherAxisSign = 1);
        // 是正 找出该轴最大数
        if (otherAxisSign > 0) {
          otherAxisSignPosition = nodeCalcMessage.max[otherAxis];
        } else {
          otherAxisSignPosition = nodeCalcMessage.min[otherAxis];
        }
        // 判断节点是否相交
        if (nodeCalcMessage.intersect.x && nodeCalcMessage.intersect.y) {
          // 找到当前轴 方向为正就最大的位置，为负就最小的位置
          let distance = 0;
          if (sign >= 0) {
            distance = Math.max(
              startNode.position[axis] + startNode.size[axis],
              endNode.position[axis] + endNode.size[axis]
            );
          } else {
            distance = Math.min(startNode.position[axis], endNode.position[axis]);
          }
          // 距离确定后，沿着该轴该方向走 加上安全距离
          let nextStep = {
            [axis]: distance + safeDistance * sign,
            [otherAxis]: startPosition[otherAxis],
          };
          lineShape.push({
            operate: "L",
            position: nextStep,
          });
          // 根据另外一个轴位置差的方向 判断下一步方向
          nextStep = {
            [axis]: nextStep[axis],
            [otherAxis]: otherAxisSignPosition + safeDistance * otherAxisSign,
          };
          lineShape.push({
            operate: "L",
            position: nextStep,
          });
          // 再走到 节点的安全距离位置
          nextStep = {
            [axis]: endPosition[axis] - safeDistance * sign,
            [otherAxis]: nextStep[otherAxis],
          };
          lineShape.push({
            operate: "L",
            position: nextStep,
          });
          nextStep = {
            [axis]: nextStep[axis],
            [otherAxis]: endPosition[otherAxis],
          };
          lineShape.push({
            operate: "L",
            position: nextStep,
          });
          lineShape.push({
            operate: "L",
            position: { ...endPosition },
          });
        } else {
          // 节点不想交
          // 起始 结尾都有安全距离
          let nextStep = {
            [axis]: startPosition[axis] + safeDistance * sign,
            [otherAxis]: startPosition[otherAxis],
          };

          lineShape.push({
            operate: "L",
            position: nextStep,
          });
          // 判断另一个轴是否相交
          if (nodeCalcMessage.intersect[otherAxis]) {
            // 相交走另一个轴的
            // 找到当前轴 方向为正就最大的位置，为负就最小的位置
            nextStep = {
              [axis]: nextStep[axis],
              [otherAxis]: otherAxisSignPosition + safeDistance * otherAxisSign,
            };
          } else {
            // 另一个轴走一半
            nextStep = {
              [axis]: nextStep[axis],
              [otherAxis]:
                nextStep[otherAxis] +
                Math.abs((endPosition[otherAxis] - startPosition[otherAxis]) / 2) * otherAxisSign,
            };
          }

          lineShape.push({
            operate: "L",
            position: nextStep,
          });

          nextStep = {
            [axis]: endPosition[axis] - safeDistance * sign,
            [otherAxis]: nextStep[otherAxis],
          };

          lineShape.push({
            operate: "L",
            position: nextStep,
          });

          nextStep = {
            [axis]: nextStep[axis],
            [otherAxis]: endPosition[otherAxis],
          };

          lineShape.push({
            operate: "L",
            position: nextStep,
          });
          lineShape.push({
            operate: "L",
            position: { ...endPosition },
          });
        }
      }

      return lineShape;
    },
    // 同轴异向
    sameAxisDiffDirection(axis, sign) {
      axis === "y" && (sign = -sign);
      const endSign = -sign;

      const nodeCalcMessage = this.nodeCalcMessage();
      const safeDistance = this.configure.safeDistance;

      const startNode = this.startNode;
      startNode.size.x = startNode.size.width;
      startNode.size.y = startNode.size.height;

      const endNode = this.endNode;
      endNode.size.x = endNode.size.width;
      endNode.size.y = endNode.size.height;

      const startPosition = this.startPosition;
      const endPosition = this.endPosition;

      const otherAxis = axis === "x" ? "y" : "x";

      const axisPositionDiff = endPosition[axis] - startPosition[axis];

      const otherAxisPositionDiff = endPosition[otherAxis] - startPosition[otherAxis];

      let otherAxisSign = Math.sign(otherAxisPositionDiff);
      otherAxisSign === 0 && (otherAxisSign = 1);

      const lineShape = [
        {
          operate: "M",
          position: { ...startPosition },
        },
      ];

      // 不相交, 或者在起始的正方向，然后当前otherAxis不与结束节点相交 就只有一种情况
      if (endNode.size[otherAxis] / 2 < Math.abs(otherAxisPositionDiff)) {
        // 起点出发到当前轴方向最远加上安全距离
        const nextPostion = sign >= 0 ? nodeCalcMessage.max[axis] : nodeCalcMessage.min[axis];

        let nextStep = {
          [axis]: nextPostion + safeDistance * sign,
          [otherAxis]: startPosition[otherAxis],
        };
        lineShape.push({
          operate: "L",
          position: nextStep,
        });

        // 往另一个轴的方向 走到尾部安全距离
        nextStep = {
          [axis]: nextStep[axis],
          [otherAxis]: endPosition[otherAxis],
        };
        lineShape.push({
          operate: "L",
          position: nextStep,
        });

        lineShape.push({
          operate: "L",
          position: { ...endPosition },
        });
        // 正方向，但是otherAxis与结束节点相交
      } else if (
        Math.sign(axisPositionDiff) === sign &&
        endNode.size[otherAxis] / 2 >= Math.abs(otherAxisPositionDiff)
      ) {
        // 先走安全距离
        let nextStep = {
          [axis]: startPosition[axis] + safeDistance * sign,
          [otherAxis]: startPosition[otherAxis],
        };
        // 如果起点和结束节点的最小位置有间隙就走一半
        const diff =
          sign > 0
            ? endNode.position[axis] - startPosition[axis]
            : startPosition[axis] - (endNode.position[axis] + endNode.size[axis]);
        if (diff > 0 && diff < safeDistance) {
          nextStep[axis] = startPosition[axis] + (diff / 2) * sign;
        }
        lineShape.push({
          operate: "L",
          position: nextStep,
        });

        // 看看是 结束节点的底部离起始位置近，还是顶部近
        const bottomDistance = endNode.position[otherAxis] + endNode.size[otherAxis];

        const topDistance = endNode.position[otherAxis];

        let nextStepSign = 0;
        if (
          Math.abs(topDistance - startPosition[otherAxis]) <=
          Math.abs(bottomDistance - startPosition[otherAxis])
        ) {
          nextStepSign = 1;
        } else {
          nextStepSign = -1;
        }

        // 往距离近的那边走 + safeDistance
        nextStep = {
          [axis]: nextStep[axis],
          [otherAxis]:
            nextStepSign === 1 ? topDistance - safeDistance : bottomDistance + safeDistance,
        };
        lineShape.push({
          operate: "L",
          position: nextStep,
        });

        // 走到结尾的安全位置
        nextStep = {
          [axis]: endPosition[axis] - safeDistance * endSign,
          [otherAxis]: nextStep[otherAxis],
        };
        lineShape.push({
          operate: "L",
          position: nextStep,
        });

        nextStep = {
          [axis]: nextStep[axis],
          [otherAxis]: endPosition[otherAxis],
        };
        lineShape.push({
          operate: "L",
          position: nextStep,
        });

        lineShape.push({
          operate: "L",
          position: { ...endPosition },
        });
        // 反方向 otherAxis比 2个节点的otherAxis的一半的和小
      } else if (
        Math.sign(axisPositionDiff) !== sign &&
        startNode.size[otherAxis] / 2 >= Math.abs(otherAxisPositionDiff)
      ) {
        // 起点先走安全距离
        // 先走安全距离
        let nextStep = {
          [axis]: startPosition[axis] + safeDistance * sign,
          [otherAxis]: startPosition[otherAxis],
        };

        lineShape.push({
          operate: "L",
          position: nextStep,
        });

        // 结束点在上面还是下面
        let nextStepSign = 0;
        if (otherAxisSign) {
          nextStepSign = 1;
        } else {
          nextStepSign = -1;
        }
        nextStep = {
          [axis]: nextStep[axis],
          [otherAxis]:
            nextStep[otherAxis] + (startNode.size[otherAxis] / 2 + safeDistance) * nextStepSign,
        };
        lineShape.push({
          operate: "L",
          position: nextStep,
        });

        // 再走到结束点安全距离
        nextStep = {
          [axis]: endPosition[axis] - safeDistance * endSign,
          [otherAxis]: nextStep[otherAxis],
        };

        const diff =
          sign > 0
            ? startNode.position[axis] - endPosition[axis]
            : endPosition[axis] - (startNode.position[axis] + startNode.size[axis]);

        if (diff > 0 && diff < safeDistance) {
          nextStep[axis] = endPosition[axis] + (diff / 2) * sign;
        }

        lineShape.push({
          operate: "L",
          position: nextStep,
        });

        nextStep = {
          [axis]: nextStep[axis],
          [otherAxis]: endPosition[otherAxis],
        };
        lineShape.push({
          operate: "L",
          position: nextStep,
        });

        lineShape.push({
          operate: "L",
          position: { ...endPosition },
        });
      }

      return lineShape;
    },
    // 不同轴
    diffAxis() {
      let { axis: startAxis, sign: startSign } = this.startDirection;
      let { axis: endAxis, sign: endSign } = this.endDirection;

      if (startAxis === "y") {
        startSign = -startSign;
        endSign = -endSign;
      }

      const nodeCalcMessage = this.nodeCalcMessage();
      const safeDistance = this.configure.safeDistance;

      const startNode = this.startNode;
      startNode.size.x = startNode.size.width;
      startNode.size.y = startNode.size.height;

      const endNode = this.endNode;
      endNode.size.x = endNode.size.width;
      endNode.size.y = endNode.size.height;

      const startPosition = this.startPosition;
      const endPosition = this.endPosition;

      const lineShape = [
        {
          operate: "M",
          position: { ...startPosition },
        },
      ];

      // 四种情况
      // 1. 2个节点 2个轴的位置与 startSign， endSign相反 , 直连
      if (
        Math.sign(endPosition[startAxis] - startPosition[startAxis]) === startSign &&
        Math.sign(endPosition[endAxis] - startPosition[endAxis]) === -endSign
      ) {
        lineShape.push(
          {
            operate: "L",
            position: {
              [startAxis]: endPosition[startAxis],
              [endAxis]: startPosition[endAxis],
            },
          },
          {
            operate: "L",
            position: {
              [startAxis]: endPosition[startAxis],
              [endAxis]: endPosition[endAxis],
            },
          }
        );
        return lineShape;
      }

      // 2. 节点起始轴的位置有缝隙，endSign一样
      const startAxisNodeDiff =
        startSign > 0
          ? endNode.position[startAxis] - startPosition[startAxis]
          : startPosition[startAxis] - (endNode.position[startAxis] + endNode.size[startAxis]);
      if (
        startAxisNodeDiff > 0 &&
        Math.sign(endPosition[endAxis] - startPosition[endAxis]) === endSign
      ) {
        let nextStep = {
          [startAxis]: 0,
          [endAxis]: startPosition[endAxis],
        };
        // 判断是走安全距离还是走一半
        if (Math.abs(startAxisNodeDiff) < safeDistance) {
          nextStep[startAxis] = startPosition[startAxis] + (startAxisNodeDiff / 2) * startSign;
        } else {
          nextStep[startAxis] = startPosition[startAxis] + safeDistance * startSign;
        }
        lineShape.push({
          operate: "L",
          position: nextStep,
        });

        // 走到 endAxis的安全距离
        nextStep = {
          [startAxis]: nextStep[startAxis],
          [endAxis]: endPosition[endAxis] + safeDistance * endSign,
        };
        lineShape.push(
          {
            operate: "L",
            position: nextStep,
          },
          {
            operate: "L",
            position: {
              [startAxis]: endPosition[startAxis],
              [endAxis]: nextStep[endAxis],
            },
          },
          {
            operate: "L",
            position: { ...endPosition },
          }
        );

        return lineShape;
      }

      // 3. startAixs轴无间隙， endAxis轴有间隙
      const endAxisDiff =
        endSign > 0
          ? startNode.position[endAxis] - (endNode.position[endAxis] + endNode.size[endAxis])
          : endPosition[endAxis] - (startNode.position[endAxis] + startNode.size[endAxis]);

      const startAxisDiff =
        startSign > 0
          ? endPosition[startAxis] - startPosition[startAxis]
          : startPosition[startAxis] - endPosition[startAxis];
      if (startAxisDiff <= 0 && endAxisDiff > 0) {
        // 线走安全距离
        let nextStep = {
          [startAxis]: startPosition[startAxis] + safeDistance * startSign,
          [endAxis]: startPosition[endAxis],
        };

        lineShape.push({
          operate: "L",
          position: nextStep,
        });

        // endAxis一半
        nextStep = {
          [startAxis]: nextStep[startAxis],
          [endAxis]:
            (endSign > 0
              ? startNode.position[endAxis]
              : startNode.position[endAxis] + startNode.size[endAxis]) -
            (endAxisDiff / 2) * endSign,
        };
        lineShape.push(
          {
            operate: "L",
            position: nextStep,
          },
          {
            operate: "L",
            position: {
              [startAxis]: endPosition[startAxis],
              [endAxis]: nextStep[endAxis],
            },
          },
          {
            operate: "L",
            position: { ...endPosition },
          }
        );

        return lineShape;
      }

      // 4.其他全是一样的情况
      // 走到2个节点的startAxis startSign 极限的地方 + safeDistance
      let nextStep = {
        [startAxis]:
          nodeCalcMessage[startSign > 0 ? "max" : "min"][startAxis] + safeDistance * startSign,
        [endAxis]: startPosition[endAxis],
      };

      lineShape.push({
        operate: "L",
        position: nextStep,
      });

      // 走到2个节点endAxis endSign 极限 + safeDisance
      nextStep = {
        [startAxis]: nextStep[startAxis],
        [endAxis]: nodeCalcMessage[endSign > 0 ? "max" : "min"][endAxis] + safeDistance * endSign,
      };
      lineShape.push({
        operate: "L",
        position: nextStep,
      });

      // 走到endPosition安全
      nextStep = {
        [startAxis]: endPosition[startAxis],
        [endAxis]: nextStep[endAxis],
      };
      lineShape.push(
        {
          operate: "L",
          position: nextStep,
        },
        {
          operate: "L",
          position: { ...endPosition },
        }
      );

      return lineShape;
    },
    // 线节点信息转为字符串
    lineShapeToD(lineShape) {
      let str = "";
      lineShape.forEach((elem) => {
        str += `${elem.operate} ${elem.position.x} ${elem.position.y}`;
      });
      return str;
    },
  },
  watch: {
    direction: {
      handler() {
        this.calcDirection();
      },
      immediate: true,
    },
  },
};
</script>

<style lang="less" scoped></style>
