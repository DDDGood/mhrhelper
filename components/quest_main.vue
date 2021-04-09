<template>
  <div class="layout-main">
    <div class="layout-grid">
      <div class="layout-grid-right">
        <card :questdata="questdata"></card>
      </div>
      <div class="layout-grid-main">
        <details open>
          <summary class="header2">{{$t('description')}}</summary>
          <span id="description" v-html="ParseDescriptionText(questdata.description)"></span>
        </details>

        <details open v-if="questdata.monsters!= undefined">
          <summary class="header2">{{$t('quest.monsters')}}</summary>
          <div class="description-text">{{$t('quest.click_hint')}}</div>
          <div class="flex-column interval-y-large">
            <router-link
              v-for="(spawndata, id) in questdata.monsters"
              v-bind:key="id"
              v-bind:to="'/mon/' + spawndata.monster"
              custom
              v-slot="{ navigate }"
            >
              <div
                @click="navigate"
                class="flex1 flex-row monster-link card rounded interval-y-large"
              >
                <div class="flex1 flex-column interval-x">
                  <div class="flex-row interval-y">
                    <div class="mon-icon rounded interval-x flex-center">
                      <img
                        class="mon-icon-img"
                        :src="IsNullOrEmpty(GetMonData(spawndata.monster).icon)? 'images/monsters/icons/icon_unknown.png':GetMonData(spawndata.monster).icon"
                        alt="icon"
                      />
                    </div>
                    <div class="flex2 color2 rounded flex-center interval-x">
                      <div class="card-text text-bold">{{ $t('monster.name.' + spawndata.monster) }}</div>
                    </div>
                    <div class="flex1 color2 rounded interval-x flex-center">
                      <div class="card-text">{{ "HP: " + spawndata.hp }}</div>
                    </div>
                  </div>
                  <div class="flex-column color1 rounded interval-y">
                    <div class="card-text text-bold interval-y">{{$t('quest.spawn.mult')}}</div>
                    <div class="color2 rounded interval-y margin">
                      <div class="flex-row">
                        <div
                          class="card-text flex1"
                        >{{ $t('quest.spawn.attack') + ": " + spawndata.attack }}</div>
                        <div
                          class="card-text flex1"
                        >{{ $t('quest.spawn.parts') + ": " + spawndata.parts }}</div>
                        <div
                          class="card-text flex1"
                        >{{ $t('quest.spawn.defense') + ": " + spawndata.defense }}</div>
                        <div class="card-text flex1"></div>
                      </div>
                      <div class="flex-row">
                        <div
                          class="card-text flex1"
                        >{{ $t('quest.spawn.aliment') + ": " + spawndata.aliment }}</div>
                        <div
                          class="card-text flex1"
                        >{{ $t('quest.spawn.stun') + ": " + spawndata.stun }}</div>
                        <div
                          class="card-text flex1"
                        >{{ $t('quest.spawn.stamina') + ": " + spawndata.stamina }}</div>
                        <div
                          class="card-text flex1"
                        >{{ $t('quest.spawn.mount') + ": " + spawndata.mount }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </router-link>
            <router-view></router-view>
          </div>
        </details>
        <details open v-if="questdata.items!= undefined">
          <summary class="header2">{{$t('quest.items')}}</summary>
          <div class="flex-column card rounded">
            <router-link
              v-for="(reward, id) in questdata.items"
              v-bind:key="id"
              v-bind:to="'/item/' + reward.item"
              custom
              v-slot="{ navigate }"
            >
              <div @click="navigate" class="flex1 flex-row monster-link interval-y">
                <div class="mon-icon interval-x flex-center">
                  <img
                    class="mon-icon-img"
                    :src="IsNullOrEmpty(GetItemData(reward.item).image)? 'images/monsters/icons/icon_unknown.png':GetItemData(reward.item).image"
                    alt="icon"
                  />
                </div>
                <div class="flex3 color2 flex-center interval-x">
                  <div
                    class="card-text"
                  >{{ $t('data.items.' + reward.item + '.name') + " x"+ reward.num}}</div>
                </div>
                <div class="flex1 color2 interval-x flex-center">
                  <div class="card-text">{{ reward.rate + "%" }}</div>
                </div>
              </div>
            </router-link>
            <router-view></router-view>
          </div>
        </details>
      </div>
    </div>
  </div>
</template>
<script>
module.exports = {

  props: ["quests"],
  computed: {
    questdata: function () {
      return this.quests[this.$route.params.name];
    }
  },
  methods: {
    GetMonData: function (id) {
      return GetData('large_monsters')[id]
    },
    GetItemData: function (id) {
      return GetData('items')[id]
    }
  },
  created: function () {
    sendGAEvent("enter_page_data_main", {
      "category": "quest",
      "name": this.questdata.name,
    });
  },
  components: {
    card: httpVueLoader("components/quest_card.vue"),
  },
}
</script>
<style scoped>
.monster-link {
  /* background-color: white; */
  /* border-radius: 8px; */
  border: none;
}
.mon-icon {
  width: 32px;
  height: 32px;
  background-color: #eeeade;
}
.mon-icon-img {
  width: 100%;
}
.monster-text {
  font-size: 16px;
}
/* mobile */
@media (max-width: 1199.98px) {
}

/* desktops */
/* @media (min-width: 1200px) {
  .monster-link:hover {
    background-color: #100a7e; 
  }
} */
</style>
