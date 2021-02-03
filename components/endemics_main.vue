<template>
  <div class="layout-main">
    <div class="layout-grid">
      <div class="layout-grid-right">
        <card :endemicdata="endemicdata"></card>
      </div>
      <div class="layout-grid-main">
        <details open>
          <summary class="header2">基本介紹</summary>
          <span id="description" v-html="ParseDescriptionText(endemicdata.description)"></span>
        </details>
        <details open v-show="!IsNullOrEmpty(endemicdata.video)">
          <summary class="header2">使用效果影片</summary>
          <span><p class="description-text">影片來自巴哈姆特：<a href="https://forum.gamer.com.tw/C.php?bsn=5786&snA=158908"> 環境生物整理原文<a>，感謝版友馬雲巴巴(jimmerican55)提供影片。</P></span>
          <video
            ref="video"
            width="100%"
            height="100%"
            preload="auto"
            autoplay="autoplay"
            loop="loop"
            type="video/mp4"
            webkit-playsinline
            playsinline
            muted
          >
            <source :src="endemicdata.video" />
          </video>
        </details>
      </div>
    </div>
  </div>
</template>
<script>
module.exports = {

  props: ["endemics"],
  computed: {
    endemicdata: function () {
      return this.endemics[this.$route.params.name];
    }
  },
  mounted: function () {
    // const video = this.$refs.video;
    // video.load();
    // video.play();
  },
  components: {
    card: httpVueLoader("components/endemics_card.vue"),
  },
}
</script>
<style scoped>
.layout-grid {
  display: grid;
}
.layout-grid-right {
}

/* mobile */
@media (max-width: 1199.98px) {
  .layout-grid {
    grid-template-columns: minmax(0, 1fr);
  }
}

/* desktops */
@media (min-width: 1200px) {
  .layout-grid {
    grid-template-columns: 2fr 1fr;
    max-width: 1140px;
    margin-left: auto;
    margin-right: auto;
  }
  .layout-grid-main {
    /* padding-left:150px; */
    grid-column-start: 1;
    grid-row-start: 1;
    padding-right: 8px;
    /* margin: 8px; */
  }
  .layout-grid-right {
    grid-column-start: 2;
    grid-row-start: 1;
    margin: 8px;
  }
}
</style>
