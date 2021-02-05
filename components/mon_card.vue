<template>
  <div class="card rounded flex-column">
    <div id="mon-card-title-row" class="flex-row interval-y">
      <div id="mon-card-icon-background" class="rounded interval-x flex-center">
        <img id="monicon" v-bind:src="carddata.icon" alt="icon" />
      </div>
      <div id="nameblock" class="color2 flex2 flex-center rounded interval-x flex-column">
        <div id="title" class="text-large text-center text-bold">{{ carddata.name1 }}</div>
        <div class="flex-row flex-center">
          <div id="namejp" class="text-center text-small">{{ carddata.name2 }}</div>
          <div id="nameen" class="text-center text-small">{{ carddata.name3 }}</div>
        </div>
      </div>
      <div class="color2 flex1 flex-center rounded interval-x">
        <div class="card-text text-bold">{{ carddata.species }}</div>
      </div>
    </div>
    <div class="flex-row interval-y">
      <div class="flex1 color2 rounded">
        <img id="monimage" v-bind:src="carddata.image" alt="Image" />
      </div>
    </div>
    <div class="flex-row interval-y">
      <div class="flex1 color1 rounded interval-x">
        <div class="card-text text-bold">咆嘯</div>
        <div id="roar" class="color2 rounded card-text margin">{{ GetTraitData("roar") }}</div>
      </div>
      <div class="flex1 color1 rounded interval-x">
        <div class="card-text text-bold">風壓</div>
        <div id="wind" class="color2 rounded card-text margin">{{ GetTraitData("wind") }}</div>
      </div>
      <div class="flex1 color1 rounded interval-x">
        <div class="card-text text-bold">震動</div>
        <div id="tremer" class="color2 rounded card-text margin">{{ GetTraitData("tremer") }}</div>
      </div>
    </div>
    <div class="flex-row interval-y">
      <div class="flex1 color1 rounded interval-x">
        <div class="card-text text-bold">主要屬性</div>
        <div id="element" class="color2 rounded card-text margin">{{ GetTraitData("element") }}</div>
      </div>
      <div class="flex1 color1 rounded interval-x">
        <div class="card-text text-bold">異常狀態</div>
        <div id="aliment" class="color2 rounded card-text margin">{{ GetTraitData("aliment") }}</div>
      </div>
    </div>
    <div class="flex-row interval-y">
      <div class="flex1 color1 rounded">
        <div class="flex-row interval-y margin">
          <div class="flex1 card-text text-bold">部位</div>
          <div class="flex1 card-text text-bold">斬</div>
          <div class="flex1 card-text text-bold">打</div>
          <div class="flex1 card-text text-bold">彈</div>
        </div>
        <div
          class="flex-row color2 interval-y margin rounded"
          v-for="weakPart of carddata.weakness.weapon"
          :key="weakPart.part"
        >
          <div class="flex1 card-text text-bold">{{ weakPart.part }}</div>
          <div class="flex1 card-text text-bold">{{ weakPart.cut }}</div>
          <div class="flex1 card-text text-bold">{{ weakPart.blunt }}</div>
          <div class="flex1 card-text text-bold">{{ weakPart.ammo }}</div>
        </div>
      </div>
    </div>
    <div class="flex-row interval-y">
      <div class="flex1 color1 rounded" style="position: relative">
        <div class="card-text text-bold">屬性弱點</div>
        <div class="card-text text-small special-align-right">{{ GetWeaknessCondition("element") }}</div>
        <div class="flex-row margin">
          <div class="flex1 color2 card-text interval-x rounded">
            <div class="flex-center">
              <img class="card-text-icon" src="images/icons/element/element_fire.png" />
              <i class="fas fa-star"></i>
              <div>火</div>
            </div>
            <div class="card-text" v-html="GetWeaknessData('element', 'fire')"></div>
          </div>
          <div class="flex1 color2 card-text interval-x rounded">
            <div class="flex-center">
              <img class="card-text-icon" src="images/icons/element/element_water.png" />
              <div>水</div>
            </div>
            <div class="card-text" v-html="GetWeaknessData('element', 'water')"></div>
          </div>
          <div class="flex1 color2 card-text interval-x rounded">
            <div class="flex-center">
              <img class="card-text-icon" src="images/icons/element/element_thunder.png" />
              <div>雷</div>
            </div>
            <div class="card-text" v-html="GetWeaknessData('element', 'thunder')"></div>
          </div>
          <div class="flex1 color2 card-text interval-x rounded">
            <div class="flex-center">
              <img class="card-text-icon" src="images/icons/element/element_ice.png" />
              <div>冰</div>
            </div>
            <div class="card-text" v-html="GetWeaknessData('element', 'ice')"></div>
          </div>
          <div class="flex1 color2 card-text interval-x rounded">
            <div class="flex-center">
              <img class="card-text-icon" src="images/icons/element/element_dragon.png" />
              <div>龍</div>
            </div>
            <div class="card-text" v-html="GetWeaknessData('element', 'dragon')"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-row interval-y">
      <div class="flex1 color1 rounded" style="position: relative">
        <div class="card-text text-bold">異常弱點</div>
        <div class="card-text text-small special-align-right">{{ GetWeaknessCondition("aliment") }}</div>
        <div class="flex-row margin">
          <div class="flex1 color2 card-text interval-x rounded">
            <div class="flex-center">
              <img class="card-text-icon" src="images/icons/state/state_poison.png" />
              <div>中毒</div>
            </div>
            <div class="card-text" v-html="GetWeaknessData('aliment', 'poison')"></div>
          </div>
          <div class="flex1 color2 card-text interval-x rounded">
            <div class="flex-center">
              <img class="card-text-icon" src="images/icons/state/state_sleep.png" />
              <div>睡眠</div>
            </div>
            <div class="card-text" v-html="GetWeaknessData('aliment', 'sleep')"></div>
          </div>
          <div class="flex1 color2 card-text interval-x rounded">
            <div class="flex-center">
              <img class="card-text-icon" src="images/icons/state/state_paralysis.png" />
              <div>麻痺</div>
            </div>
            <div class="card-text" v-html="GetWeaknessData('aliment', 'paralysis')"></div>
          </div>
          <div class="flex1 color2 card-text interval-x rounded">
            <div class="flex-center">
              <img class="card-text-icon" src="images/icons/state/state_blast.png" />
              <div>爆破</div>
            </div>
            <div class="card-text" v-html="GetWeaknessData('aliment', 'blast')"></div>
          </div>
          <div class="flex1 color2 card-text interval-x rounded">
            <div class="flex-center">
              <img class="card-text-icon" src="images/icons/state/state_stun.png" />
              <div>昏厥</div>
            </div>
            <div class="card-text" v-html="GetWeaknessData('aliment', 'stun')"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-row interval-y">
      <div class="flex1 color1 rounded" style="position: relative">
        <div class="card-text text-bold">道具效果</div>
        <div class="card-text text-small special-align-right">{{ GetWeaknessCondition("item") }}</div>
        <div class="flex-row margin">
          <div class="flex1 color2 card-text interval-x rounded">
            <div class="flex-center">
              <img class="card-text-icon" src="images/icons/items/落穴.png" />
              <div>落穴</div>
            </div>
            <div class="card-text" v-html="GetWeaknessData('item', 'pitfalltrap')"></div>
          </div>
          <div class="flex1 color2 card-text interval-x rounded">
            <div class="flex-center">
              <img class="card-text-icon" src="images/icons/items/麻痺陷阱.png" />
              <div>麻痺</div>
            </div>
            <div class="card-text" v-html="GetWeaknessData('item', 'shocktrap')"></div>
          </div>
          <div class="flex1 color2 card-text interval-x rounded">
            <div class="flex-center">
              <img class="card-text-icon" src="images/icons/items/閃光彈.png" />
              <div>閃光</div>
            </div>
            <div class="card-text" v-html="GetWeaknessData('item', 'flashpod')"></div>
          </div>
          <div class="flex1 color2 card-text interval-x rounded">
            <div class="flex-center">
              <img class="card-text-icon" src="images/icons/items/音爆彈.png" />
              <div>音爆</div>
            </div>
            <div class="card-text" v-html="GetWeaknessData('item', 'screamerpod')"></div>
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
      carddata: {}
    }
  },
  created: function () {
    this.carddata = this.GetCardData();
  },
  methods: {
    GetCardData: function () {
      // console.log("trygetcard from ");
      // console.log(this.mondata);
      let cardData = {
        name1: "",
        icon: "",
        image: "",
        trait: {},
        weakness: { weapon: {}, element: {}, aliment: {} },
      };
      if (this.mondata == undefined) return this.cardData;
      cardData.name1 = this.mondata.nameTW;
      cardData.name2 = this.mondata.nameJP;
      cardData.name3 = this.mondata.nameEN;
      cardData.species = this.mondata.species;
      if (IsNullOrEmpty(this.mondata.icon))
        cardData.icon = "images/icons/monsters/icon_unknown.png";
      else cardData.icon = this.mondata.icon;
      if (IsNullOrEmpty(this.mondata.image))
        cardData.images = "images/icons/monsters/icon_unknown.png";
      else cardData.image = this.mondata.image;
      if (!this.mondata.hasOwnProperty("trait"))
        cardData.trait = {
          roar: "－",
          wind: "－",
          tremer: "－",
          element: "－",
          aliment: "－",
        };
      else cardData.trait = JSON.parse(JSON.stringify(this.mondata.trait));
      for (let weakType in this.mondata.weakness) {
        if (weakType === "weapon") {
          cardData.weakness.weapon = [];
          for (let weakPart of this.mondata.weakness.weapon) {
            cardData.weakness.weapon.push({
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
          // console.log("-" + weakState);
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
        cardData.weakness[weakType] = {
          condition: specialCase ? "(" + conditionText + ")" : "",
          values: values,
        };
      }
      return cardData;
    },
    GetTraitData: function (key) {
      if (
        this.carddata.hasOwnProperty("trait") &&
        this.carddata.trait.hasOwnProperty(key)
      ) {
        return this.carddata.trait[key] == ("" || undefined)
          ? "－"
          : this.carddata.trait[key];
      } else return "－";
    },
    GetWeaknessData(type, index) {
      try {
        return this.carddata.weakness[type].values[index];
      } catch {
        console.log("failed");
        return "－";
      }
    },
    GetWeaknessCondition(type) {
      try {
        return this.carddata.weakness[type].condition;
      } catch {
        console.log("failed");
        return "";
      }
    },
  },
  props: ["mondata"],
  watch: {
    mondata: function () {
      console.log("mondata changed");
    }
  }
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