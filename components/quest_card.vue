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
        <div class="card-text text-l2 text-bold">{{questdata.name}}</div>
      </div>
    </div>
    <!-- <div class="flex-row interval-y">
      <div class="flex1 color2 rounded">
        <img
          id="image"
          v-bind:src="IsNullOrEmpty(questdata.image)? 'images/monsters/icons/icon_unknown.png':itemdata.image"
          alt="Image"
        />
      </div>
    </div>-->
    <div class="flex-row interval-y">
      <div class="flex1 flex-column color1 rounded">
        <div class="flex1 rounded card-text text-bold">{{$t('quest.client')}}</div>
        <div class="flex2 color2 rounded card-text margin">{{questdata.client}}</div>
      </div>
    </div>
    <div class="flex-row interval-y">
      <div class="flex1 flex-column color1 rounded">
        <div class="flex1 rounded card-text text-bold">{{$t('quest.rank')}}</div>
        <div class="flex2 color2 rounded card-text margin flex-row flex-intense">
          <div class="card-text">{{ $t('quest.' + questdata.type)}}</div>
          <div class="flex-row">
            <span v-for="i in questdata.star" :key="i" class="flex-center">
              <img src="images/svg/star.svg" class="card-text-icon-large" />
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-row interval-y">
      <div class="flex1 flex-column color1 rounded">
        <div class="flex1 rounded card-text text-bold">{{$t('quest.success')}}</div>
        <div class="flex2 color2 rounded card-text margin">{{questdata.success}}</div>
      </div>
    </div>
    <div class="flex-row interval-y">
      <div class="flex1 flex-column color1 rounded">
        <div class="flex1 rounded card-text text-bold">{{$t('quest.fail')}}</div>
        <div class="flex2 color2 rounded card-text margin">{{questdata.fail.replace("\n","/")}}</div>
      </div>
    </div>
  </div>
</template>
<script>
module.exports = {
  props: ["questdata"],
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
