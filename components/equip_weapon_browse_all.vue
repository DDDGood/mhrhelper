<template>
  <div class="layout-main">
    <div class="flex-row interval-y-large flex-wrap flex-start">
      <div
        class="flex-start flex-row flex-intense sorting-star"
        v-for="(type, i) in weaponTypes"
        :key="i"
        :class="{'text-white color0' : type==curType}"
        @click="selectType(type)"
      >
        <span class="flex1 flex-center">
          <img :src="'images/weapons/icons/' + type + '.png'" class="sorting-star-icon" />
        </span>
        <span class="text-center">{{ $t('weapons.name.' + type)}}</span>
      </div>
    </div>
    <div class="flex-row flex-end interval-y-large">
      <div>{{ $t('weapons.show_type') + "：" }}</div>
      <div
        @click="selectShowType(0)"
        v-bind:class="{'text-bold' : showtype ===0}"
      >{{$t('weapons.show_type_full')}}</div>
      <div>｜</div>
      <div
        @click="selectShowType(1)"
        v-bind:class="{'text-bold' : showtype ===1}"
      >{{$t('weapons.show_type_name')}}</div>
      <div>｜</div>
      <div
        @click="selectShowType(2)"
        v-bind:class="{'text-bold' : showtype ===2}"
      >{{$t('weapons.show_type_final')}}</div>
    </div>
    <div class="flex-column flex-center content-loader" v-show="!rendercontents">
      <div class="flex-center">
        <div>Loading...</div>
      </div>
      <div class="text-white">{{debugMsg}}</div>
    </div>
    <div
      class="flex-column interval-y-large"
      :key="updatekey"
      v-if="rendercontents && showtype ===2"
    >
      <div v-for="(id, i) in weaponsTree[curType].finals" v-bind:key="id + i">
        <treenode :key="i" :weapons="weapons" :id="id" :showtype="showtype"></treenode>
      </div>
    </div>
    <div
      class="flex-column interval-y-large"
      :key="updatekey"
      v-if="rendercontents&& showtype !==2"
    >
      <div v-for="(id, i) in weaponsTree[curType].roots" v-bind:key="id + i">
        <treenode :key="i" :weapons="weapons" :id="id" :showtype="showtype"></treenode>
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
      showtype: 0,
      updatekey: 0,
      rendercontents: false,
      debugMsg: ""
    };
  },
  props: ["weapons"],
  created: function () {
  },
  mounted: function () {
    if (localStorage.getItem("equip_weapons")) {
      try {
        let curData = JSON.parse(localStorage.getItem('equip_weapons'));
        this.curType = curData.curType;
        this.showtype = curData.showtype;
      } catch (e) {
        localStorage.removeItem('equip_weapons');
      }
    }
    this.delayUpdate();
  },
  methods: {
    selectType: function (i) {
      this.curType = i;
      this.saveState();
      this.delayUpdate();
    },
    selectShowType: function (i) {
      this.showtype = i;
      this.saveState();
      this.updatekey += 1;
      // this.$router.go()
    },
    saveState: function () {
      const curData = { "curType": this.curType, "showtype": this.showtype };
      localStorage.setItem("equip_weapons", JSON.stringify(curData));
    },
    delayUpdate: function () {
      this.debugMsg += "delayUpdate()" + "\n";
      if (navigator.userAgent.match('wv')) {
        this.rendercontents = true;
        return
      }
      this.rendercontents = false;
      this.fakeTimeout(this.doRender, 50);
    },
    doRender: function () {
      this.debugMsg += "doRender()" + "\n";
      this.rendercontents = true
    },
    fakeTimeout: function (caller, time) {
      this.debugMsg += "fakeTimeout()" + "\n";
      let begin = Date.now();
      this.debugMsg += "fakeStart:" + begin + "\n";
      this.debugMsg += window.toString() + "\n";
      window.requestAnimationFrame(function call() {
        if (Date.now() - begin > time) {
          caller();
        } else {
          window.requestAnimationFrame(call);
        }
      });
      return 0;
    }
  }, computed: {
    weaponsTree: function () {
      let sorted = {};
      for (let id in this.weapons) {
        const weapon = this.weapons[id];
        if (sorted[weapon.category] == undefined)
          sorted[weapon.category] = [];
        if (weapon.previous === undefined || weapon.previous === "") {
          // is root
          if (sorted[weapon.category].roots == undefined)
            sorted[weapon.category].roots = [];
          sorted[weapon.category].roots.push(id);
        }
        if (weapon.next === undefined || weapon.next.length == 0) {
          // is final
          if (sorted[weapon.category].finals == undefined)
            sorted[weapon.category].finals = [];
          sorted[weapon.category].finals.push(id);
        }
      }
      return sorted;
    }
  },
  components: {
    treenode: httpVueLoader("components/equip_weapon_tree_node.vue")
  }
};
</script>  
<style scoped>
.flex-wrap {
  flex-wrap: wrap !important;
}
.text-grey {
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
  padding: 6px;
  border-radius: 4px;
}
.type-current {
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