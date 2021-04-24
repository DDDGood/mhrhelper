<template>
  <div class="card rounded flex-column">
    <div class="flex-row interval-y">
      <!-- <div class="icon-background rounded interval-x flex-center">
        <img
          id="icon"
          ref="icon"
          v-bind:src="IsNullOrEmpty(weapondata.icon)? 'images/monsters/icons/icon_unknown.png':weapondata.icon"
          alt="icon"
        />
      </div>-->
      <div class="flex1 flex-center color2 rounded interval-x">
        <div class="card-text text-l2 text-bold">{{weapondata.name}}</div>
      </div>
    </div>
    <div class="flex-row interval-y">
      <div class="flex1 color2 rounded flex-center">
        <div class="anim-container" :style="animUrl"></div>
      </div>
    </div>
    <div class="flex-row interval-y">
      <div class="flex1 flex-column color1 rounded">
        <div class="flex1 rounded card-text text-bold">{{$t('type')}}</div>
        <div
          class="flex2 color2 rounded card-text margin"
        >{{$t('weapons.name.' +weapondata.category)}}</div>
      </div>
    </div>
    <div class="flex-row interval-y">
      <div class="flex1 flex-column color1 rounded">
        <div class="flex1 card-text text-bold">{{$t('trait')}}</div>
        <div class="flex1 margin">
          <div class="flex-row interval-y">
            <div
              class="flex1 flex-row flex-intense color2 rounded-left interval-x card-text flex-center"
            >
              <img :src="'images/icons/status/attack_up.png'" class="card-text-icon" />
              <div>{{$t('weapons.attack')}}</div>
            </div>
            <div
              class="flex2 color2 rounded-right interval-x card-text flex-center"
            >{{weapondata.attack}}</div>
          </div>
          <div class="flex-row interval-y" v-if="weapondata.huixin!=0">
            <div
              class="flex1 flex-row flex-intense color2 rounded-left interval-x card-text flex-center"
            >
              <img :src="'images/icons/status/critical_up.png'" class="card-text-icon" />
              <div>{{$t('weapons.critical')}}</div>
            </div>
            <div
              class="flex2 color2 rounded-right interval-x card-text flex-center"
            >{{weapondata.huixin + '%'}}</div>
          </div>
          <div class="flex-row interval-y" v-if="weapondata.defense!=0">
            <div
              class="flex1 flex-row flex-intense color2 rounded-left interval-x card-text flex-center"
            >
              <img :src="'images/icons/status/defense_up.png'" class="card-text-icon" />
              <div>{{$t('weapons.defense')}}</div>
            </div>
            <div
              class="flex2 color2 rounded-right interval-x card-text flex-center"
            >{{weapondata.defense}}</div>
          </div>
          <div class="flex-row interval-y" v-if="weapondata.fire!=0">
            <div
              class="flex1 flex-row flex-intense color2 rounded-left interval-x card-text flex-center"
            >
              <img :src="'images/icons/status/fire.png'" class="card-text-icon" />
              <div>{{$t('element.fire')}}</div>
            </div>
            <div
              class="flex2 color2 rounded-right interval-x card-text flex-center"
            >{{weapondata.fire}}</div>
          </div>
          <div class="flex-row interval-y" v-if="weapondata.water!=0">
            <div
              class="flex1 flex-row flex-intense color2 rounded-left interval-x card-text flex-center"
            >
              <img :src="'images/icons/status/water.png'" class="card-text-icon" />
              <div>{{$t('element.water')}}</div>
            </div>
            <div
              class="flex2 color2 rounded-right interval-x card-text flex-center"
            >{{weapondata.water}}</div>
          </div>
          <div class="flex-row interval-y" v-if="weapondata.thunder!=0">
            <div
              class="flex1 flex-row flex-intense color2 rounded-left interval-x card-text flex-center"
            >
              <img :src="'images/icons/status/thunder.png'" class="card-text-icon" />
              <div>{{$t('element.thunder')}}</div>
            </div>
            <div
              class="flex2 color2 rounded-right interval-x card-text flex-center"
            >{{weapondata.thunder}}</div>
          </div>
          <div class="flex-row interval-y" v-if="weapondata.ice!=0">
            <div
              class="flex1 flex-row flex-intense color2 rounded-left interval-x card-text flex-center"
            >
              <img :src="'images/icons/status/ice.png'" class="card-text-icon" />
              <div>{{$t('element.ice')}}</div>
            </div>
            <div
              class="flex2 color2 rounded-right interval-x card-text flex-center"
            >{{weapondata.ice}}</div>
          </div>
          <div class="flex-row interval-y" v-if="weapondata.dragon!=0">
            <div
              class="flex1 flex-row flex-intense color2 rounded-left interval-x card-text flex-center"
            >
              <img :src="'images/icons/status/dragon.png'" class="card-text-icon" />
              <div>{{$t('element.dragon')}}</div>
            </div>
            <div
              class="flex2 color2 rounded-right interval-x card-text flex-center"
            >{{weapondata.dragon}}</div>
          </div>
          <div class="flex-row interval-y" v-if="weapondata.poison!=0">
            <div
              class="flex1 flex-row flex-intense color2 rounded-left interval-x card-text flex-center"
            >
              <img :src="'images/icons/status/poison.png'" class="card-text-icon" />
              <div>{{$t('aliment.poison')}}</div>
            </div>
            <div
              class="flex2 color2 rounded-right interval-x card-text flex-center"
            >{{weapondata.poison}}</div>
          </div>
          <div class="flex-row interval-y" v-if="weapondata.sleep!=0">
            <div
              class="flex1 flex-row flex-intense color2 rounded-left interval-x card-text flex-center"
            >
              <img :src="'images/icons/status/sleep.png'" class="card-text-icon" />
              <div>{{$t('aliment.sleep')}}</div>
            </div>
            <div
              class="flex2 color2 rounded-right interval-x card-text flex-center"
            >{{weapondata.sleep}}</div>
          </div>
          <div class="flex-row interval-y" v-if="weapondata.paralyze!=0">
            <div
              class="flex1 flex-row flex-intense color2 rounded-left interval-x card-text flex-center"
            >
              <img :src="'images/icons/status/paralysis.png'" class="card-text-icon" />
              <div>{{$t('aliment.paralysis')}}</div>
            </div>
            <div
              class="flex2 color2 rounded-right interval-x card-text flex-center"
            >{{weapondata.paralyze}}</div>
          </div>
          <div class="flex-row interval-y" v-if="weapondata.blasting!=0">
            <div
              class="flex1 flex-row flex-intense color2 rounded-left interval-x card-text flex-center"
            >
              <img :src="'images/icons/status/blast.png'" class="card-text-icon" />
              <div>{{$t('aliment.blast')}}</div>
            </div>
            <div
              class="flex2 color2 rounded-right interval-x card-text flex-center"
            >{{weapondata.blasting}}</div>
          </div>
          <div class="flex-row interval-y">
            <div
              class="flex1 flex-row flex-intense color2 rounded-left interval-x card-text flex-center"
            >
              <!-- <img :src="'images/icons/status/blast.png'" class="card-text-icon" /> -->
              <div>{{$t('weapons.slot')}}</div>
            </div>
            <div class="flex2 color2 rounded-right interval-x card-text flex-center">
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
          </div>
          <div
            class="flex-row interval-y"
            v-if="weapondata.category==='charge_blade' || weapondata.category==='switch_axe'"
          >
            <div
              class="flex1 flex-row flex-intense color2 rounded-left interval-x card-text flex-center"
            >
              <img :src="'images/icons/equipments/phial_full.png'" class="card-text-icon" />
              <div>{{$t('weapons.phial')}}</div>
            </div>
            <div
              class="flex2 color2 rounded-right interval-x card-text flex-center"
            >{{weapondata.phial}}</div>
          </div>
          <div class="flex-row interval-y" v-if="weapondata.category==='gunlance'">
            <div
              class="flex1 flex-row flex-intense color2 rounded-left interval-x card-text flex-center"
            >
              <img :src="'images/icons/equipments/shelling.png'" class="card-text-icon" />
              <div>{{$t('weapons.shelling')}}</div>
            </div>
            <div
              class="flex2 color2 rounded-right interval-x card-text flex-center"
            >{{weapondata.shelling}}</div>
          </div>
          <div class="flex-row interval-y" v-if="weapondata.category==='insect_glaive'">
            <div
              class="flex1 flex-row flex-intense color2 rounded-left interval-x card-text flex-center"
            >
              <img :src="'images/weapons/icons/kinsect_blunt.png'" class="card-text-icon" />
              <div>{{$t('weapons.kinsect')}}</div>
            </div>
            <div
              class="flex2 color2 rounded-right interval-x card-text flex-center"
            >{{weapondata.kinsect}}</div>
          </div>
          <div
            class="flex-row interval-y"
            v-if="weapondata.category==='light_bowgun' || weapondata.category==='heavy_bowgun'"
          >
            <div
              class="flex1 flex-row flex-intense color2 rounded-left interval-x card-text flex-center"
            >
              <!-- <img :src="'images/icons/equipments/phial_full.png'" class="card-text-icon" /> -->
              <div>{{$t('weapons.offset')}}</div>
            </div>
            <div
              class="flex2 color2 rounded-right interval-x card-text flex-center"
            >{{weapondata.offset}}</div>
          </div>
          <div
            class="flex-row interval-y"
            v-if="weapondata.category==='light_bowgun' || weapondata.category==='heavy_bowgun'"
          >
            <div
              class="flex1 flex-row flex-intense color2 rounded-left interval-x card-text flex-center"
            >
              <!-- <img :src="'images/icons/equipments/phial_full.png'" class="card-text-icon" /> -->
              <div>{{$t('weapons.recoil')}}</div>
            </div>
            <div
              class="flex2 color2 rounded-right interval-x card-text flex-center"
            >{{weapondata.recoil}}</div>
          </div>
          <div
            class="flex-row interval-y"
            v-if="weapondata.category==='light_bowgun' || weapondata.category==='heavy_bowgun'"
          >
            <div
              class="flex1 flex-row flex-intense color2 rounded-left interval-x card-text flex-center"
            >
              <!-- <img :src="'images/icons/equipments/phial_full.png'" class="card-text-icon" /> -->
              <div>{{$t('weapons.reload')}}</div>
            </div>
            <div
              class="flex2 color2 rounded-right interval-x card-text flex-center"
            >{{weapondata.reload}}</div>
          </div>
          <div class="flex-row interval-y" v-if="weapondata.category==='bow' ">
            <div
              class="flex1 flex-row flex-intense color2 rounded-left interval-x card-text flex-center"
            >
              <!-- <img :src="'images/icons/equipments/phial_full.png'" class="card-text-icon" /> -->
              <div>{{$t('weapons.arc_shot')}}</div>
            </div>
            <div
              class="flex2 color2 rounded-right interval-x card-text flex-center"
            >{{weapondata.qushe}}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex-row interval-y" v-if="infoType === 'melee'">
      <div class="flex1 flex-column color1 rounded">
        <div class="flex1 rounded card-text text-bold">{{$t('weapons.sharpness')}}</div>
        <div class="flex1 margin">
          <div class="flex-row interval-y">
            <div
              class="flex1 flex-row flex-intense color2 rounded-left interval-x card-text flex-center"
            >
              <div>{{$t('weapons.sharpness_skill') + '0'}}</div>
            </div>
            <div class="flex2 color2 rounded-right interval-x card-text flex-center">
              <div class="flex sharpness-container">
                <div style="background-color:#BE3843;" :style="{'width': cuts0[0]*2 + 'px'}"></div>
                <div style="background-color:#D3673D;" :style="{'width': cuts0[1]*2 + 'px'}"></div>
                <div style="background-color:#C9B232;" :style="{'width': cuts0[2]*2 + 'px'}"></div>
                <div style="background-color:#81B034;" :style="{'width': cuts0[3]*2 + 'px'}"></div>
                <div style="background-color:#3A58D7;" :style="{'width': cuts0[4]*2 + 'px'}"></div>
                <div style="background-color:#E2E2E2;" :style="{'width': cuts0[5]*2 + 'px'}"></div>
                <div style="background-color:#885AEC;" :style="{'width': cuts0[6]*2 + 'px'}"></div>
              </div>
            </div>
          </div>
          <div class="flex-row interval-y">
            <div
              class="flex1 flex-row flex-intense color2 rounded-left interval-x card-text flex-center"
            >
              <div>{{$t('weapons.sharpness_skill') + '5'}}</div>
            </div>
            <div class="flex2 color2 rounded-right interval-x card-text flex-center">
              <div class="flex sharpness-container">
                <div style="background-color:#BE3843;" :style="{'width': cuts5[0]*2 + 'px'}"></div>
                <div style="background-color:#D3673D;" :style="{'width': cuts5[1]*2 + 'px'}"></div>
                <div style="background-color:#C9B232;" :style="{'width': cuts5[2]*2 + 'px'}"></div>
                <div style="background-color:#81B034;" :style="{'width': cuts5[3]*2 + 'px'}"></div>
                <div style="background-color:#3A58D7;" :style="{'width': cuts5[4]*2 + 'px'}"></div>
                <div style="background-color:#E2E2E2;" :style="{'width': cuts5[5]*2 + 'px'}"></div>
                <div style="background-color:#885AEC;" :style="{'width': cuts5[6]*2 + 'px'}"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex-row interval-y" v-if="weapondata.category==='bow' ">
      <div class="flex1 flex-column color1 rounded">
        <div class="flex1 rounded card-text text-bold">{{$t('weapons.charge_shot')}}</div>
        <div class="flex1 margin">
          <div class="flex-row interval-y" v-for="shot, i in charge_shot" :key="i">
            <div
              class="flex1 flex-row flex-intense color2 rounded-left interval-x card-text flex-center"
            >
              <div :class="{'text-grey':i==3}">{{'Lv' + (i+1)}}</div>
            </div>
            <div
              class="flex2 color2 rounded-right interval-x card-text flex-center"
              :class="{'text-grey':i==3}"
            >{{shot}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-row interval-y" v-if="weapondata.category==='bow' ">
      <div class="flex1 flex-column color1 rounded">
        <div class="flex1 rounded card-text text-bold">{{$t('weapons.coatings')}}</div>
        <div class="flex1 margin">
          <div
            class="flex-row interval-y color2 rounded flex-intense"
            v-for="value, type in coatings"
            :key="type"
          >
            <div class="flex flex-center">
              <img
                :src="'images/icons/equipments/' + type + (value ===2? '_plus':'') + '.png'"
                class="card-text-icon"
              />
            </div>
            <div class="flex flex-center" :class="{'text-lightgrey':value===0}">
              <div class="text-m">{{type + (value ===2? '+':'')}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 數據有 BUG -->
    <!-- <div
      class="flex-row interval-y"
      v-if="weapondata.category==='light_bowgun' || weapondata.category==='heavy_bowgun' "
    >
      <div class="flex1 flex-column color1 rounded">
        <div class="flex1 rounded card-text text-bold">{{$t('weapons.ammos')}}</div>
        <div class="flex1 margin color2 rounded">
          <table>
            <tbody>
              <tr>
                <td>通</td>
                <td v-for="count, i in weapondata.ammo.nrm" :key="i">{{count}}</td>
              </tr>
              <tr>
                <td>放</td>
                <td v-for="count, i in weapondata.ammo.prc" :key="i">{{count}}</td>
              </tr>
              <tr>
                <td>散</td>
                <td v-for="count, i in weapondata.ammo.spr" :key="i">{{count}}</td>
              </tr>
              <tr>
                <td>放</td>
                <td v-for="count, i in weapondata.ammo.shr" :key="i">{{count}}</td>
              </tr>
              <tr>
                <td>撤</td>
                <td v-for="count, i in weapondata.ammo.sti" :key="i">{{count}}</td>
              </tr>
              <tr>
                <td>擴</td>
                <td v-for="count, i in weapondata.ammo.clu" :key="i">{{count}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>-->
  </div>
</template>
<script>
module.exports = {
  data: function () {
    return {
      animUrl: {
        background: 'url(images/equip_weapons/' + this.weapondata.cn_id + '-r.png)'
      }
    };
  },
  props: ["weapondata"],
  mounted: function () {
  },
  computed: {
    infoType: function () {
      let type = "melee";
      if (this.weapondata.category === "bow")
        type = "bow";
      else if (this.weapondata.category === "light_bowgun" || this.weapondata.category === "heavy_bowgun")
        type = "bowgun";
      return type;
    },
    holes: function () {
      return this.weapondata.hole.split('-').map(function (item) {
        return parseInt(item, 10);
      });
    },
    cuts0: function () {
      return this.weapondata.cut0.split(",")
    },
    cuts5: function () {
      return this.weapondata.cut5.split(",")
    },
    charge_shot: function () {
      let shots = this.weapondata.xuli.split(',');
      if (this.weapondata.xuli_add != '')
        shots.push(this.weapondata.xuli_add);
      return shots;
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
        if (this.weapondata.coatings.indexOf(type) > -1) {
          coatings[type] = 1;
        } else if (this.weapondata.coatings_up.indexOf(type) > -1) {
          coatings[type] = 2;
        }
      }
      return coatings;
    }
  }
}
</script>
<style scoped>
.anim-container {
  width: 320px;
  height: 320px;
  animation-name: sprite;
  animation-duration: 3s;
  animation-timing-function: steps(30);
  animation-iteration-count: infinite;
}
@keyframes sprite {
  from {
    background-position-y: 0px;
  }
  to {
    background-position-y: -9600px;
  }
}
#icon {
  width: 80%;
  height: 80%;
}
.sharpness-container {
  background-color: rgb(63, 63, 63);
  padding: 1px;
  width: 176px;
  height: 8px;
}
/* mobile */
@media (max-width: 1199.98px) {
}

/* desktops */
@media (min-width: 1200px) {
}
</style>
