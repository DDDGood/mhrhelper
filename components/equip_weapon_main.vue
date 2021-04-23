<template>
  <div class="layout-main">
    <div class="layout-grid">
      <div class="layout-grid-right">
        <card :weapondata="weapondata"></card>
      </div>
      <div class="layout-grid-main">
        <details open>
          <summary class="header2">{{$t('description')}}</summary>
          <span id="description" v-html="ParseDescriptionText(weapondata.description)"></span>
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
      "category": "equip_weapons",
      "name": this.weapondata.name,
    });
  },
  components: {
    card: httpVueLoader("components/equip_weapon_card.vue"),
  },
}
</script>
<style scoped>
/* mobile */
@media (max-width: 1199.98px) {
}

/* desktops */
@media (min-width: 1200px) {
}
</style>
