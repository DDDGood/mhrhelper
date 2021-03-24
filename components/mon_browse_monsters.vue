<template>
  <div class="layout-main">
    <div class="header3">{{$t('list')}}</div>
    <div :class="layoutClass">
      <router-link
        v-for="(item, key) in specieslist[$route.params.species]"
        v-bind:key="key"
        v-bind:to="'/mon/' + key"
        custom
        v-slot="{ navigate }"
      >
        <button @click="navigate" class="link-button">
          <img
            class="link-icon"
            v-bind:src="
            !item.icon || item.icon.length === 0
              ? 'images/monsters/icons/icon_unknown.png'
              : item.icon
          "
          />
          <div
            class="link-text"
          >{{ item.name?.hasOwnProperty(i18n.locale)? item.name[i18n.locale]:key }}</div>
        </button>
      </router-link>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
module.exports = {
  data: function (params) {
    return {
      layoutClass: {
        'link-list': this.$i18n.locale === "tw" || window.innerWidth > 350,
        'link-list-thin': !(this.$i18n.locale === "tw" || window.innerWidth > 350),
      }
    }
  },
  props: {
    specieslist: {},
  },
  created: function () { },
};
</script>  

<style scoped>
/* mobile */
@media (max-width: 1199.98px) {
}
/* desktops */
@media (min-width: 1200px) {
}
</style>