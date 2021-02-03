<template>
  <div id="topbar-root">
    <div id="topbar">
      <button class="hamburger flex-center" @click="ToggleSideMenu">
        <img id="hamburger" src="svg/hamburger-menu.svg" alt="My Happy SVG" />
      </button>
      <router-link :to="'/' + GetLayerTexts()[0]" custom v-slot="{ navigate }">
        <button
          @click="navigate"
          class="topbarbtn"
          :class="{ 'topbar-highlight': GetLayerTexts().length == 1 }"
        >{{ToDataTypeText( GetLayerTexts()[0])}}</button>
      </router-link>
      <div class="topbarlink" v-show="GetLayerTexts().length > 1">></div>
      <router-link
        :to="'/' + GetLayerTexts()[0] + '/' + GetLayerTexts()[1]"
        custom
        v-slot="{ navigate }"
        v-show="GetLayerTexts().length > 1"
      >
        <button
          @click="navigate"
          class="topbarbtn"
          :class="{ 'topbar-highlight': GetLayerTexts().length == 2 }"
        >{{ GetLayerTexts().length > 1 ? GetLayerTexts()[1] : "" }}</button>
      </router-link>
      <div class="topbarlink" v-show="GetLayerTexts().length > 2">></div>
      <router-link
        :to="'/'+ GetLayerTexts()[0] + '/' + GetLayerTexts()[1] + '/' + GetLayerTexts()[2]"
        custom
        v-slot="{ navigate }"
        v-show="GetLayerTexts().length > 2"
      >
        <button
          @click="navigate"
          class="topbarbtn"
          :class="{ 'topbar-highlight': GetLayerTexts().length == 3 }"
        >{{ GetLayerTexts().length > 2 ? GetLayerTexts()[2] : "" }}</button>
      </router-link>
    </div>
    <div id="menu" v-show="show">
      <router-link to="/mon" custom v-slot="{ navigate }">
        <button @click="navigate" class="menu-button">大型魔物</button>
      </router-link>
      <router-link to="/endemics" custom v-slot="{ navigate }">
        <button @click="navigate" class="menu-button">環境生物</button>
      </router-link>
    </div>
  </div>
</template>
<script>
module.exports = {
  data: function () {
    return {
      show: false,
      menuDOM: {}
    }
  },
  watch: {
    $route(to, from) {
      // this.show = false;
    }
  },
  methods: {
    ToggleSideMenu: function (event) {
      this.menuDOM = event.target;
      this.show = !this.show;
      if (this.show === true)
        document.addEventListener('click', this.CloseMenu);
    },
    CloseMenu: function (event) {
      if (event.target === this.menuDOM)
        return
      this.show = false;
      document.removeEventListener('click', this.CloseMenu);
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
#topbar-root {
  background-color: #31363d;
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0; /* Position the navbar at the top of the page */
  z-index: 1;
}
#topbar {
  display: flex;
  justify-content: flex-start;
  height: 60px;
  background-color: #31363d;
  width: stretch; /* Full width */
}
#hamburger {
  width: 60%;
  height: 60%;
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
.hamburger {
  /* text-decoration: none;
  font-family: Montserrat; */
  border: none;
  /* color: white; */
  width: 60px;
  background-color: #31363d;
  font-size: 20px;
}

#menu {
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 0px;
  top: 60px; /* Position the navbar at the top of the page */
  width: 160px;
  background-color: #31363d;
}
.menu-button {
  font-family: Montserrat;
  border: none;
  color: rgb(214, 213, 213);
  background-color: #24282c;
  font-size: 16px;
  padding-top: 20px;
  padding-bottom: 20px;
}

/* mobile */
@media (max-width: 1199.98px) {
  #topbar-root {
    /* padding-left: 12px; */
  }
  #topbar {
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
  #topbar-root {
    width: 1140px;
    margin-left: auto;
    margin-right: auto;
  }
  #topbar {
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