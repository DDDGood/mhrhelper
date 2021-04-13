<template>
  <div class="layout-main">
    <div class="header3">{{$t('meowcenary.scout_location')}}</div>
    <div class="flex-column">
      <router-link
        v-for="(map, key) in meowcenaries"
        v-bind:key="key"
        v-bind:to="'/meowcenary/' + key"
        custom
        v-slot="{ navigate }"
      >
        <div @click="navigate" class="flex1 flex-row flex-start item-list-link mouse-hover">
          <div class="flex-center">
            <div class="item-list-text">{{ $t('map.name.'+ key)}}</div>
          </div>
        </div>
      </router-link>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
module.exports = {
  data: function () {
    return {
    };
  },
  props: ["meowcenaries"],
  created: function () {
  },
  mounted: function () {

  },
  methods: {

  }, computed: {

  }
};
</script>  
<style scoped>
.search-container {
  width: 100%;
}
.search-button {
  width: 40px;
}
.search-icon {
  width: 100%;
}
.search-cancel {
  margin: 8px;
}
.page-link-container {
  margin: 8px;
}
.page-link {
  margin: 2px;
  display: inline-block;
  color: blue;
  text-decoration-line: underline;
}
.page-link-current {
  color: black !important;
  text-decoration-line: none !important;
  font-weight: bold !important;
}
</style>