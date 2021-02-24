<template >
  <div>
    <template v-for="(command, id) in control.commands">
      <div :key="id">{{ command}}</div>
    </template>
    <nodelink :rootnode="rootnode" :nodes="control.nodes" :moves="moves" @clickmove="clickmove"></nodelink>
  </div>
</template>
<script>
module.exports = {
  props: ["control", "moves"],
  components: {
    nodelink: httpVueLoader("components/weapon_move_control_link.vue"),
  },
  methods: {
    clickmove: function (move) {
      this.$emit("clickmove", move);
    },
  },
  computed: {
    rootnode: function () {
      return this.control.nodes[this.control.root];
    },
  },
};
</script>  

