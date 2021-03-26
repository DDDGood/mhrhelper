

<template >
  <div v-if="!IsNullOrEmpty(monmoves)">
    <mon_move_card ref="movepanel" :movedata="currentmove"></mon_move_card>
    <details open v-if="!(monmoves?.riding_moves===undefined)">
      <summary class="header2">{{$t('monster.riding_moves')}}</summary>
      <div class="interval-y-large" :key="key" v-for="(move, key) in monmoves.riding_moves">
        <div class="flex-row flex-start">
          <!-- <div class="description-text text-bold">{{move.name}}</div> -->
          <div v-if="!IsNullOrEmpty(move.command)" class="flex-row flex-intense" v-html="ParseCommand(move.command)"></div>
          <button class="flexitem" @click="OnClickMove(move)">
            <div class="movebutton-name">{{ move.name }}</div>
          </button>
        </div>
        <!-- <video
          v-if="!IsNullOrEmpty(move.video)"
          ref="video"
          width="60%"
          height="60%"
          autoplay
          loop
          webkit-playsinline
          playsinline
          muted
        >
          <source :src="move.video" type="video/mp4" />
        </video> -->
        <div v-if="!IsNullOrEmpty(move.note)" class="description-text">{{'*' + move.note}}</div>
      </div>
    </details>
    <details open v-show="!IsNullOrEmpty(monmoves.outline)">
      <summary class="header2">{{$t('monster.battlestrategy')}}</summary>
      <span id="moveoutline" v-html="ParseDescriptionText(monmoves.outline)"></span>
    </details>
    <details open v-show="!IsNullOrEmpty(monmoves)">
      <summary class="header2">{{$t('monster.moves')}}</summary>
      <div class="description-text">{{$t('monster.move.moveshint')}}</div>
      <div id="combos" ref="combos">
      <template v-for="(conditiondata, condition) in moveconditions">
        <div
          :class="{
                      'combo-condition-container-normal': condition == 'normal',
                      'combo-condition-container': condition != 'normal',
                    }"
          :key="condition"
        >
          <div class="combo-condition-text" v-if="condition != 'normal'">{{ condition }}</div>
          <template v-for="item of conditiondata.moves">
            <div class="flexboxrow" :key="item.name" v-if="!item.onlyincombo">
              <button class="flexitem" @click="OnClickMove(item)">
                <div class="movebutton-name">{{ item.name }}</div>
                <div class="movebutton-tag" v-if="item.recovery == '大'">硬直大</div>
              </button>
            </div>
          </template>
          <template v-for="(combo, index) in conditiondata.combos">
            <mon_move_combo
              :combo="combo"
              :moves="monmoves.moves"
              :key="index"
              @clickmove="OnClickMove"
            ></mon_move_combo>
          </template>
        </div>
      </template>
    </details>
  </div>
</template>

<script>
module.exports = {
  data: function () {
    return {
      moveconditions: {
        normal: {
          moves: [],
          combos: [],
        }
      },
      currentmove: {},
    }
  },
  props: ["monmoves"],
  components: {
    mon_move_card: httpVueLoader("components/mon_move_card.vue"),
    mon_move_combo: httpVueLoader("components/mon_move_combo.vue")
  },
  mounted: function () {
    if (this.monmoves !== undefined) this.SetMoves();
  },
  methods: {
    SetMoves: function () {
      for (let move of this.monmoves["moves"]) {
        if (!IsNullOrEmpty(move.condition)) {
          if (!this.moveconditions.hasOwnProperty(move.condition)) {
            this.moveconditions[move.condition] = {
              moves: [],
              combos: [],
            };
          }
          this.moveconditions[move.condition].moves.push(move);
        } else this.moveconditions["normal"].moves.push(move);
      }
      for (let combo of this.monmoves["combos"]) {
        if (!IsNullOrEmpty(combo.condition)) {
          if (!this.moveconditions.hasOwnProperty(combo.condition)) {
            this.moveconditions[combo.condition] = {
              moves: [],
              combos: [],
            };
          }
          this.moveconditions[combo.condition].combos.push(combo);
        } else this.moveconditions["normal"].combos.push(combo);
      }
    },
    clickmove: function (move) {
      this.$emit("clickmove", move);
    },
    OnClickMove: function (move) {
      this.currentmove = move;
      this.$refs.movepanel.Show();
    },
  },
  computed: {
    rootnode: function () {
      return this.combo.nodes[this.combo.root];
    },
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
</style>