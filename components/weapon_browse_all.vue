<template>
  <div class="layout-main">
    <div class="header3" :key="key">{{$t('list')}}</div>
    <div class="link-list">
      <router-link
        tag="button"
        class="link-button"
        v-for="(item, key) in weapons"
        :key="key"
        :to="'/weapon/' + key"
      >
        <img
          class="link-icon"
          v-bind:src="IsNullOrEmpty(item.icon) ? 'images/monsters/icons/icon_unknown.png': item.icon "
        />
        <div class="link-text">{{$t('weapons.name.' + key)}}</div>
      </router-link>
    </div>
  </div>
</template>
<script>
module.exports = {
  data: function () {
    return {
      //   types: {}
    };
  },
  props: ["weapons"],
  created: function () {

  },
};
</script>  