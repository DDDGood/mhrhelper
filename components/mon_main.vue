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
        <details open>
          <summary class="header2">{{$t('monster.hitdata')}}</summary>
          <img
            v-if="IsNullOrEmpty(mondata.hitzone_image) === false"
            class="hitzone-image"
            :src="mondata.hitzone_image"
          />
          <table id="hitdata-table">
            <tbody id="hitdata_table_tbody">
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
                <th class="number">
                  <img class="hitdata-icon" src="images/icons/state/state_stun.png" />
                </th>
              </tr>
              <tr class="card-text" v-for="part of mondata.parts" :key="part.name + part.state">
                <td :style="{width: '1%',background: part.hitzone_color}"></td>
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
                <td>{{ part.hitData[8] }}</td>
              </tr>
            </tbody>
          </table>
        </details>
        <details open v-show="!IsNullOrEmpty(movedata.riding_moves)">
          <summary class="header2">{{$t('monster.riding_moves')}}</summary>
          <div class="interval-y-large" :key="key" v-for="(move, key) in movedata.riding_moves">
            <div class="flex-row flex-start">
              <div class="description-text text-bold">{{move.name}}</div>
              <div class="flex-row flex-intense" v-html="ParseCommand(move.command)"></div>
            </div>
            <div v-if="!IsNullOrEmpty(move.note)" class="description-text">{{'*' + move.note}}</div>
          </div>
        </details>
        <div id="divmoves" v-if="!IsNullOrEmpty(movedata)">
          <details open v-show="!IsNullOrEmpty(movedata.outline)">
            <summary class="header2">{{$t('monster.battlestrategy')}}</summary>
            <span id="moveoutline" v-html="GetDescriptionText('outline', 'move')"></span>
          </details>
          <details open v-show="!IsNullOrEmpty(movedata)">
            <summary class="header2">{{$t('monster.moves')}}</summary>
            <div class="description-text">{{$t('monster.move.moveshint')}}</div>
            <mon_moves :monmoves="movedata"></mon_moves>
          </details>
        </div>
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
    mon_moves: httpVueLoader("components/mon_moves.vue")
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
th.text {
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
  max-height: 30%;
  margin-top: 30px;
  margin-bottom: 30px;
  margin-left: auto;
  margin-right: auto;
}

/* mobile */
@media (max-width: 1199.98px) {
}

/* desktops */
@media (min-width: 1200px) {
}
</style>