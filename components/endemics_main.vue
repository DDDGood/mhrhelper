<template>
  <div class="layout-main">
    <div class="layout-grid">
      <div class="layout-grid-right">
        <card :endemicdata="endemicdata"></card>
      </div>
      <div class="layout-grid-main">
        <details open>
          <summary class="header2">{{$t('description')}}</summary>
          <span id="description" v-html="ParseDescriptionText(endemicdata.description)"></span>
        </details>
        <details open v-show="!IsNullOrEmpty(endemicdata.video)">
          <summary class="header2">使用效果影片</summary>
          <span><p class="description-text-quote">影片來自巴哈姆特：<a href="https://forum.gamer.com.tw/C.php?bsn=5786&snA=158908"> 環境生物整理<a>，感謝版友jimmerican55(馬雲巴巴)提供影片。</P></span>
          <video
            ref="video"
            width="100%"
            height="100%"
            autoplay
            loop
            webkit-playsinline
            playsinline
            muted
          >
            <source :src="endemicdata.video" type="video/mp4"/>
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

/* mobile */
@media (max-width: 1199.98px) {

}

/* desktops */
@media (min-width: 1200px) {

}
</style>
