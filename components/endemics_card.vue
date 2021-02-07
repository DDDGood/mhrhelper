<template>
  <div class="card rounded flex-column">
    <div class="flex-row interval-y">
      <div class="icon-background rounded interval-x flex-center">
        <img id="icon" ref="icon" v-bind:src="endemicdata.icon" alt="icon" />
      </div>
      <div class="flex1 flex-center color2 rounded interval-x">
        <div class="card-text text-large text-bold">{{$t('endemics.name.' + endemicdata.nameTW)}}</div>
      </div>
    </div>
    <div class="flex-row interval-y">
      <div class="flex1 color2 rounded">
        <img id="image" v-bind:src="endemicdata.image" alt="Image" />
      </div>
    </div>
    <div class="flex-row interval-y">
      <div class="flex1 flex-column color1 rounded">
        <div class="flex1 rounded card-text text-bold">{{$t('type')}}</div>
        <div
          class="flex2 color2 rounded card-text margin"
        >{{$t('endemics.type.' +endemicdata.type)}}</div>
      </div>
    </div>
    <div class="flex-row interval-y" v-show="endemicdata.attributes!==undefined">
      <div class="flex1 flex-column color1 rounded">
        <div class="flex1 card-text text-bold">{{$t('trait')}}</div>
        <div class="flex1 margin">
          <div class="flex-row interval-y" v-for="(value,key) in endemicdata.attributes" :key="key">
            <div class="flex1 color2 rounded-left interval-x card-text flex-center">{{key}}</div>
            <div
              class="flex2 color2 rounded-right interval-x card-text flex-center"
              :class="{'text-left':value.length>10}"
            >{{value}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-row interval-y" v-show="endemicdata.notes!==undefined">
      <div class="flex1 flex-column color1 rounded">
        <div class="flex1 card-text text-bold">備註</div>
        <div class="flex1 margin">
          <div class="flex-row interval-y" v-for="(value,id) in endemicdata.notes" :key="id">
            <div class="flex2 card-text">{{'*' + value}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
module.exports = {
  props: ["endemicdata"],
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
