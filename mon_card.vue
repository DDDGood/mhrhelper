<template>
  <div id="panel-basicinfo">
    <div id="panel-row-title" class="panel-row margin">
      <div id="panel-block-monicon">
        <img id="monicon" v-bind:src="mondata.icon" alt="icon" />
      </div>
      <div
        id="nameblock"
        class="panel-block-1"
        style="
          flex: 2;
          display: flex;
          flex-direction: column;
          align-items: stretch;
          justify-content: center;
        "
      >
        <div id="title" class="panel-text-title">{{ mondata.name1 }}</div>
        <div class="panel-row" style="display: flex; align-items: center">
          <div id="namejp" class="text-center panel-text-small" style="flex: 1">
            {{ mondata.name2 }}
          </div>
          <div id="nameen" class="text-center panel-text-small" style="flex: 1">
            {{ mondata.name3 }}
          </div>
        </div>
      </div>
      <div
        class="panel-block-1"
        style="display: flex; align-items: center; justify-content: center"
      >
        <div id="spacies" class="panel-text-bold">{{ mondata.spacies }}</div>
      </div>
    </div>
    <div class="panel-row margin">
      <div class="panel-block-1">
        <img id="monimage" v-bind:src="mondata.image" alt="Image" />
      </div>
    </div>
    <div class="panel-row margin">
      <div class="panel-block-2">
        <div class="panel-text-bold">咆嘯</div>
        <div id="roar" class="panel-block-1 panel-text margin">
          {{ mondata.trait.roar }}
        </div>
      </div>
      <div class="panel-block-2">
        <div class="panel-text-bold">風壓</div>
        <div id="wind" class="panel-block-1 panel-text margin">
          {{ mondata.trait.wind }}
        </div>
      </div>
      <div class="panel-block-2">
        <div class="panel-text-bold">震動</div>
        <div id="tremer" class="panel-block-1 panel-text margin">
          {{ mondata.trait.tremer }}
        </div>
      </div>
    </div>
    <div class="panel-row margin">
      <div class="panel-block-2">
        <div class="panel-text-bold">主要屬性</div>
        <div id="element" class="panel-block-1 panel-text margin">
          {{ mondata.trait.element }}
        </div>
      </div>
      <div class="panel-block-2">
        <div class="panel-text-bold">異常狀態</div>
        <div id="aliment" class="panel-block-1 panel-text margin">
          {{ mondata.trait.aliment }}
        </div>
      </div>
    </div>
    <div class="panel-row margin">
      <div id="weakness-weapon" class="panel-block-2">
        <div class="panel-row panel-block margin">
          <div class="panel-block panel-text-bold">部位</div>
          <div class="panel-block panel-text-bold">斬</div>
          <div class="panel-block panel-text-bold">打</div>
          <div class="panel-block panel-text-bold">彈</div>
        </div>
        <div
          class="panel-row panel-block-1 margin"
          v-for="weakPart of mondata.weakness.weapon"
          :key="weakPart.part"
        >
          <div class="panel-block panel-text">{{ weakPart.part }}</div>
          <div class="panel-block panel-text">{{ weakPart.cut }}</div>
          <div class="panel-block panel-text">{{ weakPart.blunt }}</div>
          <div class="panel-block panel-text">{{ weakPart.ammo }}</div>
        </div>
      </div>
    </div>
    <div id="weakness-element" class="panel-row margin">
      <div class="panel-block-2 panel-text-bold" style="position: relative">
        屬性弱點
        <div id="weakness-element-special" class="panel-text-special">
          {{ GetWeaknessCondition("element") }}
        </div>
        <div class="panel-row panel-block-2">
          <div class="panel-block-1 panel-text margin">
            <div
              class="panel-row"
              style="align-items: center; justify-content: center"
            >
              <img
                class="panel-text-icon"
                src="images/icons/element/element_fire.png"
              />
              <div>火</div>
            </div>
            <div
              id="weakness-element-fire"
              class="panel-text"
              v-html="GetWeaknessData('element', 'fire')"
            ></div>
          </div>
          <div class="panel-block-1 panel-text margin">
            <div
              class="panel-row"
              style="align-items: center; justify-content: center"
            >
              <img
                class="panel-text-icon"
                src="images/icons/element/element_water.png"
              />
              <div>水</div>
            </div>
            <div
              id="weakness-element-water"
              class="panel-text"
              v-html="GetWeaknessData('element', 'water')"
            ></div>
          </div>
          <div class="panel-block-1 panel-text margin">
            <div
              class="panel-row"
              style="align-items: center; justify-content: center"
            >
              <img
                class="panel-text-icon"
                src="images/icons/element/element_thunder.png"
              />
              <div>雷</div>
            </div>
            <div
              id="weakness-element-thunder"
              class="panel-text"
              v-html="GetWeaknessData('element', 'thunder')"
            ></div>
          </div>
          <div class="panel-block-1 panel-text margin">
            <div
              class="panel-row"
              style="align-items: center; justify-content: center"
            >
              <img
                class="panel-text-icon"
                src="images/icons/element/element_ice.png"
              />
              <div>冰</div>
            </div>
            <div
              id="weakness-element-ice"
              class="panel-text"
              v-html="GetWeaknessData('element', 'ice')"
            ></div>
          </div>
          <div class="panel-block-1 panel-text margin">
            <div
              class="panel-row"
              style="align-items: center; justify-content: center"
            >
              <img
                class="panel-text-icon"
                src="images/icons/element/element_dragon.png"
              />
              <div>龍</div>
            </div>
            <div
              id="weakness-element-dragon"
              class="panel-text"
              v-html="GetWeaknessData('element', 'dragon')"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <div id="weakness-aliment" class="panel-row margin">
      <div class="panel-block-2 panel-text-bold" style="position: relative">
        異常弱點
        <div id="weakness-aliment-special" class="panel-text-special">
          {{ GetWeaknessCondition("aliment") }}
        </div>
        <div class="panel-row panel-block-2">
          <div class="panel-block-1 panel-text margin">
            <div
              class="panel-row"
              style="align-items: center; justify-content: center"
            >
              <img
                class="panel-text-icon"
                src="images/icons/state/state_poison.png"
              />
              <div>中毒</div>
            </div>
            <div
              id="weakness-aliment-poison"
              class="panel-text"
              v-html="GetWeaknessData('aliment', 'poison')"
            ></div>
          </div>
          <div class="panel-block-1 panel-text margin">
            <div
              class="panel-row"
              style="align-items: center; justify-content: center"
            >
              <img
                class="panel-text-icon"
                src="images/icons/state/state_sleep.png"
              />
              <div>睡眠</div>
            </div>
            <div
              id="weakness-aliment-sleep"
              class="panel-text"
              v-html="GetWeaknessData('aliment', 'sleep')"
            ></div>
          </div>
          <div class="panel-block-1 panel-text margin">
            <div
              class="panel-row"
              style="align-items: center; justify-content: center"
            >
              <img
                class="panel-text-icon"
                src="images/icons/state/state_paralysis.png"
              />
              <div>麻痺</div>
            </div>
            <div
              id="weakness-aliment-paralysis"
              class="panel-text"
              v-html="GetWeaknessData('aliment', 'paralysis')"
            ></div>
          </div>
          <div class="panel-block-1 panel-text margin">
            <div
              class="panel-row"
              style="align-items: center; justify-content: center"
            >
              <img
                class="panel-text-icon"
                src="images/icons/state/state_blast.png"
              />
              <div>爆破</div>
            </div>
            <div
              id="weakness-aliment-blast"
              class="panel-text"
              v-html="GetWeaknessData('aliment', 'blast')"
            ></div>
          </div>
          <div class="panel-block-1 panel-text margin">
            <div
              class="panel-row"
              style="align-items: center; justify-content: center"
            >
              <img
                class="panel-text-icon"
                src="images/icons/state/state_stun.png"
              />
              <div>昏厥</div>
            </div>
            <div
              id="weakness-aliment-stun"
              class="panel-text"
              v-html="GetWeaknessData('aliment', 'stun')"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <div id="weakness-item" class="panel-row margin">
      <div class="panel-block-2 panel-text-bold" style="position: relative">
        道具效果
        <div id="weakness-item-special" class="panel-text-special">
          {{ GetWeaknessCondition("item") }}
        </div>
        <div class="panel-row panel-block-2">
          <div class="panel-block-1 panel-text margin">
            <div
              class="panel-row"
              style="align-items: center; justify-content: center"
            >
              <img class="panel-text-icon" src="images/icons/items/落穴.png" />
              <div>落穴</div>
            </div>
            <div
              id="weakness-item-pitfalltrap"
              class="panel-text"
              v-html="GetWeaknessData('item', 'pitfalltrap')"
            ></div>
          </div>
          <div class="panel-block-1 panel-text margin">
            <div
              class="panel-row"
              style="align-items: center; justify-content: center"
            >
              <img
                class="panel-text-icon"
                src="images/icons/items/麻痺陷阱.png"
              />
              <div>麻痺</div>
            </div>
            <div
              id="weakness-item-shocktrap"
              class="panel-text"
              v-html="GetWeaknessData('item', 'shocktrap')"
            ></div>
          </div>
          <div class="panel-block-1 panel-text margin">
            <div
              class="panel-row"
              style="align-items: center; justify-content: center"
            >
              <img
                class="panel-text-icon"
                src="images/icons/items/閃光彈.png"
              />
              <div>閃光</div>
            </div>
            <div
              id="weakness-item-flashpod"
              class="panel-text"
              v-html="GetWeaknessData('item', 'flashpod')"
            ></div>
          </div>
          <div class="panel-block-1 panel-text margin">
            <div
              class="panel-row"
              style="align-items: center; justify-content: center"
            >
              <img
                class="panel-text-icon"
                src="images/icons/items/音爆彈.png"
              />
              <div>音爆</div>
            </div>
            <div
              id="weakness-item-screamerpod"
              class="panel-text"
              v-html="GetWeaknessData('item', 'screamerpod')"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
module.exports = {
  methods: {
    GetWeaknessData(type, index) {
      try {
        return this.mondata.weakness[type].values[index];
      } catch {
        console.log("failed");
        return "－";
      }
    },
    GetWeaknessCondition(type) {
      try {
        return this.mondata.weakness[type].condition;
      } catch {
        console.log("failed");
        return "";
      }
    },
  },
  props: ["mondata"],
};
</script>