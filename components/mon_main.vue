<template>
  <div class="layout-main">
    <div class="layout-grid">
      <div class="layout-grid-right">
        <mon_card :mondata="mondata"></mon_card>
      </div>
      <div class="layout-grid-main">
        <details open v-show="!IsNullOrEmpty(this.mondata.description)">
          <summary class="header2">{{$t('description')}}</summary>
          <span id="description" v-html="GetDescriptionText('description')"></span>
        </details>
        <details open v-if="mondata.hitdata!== undefined">
          <summary class="header2">{{$t('monster.hitdata')}}</summary>
          <img
            v-if="IsNullOrEmpty(mondata.hitdata.hitzone_image) === false"
            class="hitzone-image"
            :src="mondata.hitdata.hitzone_image"
          />
          <table>
            <tbody>
              <tr class="card-text text-bold">
                <th>#</th>
                <th>{{$t('monster.part')}}</th>
                <th>{{$t('monster.state')}}</th>
                <th class="number">
                  <img class="hitdata-icon" src="images/icons/equipments/greatsword.png" />
                </th>
                <th class="number">
                  <img class="hitdata-icon" src="images/icons/equipments/hammer.png" />
                </th>
                <th class="number">
                  <img class="hitdata-icon" src="images/icons/maps/ammo_normal.png" />
                </th>
                <th class="number">
                  <img class="hitdata-icon" src="images/icons/element/element_fire.png" />
                </th>
                <th class="number">
                  <img class="hitdata-icon" src="images/icons/element/element_water.png" />
                </th>
                <th class="number">
                  <img class="hitdata-icon" src="images/icons/element/element_thunder.png" />
                </th>
                <th class="number">
                  <img class="hitdata-icon" src="images/icons/element/element_ice.png" />
                </th>
                <th class="number">
                  <img class="hitdata-icon" src="images/icons/element/element_dragon.png" />
                </th>
                <!-- <th class="number">
                  <img class="hitdata-icon" src="images/icons/state/state_stun.png" />
                </th>-->
              </tr>
              <tr
                class="card-text"
                v-for="(part,id) in mondata.hitdata.parts"
                :key="part.part + part.state"
              >
                <td :style="{width: '1%',background: part.hitzone_color}"></td>
                <td
                  v-if="id===0 || part.part!==mondata.hitdata.parts[id-1].part"
                  :rowspan="CheckSamePartCount(part.part)"
                >{{ part.part }}</td>
                <td>{{ part.condition === undefined? "通常" : part.condition }}</td>
                <td v-bind:class="{ 'hitdata-highlight': part.cut >= 45 }">{{ part.cut }}</td>
                <td v-bind:class="{ 'hitdata-highlight': part.blunt >= 45 }">{{ part.blunt }}</td>
                <td v-bind:class="{ 'hitdata-highlight': part.ammo >= 45 }">{{ part.ammo }}</td>
                <td v-bind:class="{ 'hitdata-highlight': part.fire >= 25 }">{{ part.fire }}</td>
                <td v-bind:class="{ 'hitdata-highlight': part.water >= 25 }">{{ part.water }}</td>
                <td v-bind:class="{ 'hitdata-highlight': part.thunder >= 25 }">{{ part.thunder }}</td>
                <td v-bind:class="{ 'hitdata-highlight': part.ice >= 25 }">{{ part.ice }}</td>
                <td v-bind:class="{ 'hitdata-highlight': part.dragon >= 25 }">{{ part.dragon }}</td>
                <!-- <td>{{ part.hitData[8] }}</td> -->
              </tr>
            </tbody>
          </table>
        </details>

        <details open v-if="mondata.partsdata!== undefined">
          <summary class="header2">{{$t('monster.partsdata')}}</summary>
          <img
            v-if="IsNullOrEmpty(mondata.partsdata.parts_image) === false"
            class="hitzone-image"
            :src="mondata.partsdata.parts_image"
          />
          <table>
            <tbody>
              <tr class="card-text text-bold">
                <th>#</th>
                <th>{{$t('monster.part')}}</th>
                <th>{{$t('monster.stagger')}}</th>
                <th>{{$t('monster.break')}}</th>
                <th>{{$t('monster.loss')}}</th>
                <th>{{$t('monster.extract')}}</th>
              </tr>
              <tr
                class="card-text"
                v-for="(part,id) in mondata.partsdata.parts"
                :key="part.part + id"
              >
                <td :style="{width: '1%',background: part.part_color}"></td>
                <td>{{ part.part }}</td>
                <td>{{ part.stagger }}</td>
                <td>{{ part.break == undefined? "-" : "(" + part.break.length + ")" + part.break[0].vital }}</td>
                <td>{{ part.loss == undefined? "-" : "(" + $t('monster.weakness.' + part.loss.damage_type) + ")" + part.loss.vital }}</td>
                <td>
                  <div class="flex-row flex-intense">
                    <div
                      :class="{ 'extract-red': part.extract === 'red', 'extract-orange': part.extract === 'orange', 'extract-white': part.extract === 'white'  }"
                    ></div>
                    <div>{{ $t('monster.extract_type.' + part.extract) }}</div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </details>

        <details open v-if="mondata.items!== undefined">
          <summary class="header2">{{$t('monster.materials')}}</summary>
          <itemtable :items="mondata.items"></itemtable>
        </details>

        <mon_moves :monmoves="movedata" v-if="!IsNullOrEmpty(movedata)" @clickmove="OnClickMove"></mon_moves>

        <details v-if="!IsNullOrEmpty(mondata.detail)">
          <summary class="header2">{{$t('description_detail')}}</summary>
          <span id="detail" v-html="GetDescriptionText('detail')"></span>
        </details>
        <details open v-if="Object.keys(reference).length > 0">
          <summary class="header2">{{$t('reference')}}</summary>
          <div v-for="(link,key) in this.reference" :key="key">
            <a class="description-text" :href="link">{{key}}</a>
          </div>
        </details>
      </div>
    </div>
  </div>
</template>
<script>
module.exports = {
  data: function () {
    return {
      // mondata: {},
      reference: {
      }
    };
  },
  props: ["dex", "moves"],
  components: {
    mon_card: httpVueLoader("components/mon_card.vue"),
    mon_moves: httpVueLoader("components/mon_moves.vue"),
    itemtable: httpVueLoader("components/mon_item_table.vue")
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
    sendGAEvent("enter_page_data_main", {
      "category": "large_monsters",
      "name": this.mondata.name.tw,
    });
  },
  mounted: function () {
    // this.mondata = this.dex[this.$route.params.name];
    if (this.mondata !== undefined && this.mondata.hasOwnProperty("reference"))
      for (const key in this.mondata.reference) {
        this.reference[key] = this.mondata.reference[key];
      }
    if (this.movedata !== undefined && this.movedata.hasOwnProperty("reference"))
      for (const key in this.movedata.reference) {
        this.reference[key] = this.movedata.reference[key];
      }
    this.$forceUpdate();
  },
  methods: {
    GetDescriptionText: function (key, from) {
      let data = from === "move" ? this.movedata : this.mondata;
      if (
        data != undefined &&
        data.hasOwnProperty(key) &&
        data[key] != undefined
      ) {
        let result = ParseDescriptionText(data[key]);
        return result;
      } else return "";
    },
    CheckSamePartCount: function (partName) {
      let count = 0;
      for (const part of this.mondata.hitdata.parts) {
        if (part.part === partName) {
          count++;
        }
      }
      return count;
    },
    OnClickMove: function (move) {
      sendGAEvent("click_monster_move", {
        "monster": this.mondata.name.tw,
        "name": move.name,
      });
    }
  },
  watch: {
    dex: {
      deep: true,
      handler: function (newVal, oldVal) {
        console.log("dex changed");
        this.mondata = this.dex[this.$route.params.name];
      }
    },
    test: {
      deep: true,
      handler: function (newVal, oldVal) {
        console.log("test changed");
      }
    }
  }
};
</script>  

<style scoped>
details {
  width: 100%;
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
th.number {
  width: 8%;
}
td {
  text-align: center;
  background-color: #ffffff;
}
.hitdata-highlight {
  background-color: #ffcfcf !important;
}

.materials-source {
  background-color: #f0f3e7;
  font-size: 14px;
  font-weight: bold;
}
.materials-source-info {
  font-weight: normal;
  color: rgb(73, 73, 73);
  padding-left: 4px;
  font-size: 12px;
}
.materials-text-item {
  font-weight: normal;
  font-size: 14px;
}
.materials-text-rate {
  font-weight: normal;
  color: blue;
  padding-left: 4px;
  font-size: 12px;
}

thead,
tfoot {
  background-color: #333;
  color: #fff;
}

.hitdata-icon {
  width: 80%;
  max-width: 20px;
  max-height: 20px;
}

.hitzone-image {
  display: block;
  max-width: 80%;
  max-height: 50vh;
  margin-top: 30px;
  margin-bottom: 30px;
  margin-left: auto;
  margin-right: auto;
}

.extract-red {
  width: 8px;
  height: 8px;
  border: 1px solid black;
  background-color: orange;
}
.extract-white {
  width: 8px;
  height: 8px;
  border: 1px solid black;
}
.extract-orange {
  width: 8px;
  height: 8px;
  border: 1px solid black;
  background-color: red;
}

/* mobile */
@media (max-width: 1199.98px) {
}

/* desktops */
@media (min-width: 1200px) {
}
</style>