<template>
  <div class="card rounded flex-column">
    <div class="flex-row interval-y">
      <div class="icon-background rounded interval-x flex-center">
        <img
          id="icon"
          ref="icon"
          v-bind:src="IsNullOrEmpty(weapondata.icon)? 'images/monsters/icons/icon_unknown.png':weapondata.icon"
          alt="icon"
        />
      </div>
      <div class="flex1 flex-center color2 rounded interval-x">
        <div class="card-text text-large text-bold">{{weapondata.name}}</div>
      </div>
    </div>
    <div class="flex-row interval-y">
      <div class="flex1 color2 rounded">
        <img
          id="image"
          v-bind:src="IsNullOrEmpty(weapondata.image)? 'images/monsters/icons/icon_unknown.png':weapondata.image"
          alt="Image"
        />
      </div>
    </div>
    <!-- <div class="flex-row interval-y">
      <div class="flex1 flex-column color1 rounded">
        <div class="flex1 rounded card-text text-bold">{{$t('type')}}</div>
        <div
          class="flex2 color2 rounded card-text margin"
        >{{$t('monster.species.' +weapondata.species)}}</div>
      </div>
    </div>-->
  </div>
</template>
<script>
module.exports = {
  props: ["weapondata"],
  mounted: function () {
  }
}
</script>
<style scoped>
#icon {
  width: 80%;
  height: 80%;
}
/* mobile */
@media (max-width: 1199.98px) {
}

/* desktops */
@media (min-width: 1200px) {
}
</style>
