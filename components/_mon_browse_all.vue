<template>
  <div class="layout-main">
    <template v-for="(items, species) in specieslist">
      <div class="header3" :key="species">{{$t('monster.species.'+species)}}</div>
      <div class="link-list" :key="species">
        <router-link
          tag="button"
          class="link-button"
          v-for="(item, key) in items"
          :key="key"
          :to="'/mon/' + species + '/' + key"
        >
          <img
            class="link-icon"
            v-bind:src="IsNullOrEmpty(item.icon) ? 'images/monsters/icons/icon_unknown.png': item.icon "
          />
          <div class="link-text">{{ $t('monster.name.'+key) }}</div>
        </router-link>
      </div>
    </template>
  </div>
</template>
<script>
module.exports = {
  data: function () {
    return {
      specieslist: {}
    };
  },
  props: ["monsters"],
  created: function () {
    for (const key in this.monsters) {
      const item = this.monsters[key];
      if (this.specieslist.hasOwnProperty(item.species) == false) {
        this.specieslist[item.species] = {};
      }
      this.specieslist[item.species][key] = item;
    }
  },
};
</script>  