<template>
  <div class="flexboxrow">
    <svg>
      <template v-for="(pos, index) in toPositions">
        <line :key="index" :x1="rootpos.x" :y1="rootpos.y" :x2="pos.x" :y2="pos.y" />
      </template>
    </svg>
    <template v-for="(pos, index) in toPositions">
      <div :style="GetLinkTextStyle(pos)" :key="index">{{ pos.condition }}</div>
    </template>
    <div
      :class="{'flexitem':true, 'move-button-clickable':move!= undefined ,'move-button-virtual':move === undefined}"
      ref="root"
      @click="clickmove(move)"
    >
      <div class="movebutton-name">{{ rootnode.move }}</div>
      <div class="movebutton-tag" v-if="move == undefined ? false : move.recovery == '大'">硬直大</div>
    </div>
    <div class="flexboxcolumn">
      <template v-for="(anotherlink, index) in rootnode.links">
        <nodelink
          :key="index"
          :rootnode="nodes[anotherlink.node]"
          :nodes="nodes"
          :moves="moves"
          :ref="id(rootnode, anotherlink)"
          @clickmove="clickmove"
        ></nodelink>
      </template>
    </div>
  </div>
</template>
<script>
module.exports = {
  name: "nodelink",
  data: function () {
    return {
      rootpos: {
        x: "0",
        y: "0",
      },
      toPositions: [],
    };
  },
  props: ["rootnode", "nodes", "moves"],
  computed: {
    move: function () {
      return this.moves.find((x) => x.name === this.rootnode.move);
    },
  },
  methods: {
    id: function (rootnode, link) {
      return rootnode.move + "_" + link.node;
    },
    clickmove: function (move) {
      // console.log("clickmove");
      if (move === undefined)
        return;
      this.$emit("clickmove", move);
    },
    GetLinkTextStyle: function (toPos) {
      // console.log(this.$refs.root.style.marginRight);
      let widthText = this.$refs.root.style.marginRight.substring(
        0,
        this.$refs.root.style.marginRight.length - 2
      );
      let width = (parseInt(widthText, 10) * 4) / 5;
      return {
        position: "absolute",
        left: (this.rootpos.x + toPos.x) / 2 + "px",
        top: (this.rootpos.y + toPos.y) / 2 + "px",
        width: width + "px",
        "margin-left": "-" + width / 2 + "px",
        "margin-top": "-8px",
        "font-size": "10px",
        "text-align": "center",
        "text-anchor": "middle",
      };
    },
  },
  mounted: function () {
    // console.log(this.rootpos.x);
    this.rootpos = {
      x: this.$refs.root.offsetLeft + this.$refs.root.clientWidth,
      y: this.$refs.root.offsetTop + this.$refs.root.clientHeight / 2,
    };
    maxConditionTextLength = 0;
    for (let link of this.rootnode.links) {
      if (link.condition && link.condition.length > maxConditionTextLength) {
        maxConditionTextLength = link.condition.length;
      }
    }
    let minTextWidth = Math.min(maxConditionTextLength, 12) * 12 + 20;
    this.$refs.root.style.marginRight = Math.max(0, minTextWidth) + "px";
    console.log(this.$refs);
    for (let link of this.rootnode.links) {
      let refLink = this.$refs[this.rootnode.move + "_" + link.node][0];
      console.log(refLink);
      this.toPositions.push({
        x:
          refLink.$el.offsetLeft +
          refLink.rootpos.x -
          refLink.$refs.root.clientWidth,
        y: refLink.$el.offsetTop + refLink.rootpos.y,
        condition: link.condition,
      });
    }
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
</style>