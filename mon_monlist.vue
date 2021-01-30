<template>
  <div id="layer0">
    <div class="header3">列表</div>
    <div class="monlist">
      <router-link
        tag="button"
        class="button-mon flex-1"
        v-for="(item, key) in specieslist[$route.params.species]"
        v-bind:key="key"
        v-bind:to="'/mon/' + $route.params.species + '/' + key"
      >
        <img
          class="image-button-mon-icon"
          v-bind:src="
            !item.icon || item.icon.length === 0
              ? 'images/icons/monsters/icon_unknown.png'
              : item.icon
          "
        />
        <div class="text-button-mon-name">{{ key }}</div>
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
  created: function () {},
};
</script>  