<template>
  <div id="panel-moveinfo" ref="moveinfopanel">
    <div class="panel-row margin">
      <div id="moveinfo-title" class="panel-text-title">{{this.test}}</div>
    </div>
    <div class="panel-row margin">
      <div class="panel-block-1">
        <div class="panel-text" v-show="mdata?.image==undefined">暫無影片</div>
        <video
          id="moveinfo-video"
          ref="movevideo"
          width="100%"
          preload="auto"
          autoplay="autoplay"
          loop="loop"
          type="video/mp4"
          v-show="mdata?.image!=undefined"
        >
          <source src="{{}}" />
        </video>
      </div>
    </div>
    <div class="panel-row margin">
      <div
        class="panel-block-2 panel-text-bold"
        style="display:flex; align-items: center;  justify-content:center;"
      >
        預兆
        <div
          id="moveinfo-preaction"
          class="panel-block-1 panel-text margin"
        >{{this.mdata?.preaction}}</div>
      </div>
    </div>
    <div class="panel-row margin">
      <div
        class="panel-block-2 panel-text-bold"
        style="display:flex; align-items: center; justify-content:center;"
      >
        動作
        <div id="moveinfo-action" class="panel-block-1 panel-text margin">{{mdata?.action}}</div>
      </div>
    </div>
    <div class="panel-row margin">
      <div
        class="panel-block-2 panel-text-bold"
        style="display:flex; align-items: center; justify-content:center;"
      >
        硬直
        <div id="moveinfo-recovery" class="panel-block-1 panel-text margin">{{mdata?.recovery}}</div>
      </div>
    </div>
    <div class="panel-row margin">
      <div
        class="panel-block-2 panel-text-bold"
        style="display:flex; align-items: center; justify-content:center;"
      >
        備註
        <div id="moveinfo-note" class="panel-block-1 panel-text margin">{{mdata?.note}}</div>
      </div>
    </div>
  </div>
</template>
<script>
module.exports = {
  data: function () {
    return {
      mdata: {
        name: "bbb",
        image: "333",
        preaction: "444",
        action: "555",
        recovery: "666",
        note: "777"
      }
    }
  },
  props: {
    mdata: {},
    test: "bbb"
  },
  created: function () {
    console.log("CREATE");
    console.log(this.inputdata?.name + "_" + this.mdata.name);
  },
  watch: {
    mdata: function (newVal, oldVal) { // watch it
      console.log('Prop changed: ', newVal, ' | was: ', oldVal)
    }
  }
};
</script>  