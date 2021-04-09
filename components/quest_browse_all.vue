<template>
  <div class="layout-main">
    <div class="flex-row interval-y-large sorting-type-container">
      <div
        class="flex1 sorting-type flex-center interval-x"
        v-for="(type, id) in questsByTypes"
        :key="id"
        :class="{'sorting-type-current' : id==curType}"
        @click="selectType(id)"
      >{{$t('quest.' + id)}}</div>
    </div>
    <div class="flex-row interval-y-large">
      <div
        class="flex-center interval-x flex-row flex-intense sorting-star"
        v-for="(list, star) in questsByTypes[curType]"
        :key="star"
        :class="{'sorting-star-current color0' : star==curStar}"
        @click="selectStar(star)"
      >
        <span v-if="curType !='arena'" class="flex1 flex-center">
          <img src="images/svg/star.svg" class="sorting-star-icon" />
        </span>
        <span class="text-center">{{curType !='arena'? star: $t('all')}}</span>
      </div>
    </div>
    <div class="flex-column interval-y-large">
      <router-link
        v-for="(quest, key) in questsByTypes[curType][curStar]"
        v-bind:key="key"
        v-bind:to="'/quest/' + key"
        custom
        v-slot="{ navigate }"
      >
        <div @click="navigate" class="flex1 flex-row flex-start item-list-link mouse-hover">
          <div class="flex-center">
            <div class="item-list-text">{{ quest.name}}</div>
          </div>
        </div>
      </router-link>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
module.exports = {
  data: function () {
    return {
      curType: "village",
      curStar: 1
    };
  },
  props: ["quests"],
  created: function () {
  },
  methods: {
    selectType: function (i) {
      this.curType = i;
      this.curStar = 1;
    },
    selectStar: function (i) {
      this.curStar = i;
    },
  }, computed: {
    questsByTypes: function () {
      let sorted = {
        "village": { 1: {}, 2: {}, 3: {}, 4: {}, 5: {}, 6: {} },
        "hall": { 1: {}, 2: {}, 3: {}, 4: {}, 5: {}, 6: {}, 7: {} },
        "arena": { 1: {} }
      };
      for (let id in this.quests) {
        const quest = this.quests[id];
        if (quest.type === 'hall' || quest.type === 'village')
          sorted[quest.type][quest.star][id] = quest;
        else
          sorted[quest.type][1][id] = quest;
      }
      return sorted;
    },
    pagescount: function () {
      return Math.ceil(Object.keys(this.searchitems).length / this.showcount)
    }
  }
};
</script>  
<style scoped>
.sorting-type-container {
  box-shadow: 0 2px 2px -2px #b1b1b1;
}
.sorting-type {
  color: grey;
  font-size: 18px;
  padding: 4px;
}
.sorting-type-current {
  color: rgb(0, 0, 0);
  font-weight: bold;
  border-bottom: 2px solid #4b9aff;
}
.sorting-star {
  padding: 4px;
  border-radius: 4px;
}
.sorting-star-current {
  color: white;
}
.sorting-star-icon {
  width: 16px;
}
.page-link-container {
  margin: 8px;
}
.page-link {
  margin: 2px;
  display: inline-block;
  color: blue;
  text-decoration-line: underline;
}
.page-link-current {
  color: black !important;
  text-decoration-line: none !important;
  font-weight: bold !important;
}

/* desktops */
@media (min-width: 1200px) {
}
</style>