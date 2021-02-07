<template>
  <div>
    <div class="layout-main">
      <div class="header3">{{$t('species')}}</div>
      <div id="specieslist">
        <router-link
          tag="button"
          class="btnspecies"
          :class="{ 'flex-1': key !== 'all', 'flex-2': key === 'all' }"
          v-for="(item, key) in specieslist"
          v-bind:key="key"
          v-bind:to="'/mon/' + key"
        >{{ $t('monster.species.'+ key) }}</router-link>
      </div>
      <!-- <router-view></router-view> -->
    </div>
  </div>
</template>
<script>
module.exports = {
  data: function () {
    return {
    }
  },
  props: ["specieslist", "dex"],
  computed: {
    list: function () {

    }
  },
  created: function () {
    // console.log(this.specieslist);
  }
};
</script>  

<style scoped>
#specieslist {
  display: grid;
  justify-content: center;
}
.btnspecies {
  text-decoration: none;
  white-space: nowrap;
  flex-grow: 0;
  word-wrap: normal;
  padding-top: 20px;
  padding-bottom: 20px;
  background-color: #e5e5e5;
  border: none;
  border-radius: 6px;
  color: 31363d;
}
.flex-1 {
}
.flex-2 {
}
/* mobile */
@media (max-width: 1199.98px) {
  #specieslist {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 12px;
  }
  .flex-1 {
    font-size: 18px;
    height: 80px;
  }
  .flex-2 {
    font-size: 24px;
    height: 120px;
    grid-column-start: 1;
    grid-column-end: 3;
  }
}
/* desktops */
@media (min-width: 1200px) {
  #specieslist {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 30px;
  }
  .btnspecies {
  }
  .flex-1 {
    font-size: 18px;
    height: 80px;
  }
  .flex-2 {
    font-size: 24px;
    height: 120px;
    grid-column-start: 1;
    grid-column-end: 4;
  }
}
</style>