<template>
  <div class="movepanel-container" v-show="show" @click="Hide">
    <div id="panel-moveinfo" class="card rounded flex-column" ref="moveinfopanel">
      <div class="flex-row interval-y">
        <div id="moveinfo-title" class="text-large text-bold">{{ movedata.name }}</div>
      </div>
      <div class="flex-row interval-y">
        <div class="flex1 color2 rounded">
          <div class="card-text" v-show="IsNullOrEmpty(movedata.image)">暫無影片</div>
          <video
            id="moveinfo-video"
            ref="moveimage"
            v-show="!IsNullOrEmpty(movedata.image)"
            width="100%"
            height="100%"
            autoplay
            loop
            webkit-playsinline
            playsinline
            muted
          >
            <source :src="movedata.image" type="video/mp4" />
          </video>
        </div>
      </div>
      <div class="flex-row interval-y" v-show="!IsNullOrEmpty(movedata.preaction)">
        <div class="flex1 flex-row color1 rounded">
          <div class="card-text text-bold flex-center margin">{{$t('monster.move.preaction')}}</div>
          <div class="flex1 color2 card-text rounded margin">{{ this.movedata.preaction }}</div>
        </div>
      </div>
      <div class="flex-row interval-y" v-show="!IsNullOrEmpty(movedata.action)">
        <div class="flex1 flex-row color1 rounded">
          <div class="card-text text-bold flex-center margin">{{$t('monster.move.action')}}</div>
          <div class="flex1 color2 card-text rounded margin">{{ movedata.action }}</div>
        </div>
      </div>
      <div class="flex-row interval-y" v-show="!IsNullOrEmpty(movedata.recovery)">
        <div class="flex1 flex-row color1 rounded">
          <div class="card-text text-bold flex-center margin">{{$t('monster.move.recovery')}}</div>
          <div class="flex1 color2 card-text rounded margin">{{ movedata.recovery }}</div>
        </div>
      </div>
      <div class="flex-row interval-y" v-show="!IsNullOrEmpty(movedata.note)">
        <div class="flex1 flex-row color1 rounded">
          <div class="card-text text-bold flex-center margin">{{$t('monster.move.note')}}</div>
          <div class="flex1 color2 card-text rounded margin">{{ movedata.note }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
module.exports = {
  data: function () {
    return {
      show: false,
    };
  },
  props: {
    movedata: {
    }
  },
  mounted: function () {
  },
  methods: {
    Show: function () {
      this.show = true;
    },
    Hide: function () {
      this.show = false;
    },
  },
  watch: {
    movedata: function (newVal, oldVal) {
      // watch it
      // this.show = true;
      if (!IsNullOrEmpty(this.movedata.image)) {
        let video = this.$refs.moveimage;
        video.load();
        video.play();
      }
    },
  },
};
</script>  


<style scoped>
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
  box-shadow: 0px 0px 8px #414141;
}
.moveinfo-video {
  align-items: center;
}
/* mobile */
@media (max-width: 1199.98px) {
  #panel-moveinfo {
    width: 80%;
  }
}
/* desktops */
@media (min-width: 1200px) {
  #panel-moveinfo {
    width: 600px;
  }
}
</style>