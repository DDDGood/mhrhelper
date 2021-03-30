<template>
  <div>
    <div class="layout-main">
      <div>
        <div class="flex-row flex-end">
          <div>排序：</div>
          <div
            @click="ChangeSortingType(0)"
            v-bind:class="{'sortingType_current' : sortingType ===0}"
          >危險度</div>
          <div>｜</div>
          <div
            @click="ChangeSortingType(1)"
            v-bind:class="{'sortingType_current' : sortingType ===1}"
          >種類</div>
        </div>
      </div>
      <div v-if="sortingType === 0">
        <template v-for="(container, level) in levellist">
          <div class="header3" :key="level">
            <div>{{ $t('monster.threat_level') }}</div>
            <div class="level-text" :key="level">{{ParseLevel(level) }}</div>
          </div>
          <div class="link-list" :key="level">
            <router-link
              tag="button"
              class="link-button"
              v-for="(mon, key) in container"
              :key="key"
              :to="'/mon/' + key"
            >
              <img
                class="link-icon"
                v-bind:src="IsNullOrEmpty(mon.icon) ? 'images/icons/endemics/unknown.png': mon.icon "
              />
              <div class="link-text">{{ $t('monster.name.'+key ) }}</div>
            </router-link>
          </div>
        </template>
      </div>
      <!-- <template v-for="(container, species) in specieslist">
        <div v-if="species!=='all'" :key="species">
          <div class="header3" :key="species">{{ $t('monster.species.' + species)}}</div>
          <div class="link-list" :key="species">
            <router-link
              tag="button"
              class="link-button"
              v-for="(mon, key) in container"
              :key="key"
              :to="'/mon/' + key"
            >
              <img
                class="link-icon"
                v-bind:src="IsNullOrEmpty(mon.icon) ? 'images/icons/endemics/unknown.png': mon.icon "
              />
              <div class="link-text">{{ $t('monster.name.'+key ) }}</div>
            </router-link>
          </div>
        </div>
      </template>-->

      <div v-if="sortingType === 1">
        <div class="header3">{{$t('species')}}</div>
        <div id="specieslist">
          <router-link
            tag="button"
            class="btnspecies"
            :class="{ 'flex-1': key !== 'all', 'flex-2': key === 'all' }"
            v-for="(item, key) in specieslist"
            v-bind:key="key"
            v-bind:to="'/mon/species/' + key"
          >{{ $t('monster.species.'+ key) }}</router-link>
        </div>
      </div>
      <!-- <router-view></router-view> -->
    </div>
  </div>
</template>
<script>
module.exports = {
  data: function () {
    return {
      sortingType: 0
    }
  },
  props: ["specieslist", "dex"],
  computed: {
    levellist: function () {
      let result = {
        "1": {},
        "2": {},
        "3": {},
        "4": {},
        "5": {},
        "6": {},
        "7": {},
        "8": {},
        "9": {},
        "10": {},
        "-1": {},
      };
      for (let id in this.dex) {
        const mon = this.dex[id];
        if (result.hasOwnProperty(mon.threat_level)) {
          result[mon.threat_level][id] = mon;
        } else {
          result["-1"][id] = mon;
        }
      }
      return result;
    }
  },
  methods: {
    ParseLevel: function (text) {
      const value = parseInt(text, 10);
      let result = "？";
      if (!isNaN(value) && value > 0 && value <= 10) {
        result = "";
        star = "★"
        star2 = "☆"
        result = star.repeat(value) + star2.repeat(10 - value);
      }
      return result;
    },
    ChangeSortingType: function (type) {
      this.sortingType = type;
    }
  },
  created: function () {
    // console.log(this.specieslist);
  }
};
</script>  

<style scoped>
.sortingType_current {
  font-weight: bold;
}
.sortingType_not {
  font-weight: normal;
}
.level-text {
  font-size: 14px;
  font-weight: normal !important;
}
#specieslist {
  display: grid;
  justify-content: center;
}
.btnspecies {
  text-decoration: none;
  white-space: nowrap;
  flex-grow: 0;
  word-wrap: normal;
  padding-top: 20px;
  padding-bottom: 20px;
  background-color: #e5e5e5;
  border: none;
  border-radius: 6px;
  color: 31363d;
}
.flex-1 {
}
.flex-2 {
}
/* mobile */
@media (max-width: 1199.98px) {
  #specieslist {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 12px;
  }
  .flex-1 {
    font-size: 18px;
    height: 80px;
  }
  .flex-2 {
    font-size: 24px;
    height: 120px;
    grid-column-start: 1;
    grid-column-end: 3;
  }
}
/* desktops */
@media (min-width: 1200px) {
  #specieslist {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 30px;
  }
  .btnspecies {
  }
  .flex-1 {
    font-size: 18px;
    height: 80px;
  }
  .flex-2 {
    font-size: 24px;
    height: 120px;
    grid-column-start: 1;
    grid-column-end: 4;
  }
}
</style>