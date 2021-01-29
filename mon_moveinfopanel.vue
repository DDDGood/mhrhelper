<template>
  <div class="movepanel-container" v-show="show" @click="Hide">
    <div id="panel-moveinfo" ref="moveinfopanel">
      <div class="panel-row margin">
        <div id="moveinfo-title" class="panel-text-title">{{movedata.name}}</div>
      </div>
      <div class="panel-row margin">
        <div class="panel-block-1">
          <div class="panel-text" v-show="IsNullOrEmpty(movedata.image)">暫無影片</div>
          <video
            id="moveinfo-video"
            ref="moveimage"
            width="100%"
            height="100%"
            preload="auto"
            autoplay="autoplay"
            loop="loop"
            type="video/mp4"
            v-show="movedata?.image!=undefined"
          >
            <source :src="movedata.image" />
          </video>
        </div>
      </div>
      <div class="panel-row margin" v-show="!IsNullOrEmpty(movedata.preaction)">
        <div
          class="panel-block-2 panel-text-bold"
          style="display:flex; align-items: center;  justify-content:center;"
        >
          預兆
          <div
            id="moveinfo-preaction"
            class="panel-block-1 panel-text margin"
          >{{this.movedata.preaction}}</div>
        </div>
      </div>
      <div class="panel-row margin" v-show="!IsNullOrEmpty(movedata.action)">
        <div
          class="panel-block-2 panel-text-bold"
          style="display:flex; align-items: center; justify-content:center;"
        >
          動作
          <div id="moveinfo-action" class="panel-block-1 panel-text margin">{{movedata.action}}</div>
        </div>
      </div>
      <div class="panel-row margin" v-show="!IsNullOrEmpty(movedata.recovery)">
        <div
          class="panel-block-2 panel-text-bold"
          style="display:flex; align-items: center; justify-content:center;"
        >
          硬直
          <div id="moveinfo-recovery" class="panel-block-1 panel-text margin">{{movedata.recovery}}</div>
        </div>
      </div>
      <div class="panel-row margin" v-show="!IsNullOrEmpty(movedata.note)">
        <div
          class="panel-block-2 panel-text-bold"
          style="display:flex; align-items: center; justify-content:center;"
        >
          備註
          <div id="moveinfo-note" class="panel-block-1 panel-text margin">{{movedata.note}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
module.exports = {
  data: function () {
    return {
      show: false
    }
  },
  props: {
    movedata: {},
    test: "bbb"
  },
  methods: {
    Show: function () {
      this.show = true;
    },
    Hide: function () {
      this.show = false;
    }
  },
  watch: {
    movedata: function (newVal, oldVal) { // watch it
      // this.show = true;
      let video = this.$refs.moveimage;
      video.load();
      video.play();
    }
  }
};
</script>  


<style>
.movepanel-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* Black background with opacity */
  z-index: 2; /* Specify a stack order in case you're using a different order for other elements */
}
#panel-moveinfo {
  /* display: none; */
  background-color: #4b9aff;
  box-shadow: 0px 0px 8px #414141;
}
.moveinfo-video {
  align-items: center;
}
/* mobile */
@media (max-width: 1199.98px) {
  #panel-moveinfo {
    width: 80%;
    padding: 0%;
    border-radius: 4px;
  }
}
/* desktops */
@media (min-width: 1200px) {
  #panel-moveinfo {
    width: 600px;
    padding: 4px;
    border-radius: 4px;
  }
}
</style>