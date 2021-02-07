<template>
  <div class="layout-main">
    <div class="header3" :key="key">{{$t('list')}}</div>
    <div class="link-list">
      <router-link
        tag="button"
        class="link-button"
        v-for="(item, key) in smonsters"
        :key="key"
        :to="'/smonster/' + key"
      >
        <img
          class="link-icon"
          v-bind:src="IsNullOrEmpty(item.icon) ? 'images/monsters/icons/icon_unknown.png': item.icon "
        />
        <div class="link-text">{{$t('smonster.name.' + key)}}</div>
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
  props: ["smonsters"],
  created: function () {

    // for (const key in this.endemics) {
    //   const item = this.endemics[key];
    //   if (this.types.hasOwnProperty(item.type) == false) {
    //     this.types[item.type] = {};
    //   }
    //   this.types[item.type][key] = item;
    // }
  },
};
</script>  