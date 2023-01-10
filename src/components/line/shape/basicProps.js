export default {
  props: {
    startPosition: {
      type: Object,
      required: true,
    },
    endPosition: {
      type: Object,
      required: true,
    },
    startMessage: {
      type: Object,
      required: true,
    },
    endMessage: {
      type: Object,
      required: true,
    },
    markerStart: {
      type: String,
    },
    markerMid: {
      type: String,
    },
    markerEnd: {
      type: String,
    },
  },
};
