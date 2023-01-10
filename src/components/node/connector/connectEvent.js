export default {
  computed: {
    point() {
      return {
        x: this.node.position.x + this.position.x,
        y: this.node.position.y + this.position.y,
      };
    },
  },
  methods: {
    mousedown(event) {
      this.$store.commit("connect/applyDefaultLineStructure", this.$parent.line);
      this.$store.commit("connect/setDragStartPointer", {
        x: event.clientX,
        y: event.clientY,
      });

      this.$store.commit("connect/start", {
        node: this.node.id,
        interface: this.interface,
        direction: { ...this.direction },
        position: { ...this.point },
      });
    },

    mouseup() {
      this.$store.commit("connect/finish", {
        node: this.node.id,
        interface: this.interface,
        direction: { ...this.direction },
        position: { ...this.point },
      });
    },
  },
};
