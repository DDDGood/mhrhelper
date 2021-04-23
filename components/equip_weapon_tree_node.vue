<template>
  <div class="flex-column indent">
    <svg>
      <template v-for="(pos, index) in toPositions">
        <line :key="index" :x1="outpos.x" :y1="outpos.y" :x2="outpos.x" :y2="pos.y" />
        <line :key="index" :x1="outpos.x" :y1="pos.y" :x2="pos.x" :y2="pos.y" />
      </template>
    </svg>
    <router-link v-bind:to="'/equip_weapon/' + id" custom v-slot="{ navigate }">
      <div @click="navigate" class="weapon-container flex-column mouse-hover" ref="root">
        <div class="flex-row flex-start">
          <div class="flex-center">
            <div class="text-l">{{ weapon.name}}</div>
          </div>
          <div class="flex-row">
            <img
              :src="'images/icons/equipments/hole1.png'"
              class="card-text-icon"
              v-for="i in holes[0]"
              :key="i"
            />
            <img
              :src="'images/icons/equipments/hole2.png'"
              class="card-text-icon"
              v-for="i in holes[1]"
              :key="i"
            />
            <img
              :src="'images/icons/equipments/hole3.png'"
              class="card-text-icon"
              v-for="i in holes[2]"
              :key="i"
            />
          </div>
        </div>

        <div class="flex-row flex-start">
          <div class="flex-row">
            <img :src="'images/icons/status/attack_up.png'" class="card-text-icon" />
            <div class="text-m">{{weapon.attack}}</div>
          </div>
          <div v-if="weapon.huixin!=0" class="flex-row">
            <img :src="'images/icons/status/critical_up.png'" class="card-text-icon" />
            <div class="text-m">{{weapon.huixin}}</div>
          </div>
          <div v-if="weapon.defense!=0" class="flex-row">
            <img :src="'images/icons/status/defense_up.png'" class="card-text-icon" />
            <div class="text-m">{{weapon.defense}}</div>
          </div>
          <div v-if="weapon.fire!=0" class="flex-row">
            <img :src="'images/icons/status/fire.png'" class="card-text-icon" />
            <div class="text-m">{{weapon.fire}}</div>
          </div>
          <div v-if="weapon.water!=0" class="flex-row">
            <img :src="'images/icons/status/water.png'" class="card-text-icon" />
            <div class="text-m">{{weapon.water}}</div>
          </div>
          <div v-if="weapon.thunder!=0" class="flex-row">
            <img :src="'images/icons/status/thunder.png'" class="card-text-icon" />
            <div class="text-m">{{weapon.thunder}}</div>
          </div>
          <div v-if="weapon.ice!=0" class="flex-row">
            <img :src="'images/icons/status/ice.png'" class="card-text-icon" />
            <div class="text-m">{{weapon.ice}}</div>
          </div>
          <div v-if="weapon.dragon!=0" class="flex-row">
            <img :src="'images/icons/status/dragon.png'" class="card-text-icon" />
            <div class="text-m">{{weapon.dragon}}</div>
          </div>
        </div>
        <div class="flex-row" style="justify-content:space-between;">
          <div class="flex-column">
            <div v-if="infoType === 'melee'" class="flex-row flex-start">
              <img :src="'images/weapons/icons/cut.png'" class="card-text-icon" />
              <div>
                <div class="flex cut-container">
                  <div style="background-color:#BE3843;" :style="{'width': cuts0[0] + 'px'}"></div>
                  <div style="background-color:#D3673D;" :style="{'width': cuts0[1] + 'px'}"></div>
                  <div style="background-color:#C9B232;" :style="{'width': cuts0[2] + 'px'}"></div>
                  <div style="background-color:#81B034;" :style="{'width': cuts0[3] + 'px'}"></div>
                  <div style="background-color:#3A58D7;" :style="{'width': cuts0[4] + 'px'}"></div>
                  <div style="background-color:#E2E2E2;" :style="{'width': cuts0[5] + 'px'}"></div>
                  <div style="background-color:#885AEC;" :style="{'width': cuts0[6] + 'px'}"></div>
                </div>
                <div class="flex cut-container">
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
            <!-- <div class="text-s text-color-grey">{{ weapons[id].description}}</div> -->
          </div>
        </div>
      </div>
    </router-link>
    <template v-for="(anothernode, index) in weapon.next">
      <treenode :weapons="weapons" :id="anothernode" :key="index" :ref="id + '_' + anothernode"></treenode>
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
  props: ["weapons", "id", "comp"],
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
    }
  },
  methods: {
  },
  mounted: function () {
    this.cuts0 = this.weapon.cut0.split(",");
    this.cuts5 = this.weapon.cut5.split(",");
    this.holes = this.weapon.hole.split('-').map(function (item) {
      return parseInt(item, 10);
    });
    // console.log(this.$refs.root);
    this.rootpos = {
      x: this.$refs.root.offsetLeft,
      y: this.$refs.root.offsetTop + this.$refs.root.clientHeight / 2,
    };
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

.indent {
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

.cut-container {
  background-color: rgb(63, 63, 63);
  padding: 1px;
  width: 88px;
  height: 4px;
}
</style>