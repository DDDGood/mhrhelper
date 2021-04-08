<template>
  <div class="layout-main">
    <div class="layout-grid">
      <div class="layout-grid-right">
        <card :itemdata="itemdata"></card>
      </div>
      <div class="layout-grid-main">
        <details open>
          <summary class="header2">{{$t('description')}}</summary>
          <span id="description" v-html="ParseDescriptionText(itemdata.description)"></span>
        </details>
      </div>
    </div>
  </div>
</template>
<script>
module.exports = {

  props: ["items"],
  computed: {
    itemdata: function () {
      return this.items[this.$route.params.name];
    }
  },
  mounted: function () {
  },
  created: function () {
    sendGAEvent("enter_page_data_main", {
      "category": "items",
      "name": this.itemdata.name,
    });
  },
  components: {
    card: httpVueLoader("components/item_card.vue"),
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
