<template>
  <div class="layout-main">
    <div class="layout-grid">
      <div class="layout-grid-right"></div>
      <div class="layout-grid-main">
        <details open>
          <summary class="header2">{{$t('meowcenary.items')}}</summary>

          <div
            v-for="(link, targetID) in meowcenarydata"
            :key="targetID"
            class="card flex-column interval-y-large rounded"
          >
            <div class="flex-row interval-y">
              <div class="flex1 flex-center interval-x color-note rounded">
                <img class="target-icon color-note" :src="getTargetIcon(link.target_type,targetID)" />
              </div>
              <div
                class="flex3 flex-center text-bold color2 interval-x rounded"
              >{{getTargetName(link.target_type,targetID)}}</div>
            </div>
            <div class="flex-row interval-y">
              <div class="flex1 color1 text-center interval-x rounded">{{$t('low_rank')}}</div>
              <div class="flex1 color1 text-center interval-x rounded">{{$t('high_rank')}}</div>
            </div>
            <div class="flex-row interval-y">
              <div class="flex1 flex-column color2 interval-x rounded">
                <div class="flex-row flex-intense" v-for="(item, i) in link.low_rank" :key="i">
                  <img
                    class="card-text-icon"
                    :key="i"
                    src="images/svg/star.svg"
                    v-if="item.rare === true"
                  />
                  <router-link
                    custom
                    v-slot="{ navigate }"
                    v-bind:to="'/item/' + item.item"
                    :key="i"
                  >
                    <div @click="navigate" class="mouse-hover">
                      {{$t('data.items.' + item.item + '.name')}}
                      <span
                        v-if="item.num > 1"
                      >{{'x' + item.num}}</span>
                    </div>
                  </router-link>
                </div>
              </div>
              <div class="flex1 flex-column color2 interval-x rounded">
                <div class="flex-row flex-intense" v-for="(item, i) in link.high_rank" :key="i">
                  <img
                    class="card-text-icon"
                    :key="i"
                    src="images/svg/star.svg"
                    v-if="item.rare === true"
                  />
                  <router-link
                    custom
                    v-slot="{ navigate }"
                    v-bind:to="'/item/' + item.item"
                    :key="i"
                  >
                    <div @click="navigate" class="mouse-hover">
                      {{$t('data.items.' + item.item + '.name')}}
                      <span
                        v-if="item.num > 1"
                      >{{'x' + item.num}}</span>
                    </div>
                  </router-link>
                </div>
              </div>
            </div>
            <tr class="card-text" :key="targetID">
              <td></td>
              <td></td>
            </tr>
          </div>

          <table class="interval-y-large">
            <tbody>
              <tr class="card-text text-bold">
                <th style="width:50%">{{$t('low_rank')}}</th>
                <th style="width:50%">{{$t('high_rank')}}</th>
              </tr>
              <template v-for="(link, targetID) in meowcenarydata">
                <tr :key="targetID">
                  <td colspan="2">
                    <div class="flex-center color-note">
                      <div class="target-box flex-row flex-intense flex-center">
                        <img
                          class="target-icon color-note"
                          :src="getTargetIcon(link.target_type,targetID)"
                        />
                        <div class="text-bold">{{getTargetName(link.target_type,targetID)}}</div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr class="card-text" :key="targetID">
                  <td>
                    <div class="flex-row flex-intense" v-for="(item, i) in link.low_rank" :key="i">
                      <img
                        class="card-text-icon"
                        :key="i"
                        src="images/svg/star.svg"
                        v-if="item.rare === true"
                      />
                      <router-link
                        custom
                        v-slot="{ navigate }"
                        v-bind:to="'/item/' + item.item"
                        :key="i"
                      >
                        <div @click="navigate" class="mouse-hover">
                          {{$t('data.items.' + item.item + '.name')}}
                          <span
                            v-if="item.num > 1"
                          >{{'x' + item.num}}</span>
                        </div>
                      </router-link>
                    </div>
                  </td>
                  <td>
                    <div class="flex-row flex-intense" v-for="(item, i) in link.high_rank" :key="i">
                      <img
                        class="card-text-icon"
                        :key="i"
                        src="images/svg/star.svg"
                        v-if="item.rare === true"
                      />
                      <router-link
                        custom
                        v-slot="{ navigate }"
                        v-bind:to="'/item/' + item.item"
                        :key="i"
                      >
                        <div @click="navigate" class="mouse-hover">
                          {{$t('data.items.' + item.item + '.name')}}
                          <span
                            v-if="item.num > 1"
                          >{{'x' + item.num}}</span>
                        </div>
                      </router-link>
                    </div>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </details>
      </div>
    </div>
  </div>
</template>
<script>
module.exports = {

  props: ["meowcenaries"],
  computed: {
    meowcenarydata: function () {
      return this.meowcenaries[this.$route.params.name];
    }

  },
  methods: {
    getTargetName: function (type, key) {
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
    getTargetIcon: function (type, key) {
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
      "category": "meowcenaries",
      "name": this.$route.params.name,
    });
  },
  components: {
  }
}
</script>
<style scoped>
.target-box {
  width: 160px;
}
.target-icon {
  width: 48px;
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
