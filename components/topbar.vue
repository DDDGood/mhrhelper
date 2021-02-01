<template>
  <div id="topbar-background">
    <div id="topbar">
      <router-link
        tag="button"
        class="topbarbtn"
        :class="{ 'topbar-highlight': GetLayerTexts().length == 1 }"
        to="/mon"
      >魔物類型</router-link>
      <div class="topbarlink" v-show="GetLayerTexts().length > 1">></div>
      <router-link
        tag="button"
        class="topbarbtn"
        :class="{ 'topbar-highlight': GetLayerTexts().length == 2 }"
        :to="'/mon/' + GetLayerTexts()[1]"
      >{{ GetLayerTexts().length > 1 ? GetLayerTexts()[1] : "" }}</router-link>
      <div class="topbarlink" v-show="GetLayerTexts().length > 2">></div>
      <router-link
        tag="button"
        class="topbarbtn"
        :class="{ 'topbar-highlight': GetLayerTexts().length == 3 }"
        :to="'/mon/' + GetLayerTexts()[1] + '/' + GetLayerTexts()[2]"
      >{{ GetLayerTexts().length > 2 ? GetLayerTexts()[2] : "" }}</router-link>
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

<style scoped>
#topbar {
  display: flex;
  justify-content: flex-start;
  height: 60px;
}
#topbar-background {
  display: flex;
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0; /* Position the navbar at the top of the page */
  width: stretch; /* Full width */
  z-index: 1;
  background-color: #31363d;
}
.topbar-highlight {
  background-color: #4caf50 !important;
}
.topbarlink {
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}
.topbarbtn {
  text-decoration: none;
  font-family: Montserrat;
  border: none;
  color: white;
  background-color: #31363d;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 10px;
  padding-right: 10px;
}

/* mobile */
@media (max-width: 1199.98px) {
  #topbar {
    padding-left: 12px;
  }
  .topbarbtn {
    font-size: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
    padding-right: 10px;
  }
  .topbarlink {
    font-size: 20px;
  }
}

/* desktops */
@media (min-width: 1200px) {
  #topbar {
    width: 1140px;
    margin-left: auto;
    margin-right: auto;
  }
  .topbarbtn {
    font-size: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
    padding-right: 10px;
  }
  .topbarlink {
    font-size: 20px;
  }
}
</style>