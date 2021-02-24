

<template>
  <div id="combos" ref="combos">
    <mon_move_card ref="movepanel" :movedata="currentmove"></mon_move_card>
    <!-- <template v-for="(controls, condition) in conditions">
      <div
        :class="{
                    'weapon-move-condition-container-normal': condition == 'normal',
                    'weapon-move-condition-container': condition != 'normal',
                  }"
        :key="condition"
      >
        <div class="combo-condition-text" v-if="condition != 'normal'">{{ condition }}</div>
        <template v-for="(control, index) in controls">
          <weapon_move_control
            :control="control"
            :moves="weapondata.moves"
            :key="index"
            @clickmove="OnClickMove"
          ></weapon_move_control>
        </template>
      </div>
    </template>-->
    <template v-for="(moves, condition) in moveconditions">
      <div
        :class="{
                    'weapon-move-condition-container-normal': condition == 'normal',
                    'weapon-move-condition-container': condition != 'normal',
                  }"
        :key="condition"
      >
        <div class="combo-condition-text" v-if="condition != 'normal'">{{ condition }}</div>
        <template v-for="(move, key) in moves">
          <weapon_move_root
            :move="move"
            :moves="weapondata.moves"
            :key="key"
            @clickmove="OnClickMove"
          ></weapon_move_root>
        </template>
      </div>
    </template>
  </div>
</template>
<script>
module.exports = {
  data: function () {
    return {
      currentmove: {},
    }
  },
  props: ["weapondata"],
  components: {
    mon_move_card: httpVueLoader("components/mon_move_card.vue"),
    weapon_move_control: httpVueLoader("components/weapon_move_control.vue"),
    weapon_move_root: httpVueLoader("components/weapon_move_root.vue"),
  },
  mounted: function () {
  },
  methods: {
    // SetMoves: function () {
    //   for (let control of this.weapondata["controls"]) {
    //     if (!IsNullOrEmpty(control.condition)) {
    //       if (!this.conditions.hasOwnProperty(control.condition)) {
    //         this.conditions[control.condition] = [];
    //       }
    //       this.conditions[control.condition].push(control);
    //     } else this.conditions["normal"].push(control);
    //   }
    //   console.log(this.conditions);
    // },
    clickmove: function (move) {
      this.$emit("clickmove", move);
    },
    OnClickMove: function (move) {
      this.currentmove = move;
      this.$refs.movepanel.Show();
    },
  },
  computed: {
    conditions: function () {
      var result = {
        normal: []
      };
      for (let control of this.weapondata["controls"]) {
        if (!IsNullOrEmpty(control.condition)) {
          if (!result.hasOwnProperty(control.condition)) {
            result[control.condition] = [];
          }
          result[control.condition].push(control);
        } else result["normal"].push(control);
      }
      return result;
    },
    moveconditions: function () {
      var result = {
        normal: {}
      };
      for (let key in this.weapondata["moves"]) {
        const move = this.weapondata.moves[key];
        if (!IsNullOrEmpty(move.condition)) {
          if (!result.hasOwnProperty(move.condition)) {
            result[move.condition] = {};
          }
          result[move.condition][key] = move;
        } else result["normal"][key] = move;
      }
      console.log(result)
      return result;
    }
  },
};
</script>  

<style scoped>
#combos {
  position: relative;
  height: auto;
  width: 100%;
  overflow-x: auto;
}

.weapon-move-condition-container-normal {
  /* border-radius: 10px; */
  /* padding-left: 10px; */
}
.weapon-move-condition-container {
  /* border-top: 4px dashed #c1c3c4; */
  /* border-radius: 10px; */
  /* padding-left: 10px; */
}
</style>