<template>
  <div>
    <div class="layout-main">
      <div>
        <div class="flex-row flex-end">
          <div>{{ $t('sorting') + "：" }}</div>
          <div
            @click="ChangeSortingType(0)"
            v-bind:class="{'sortingType_current' : sortingType ===0}"
          >{{$t('monster.threat_level')}}</div>
          <div>｜</div>
          <div
            @click="ChangeSortingType(1)"
            v-bind:class="{'sortingType_current' : sortingType ===1}"
          >{{$t('species')}}</div>
        </div>
      </div>
      <div v-if="sortingType === 0">
        <template v-for="(container, level) in levellist">
          <div class="header3" :key="level">
            <span>{{ level === "apex" ? $t('monster.apex'): $t('monster.threat_level') }}</span>
            <span :key="level" v-if="level != 'apex'" v-html="ParseLevelHTML(level)"></span>
          </div>
          <div class="link-list" :key="level">
            <router-link
              v-for="(mon, key) in container"
              :key="key"
              :to="'/mon/' + key"
              custom
              v-slot="{ navigate }"
            >
              <button @click="navigate" class="link-button">
                <img
                  class="link-icon"
                  v-bind:src="IsNullOrEmpty(mon.icon) ? 'images/icons/endemics/unknown.png': mon.icon "
                />
                <div class="link-text">{{ $t('monster.name.'+key ) }}</div>
              </button>
            </router-link>
          </div>
        </template>
      </div>

      <div v-if="sortingType === 1">
        <div class="header3">{{$t('species')}}</div>
        <div id="specieslist">
          <router-link
            v-for="(item, key) in specieslist"
            v-bind:key="key"
            v-bind:to="'/mon/species/' + key"
            custom
            v-slot="{ navigate }"
          >
            <button
              @click="navigate"
              class="btnspecies"
              :class="{ 'flex-1': key !== 'all', 'flex-2': key === 'all' }"
            >{{ $t('monster.species.'+ key) }}</button>
          </router-link>
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
        "apex": {}
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
    ParseLevelHTML: function (text) {
      const value = parseInt(text, 10);
      let result = "<span class='level-text'>？</span>";
      if (!isNaN(value) && value > 0 && value <= 10) {
        result = "";
        star = "<span><img src='images/svg/star.svg' class='level-icon-star'/></span>"
        star2 = "<span><img src='images/svg/star_empty.svg' class='level-icon-star'/></span>"
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
  font-size: 16px;
  font-weight: normal !important;
}
.level-icon-star {
  width: 16px;
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