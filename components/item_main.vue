<template>
  <div class="layout-main">
    <div class="layout-grid">
      <div class="layout-grid-right">
        <card :itemdata="itemdata"></card>
      </div>
      <div class="layout-grid-main">
        <details open>
          <summary class="header2">{{$t('description')}}</summary>
          <span id="description" v-html="ParseDescriptionText(itemdata.description)"></span>
        </details>

        <details open v-if="sourcedata!= undefined">
          <summary class="header2">{{$t('item.sources')}}</summary>
          <table v-if="sourcedata.quests!=undefined" class="interval-y-large">
            <caption class="text-bold margin text-left">{{$t('dataType.quests')}}</caption>
            <tbody>
              <tr class="card-text text-bold">
                <th>{{$t('item.quest_name')}}</th>
                <th>{{$t('item.amount')}}</th>
                <th class="item-rate-th">{{$t('rate')}}</th>
              </tr>
              <template v-for="(link, qID) in sourcedata.quests">
                <tr class="card-text" :key="qID">
                  <td>
                    <router-link v-bind:to="'/quest/' + qID" custom v-slot="{ navigate }">
                      <div
                        @click="navigate"
                        class="mouse-hover"
                      >{{$t('data.quests.' + qID + '.name')}}</div>
                    </router-link>
                  </td>
                  <td>
                    <div class="item-rate-text">{{link.num}}</div>
                  </td>
                  <td>
                    <div class="text-right item-rate-text">{{ link.rate + ' %'}}</div>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>

          <table v-if="sourcedata.large_monsters!=undefined" class="interval-y-large">
            <caption class="text-bold margin text-left">{{$t('dataType.large_monsters')}}</caption>
            <tbody>
              <tr class="card-text text-bold">
                <th>{{$t('item.monster_name')}}</th>
                <th>{{$t('item.rank')}}</th>
                <th>{{$t('item.method')}}</th>
                <th>{{$t('item.amount')}}</th>
                <th>{{$t('rate')}}</th>
              </tr>
              <template v-for="(list, mID) in sourcedata.large_monsters">
                <template v-for="(link,i) in list">
                  <tr class="card-text" :key="mID +'_'+ i">
                    <td>
                      <router-link v-bind:to="'/mon/' + mID" custom v-slot="{ navigate }">
                        <div @click="navigate" class="mouse-hover">{{$t('monster.name.' + mID )}}</div>
                      </router-link>
                    </td>
                    <td>
                      <div class="text-right item-rate-text">{{ $t(link.rank)}}</div>
                    </td>
                    <td>
                      <div class>{{$t('item.' + link.method)}}</div>
                    </td>
                    <td>
                      <div class="item-rate-text">{{link.num}}</div>
                    </td>
                    <td>
                      <div class="text-right item-rate-text">{{ link.rate + ' %'}}</div>
                    </td>
                  </tr>
                </template>
              </template>
            </tbody>
          </table>

          <table v-if="sourcedata.small_monsters!=undefined" class="interval-y-large">
            <caption class="text-bold margin text-left">{{$t('dataType.small_monsters')}}</caption>
            <tbody>
              <tr class="card-text text-bold">
                <th>{{$t('item.monster_name')}}</th>
                <th>{{$t('item.rank')}}</th>
                <th>{{$t('item.method')}}</th>
                <th>{{$t('item.amount')}}</th>
                <th>{{$t('rate')}}</th>
              </tr>
              <template v-for="(list, mID) in sourcedata.small_monsters">
                <template v-for="(link,i) in list">
                  <tr class="card-text" :key="mID+'_'+ i">
                    <td>
                      <router-link v-bind:to="'/smon/' + mID" custom v-slot="{ navigate }">
                        <div
                          @click="navigate"
                          class="mouse-hover"
                        >{{$t('small_monster.name.' + mID )}}</div>
                      </router-link>
                    </td>
                    <td>
                      <div class="text-right item-rate-text">{{ $t(link.rank)}}</div>
                    </td>
                    <td>
                      <div class>{{$t('item.' + link.method)}}</div>
                    </td>
                    <td>
                      <div class="item-rate-text">{{link.num}}</div>
                    </td>
                    <td>
                      <div class="text-right item-rate-text">{{ link.rate + ' %'}}</div>
                    </td>
                  </tr>
                </template>
              </template>
            </tbody>
          </table>

          <table v-if="sourcedata.meowcenaries!=undefined" class="interval-y-large">
            <caption class="text-bold margin text-left">{{$t('dataType.meowcenaries')}}</caption>
            <tbody>
              <tr class="card-text text-bold">
                <th>{{$t('meowcenary.scout_location')}}</th>
                <th>{{$t('item.rank')}}</th>
                <th>{{$t('meowcenary.target')}}</th>
              </tr>
              <template v-for="(list, mID) in sourcedata.meowcenaries">
                <template v-for="(link,i) in list">
                  <tr class="card-text" :key="mID +'_' +i">
                    <td>
                      <router-link v-bind:to="'/meowcenary/' + mID" custom v-slot="{ navigate }">
                        <div @click="navigate" class="mouse-hover">{{$t('map.name.' + mID )}}</div>
                      </router-link>
                    </td>
                    <td>
                      <div class="card-text">{{ $t(link.rank)}}</div>
                    </td>
                    <td>
                      <div
                        class="card-text"
                      >{{meow_getTargetName(link.target_type, link.target) + (link.rare? '(' + $t('meowcenary.rare') + ') ' :"")}}</div>
                    </td>
                  </tr>
                </template>
              </template>
            </tbody>
          </table>

          <table v-if="sourcedata.trade_market !=undefined" class="interval-y-large">
            <caption class="text-bold margin text-left">{{$t('trade_market.argosy')}}</caption>
            <tbody>
              <tr class="card-text text-bold">
                <th>{{$t('trade_market.market')}}</th>
                <th>{{$t('item.amount')}}</th>
              </tr>
              <tr class="card-text">
                <td>
                  <div class="card-text">{{ $t('trade_market.' + sourcedata.trade_market.target)}}</div>
                </td>
                <td>
                  <div
                    class="card-text"
                  >{{ sourcedata.trade_market.isBonus === true? $t('trade_market.bonus_item') : sourcedata.trade_market.num}}</div>
                </td>
              </tr>
            </tbody>
          </table>
        </details>
      </div>
    </div>
  </div>
</template>
<script>
module.exports = {

  props: ["items", "sources"],
  computed: {
    itemdata: function () {
      return this.items[this.$route.params.name];
    },
    sourcedata: function () {
      return this.sources[this.$route.params.name];
    }
  },
  methods: {
    meow_getTargetName: function (type, key) {
      switch (type) {
        case "large_monster":
          return this.$t('monster.name.' + key)
          break;
        case "small_monster":
          return this.$t('small_monster.name.' + key)
          break;
        case "environment":
          return this.$t('meowcenary.' + key)
          break;
      }
    },
    meow_getTargetIcon: function (type, key) {
      let path = "";
      switch (type) {
        case "large_monster":
          path = GetData('large_monsters')[key].icon;
          break;
        case "small_monster":
          path = GetData('small_monsters')[key].icon;
          break;
        case "environment":
          path = "images/meowcenary/" + key + ".png"
          break;
      }
      return path;
    }
  },
  mounted: function () {
  },
  created: function () {
    sendGAEvent("enter_page_data_main", {
      "category": "items",
      "name": this.itemdata.name,
    });
  },
  components: {
    card: httpVueLoader("components/item_card.vue"),
  },
}
</script>
<style scoped>
.item-rate-th {
  width: 11%;
}
.item-rate-text {
  max-width: 32px;
  margin-left: auto;
  margin-right: auto;
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
/* mobile */
@media (max-width: 1199.98px) {
}

/* desktops */
@media (min-width: 1200px) {
}
</style>
