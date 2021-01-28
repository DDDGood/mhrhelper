<template>
  <div id="layer0">
    <div class="header3">種類</div>
    <div id="specieslist">
      <router-link tag="button" class="btnspecies flex-2" to="/mon/全部">全部</router-link>
      <router-link
        tag="button"
        class="btnspecies flex-1"
        v-for="(item,key) in specieslist"
        v-bind:key="key"
        v-bind:to="'/mon/' + key"
      >{{key}}</router-link>
    </div>
    <!-- <router-view></router-view> -->
  </div>
</template>
<script>
module.exports = {
  props: ["specieslist"]
};
</script>  