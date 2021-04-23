<template>
  <div class="layout-main">
    <div class="flex-row interval-y-large flex-wrap">
      <div
        class="flex-center interval-x flex-row flex-intense sorting-star"
        v-for="(type, i) in weaponTypes"
        :key="i"
        :class="{'sorting-star-current color0' : type==curType}"
        @click="selectType(type)"
      >
        <span class="flex1 flex-center">
          <img src="images/svg/star.svg" class="sorting-star-icon" />
        </span>
        <span class="text-center">{{ $t('weapons.name.' + type)}}</span>
      </div>
    </div>
    <div class="flex-column interval-y-large">
      <div v-for="(id, i) in weaponsTree[curType]" v-bind:key="id + i">
        <treenode :key="i" :weapons="weapons" :id="id"></treenode>
      </div>
    </div>
  </div>
</template>
<script>
module.exports = {
  data: function () {
    return {
      weaponTypes: [
        "great_sword",
        "long_sword",
        "sword_and_shield",
        "dual_blades",
        "hammer",
        "hunting_horn",
        "lance",
        "gunlance",
        "switch_axe",
        "charge_blade",
        "insect_glaive",
        "light_bowgun",
        "heavy_bowgun",
        "bow",
      ],
      curType: "great_sword",
    };
  },
  props: ["weapons"],
  created: function () {
  },
  mounted: function () {
  },
  methods: {
    selectType: function (i) {
      this.curType = i;
    },
    extendNode: function (node, fromData) {
      if (fromData.next != undefined) {
        for (let child in fromData.next) {
          node[child]
        }
      }
    }
  }, computed: {
    weaponsTree: function () {
      console.log('sorting');
      let sorted = {};

      for (let id in this.weapons) {
        const weapon = this.weapons[id];
        if (weapon.previous === undefined || weapon.previous === "") {
          // is root
          if (sorted[weapon.category] == undefined)
            sorted[weapon.category] = [];
          sorted[weapon.category].push(id);
        }
      }
      return sorted;
    },
  },
  components: {
    treenode: httpVueLoader("components/equip_weapon_tree_node.vue"),
  }
};
</script>  
<style scoped>
.flex-wrap {
  flex-wrap: wrap !important;
}
.text-color-grey {
  color: grey;
}
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