<template>
  <div class="card rounded flex-column">
    <div class="flex-row interval-y">
      <!-- <div class="icon-background rounded interval-x flex-center">
        <img
          id="icon"
          ref="icon"
          v-bind:src="IsNullOrEmpty(weapondata.icon)? 'images/monsters/icons/icon_unknown.png':weapondata.icon"
          alt="icon"
        />
      </div>-->
      <div class="flex1 flex-center color2 rounded interval-x">
        <div class="card-text text-l2 text-bold">{{itemdata.name}}</div>
      </div>
    </div>
    <div class="flex-row interval-y">
      <div class="flex1 color2 rounded">
        <img
          id="image"
          v-bind:src="IsNullOrEmpty(itemdata.image)? 'images/monsters/icons/icon_unknown.png':itemdata.image"
          alt="Image"
        />
      </div>
    </div>
  </div>
</template>
<script>
module.exports = {
  props: ["itemdata"],
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
