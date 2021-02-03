<template>
  <!-- <div> -->
  <div id="topbar-background">
    <div id="topbar">
      <!-- <button class="topbarbtn" @click="ToggleSideMenu">三</button> -->
      <router-link
        tag="button"
        class="topbarbtn"
        :class="{ 'topbar-highlight': GetLayerTexts().length == 1 }"
        :to="'/' + GetLayerTexts()[0]"
      >{{ToDataTypeText( GetLayerTexts()[0])}}</router-link>
      <div class="topbarlink" v-show="GetLayerTexts().length > 1">></div>
      <router-link
        tag="button"
        class="topbarbtn"
        :class="{ 'topbar-highlight': GetLayerTexts().length == 2 }"
        :to="'/' + GetLayerTexts()[0] + '/' + GetLayerTexts()[1]"
      >{{ GetLayerTexts().length > 1 ? GetLayerTexts()[1] : "" }}</router-link>
      <div class="topbarlink" v-show="GetLayerTexts().length > 2">></div>
      <router-link
        tag="button"
        class="topbarbtn"
        :class="{ 'topbar-highlight': GetLayerTexts().length == 3 }"
        :to="'/'+ GetLayerTexts()[0] + '/' + GetLayerTexts()[1] + '/' + GetLayerTexts()[2]"
      >{{ GetLayerTexts().length > 2 ? GetLayerTexts()[2] : "" }}</router-link>
    </div>
    <!-- <div id="menu" v-show="show">測試中</div> -->
  </div>
  <!-- </div> -->
</template>
<script>
module.exports = {
  data: function () {
    return {
      show: false,
    }
  },
  methods: {
    ToggleSideMenu: function () {
      this.show = !this.show;
      console.log(this.show);
    },
    GetLayerTexts: function () {
      //   console.log(this.$route);
      let decodePath = decodeURI(this.$route.path).substring(1);
      return decodePath.split("/");
    },
    ToDataTypeText: function (key) {
      switch (key) {
        case "mon":
          return "大型魔物"
        case "endemics":
          return "環境生物"
      }
    }
  },
};
</script>  

<style scoped>
#topbar {
  display: flex;
  justify-content: flex-start;
  height: 60px;
  background-color: #31363d;
  width: stretch; /* Full width */
}
#topbar-background {
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0; /* Position the navbar at the top of the page */
  z-index: 1;
}
#menu {
  top: 60px; /* Position the navbar at the top of the page */
  left: 0px;
  width: 160px;
  height: 100vh;
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