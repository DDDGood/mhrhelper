<template>
  <div class="layout-main">
    <template v-for="(items, type) in types">
      <div class="header3" :key="type">{{type}}</div>
      <div class="link-list" :key="type">
        <router-link
          tag="button"
          class="link-button"
          v-for="(item, key) in items"
          :key="key"
          :to="'/endemics/' + key"
        >
          <img
            class="link-icon"
            v-bind:src="IsNullOrEmpty(item.image) ? 'images/icons/endemics/unknown.png': item.image "
          />
          <div class="link-text">{{ key }}</div>
        </router-link>
      </div>
    </template>
    <!-- <div class="header3">列表</div>
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
    </div>-->
  </div>
</template>
<script>
module.exports = {
  data: function () {
    return {
      types: {}
    };
  },
  props: ["endemics"],
  created: function () {
    for (const key in this.endemics) {
      const item = this.endemics[key];
      if (this.types.hasOwnProperty(item.type) == false) {
        this.types[item.type] = {};
      }
      this.types[item.type][key] = item;
    }
  },
};
</script>  