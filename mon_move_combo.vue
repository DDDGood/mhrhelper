<template >
  <nodelink :rootnode="rootnode" :nodes="combo.nodes" :moves="moves" @click="HandleClick(move)"></nodelink>
</template>
<script>
module.exports = {
  props: ["combo", "moves"],
  components: {
    nodelink: httpVueLoader("mon_move_combo_link.vue"),
  },
  methods: {
    HandleClick: function (move) {
      console.log(move.name);
      this.$emit("click", move);
    }
  },
  computed: {
    rootnode: function () {
      return this.combo.nodes[this.combo.root];
    }
  }
};
</script>  

