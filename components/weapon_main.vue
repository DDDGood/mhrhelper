<template>
  <div class="layout-main">
    <div class="layout-grid">
      <div class="layout-grid-right">
        <card :weapondata="weapondata"></card>
      </div>
      <div class="layout-grid-main">
        <details open>
          <summary class="header2">{{$t('description')}}</summary>
          <span v-html="ParseDescriptionText(weapondata.description)"></span>
          <div class="video-container flex-center">
            <iframe
              :src="weapondata.video_embed"
              frameborder="0"
              allow="autoplay; encrypted-media"
              allowfullscreen
            ></iframe>
          </div>
        </details>
        <details open>
          <summary class="header2">{{$t('weapons.silkbind_attacks')}}</summary>
          <template v-for="(attack, key) in weapondata.silkbind_attacks">
            <div class="description-text text-bold" :key="key">{{attack.name}}</div>
            <div class="description-text text-italic" :key="key">{{"「" + attack.slogan + "」"}}</div>
            <div class="description-text" :key="key" v-html="ParseCommand(attack.command)"></div>
            <span :key="key" v-html="ParseDescriptionText(attack.description)"></span>
            <div class="flex-column description-image-container" :key="key">
              <img class="description-image" :src="attack.image" />
            </div>
          </template>
        </details>
        <details open v-if="!IsNullOrEmpty(weapondata.controls)">
          <summary class="header2">{{$t('monster.moves')}}</summary>
          <moves :weapondata="weapondata"></moves>
        </details>
      </div>
    </div>
  </div>
</template>
<script>
module.exports = {

  props: ["weapons"],
  computed: {
    weapondata: function () {
      return this.weapons[this.$route.params.name];
    }
  },
  mounted: function () {
  },
  created: function () {
    sendGAEvent("enter_page_data_main", {
      "category": "weapons",
      "name": this.weapondata.name,
    });
  },
  components: {
    card: httpVueLoader("components/weapon_card.vue"),
    moves: httpVueLoader("components/weapon_moves.vue")
  },
}
</script>
<style scoped>
.video-container {
  margin-left: auto;
  margin-right: auto;
}
.video-container iframe,
.video-container object,
.video-container embed {
  width: 100%;
  height: 100%;
}

/* mobile */
@media (max-width: 1199.98px) {
  .video-container {
    width: 320px;
    height: 180px;
  }
}

/* desktops */
@media (min-width: 1200px) {
  .video-container {
    width: 560px;
    height: 315px;
  }
}
</style>
