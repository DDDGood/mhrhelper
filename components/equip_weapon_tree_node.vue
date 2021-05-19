<template>
  <div class="flex-column indent">
    <svg>
      <template v-for="(pos, index) in toPositions">
        <line :key="index" :x1="outpos.x" :y1="outpos.y" :x2="outpos.x" :y2="pos.y" />
        <line :key="index" :x1="outpos.x" :y1="pos.y" :x2="pos.x" :y2="pos.y" />
      </template>
    </svg>
    <router-link v-bind:to="'/equip_weapon/' + id" custom v-slot="{ navigate } ">
      <div @click="navigate" class="flex-column mouse-hover weapon-container" ref="root">
        <div>
          <div class="flex-row flex-start avoid-pointer">
            <div class="flex-center margin">
              <div class="text-l">{{ weapon.name}}</div>
            </div>
            <div class="flex-row" v-if="showtype === 0 || showtype === 2">
              <div class="flex-center">
                <img
                  :src="'images/icons/equipments/hole1.png'"
                  class="card-text-icon"
                  v-for="i in holes[0]"
                  :key="i"
                />
              </div>
              <div class="flex-center">
                <img
                  :src="'images/icons/equipments/hole2.png'"
                  class="card-text-icon"
                  v-for="i in holes[1]"
                  :key="i"
                />
              </div>
              <div class="flex-center">
                <img
                  :src="'images/icons/equipments/hole3.png'"
                  class="card-text-icon"
                  v-for="i in holes[2]"
                  :key="i"
                />
              </div>
            </div>
          </div>
          <div v-if="showtype === 0|| showtype === 2">
            <div class="flex-row flex-start trait-line">
              <div class="flex-row" v-if="weapon.attack !== undefined">
                <div class="flex flex-center">
                  <img :src="'images/icons/status/attack_up.png'" class="card-text-icon" />
                </div>
                <div class="flex flex-center">
                  <div class="flex text-m text-center">{{weapon.attack}}</div>
                </div>
              </div>
              <div v-if=" weapon.huixin!=undefined && weapon.huixin!=0" class="flex-row">
                <div class="flex flex-center">
                  <img :src="'images/icons/status/critical_up.png'" class="card-text-icon" />
                </div>
                <div class="flex flex-center">
                  <div class="text-m text-center">{{weapon.huixin + '%'}}</div>
                </div>
              </div>
              <div v-if="weapon.defense!=undefined && weapon.defense!=0" class="flex-row">
                <div class="flex flex-center">
                  <img :src="'images/icons/status/defense_up.png'" class="card-text-icon" />
                </div>
                <div class="flex flex-center">
                  <div class="text-m">{{weapon.defense}}</div>
                </div>
              </div>
              <div v-if="weapon.fire!=undefined && weapon.fire!=0" class="flex-row">
                <div class="flex flex-center">
                  <img :src="'images/icons/status/fire.png'" class="card-text-icon" />
                </div>
                <div class="flex flex-center">
                  <div class="text-m">{{weapon.fire}}</div>
                </div>
              </div>
              <div v-if="weapon.water!=undefined && weapon.water!=0" class="flex-row">
                <div class="flex flex-center">
                  <img :src="'images/icons/status/water.png'" class="card-text-icon" />
                </div>
                <div class="flex flex-center">
                  <div class="text-m">{{weapon.water}}</div>
                </div>
              </div>
              <div v-if="weapon.thunder!=undefined &&  weapon.thunder!=0 " class="flex-row">
                <div class="flex flex-center">
                  <img :src="'images/icons/status/thunder.png'" class="card-text-icon" />
                </div>
                <div class="flex flex-center">
                  <div class="text-m">{{weapon.thunder}}</div>
                </div>
              </div>
              <div v-if="weapon.ice!=undefined && weapon.ice!=0" class="flex-row">
                <div class="flex flex-center">
                  <img :src="'images/icons/status/ice.png'" class="card-text-icon" />
                </div>
                <div class="flex flex-center">
                  <div class="text-m">{{weapon.ice}}</div>
                </div>
              </div>
              <div v-if="weapon.dragon!=undefined && weapon.dragon!=0" class="flex-row">
                <div class="flex flex-center">
                  <img :src="'images/icons/status/dragon.png'" class="card-text-icon" />
                </div>
                <div class="flex flex-center">
                  <div class="text-m">{{weapon.dragon}}</div>
                </div>
              </div>
              <div v-if="weapon.poison!=undefined && weapon.poison!=0" class="flex-row">
                <div class="flex flex-center">
                  <img :src="'images/icons/status/poison.png'" class="card-text-icon" />
                </div>
                <div class="flex flex-center">
                  <div class="text-m">{{weapon.poison}}</div>
                </div>
              </div>
              <div v-if="weapon.sleep!=undefined && weapon.sleep!=0" class="flex-row">
                <div class="flex flex-center">
                  <img :src="'images/icons/status/sleep.png'" class="card-text-icon" />
                </div>
                <div class="flex flex-center">
                  <div class="text-m">{{weapon.sleep}}</div>
                </div>
              </div>
              <div v-if="weapon.paralyze!=undefined && weapon.paralyze!=0" class="flex-row">
                <div class="flex flex-center">
                  <img :src="'images/icons/status/paralysis.png'" class="card-text-icon" />
                </div>
                <div class="flex flex-center">
                  <div class="text-m">{{weapon.paralyze}}</div>
                </div>
              </div>
              <div v-if="weapon.blasting!=undefined && weapon.blasting!=0" class="flex-row">
                <div class="flex flex-center">
                  <img :src="'images/icons/status/blast.png'" class="card-text-icon" />
                </div>
                <div class="flex flex-center">
                  <div class="text-m">{{weapon.blasting}}</div>
                </div>
              </div>
              <div
                v-if="(weapon.category==='charge_blade' || weapon.category==='switch_axe') && weapon.phial != undefined"
                class="flex-row"
              >
                <div class="flex flex-center">
                  <img :src="'images/icons/equipments/phial_full.png'" class="card-text-icon" />
                </div>
                <div class="text-m">{{weapon.phial}}</div>
              </div>
              <div
                v-if="weapon.category==='gunlance' && weapon.shelling!= undefined"
                class="flex-row"
              >
                <div class="flex flex-center">
                  <img :src="'images/icons/equipments/shelling.png'" class="card-text-icon" />
                </div>
                <div class="flex text-m">{{weapon.shelling}}</div>
              </div>
              <div
                v-if="weapon.category==='insect_glaive' && weapon.kinsect!= undefined"
                class="flex-row"
              >
                <div class="flex flex-center">
                  <img :src="'images/weapons/icons/kinsect_blunt.png'" class="card-text-icon" />
                </div>
                <div class="flex text-m">{{weapon.kinsect}}</div>
              </div>
            </div>
            <div class="flex-row" style="justify-content:space-between;">
              <div class="flex-column">
                <div v-if="infoType === 'melee'" class="flex-row flex-start">
                  <img :src="'images/weapons/icons/cut.png'" class="card-text-icon" />
                  <div>
                    <div class="flex sharpness-container" v-if="cuts0.length > 0">
                      <div style="background-color:#BE3843;" :style="{'width': cuts0[0] + 'px'}"></div>
                      <div style="background-color:#D3673D;" :style="{'width': cuts0[1] + 'px'}"></div>
                      <div style="background-color:#C9B232;" :style="{'width': cuts0[2] + 'px'}"></div>
                      <div style="background-color:#81B034;" :style="{'width': cuts0[3] + 'px'}"></div>
                      <div style="background-color:#3A58D7;" :style="{'width': cuts0[4] + 'px'}"></div>
                      <div style="background-color:#E2E2E2;" :style="{'width': cuts0[5] + 'px'}"></div>
                      <div style="background-color:#885AEC;" :style="{'width': cuts0[6] + 'px'}"></div>
                    </div>
                    <div class="flex sharpness-container" v-if="cuts5.length > 0">
                      <div style="background-color:#BE3843;" :style="{'width': cuts5[0] + 'px'}"></div>
                      <div style="background-color:#D3673D;" :style="{'width': cuts5[1] + 'px'}"></div>
                      <div style="background-color:#C9B232;" :style="{'width': cuts5[2] + 'px'}"></div>
                      <div style="background-color:#81B034;" :style="{'width': cuts5[3] + 'px'}"></div>
                      <div style="background-color:#3A58D7;" :style="{'width': cuts5[4] + 'px'}"></div>
                      <div style="background-color:#E2E2E2;" :style="{'width': cuts5[5] + 'px'}"></div>
                      <div style="background-color:#885AEC;" :style="{'width': cuts5[6] + 'px'}"></div>
                    </div>
                  </div>
                </div>
                <!-- <div class="text-s text-grey">{{ weapons[id].description}}</div> -->
              </div>
            </div>
            <div
              class="flex-row flex-start trait-line"
              v-if="weapon.category==='light_bowgun' || weapon.category==='heavy_bowgun'"
            >
              <div class="flex-row" v-if="weapon.offset != undefined">
                <div class="flex flex-center">
                  <!-- <img :src="'images/icons/status/attack_up.png'" class="card-text-icon" /> -->
                </div>
                <div class="flex flex-center">
                  <div class="flex text-m text-center">{{weapon.offset + '-'}}</div>
                </div>
              </div>
              <div class="flex-row" v-if="weapon.recoil!= undefined">
                <div class="flex flex-center">
                  <!-- <img :src="'images/icons/status/attack_up.png'" class="card-text-icon" /> -->
                </div>
                <div class="flex flex-center">
                  <div class="flex text-m text-center">{{ weapon.recoil+ '-'}}</div>
                </div>
              </div>
              <div class="flex-row" v-if="weapon.reload!= undefined">
                <div class="flex flex-center">
                  <!-- <img :src="'images/icons/status/attack_up.png'" class="card-text-icon" /> -->
                </div>
                <div class="flex flex-center">
                  <div class="flex text-m text-center">{{weapon.reload}}</div>
                </div>
              </div>
            </div>
            <div
              class="flex-row flex-start trait-line"
              v-if="weapon.category==='bow' && weapon.xuli!= undefined && weapon.xuli_add!= undefined "
            >
              <div class="flex-row">
                <div class="flex flex-center">
                  <!-- <img :src="'images/icons/status/attack_up.png'" class="card-text-icon" /> -->
                </div>
                <div class="flex flex-center">
                  <span class="text-m text-center">
                    {{weapon.xuli.replaceAll('Lv','')
                    + ( weapon.xuli_add === ""? "": ',(' + weapon.xuli_add.replaceAll('Lv','') + ')')
                    }}
                  </span>
                </div>
              </div>
            </div>
            <div
              class="flex-row flex-start trait-line"
              v-if="weapon.category==='bow' && weapon.coatings != undefined && weapon.coatings_up != undefined"
            >
              <div class="flex-row">
                <div class="flex flex-center">
                  <!-- <img :src="'images/icons/status/attack_up.png'" class="card-text-icon" /> -->
                </div>
                <div class="flex flex-center">
                  <template v-for="(value, type) in coatings">
                    <img
                      v-if="value!==0"
                      :key="type"
                      :src="'images/icons/equipments/' + type + (value ===2? '_plus':'') + '.png'"
                      class="card-text-icon"
                    />
                  </template>
                </div>
              </div>
            </div>
            <div
              class="flex-row flex-start trait-line"
              v-if="weapon.category==='hunting_horn' && weapon.notes_desc!== undefined "
            >
              <div class="flex-row">
                <div class="flex flex-center">
                  <!-- <img :src="'images/icons/status/attack_up.png'" class="card-text-icon" /> -->
                </div>
                <div class="flex flex-center">
                  <span class="text-m text-center">{{weapon.notes_desc}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </router-link>
    <template v-for="(anothernode, index) in weapon.next">
      <treenode
        :weapons="weapons"
        :id="anothernode"
        :key="index"
        :ref="id + '_' + anothernode"
        :showtype="showtype"
      ></treenode>
    </template>
  </div>
</template>
<script>
module.exports = {
  name: "treenode",
  data: function () {
    return {
      rootpos: {
        x: "0",
        y: "0",
      },
      toPositions: [],
      cuts0: [],
      cuts5: [],
      holes: []
    };
  },
  props: ["weapons", "id", "comp", "showtype"],
  computed: {
    weapon: function () {
      return this.weapons[this.id];
    },
    outpos: function () {
      return {
        x: this.$refs.root.offsetLeft + 10,
        y: this.$refs.root.offsetTop + this.$refs.root.clientHeight,
      }
    },
    infoType: function () {
      let type = "melee";
      if (this.weapon.category === "bow")
        type = "bow";
      else if (this.weapon.category === "light_bowgun" || this.weapon.category === "heavy_bowgun")
        type = "bowgun";
      return type;
    },
    coatings: function () {
      let coatings = {
        '接擊瓶': 0,
        '強擊瓶': 0,
        '毒瓶': 0,
        '麻痺瓶': 0,
        '睡眠瓶': 0,
        '爆破瓶': 0,
        '減氣瓶': 0,
      }
      for (let type in coatings) {
        if (this.weapon.coatings.indexOf(type) > -1) {
          coatings[type] = 1;
        } else if (this.weapon.coatings_up.indexOf(type) > -1) {
          coatings[type] = 2;
        }
      }
      return coatings;
    }
  },
  methods: {
    refreshLine: function () {
      this.rootpos = {
        x: this.$refs.root.offsetLeft,
        y: this.$refs.root.offsetTop + this.$refs.root.clientHeight / 2,
      };
      this.toPositions = [];
      for (let i in this.weapon.next) {
        let refLink = this.$refs[this.id + "_" + this.weapon.next[i]][0];
        if (refLink.$el == undefined)
          continue;
        this.toPositions.push({
          x:
            refLink.$el.offsetLeft,
          y: refLink.rootpos.y
        });
      }
    }
  },
  mounted: function () {
    if (this.weapon.cut0 !== undefined)
      this.cuts0 = this.weapon.cut0.split(",");
    if (this.weapon.cut5 !== undefined)
      this.cuts5 = this.weapon.cut5.split(",");
    if (this.weapon.holes !== undefined)
      this.holes = this.weapon.hole.split('-').map(function (item) {
        return parseInt(item, 10);
      });

    this.refreshLine();
  },
  watch: {
    showtype: function (newValue, oldValue) {
    }
  },
  components: {
    treenode: this.comp,
  },
};
</script>  

<style scoped>
/*   SVG   */
svg {
  /* border: 2px solid black; */
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  width: 100%;
  height: 100%;
  overflow-y: visible;
  overflow-x: visible;
}

line {
  position: absolute;
  stroke: #c1c3c4;
  stroke-width: 2;
}

text {
  position: absolute;
  text-anchor: middle;
}

.indent .indent {
  margin-left: 20px;
}

.weapon-container {
  margin-top: 2px;
  margin-bottom: 2px;
  border-bottom: 2px solid rgb(197, 197, 197);
  /* background-color: rgb(197, 197, 197); */
  /* border-radius: 2px; */
  padding: 4px;
  justify-content: space-between;
}
.trait-line {
  color: grey;
}
.sharpness-container {
  background-color: rgb(63, 63, 63);
  padding: 1px;
  width: 88px;
  height: 4px;
}

/* desktops */
@media (min-width: 1200px) {
  .weapon-container:hover {
    background-color: #bdd5ff;
  }
}
</style>