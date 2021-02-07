<template>
  <div class="layout-main">
    <template v-for="(items, type) in types">
      <div class="header3" :key="type">{{$t('endemics.type.'+type)}}</div>
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
          <div class="link-text">{{ $t('endemics.name.'+key) }}</div>
        </router-link>
      </div>
    </template>
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