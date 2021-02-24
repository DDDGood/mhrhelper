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
        <div class="flex1 rounded-right interval-x flex-column color2">
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
      var result = text;
      result = this.replacecmdicon(result, "[X]", "images/icons/inputs/x.png");
      result = this.replacecmdicon(result, "[A]", "images/icons/inputs/a.png");
      result = this.replacecmdicon(result, "[L]", "images/icons/inputs/l.png");
      result = this.replacecmdicon(result, "[R]", "images/icons/inputs/r.png");
      result = this.replacecmdicon(result, "[ZL]", "images/icons/inputs/zl.png");
      result = this.replacecmdicon(result, "[ZR]", "images/icons/inputs/zr.png");
      result = this.replacecmdicon(result, "[LS]", "images/icons/inputs/ls.png");
      result = this.replacecmdicon(result, "[RS]", "images/icons/inputs/rs.png");
      return result;
    },
    replacecmdicon: function (input, tag, iconpath) {
      var result = "";
      var array = input.split(tag);
      // for (let i = 0; i < array.length; i++) {
      //   array[i] = ("<span class='card-text'>" + array[i] + "</span>");
      // }
      result = array.join("<img class='command-icon' src='" + iconpath + "'>");
      // console.log(result);
      return result;
    }
  },
  computed: {
    rootnode: function () {
      return this.move;
    },
  },
};
</script>  
<style scoped>
.command-icon {
  display: inline-block;
  width: 22px;
  height: 22px;
}
</style>
