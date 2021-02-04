<template>
  <div class="layout-main">
    <div class="header3">種類</div>
    <div id="specieslist">
      <!-- <router-link tag="button" class="btnspecies flex-2" to="/mon/全部">全部</router-link> -->
      <router-link
        tag="button"
        class="btnspecies"
        :class="{ 'flex-1': key !== '全部', 'flex-2': key === '全部' }"
        v-for="(item, key) in specieslist"
        v-bind:key="key"
        v-bind:to="'/mon/' + key"
      >{{ key }}</router-link>
    </div>
    <!-- <router-view></router-view> -->
  </div>
</template>
<script>
module.exports = {
  props: ["specieslist"],
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