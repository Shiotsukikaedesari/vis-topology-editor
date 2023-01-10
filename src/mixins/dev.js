export default {
  data() {
    return {
      $dragging: false,
      $devWatcher: null,
    };
  },
  computed: {
    $dev() {
      return this.$store.getters.mode === "dev";
    },
  },
  mounted() {
    if (this.use === "work") {
      const mouseenterFun = (event) => {
        event.stopPropagation();
        // this.$store.commit("status/addHoverObject", this.id);
      };

      const mousedownFun = (event) => {
        event.stopPropagation();
        // this.$store.commit("controls/transformNode", this.id);
        // this.$store.commit("active/setNode", this.id);
        // this.$store.commit("status/addHoverObject", this.id);
      };

      const mouseleaveFun = (event) => {
        event.stopPropagation();
        // this.$store.commit("status/removeHoverObject", this.id);
      };

      const clickFun = (event) => {
        event.stopPropagation();
        // this.$store.commit("status/clearActiveList");
        // this.$store.commit("status/addActiveObject", this.id);
      };

      const keyupFun = (event) => {
        if (event.keyCode === 46) {
          this.$store.commit("structure/deleteNode", this.id);
          this.$store.commit("controls/resetTransform");
        }
      };

      const dom = this.$el;

      this.$devWatcher = this.$watch(
        "$dev",
        (newVal) => {
          if (newVal) {
            dom.addEventListener("mouseenter", mouseenterFun);
            dom.addEventListener("mouseleave", mouseleaveFun);
            dom.addEventListener("mousedown", mousedownFun);
            dom.addEventListener("click", clickFun);
            dom.addEventListener("keyup", keyupFun);
          } else {
            dom.removeEventListener("mouseenter", mouseenterFun);
            dom.removeEventListener("mouseleave", mouseleaveFun);
            dom.removeEventListener("mousedown", mousedownFun);
            dom.removeEventListener("click", clickFun);
            dom.removeEventListener("keyup", keyupFun);
          }
        },
        {
          immediate: true,
        }
      );
    }
  },
  beforeDestroy() {
    this.$devWatcher();
  },
};
