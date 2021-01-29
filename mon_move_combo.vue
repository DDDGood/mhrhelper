<template >
  <nodelink :rootnode="rootnode" :nodes="combo.nodes" :moves="moves"></nodelink>
  <!-- <div class="flexboxrow">
    <button class="flexitem">
      <div class="movebutton-name">{{combo.nodes[combo.root].move}}</div>
      <div class="movebutton-tag" v-if="item.recovery == '大'">硬直大</div>
    </button>
    <div class="flexboxcolumn">
      <template v-for="(link,index) in rootnode.links">
        <nodelink :key="index" :rootnode="combo.nodes[combo.root]" :nodes="combo.nodes"></nodelink>
      </template>
    </div>
  </div>-->
</template>
<script>
module.exports = {
  props: ["combo", "moves"],
  components: {
    nodelink: httpVueLoader("mon_move_combo_link.vue"),
  },
  computed: {
    rootnode: function () {
      return this.combo.nodes[this.combo.root];
    }
  }
};
</script>  

