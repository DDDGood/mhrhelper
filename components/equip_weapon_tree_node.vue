<template>
  <div class="flex-column indent">
    <svg>
      <template v-for="(pos, index) in toPositions">
        <line :key="index" :x1="outpos.x" :y1="outpos.y" :x2="outpos.x" :y2="pos.y" />
        <line :key="index" :x1="outpos.x" :y1="pos.y" :x2="pos.x" :y2="pos.y" />
      </template>
    </svg>
    <router-link v-bind:to="'/equip_weapon/' + id" custom v-slot="{ navigate }">
      <div @click="navigate" class="flex-column mouse-hover" ref="root">
        <div class="flex-row flex-start">
          <div class="flex-center">
            <div class="text-m">{{ weapons[id].name}}</div>
          </div>
        </div>
        <div class="flex cut-container">
          <div style="background-color:#BE3843;" :style="{'width': '12px'}"></div>
          <div style="background-color:#D3673D;" :style="{'width': '12px'}"></div>
          <div style="background-color:#C9B232;" :style="{'width': '12px'}"></div>
          <div style="background-color:#81B034;" :style="{'width': '12px'}"></div>
          <div style="background-color:#3A58D7;" :style="{'width': '12px'}"></div>
          <div style="background-color:#E2E2E2;" :style="{'width': '12px'}"></div>
          <div style="background-color:#885AEC;" :style="{'width': '12px'}"></div>
        </div>
        <!-- <div class="text-s text-color-grey">{{ weapons[id].description}}</div> -->
      </div>
    </router-link>
    <template v-for="(anothernode, index) in weapon.next">
      <treenode :weapons="weapons" :id="anothernode" :key="index" :ref="id + '_' + anothernode"></treenode>
    </template>
  </div>
</template>
<script>
module.exports = {
  name: "treenode",
  data: function () {
    return {
      rootpos: {
        x: "0",
        y: "0",
      },
      toPositions: [],
      cuts: []
    };
  },
  props: ["weapons", "id"],
  computed: {
    weapon: function () {
      return this.weapons[this.id];
    },
    outpos: function () {
      return {
        x: this.$refs.root.offsetLeft + 10,
        y: this.$refs.root.offsetTop + this.$refs.root.clientHeight,
      }
    }
  },
  methods: {
  },
  mounted: function () {
    // console.log(this.$refs.root);
    this.rootpos = {
      x: this.$refs.root.offsetLeft,
      y: this.$refs.root.offsetTop + this.$refs.root.clientHeight / 2,
    };
    // this.$refs.root.style.marginRight = Math.max(0, minTextWidth) + "px";
    for (let i in this.weapon.next) {
      let refLink = this.$refs[this.id + "_" + this.weapon.next[i]][0];
      if (refLink.$el == undefined)
        continue;
      this.toPositions.push({
        x:
          refLink.$el.offsetLeft,
        y: refLink.rootpos.y
      });
      //   this.toPositions.push({
      //     x:
      //       refLink.$el.offsetLeft +
      //       refLink.rootpos.x,
      //     y: refLink.$el.offsetTop + refLink.rootpos.y
      //   });
    }
    // console.log(this.rootpos);
  },
  components: {
    treenode: httpVueLoader("components/equip_weapon_tree_node.vue"),
  },
};
</script>  

<style scoped>
/*   SVG   */
svg {
  /* border: 2px solid black; */
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  width: 100%;
  height: 100%;
  overflow-y: visible;
  overflow-x: visible;
}

line {
  position: absolute;
  stroke: #c1c3c4;
  stroke-width: 2;
}

text {
  position: absolute;
  text-anchor: middle;
}

.indent {
  margin-left: 20px;
}

.cut-container {
  width: 88px;
  height: 4px;
}
</style>