<template>
  <div id="layer0">
    <mon_moveinfopanel ref="movepanel" v-bind:movedata="currentmove"></mon_moveinfopanel>
    <div id="layer2-grid">
      <div class="grid-area-right">
        <mon_card v-bind:mondata="mondata"></mon_card>
      </div>
      <div class="grid-area-main">
        <details open>
          <summary class="header2">基本介紹</summary>
          <span id="description" v-html="GetDescriptionText('description')"></span>
        </details>
        <details open>
          <summary class="header2">詳細肉質(舊版資訊)</summary>
          <table id="hitdata-table">
            <tbody id="hitdata_table_tbody">
              <tr class="panel-text-bold">
                <th>部位</th>
                <th>狀態</th>
                <th>斬</th>
                <th>打</th>
                <th>彈</th>
                <th>火</th>
                <th>水</th>
                <th>雷</th>
                <th>冰</th>
                <th>龍</th>
              </tr>
              <tr class="panel-text" v-for="part of mondata.parts" :key="part.name + part.state">
                <td>{{ part.name }}</td>
                <td>{{ part.state }}</td>
                <td
                  v-bind:class="{ 'hitdata-highlight': part.hitData[0] >= 45 }"
                >{{ part.hitData[0] }}</td>
                <td
                  v-bind:class="{ 'hitdata-highlight': part.hitData[1] >= 45 }"
                >{{ part.hitData[1] }}</td>
                <td
                  v-bind:class="{ 'hitdata-highlight': part.hitData[2] >= 45 }"
                >{{ part.hitData[2] }}</td>
                <td
                  v-bind:class="{ 'hitdata-highlight': part.hitData[3] >= 25 }"
                >{{ part.hitData[3] }}</td>
                <td
                  v-bind:class="{ 'hitdata-highlight': part.hitData[4] >= 25 }"
                >{{ part.hitData[4] }}</td>
                <td
                  v-bind:class="{ 'hitdata-highlight': part.hitData[5] >= 25 }"
                >{{ part.hitData[5] }}</td>
                <td
                  v-bind:class="{ 'hitdata-highlight': part.hitData[6] >= 25 }"
                >{{ part.hitData[6] }}</td>
                <td
                  v-bind:class="{ 'hitdata-highlight': part.hitData[7] >= 25 }"
                >{{ part.hitData[7] }}</td>
              </tr>
            </tbody>
          </table>
        </details>
        <div id="divmoves">
          <details open>
            <summary class="header2">對戰要點</summary>
            <span id="moveoutline" v-html="GetDescriptionText('outline', 'move')"></span>
          </details>
          <details open>
            <summary class="header2">招式派生</summary>
            <div class="description-text">(點擊可查看招式介紹)</div>
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
                      :moves="movedata.moves"
                      :key="index"
                      @clickmove="OnClickMove"
                    ></mon_move_combo>
                  </template>
                </div>
              </template>
            </div>
          </details>
        </div>
        <details>
          <summary class="header2">設定細節</summary>
          <span id="detail" v-html="GetDescriptionText('detail')"></span>
        </details>
        <details>
          <summary class="header2">參考資料</summary>
          <div id="reference"></div>
        </details>
      </div>
    </div>
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
        },
      },
      currentmove: {},
    };
  },
  props: ["dex", "moves"],
  components: {
    mon_card: httpVueLoader("components/mon_card.vue"),
    mon_moveinfopanel: httpVueLoader("components/mon_moveinfopanel.vue"),
    mon_move_combo: httpVueLoader("components/mon_move_combo.vue"),
  },
  computed: {
    mondata: function () {
      return this.dex[this.$route.params.name];
    },
    movedata: function () {
      return this.moves[this.$route.params.name];
    },
  },
  created: function () {
    // console.log("setdata");
    // this.mondata = this.dex[this.$route.params.name];
    // this.movedata = this.moves[this.$route.params.name];
  },
  mounted: function () {
    if (this.movedata !== undefined) this.SetMoves();
  },
  methods: {
    GetDescriptionText: function (key, from) {
      let data = from === "move" ? this.movedata : this.mondata;
      if (
        data != undefined &&
        data.hasOwnProperty(key) &&
        data[key] != undefined
      ) {
        let result = "";
        var descTexts = data[key].split("\n", -1);
        for (let text of descTexts) {
          if (text.startsWith("[img]"))
            result +=
              "<img class='description-image' src='" + text.substring(5) + "'>";
          else
            result +=
              "<p class='description-text'>" +
              (IsNullOrEmpty(text) ? "<br>" : text) +
              "</p>";
        }
        return result;
      } else return "";
    },
    SetMoves: function () {
      for (let move of this.movedata["moves"]) {
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
      for (let combo of this.movedata["combos"]) {
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
    OnClickMove: function (move) {
      this.currentmove = move;
      this.$refs.movepanel.Show();
    },
  },
};
</script>  

<style scoped>
details {
  width: 100%;
}

#combos {
  position: relative;
  height: auto;
  width: 100%;
  overflow-x: auto;

  /* box-shadow: 0px 0px 0px 2px black inset; */
}
#layer2-grid {
  display: grid;
}

table {
  background-color: #4b9aff;
  padding: 2px;
  border-radius: 2px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}

th {
  background-color: #bdd5ff;
}
td {
  text-align: center;
  background-color: #ffffff;
}
.hitdata-highlight {
  background-color: #ffcfcf !important;
}

thead,
tfoot {
  background-color: #333;
  color: #fff;
}

/* mobile */
@media (max-width: 1199.98px) {
  #layer2-grid {
    grid-template-columns: minmax(0, 1fr);
  }
  /* .grid-area-main {
    margin: 8px;
  }
  .grid-area-right {
    margin: 8px;
  } */
}

/* desktops */
@media (min-width: 1200px) {
  #layer2-grid {
    grid-template-columns: 2fr 1fr;
    max-width: 1140px;
    margin-left: auto;
    margin-right: auto;
  }
  .grid-area-main {
    /* padding-left:150px; */
    grid-column-start: 1;
    grid-row-start: 1;
    padding-right: 8px;
    /* margin: 8px; */
  }
  .grid-area-right {
    /* position: absolute; */
    grid-column-start: 2;
    grid-row-start: 1;
    margin: 8px;
  }
}
</style>