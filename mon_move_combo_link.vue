<template >
  <div class="flexboxrow">
    <svg>
      <circle :cx="rootpos.x" :cy="rootpos.y" r="2" stroke="green" stroke-width="4" fill="yellow" />
      <template v-for="(pos,index) in toPositions">
        <circle
          :key="index"
          :cx="pos.x"
          :cy="pos.y"
          r="2"
          stroke="green"
          stroke-width="4"
          fill="red"
        />
        <line :key="index" :x1="rootpos.x" :y1="rootpos.y" :x2="pos.x" :y2="pos.y" />
      </template>
    </svg>
    <template v-for="(pos,index) in toPositions">
      <div :style="GetLinkTextStyle(pos)" :key="index">{{pos.condition}}</div>
    </template>
    <button class="flexitem" ref="root">
      <!-- <div class="movebutton-name">{{rootpos.x}}</div> -->
      <div class="movebutton-name">{{rootnode.move}}</div>
      <div class="movebutton-tag" v-if="move == undefined? false: move.recovery == '大'">硬直大</div>
    </button>
    <div class="flexboxcolumn">
      <template v-for="(anotherlink,index) in rootnode.links">
        <nodelink
          :key="index"
          :rootnode="nodes[anotherlink.node]"
          :nodes="nodes"
          :moves="moves"
          :ref="id(rootnode, anotherlink)"
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
        y: "0"
      },
      toPositions: []
    }
  },
  props: ["rootnode", "nodes", "moves"],
  computed: {
    move: function () {
      return this.moves.find((x) => x.name === this.rootnode.move);
    }
  },
  methods: {
    id: function (rootnode, link) {
      return (rootnode.move + "_" + link.node);
    },
    GetLinkTextStyle: function (toPos) {
      console.log(this.$refs.root.style.marginRight);
      let widthText = this.$refs.root.style.marginRight.substring(0, this.$refs.root.style.marginRight.length - 2);
      let width = parseInt(widthText, 10) * 3 / 4;
      console.log(width);
      return {
        position: "absolute",
        left: (this.rootpos.x + toPos.x) / 2 + "px",
        top: (this.rootpos.y + toPos.y) / 2 + "px",
        width: width + "px",
        "margin-left": "-" + width / 2 + "px",
        "margin-top": "-8px",
        "font-size": "10px",
        "background-color": "#ffffff",
        "text-align": "center",
        "text-anchor": "middle"
      }
    }
  },
  mounted: function () {
    // console.log(this.rootpos.x);
    this.rootpos = {
      x: this.$refs.root.offsetLeft + this.$refs.root.clientWidth,
      y: this.$refs.root.offsetTop + (this.$refs.root.clientHeight / 2),
    }
    maxConditionTextLength = 0;
    for (let link of this.rootnode.links) {
      if (link.condition && link.condition.length > maxConditionTextLength) {
        maxConditionTextLength = link.condition.length;
      }
    }
    let minTextWidth = (Math.min(maxConditionTextLength, 8) * 10) + 20;
    this.$refs.root.style.marginRight = Math.max(0, minTextWidth) + "px";
    for (let link of this.rootnode.links) {
      let refLink = this.$refs[this.rootnode.move + "_" + link.node][0];
      this.toPositions.push({
        x: refLink.$el.offsetLeft + refLink.rootpos.x - refLink.$refs.root.clientWidth,
        y: refLink.$el.offsetTop + refLink.rootpos.y,
        condition: link.condition
      });
    }
  }
};
</script>  

