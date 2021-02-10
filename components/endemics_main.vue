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
          <summary class="header2">{{$t('endemics.video')}}</summary>
          <span>
            <p
              class="description-text-quote"
              v-html="IsNullOrEmpty(endemicdata.video_reference)? $t('endemics.video_reference') : endemicdata.video_reference"
            ></p>
          </span>
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
            <source :src="endemicdata.video" type="video/mp4" />
          </video>
        </details>
        <details open v-if="!IsNullOrEmpty(endemicdata.locations)">
          <summary class="header2">{{$t('endemics.map_locations')}}</summary>
          <div class="flex-column" v-for="(src,map) in endemicdata.locations" :key="map">
            <img class="full-width" :src="src" />
            <span class="description-image-text">{{$t('map.name.' + map)}}</span>
          </div>
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
