<template >
  <nodelink :rootnode="rootnode" :nodes="combo.nodes" :moves="moves" @clickmove="clickmove"></nodelink>
</template>
<script>
module.exports = {
  props: ["combo", "moves"],
  components: {
    nodelink: httpVueLoader("components/mon_move_combo_link.vue"),
  },
  methods: {
    clickmove: function (move) {
      this.$emit("clickmove", move);
    },
  },
  computed: {
    rootnode: function () {
      return this.combo.nodes[this.combo.root];
    },
  },
};
</script>  

