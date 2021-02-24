<template >
  <div :id="move.name" class="card rounded interval-y">
    <div class="flex-column">
      <div class="flex-row interval-y flex-start">
        <div class="card-text text-bold">{{move.name}}</div>
        <div class="flex-row">
          <template v-for="(hit, id) in move.hits">
            <img
              :key="id"
              class="flex1 card-text-icon"
              :src="'images/icons/hittypes/' + hit.type + '.png'"
            />
            <div :key="id" class="flex1 card-text">{{ hit.damage}}</div>
          </template>
        </div>
      </div>
      <div class="flex-row interval-y">
        <div class="flex1 rounded-left interval-x card-text text-bold color1 flex-center">指令</div>
        <div class="flex2 rounded-right interval-x flex-column color2">
          <template v-for="(command, id) in move.commands">
            <div class="flex1 flex-row flex-intense" :key="id" v-html="parsecommand(command)"></div>
          </template>
        </div>
      </div>
      <div class="flex-row interval-y" v-if="move.links!== undefined">
        <div class="flex1 color1 rounded flex-column">
          <div class="card-text text-bold interval-y" @click="togglelinks()">派生</div>
          <!-- <div v-if="showlinks" class="flex1 color2 rounded margin">
            <movelink :move="move" :nodes="move.nodes" :moves="moves" @clickmove="clickmove"></movelink>
          </div>-->
          <div class="margin">
            <div class="flex-row interval-y" :key="id" v-for="(link, id) in move.links">
              <div
                :key="id"
                class="flex1 rounded-left interval-x color2 flex-row flex-intense"
                v-html="parsecommand(link.command)"
              ></div>
              <div
                :key="id"
                class="flex1 rounded-right interval-x flex-column color2 card-text"
              >{{moves[link.node].name}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <nodelink :rootnode="rootnode" :nodes="move.nodes" :moves="moves" @clickmove="clickmove"></nodelink> -->
  </div>
</template>
<script>
module.exports = {
  data: function () {
    return {
      showlinks: true
    };
  },
  props: ["move", "moves"],
  components: {
    nodelink: httpVueLoader("components/weapon_move_control_link.vue"),
    movelink: httpVueLoader("components/weapon_move_link.vue"),
  },
  methods: {
    clickmove: function (move) {
      this.$emit("clickmove", move);
    },
    togglelinks: function () {
      this.showlinks = !this.showlinks
    },
    parsecommand: function (text) {
      let final = "";
      let array = text.split('[');
      for (let part of array) {
        if (part.length === 0)
          continue;
        // console.log("part:" + part + part.length)
        const closeTag = part.indexOf("]");
        if (closeTag > -1) {
          const key = part.substring(0, closeTag);
          final += "<img class='command-icon' src='" + this.getInputIcon(key) + "'>";
          // console.log("key:" + key)
        }
        final += "<span class='card-text'>" + part.substring(closeTag + 1) + "</span>";
      }
      return final;
    },
    getInputIcon: function (key) {
      switch (key) {
        case "X":
          return "images/icons/inputs/x.png"
          break;
        case "Y":
          return "images/icons/inputs/y.png"
          break;
        case "A":
          return "images/icons/inputs/a.png"
          break;
        case "B":
          return "images/icons/inputs/b.png"
          break;
        case "L":
          return "images/icons/inputs/l.png"
          break;
        case "R":
          return "images/icons/inputs/r.png"
          break;
        case "ZL":
          return "images/icons/inputs/zl.png"
          break;
        case "ZR":
          return "images/icons/inputs/zr.png"
          break;
        case "LS":
          return "images/icons/inputs/ls.png"
          break;
        case "RS":
          return "images/icons/inputs/rs.png"
          break;
      }
    },
  },
  computed: {
    rootnode: function () {
      return this.move;
    },
  },
};
</script>  
<style scoped>
</style>
