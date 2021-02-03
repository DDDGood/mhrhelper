<template>
  <div id="card" class="rounded">
    <div class="flex-column">
      <div class="flex-row interval-y">
        <div class="icon-background rounded interval-x flex-center">
          <img id="icon" ref="icon" v-bind:src="endemicdata.icon" alt="icon" />
        </div>
        <div class="flex1 flex-center color2 rounded interval-x">
          <div class="text text-large bold">{{endemicdata.nameTW}}</div>
        </div>
      </div>
      <div class="flex-row interval-y">
        <div class="flex1 color2 rounded">
          <img id="image" v-bind:src="endemicdata.image" alt="Image" />
        </div>
      </div>
      <div class="flex-row interval-y">
        <div class="flex1 flex-column color1 rounded">
          <div class="flex1 rounded text bold">類型</div>
          <div class="flex2 color2 rounded text margin">{{endemicdata.type}}</div>
        </div>
      </div>
      <div class="flex-row interval-y" v-show="endemicdata.attributes!==undefined">
        <div class="flex1 flex-column color1 rounded">
          <div class="flex1 text bold">特性</div>
          <div class="flex1 margin">
            <div
              class="flex-row interval-y"
              v-for="(value,key) in endemicdata.attributes"
              :key="key"
            >
              <div class="flex1 color2 rounded-left interval-x text flex-center">{{key}}</div>
              <div class="flex2 color2 rounded-right interval-x text flex-center">{{value}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex-row interval-y" v-show="endemicdata.notes!==undefined">
        <div class="flex1 flex-column color1 rounded">
          <div class="flex1 text bold">備註</div>
          <div class="flex1 margin">
            <div class="flex-row interval-y" v-for="(value,id) in endemicdata.notes" :key="id">
              <div class="flex2 text">{{value}}</div>
            </div>
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
    // let icon = this.$refs.icon;
    // icon.src = this.endemicdata.icon;
    // icon.crossOrigin = "Anonymous";
    // icon.style.height = "100%";
    // icon.style.width = "100%";
    // // icon.style.float = "left";
    // icon.onload = function () {
    //   //   //  r,   g,   b,   a
    //   convertImageColor(icon, "#ff61fc");
    // };
  }
}
</script>
<style scoped>
#card {
  background-color: #4b9aff;
  padding: 4px;
}
.rounded {
  border-radius: 4px;
}
.rounded-left {
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}
.rounded-right {
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}
.color1 {
  background-color: #bdd5ff;
}
.color2 {
  background-color: #ffffff;
}
.flex1 {
  flex: 1;
}
.flex2 {
  flex: 2;
}
.flex-row {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: space-around;
}
.flex-column {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-around;
}
.margin {
  margin: 4px;
}

.interval-y + .interval-y {
  margin-top: 4px;
}
.interval-x + .interval-x {
  margin-left: 4px;
}
.text {
  font-size: 14px;
  text-align: center;
  font-family: montserrat;
}
.text-large {
  font-size: 22px;
}
.bold {
  font-weight: bold;
}
#image {
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5%;
  margin-bottom: 5%;
  max-width: 80%;
  max-height: 30vh;
}
.icon-background {
  height: 40px;
  width: 40px;
  background-color: #eeeade;
}
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
