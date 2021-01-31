<template>
  <div id="topbar-background">
    <div id="topbar">
      <router-link
        tag="button"
        class="topbarbtn"
        :class="{ 'topbar-highlight': GetLayerTexts().length == 1 }"
        to="/mon"
      >
        魔物類型</router-link
      >
      <div class="topbarlink" v-show="GetLayerTexts().length > 1">></div>
      <router-link
        tag="button"
        class="topbarbtn"
        :class="{ 'topbar-highlight': GetLayerTexts().length == 2 }"
        :to="'/mon/' + GetLayerTexts()[1]"
      >
        {{ GetLayerTexts().length > 1 ? GetLayerTexts()[1] : "" }}
      </router-link>
      <div class="topbarlink" v-show="GetLayerTexts().length > 2">></div>
      <router-link
        tag="button"
        class="topbarbtn"
        :class="{ 'topbar-highlight': GetLayerTexts().length == 3 }"
        :to="'/mon/' + GetLayerTexts()[1] + '/' + GetLayerTexts()[2]"
      >
        {{ GetLayerTexts().length > 2 ? GetLayerTexts()[2] : "" }}</router-link
      >
    </div>
  </div>
</template>
<script>
module.exports = {
  methods: {
    GetLayerTexts() {
      //   console.log(this.$route);
      let decodePath = decodeURI(this.$route.path).substring(1);
      return decodePath.split("/");
    },
  },
};
</script>  