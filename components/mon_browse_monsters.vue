<template>
  <div class="layout-main">
    <div class="header3">列表</div>
    <div class="link-list">
      <router-link
        v-for="(item, key) in specieslist[$route.params.species]"
        v-bind:key="key"
        v-bind:to="'/mon/' + $route.params.species + '/' + key"
        custom
        v-slot="{ navigate }"
      >
        <button @click="navigate" class="link-button">
          <img
            class="link-icon"
            v-bind:src="
            !item.icon || item.icon.length === 0
              ? 'images/icons/monsters/icon_unknown.png'
              : item.icon
          "
          />
          <div class="link-text">{{ key }}</div>
        </button>
      </router-link>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
module.exports = {
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