<template>
  <div id="layer0">
    <div class="header3">列表</div>
    <div class="monlist">
      <router-link
        tag="button"
        class="button-mon flex-1"
        v-for="(item,key) in specieslist[$route.params.species]"
        v-bind:key="key"
        v-bind:to="'/mon/'+ item.species +'/' + key"
      >
        <img
          class="image-button-mon-icon"
          v-bind:src="(!item.icon || item.icon.length === 0)?'images/icons/monsters/icon_unknown.png':item.icon"
        />
        <div class="text-button-mon-name">{{key}}</div>
      </router-link>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
module.exports = {
  props: {
    specieslist: {}
  },
  created: function () {
    this.specieslist["全部"] = {};
    for (let species in this.specieslist) {
      for (let mon in this.specieslist[species]) {
        this.specieslist["全部"][mon] = this.specieslist[species][mon];
      }
    }
    console.log(this.specieslist);
  }
};
</script>  