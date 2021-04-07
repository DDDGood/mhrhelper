<template>
  <div id="topbar-root">
    <div id="topbar">
      <button class="hamburger-button flex-center" @click="ToggleSideMenu">
        <i class="icon-menu hamburger-icon"></i>
      </button>
      <template v-for="(nav,id) in items">
        <router-link :key="id" :to="nav.path" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            class="topbarbtn"
            :class="{ 'topbar-highlight': id == items.length-1 }"
          >{{nav.name}}</button>
        </router-link>
        <div :key="id" class="topbarlink" v-if="id<items.length-1">
          <i class="icon-right-dir"></i>
        </div>
      </template>
    </div>
    <div id="menu" v-show="show">
      <router-link to="/mon" custom v-slot="{ navigate }">
        <button @click="navigate" class="menu-button">{{$t("dataType.large_monsters")}}</button>
      </router-link>
      <router-link to="/endemics" custom v-slot="{ navigate }">
        <button @click="navigate" class="menu-button">{{$t("dataType.endemic_lifes")}}</button>
      </router-link>
      <router-link to="/smon" custom v-slot="{ navigate }">
        <button @click="navigate" class="menu-button">{{$t("dataType.small_monsters")}}</button>
      </router-link>
      <router-link to="/quest" custom v-slot="{ navigate }">
        <button @click="navigate" class="menu-button">{{$t("dataType.quests")}}</button>
      </router-link>
      <router-link to="/item" custom v-slot="{ navigate }">
        <button @click="navigate" class="menu-button">{{$t("dataType.items")}}</button>
      </router-link>
      <router-link to="/weapon" custom v-slot="{ navigate }">
        <button @click="navigate" class="menu-button">{{$t("dataType.weapons")}}</button>
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
  mounted: function () {
  },
  computed: {
    items: function () {
      let items = [];
      const pathArr = decodeURI(this.$route.path).substring(1).split("/");
      switch (pathArr[0]) {
        case "mon":
          items.push({ name: this.$t("dataType.large_monsters"), path: "/mon" })
          if (pathArr[1] !== undefined) {
            if (pathArr[1] === "species" && pathArr[2] !== undefined) {
              items.push({ name: this.$t("monster.species." + pathArr[2]), path: "/mon/species/" + pathArr[2] })
            } else {
              items.push({ name: this.$t("monster.name." + pathArr[1]), path: "/mon/" + pathArr[1] })
            }
          }
          break;
        case "endemics":
          items.push({ name: this.$t("dataType.endemic_lifes"), path: "/endemics" })
          if (pathArr[1] !== undefined)
            items.push({ name: this.$t("data.endemic_lifes." + pathArr[1] + ".name"), path: "/endemics/" + pathArr[1] })
          break;
        case "smon":
          items.push({ name: this.$t("dataType.small_monsters"), path: "/smon" })
          if (pathArr[1] !== undefined)
            items.push({ name: this.$t("small_monster.name." + pathArr[1]), path: "/smon/" + pathArr[1] })
          break;
        case "weapon":
          items.push({ name: this.$t("dataType.weapons"), path: "/weapon" })
          if (pathArr[1] !== undefined)
            items.push({ name: this.$t("weapons.name." + pathArr[1]), path: "/weapon/" + pathArr[1] })
          break;
        case "item":
          items.push({ name: this.$t("dataType.items"), path: "/item" })
          if (pathArr[1] !== undefined)
            items.push({ name: this.$t("data.items." + pathArr[1] + ".name"), path: "/item/" + pathArr[1] })
          break;
        case "quest":
          items.push({ name: this.$t("dataType.quests"), path: "/quest" })
          if (pathArr[1] !== undefined)
            items.push({ name: this.$t("data.quests." + pathArr[1] + ".name"), path: "/quest/" + pathArr[1] })
          break;
        default:
          items.push({ name: "??", path: "/mon" })
          break;
      }
      return items;
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
  font-size: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 4px;
  padding-right: 4px;
}
.hamburger-button {
  border: none;
  background-color: #31363d;
}
.hamburger-icon {
  color: white;
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
  }
  .topbarlink {
    font-size: 20px;
  }
}
</style>