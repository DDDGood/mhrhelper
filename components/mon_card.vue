<template>
  <div class="card rounded flex-column">
    <div id="mon-card-title-row" class="flex-row interval-y">
      <div id="mon-card-icon-background" class="rounded interval-x flex-center">
        <img
          id="monicon"
          :src="IsNullOrEmpty(mondata.icon)? 'images/monsters/icons/icon_unknown.png':mondata.icon"
          alt="icon"
        />
      </div>
      <div id="nameblock" class="color2 flex2 flex-center rounded interval-x flex-column">
        <div class="text-large text-center text-bold">{{ mondata?.name[lang(0)] }}</div>
        <div class="flex-row flex-center">
          <div class="text-center text-small">{{mondata?.name[lang(1)] }}</div>
          <div class="text-center text-small">{{ mondata?.name[lang(2)] }}</div>
        </div>
      </div>
      <div class="color2 flex1 flex-center rounded interval-x">
        <div class="card-text text-bold">{{ $t('monster.species.'+mondata.species) }}</div>
      </div>
    </div>
    <div class="flex-row interval-y">
      <div class="flex1 color2 rounded">
        <img
          id="monimage"
          :src="IsNullOrEmpty(mondata.image)? 'images/monsters/icons/icon_unknown.png':mondata.image"
          alt="Image"
        />
      </div>
    </div>
    <div class="flex-row interval-y" v-if="mondata.hasOwnProperty('trait')">
      <div class="flex1 color1 rounded interval-x">
        <div class="card-text text-bold">{{$t('monster.trait.roar')}}</div>
        <div
          class="color2 rounded card-text margin"
        >{{ IsNullOrEmpty(mondata.trait.roar) ? "－" : mondata.trait.roar }}</div>
      </div>
      <div class="flex1 color1 rounded interval-x">
        <div class="card-text text-bold">{{$t('monster.trait.wind')}}</div>
        <div
          class="color2 rounded card-text margin"
        >{{ IsNullOrEmpty(mondata.trait.wind) ? "－" : mondata.trait.wind }}</div>
      </div>
      <div class="flex1 color1 rounded interval-x">
        <div class="card-text text-bold">{{$t('monster.trait.tremor')}}</div>
        <div
          class="color2 rounded card-text margin"
        >{{IsNullOrEmpty(mondata.trait.tremor) ? "－" : mondata.trait.tremor }}</div>
      </div>
    </div>
    <div class="flex-row interval-y" v-if="mondata.hasOwnProperty('trait')">
      <div class="flex1 color1 rounded interval-x">
        <div class="card-text text-bold">{{$t('monster.trait.element')}}</div>
        <div
          class="color2 rounded card-text margin"
        >{{IsNullOrEmpty(mondata.trait.element) ? "－" : mondata.trait.element }}</div>
      </div>
      <div class="flex1 color1 rounded interval-x">
        <div class="card-text text-bold">{{$t('monster.trait.aliment')}}</div>
        <div
          class="color2 rounded card-text margin"
        >{{IsNullOrEmpty(mondata.trait.aliment) ? "－" : mondata.trait.aliment }}</div>
      </div>
    </div>
    <div
      class="flex-row interval-y"
      v-if="mondata.hasOwnProperty('weakness') && mondata.weakness.weapon!==undefined"
    >
      <div class="flex1 color1 rounded">
        <div class="flex-row interval-y margin">
          <div class="flex1 card-text text-bold">{{$t('monster.part')}}</div>
          <div class="flex1 flex-center">
            <img class="card-text-icon" src="images/icons/equipments/greatsword.png" />
            <div class="card-text text-bold">{{$t('monster.weakness.cut')}}</div>
          </div>
          <div class="flex1 flex-center">
            <img class="card-text-icon" src="images/icons/equipments/hammer.png" />
            <div class="card-text text-bold">{{$t('monster.weakness.blunt')}}</div>
          </div>
          <div class="flex1 flex-center">
            <img class="card-text-icon" src="images/icons/maps/ammo_normal.png" />
            <div class="card-text text-bold">{{$t('monster.weakness.ammo')}}</div>
          </div>
        </div>
        <div
          class="flex-row color2 interval-y margin rounded"
          v-for="weakPart of mondata.weakness.weapon"
          :key="weakPart.part"
        >
          <div class="flex1 card-text text-bold">{{ weakPart.part }}</div>
          <div class="flex1 card-text text-bold">{{ ParseStars(weakPart.cut) }}</div>
          <div class="flex1 card-text text-bold">{{ ParseStars(weakPart.blunt) }}</div>
          <div class="flex1 card-text text-bold">{{ ParseStars(weakPart.ammo) }}</div>
        </div>
      </div>
    </div>
    <div class="flex-row interval-y" v-if="weakdata.element!== undefined">
      <div class="flex1 color1 rounded" style="position: relative">
        <div class="card-text text-bold">{{$t('monster.weakness.element')}}</div>
        <div class="card-text text-small special-align-right">{{ weakdata.element.condition }}</div>
        <div class="flex-row margin">
          <div class="flex1 color2 card-text interval-x rounded">
            <div class="flex-center">
              <img :class="weaknessIconClass" src="images/icons/element/element_fire.png" />
              <div :class="weaknessTextClass">{{$t('element.fire')}}</div>
            </div>
            <div class="card-text" v-html="weakdata.element.values?.fire"></div>
          </div>
          <div class="flex1 color2 card-text interval-x rounded">
            <div class="flex-center">
              <img :class="weaknessIconClass" src="images/icons/element/element_water.png" />
              <div :class="weaknessTextClass">{{$t('element.water')}}</div>
            </div>
            <div class="card-text" v-html="weakdata.element.values?.water"></div>
          </div>
          <div class="flex1 color2 card-text interval-x rounded">
            <div class="flex-center">
              <img :class="weaknessIconClass" src="images/icons/element/element_thunder.png" />
              <div :class="weaknessTextClass">{{$t('element.thunder')}}</div>
            </div>
            <div class="card-text" v-html="weakdata.element.values?.thunder"></div>
          </div>
          <div class="flex1 color2 card-text interval-x rounded">
            <div class="flex-center">
              <img :class="weaknessIconClass" src="images/icons/element/element_ice.png" />
              <div :class="weaknessTextClass">{{$t('element.ice')}}</div>
            </div>
            <div class="card-text" v-html="weakdata.element.values?.ice"></div>
          </div>
          <div class="flex1 color2 card-text interval-x rounded">
            <div class="flex-center">
              <img :class="weaknessIconClass" src="images/icons/element/element_dragon.png" />
              <div :class="weaknessTextClass">{{$t('element.dragon')}}</div>
            </div>
            <div class="card-text" v-html="weakdata.element.values?.dragon"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-row interval-y" v-if="weakdata.aliment!== undefined">
      <div class="flex1 color1 rounded" style="position: relative">
        <div class="card-text text-bold">{{$t('monster.weakness.aliment')}}</div>
        <div class="card-text text-small special-align-right">{{ weakdata.aliment.condition }}</div>
        <div class="flex-row margin">
          <div class="flex1 color2 card-text interval-x rounded">
            <div class="flex-center">
              <img :class="weaknessIconClass" src="images/icons/state/state_poison.png" />
              <div :class="weaknessTextClass">{{$t('aliment.poison')}}</div>
            </div>
            <div class="card-text" v-html="weakdata.aliment.values?.poison"></div>
          </div>
          <div class="flex1 color2 card-text interval-x rounded">
            <div class="flex-center">
              <img :class="weaknessIconClass" src="images/icons/state/state_sleep.png" />
              <div :class="weaknessTextClass">{{$t('aliment.sleep')}}</div>
            </div>
            <div class="card-text" v-html="weakdata.aliment.values?.sleep"></div>
          </div>
          <div class="flex1 color2 card-text interval-x rounded">
            <div class="flex-center">
              <img :class="weaknessIconClass" src="images/icons/state/state_paralysis.png" />
              <div :class="weaknessTextClass">{{$t('aliment.paralysis')}}</div>
            </div>
            <div class="card-text" v-html="weakdata.aliment.values?.paralysis"></div>
          </div>
          <div class="flex1 color2 card-text interval-x rounded">
            <div class="flex-center">
              <img :class="weaknessIconClass" src="images/icons/state/state_blast.png" />
              <div :class="weaknessTextClass">{{$t('aliment.blast')}}</div>
            </div>
            <div class="card-text" v-html="weakdata.aliment.values?.blast"></div>
          </div>
          <div class="flex1 color2 card-text interval-x rounded">
            <div class="flex-center">
              <img :class="weaknessIconClass" src="images/icons/state/state_stun.png" />
              <div :class="weaknessTextClass">{{$t('aliment.stun')}}</div>
            </div>
            <div class="card-text" v-html="weakdata.aliment.values?.stun"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-row interval-y" v-if="weakdata.item!== undefined">
      <div class="flex1 color1 rounded" style="position: relative">
        <div class="card-text text-bold">{{$t('monster.weakness.item')}}</div>
        <div class="card-text text-small special-align-right">{{ weakdata.item.condition }}</div>
        <div class="flex-row margin">
          <div class="flex1 color2 card-text interval-x rounded">
            <div class="flex-center">
              <img :class="weaknessIconClass" src="images/icons/items/落穴.png" />
              <div :class="weaknessTextClass">{{$t('monster.weakness.items.pitfalltrap')}}</div>
            </div>
            <div class="card-text" v-html="weakdata.item.values?.pitfalltrap"></div>
          </div>
          <div class="flex1 color2 card-text interval-x rounded">
            <div class="flex-center">
              <img :class="weaknessIconClass" src="images/icons/items/麻痺陷阱.png" />
              <div :class="weaknessTextClass">{{$t('monster.weakness.items.shocktrap')}}</div>
            </div>
            <div class="card-text" v-html="weakdata.item.values?.shocktrap"></div>
          </div>
          <div class="flex1 color2 card-text interval-x rounded">
            <div class="flex-center">
              <img :class="weaknessIconClass" src="images/icons/items/閃光彈.png" />
              <div :class="weaknessTextClass">{{$t('monster.weakness.items.flashpod')}}</div>
            </div>
            <div class="card-text" v-html="weakdata.item.values?.flashpod"></div>
          </div>
          <div class="flex1 color2 card-text interval-x rounded">
            <div class="flex-center">
              <img :class="weaknessIconClass" src="images/icons/items/音爆彈.png" />
              <div :class="weaknessTextClass">{{$t('monster.weakness.items.screamerpod')}}</div>
            </div>
            <div class="card-text" v-html="weakdata.item.values?.screamerpod"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
module.exports = {
  data: function () {
    return {
      preferedLang: ["jp", "en", "tw"],
      weaknessTextClass: {
        "card-text": true,
        "hide": !(this.$i18n.locale === "tw" || window.innerWidth > 400)
      },
      weaknessIconClass: {
        "card-text-icon": this.$i18n.locale === "tw" || window.innerWidth > 400,
        "card-text-icon-large": !(this.$i18n.locale === "tw" || window.innerWidth > 400)
      }
    };
  },
  created: function () {
    // console.log("created")
  },
  mounted: function () {
    // console.log("mounted")
  },
  computed: {
    weakdata: function () {
      // console.log("compute weakdata")
      let weakness = {
        weapon: [], element: {}, aliment: {}, item: {}
      }
      for (let weakType in this.mondata.weakness) {
        if (weakType === "weapon") {
          weakness.weapon = [];
          for (let weakPart of this.mondata.weakness.weapon) {
            weakness.weapon.push({
              part: weakPart.part,
              cut: ParseStars(weakPart.cut),
              blunt: ParseStars(weakPart.blunt),
              ammo: ParseStars(weakPart.ammo),
            });
          }
          continue;
        }
        let weakData = this.mondata.weakness[weakType];
        let specialCase = false;
        let conditionText = "";
        let values = {};
        for (let weakState of weakData) {
          if (weakState.condition === "normal") {
            for (let dataKey in weakState) {
              if (dataKey == "condition") continue;
              values[dataKey] = ParseStars(weakState[dataKey]);
            }
          } else {
            if (specialCase === false) {
              specialCase = true;
              conditionText += weakState.condition;
            } else {
              conditionText += "、" + weakState.condition;
            }
            for (let dataKey in weakState) {
              values[dataKey] += "<br>(" + ParseStars(weakState[dataKey]) + ")";
            }
          }
        }
        weakness[weakType] = {
          condition: specialCase ? "(" + conditionText + ")" : "",
          values: values,
        };
      }
      return weakness;
    }
  },
  methods: {
    lang: function (index) {
      if (index < 1 || index >= this.preferedLang.length)
        return i18n.locale;
      const array = this.preferedLang.filter(function (item) {
        return item !== i18n.locale;
      });
      return array[index - 1];
    }
  },
  props: ["mondata"],
  watch: {
    mondata: {
      deep: true,
      handler: function (oldVal, newVal) {
        // console.log(oldVal);
        // console.log("mondata changed");
        // console.log(newVal);
      },
    },
  },
};
</script>

<style scoped>
#monicon {
  width: 100%;
  height: 100%;
}
#monimage {
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5%;
  margin-bottom: 5%;
  max-width: 80%;
  max-height: 30vh;
}
</style>