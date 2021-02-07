<template>
  <div>
    <topbarmenu :items="menuitems" test="bbB"></topbarmenu>
    <router-view @pagechange="OnPageChanged"></router-view>
  </div>
</template>
<script>
module.exports = {
  router,
  data: function () {
    return {
      menuitems: [{ name: "大型魔物", path: "/mon" }],
    }
  },
  props: ["specieslist", "dex"],
  computed: {
  },
  created: function () {
    this.$emit("pagechange", this.menuitems);
  },
  methods: {
    InitRouter: function () {
      Vue.use(VueRouter);
      // const Foo = { template: '<div>foo</div>' }
      // const Bar = httpVueLoader("temp.vue");
      const SpeciesListComp = httpVueLoader("components/mon_browse_species.vue");
      const MonListComp = httpVueLoader("components/mon_browse_monsters.vue");
      const MonComp = httpVueLoader("components/mon_main.vue");
      const EndemicListComp = httpVueLoader("components/endemics_browse_all.vue");
      const EndemicComp = httpVueLoader("components/endemics_main.vue");

      const router = new VueRouter({
        routes: [
          {
            name: 'home',
            path: '/',
            redirect: { path: '/mon' }
          },
          {
            name: 'monlist',
            path: '/mon',
            component: SpeciesListComp,
            props: { dex: GetData("dex"), specieslist: speciesDictionary }
          },
          {
            path: '/mon/:species',
            component: MonListComp,
            props: { specieslist: speciesDictionary, mondata: GetData("dex") }
          },
          {
            name: 'mon',
            path: '/mon/:species/:name',
            component: MonComp,
            props: { dex: GetData("dex"), moves: GetData("moves") }
          },
          {
            name: 'endemiclist',
            path: '/endemics',
            component: EndemicListComp,
            props: { endemics: GetData("endemics") }
          },
          {
            name: 'endemics',
            path: '/endemics/:name',
            component: EndemicComp,
            props: { endemics: GetData("endemics") }
          }
        ]
      });
      return router;
    }
  }

};
</script>  