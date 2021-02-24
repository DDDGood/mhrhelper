<template>
  <div class="move-flex-row">
    <svg>
      <template v-for="(pos, index) in toPositions">
        <line :key="index" :x1="rootpos.x" :y1="rootpos.y" :x2="pos.x" :y2="pos.y" />
      </template>
    </svg>
    <template v-for="(pos, index) in toPositions">
      <div class="flex-center" :style="GetLinkTextStyle(pos)" :key="index">
        <div class="command-text">{{ pos.condition }}</div>
      </div>
    </template>
    <button class="move-flex-item" ref="root" @click="clickmove(move)">
      <div class="movebutton-name">{{ move.name }}</div>
      <!-- <div class="movebutton-tag" v-if="move == undefined ? false : move.recovery == '大'">硬直大</div> -->
    </button>
    <div class="move-flex-column">
      <template v-for="(link, index) in move.links">
        <button :ref="link.node" :key="index" class="move-flex-item" @click="clickmove(move)">
          <div class="movebutton-name">{{ moves[link.node].name }}</div>
        </button>
        <!-- <nodelink
          :key="index"
          :rootnode="nodes[anotherlink.node]"
          :nodes="nodes"
          :moves="moves"
          :ref="id(rootnode, anotherlink)"
          @clickmove="clickmove"
        ></nodelink>-->
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
  props: ["rootnode", "nodes", "moves", "move"],
  computed: {
    // move: function () {
    //   return this.moves[this.move.move];
    // },
  },
  methods: {
    id: function (link) {
      return this.move + "_" + link.node;
    },
    clickmove: function (move) {
      // console.log("clickmove");
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
        "margin-top": "-8px"
      };
    },
  },
  mounted: function () {
    console.log(this.move);
    // console.log(this.rootpos.x);
    this.rootpos = {
      x: this.$refs.root.offsetLeft + this.$refs.root.clientWidth,
      y: this.$refs.root.offsetTop + this.$refs.root.clientHeight / 2,
    };
    maxConditionTextLength = 0;
    for (let key in this.move.links) {
      const link = this.move.links[key];
      if (link.command && link.command.length > maxConditionTextLength) {
        maxConditionTextLength = link.command.length;
      }
    }
    let minTextWidth = Math.min(maxConditionTextLength, 12) * 6 + 20;
    this.$refs.root.style.marginRight = Math.max(0, minTextWidth) + "px";
    for (let key in this.move.links) {
      const link = this.move.links[key];
      let refLink = this.$refs[link.node][0];
      this.toPositions.push({
        x:
          refLink.offsetLeft,
        y: refLink.offsetTop + refLink.clientHeight / 2,
        condition: link.command,
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

.move-root {
  border-radius: 4px;
  padding: 4px;
  margin-top: 8px;
  margin-bottom: 8px;
  font-size: 14px;
}
.command-text {
  background-color: rgb(255, 255, 255);
  border-radius: 4px;
  padding: 2px;
  font-size: 10px;
  text-align: center;
  text-anchor: middle;
}

.move-flex-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  padding: 0px;
  margin-top: 8px;
  margin-bottom: 8px;
  /* box-shadow:0px 0px 0px 2px green inset; */
}
.move-flex-column {
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  /* box-shadow:0px 0px 0px 2px blue inset; */
}
.move-flex-item {
  display: flex;
  background-color: #bdd5ff;
  white-space: nowrap;
  border: 1px solid #333;
  border-radius: 4px;
  padding: 4px;
  margin-top: 8px;
  margin-bottom: 8px;
  font-size: 14px;
}
</style>