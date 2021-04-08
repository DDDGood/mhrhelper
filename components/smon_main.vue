<template>
  <div class="layout-main">
    <div class="layout-grid">
      <div class="layout-grid-right">
        <card :smonsterdata="smonsterdata"></card>
      </div>
      <div class="layout-grid-main">
        <details open>
          <summary class="header2">{{$t('description')}}</summary>
          <span id="description" v-html="ParseDescriptionText(smonsterdata.description)"></span>
        </details>
      </div>
    </div>
  </div>
</template>
<script>
module.exports = {

  props: ["smonsters"],
  computed: {
    smonsterdata: function () {
      return this.smonsters[this.$route.params.name];
    }
  },
  mounted: function () {
  },
  created: function () {
    sendGAEvent("enter_page_data_main", {
      "category": "small_monsters",
      "name": this.smonsterdata.name,
    });
  },
  components: {
    card: httpVueLoader("components/smon_card.vue"),
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
