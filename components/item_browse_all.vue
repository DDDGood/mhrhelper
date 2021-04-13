<template>
  <div class="layout-main">
    <!-- <div class="flex-column">
      <div v-for="(item, i) in items" :key="i" class="flex1">{{item.name}}</div>
    </div>-->
    <div class="search-container flex-row" method="GET">
      <input
        v-on:keyup.enter="applySearch"
        v-model="keyword"
        placeholder="Search.."
        name="search"
        class="flex1"
      />
      <button type="submit" @click="applySearch" class="search-button">
        <img src="images/svg/search.svg" class="search-icon" />
      </button>
    </div>
    <button
      v-if="filter === true"
      @click="clearSearch"
      class="search-cancel"
    >{{$t('cancel_search')}}</button>
    <div class="flex-column">
      <router-link
        v-for="(item, key) in sliceditems"
        v-bind:key="key"
        v-bind:to="'/item/' + key"
        custom
        v-slot="{ navigate }"
      >
        <div @click="navigate" class="flex1 flex-row flex-start item-list-link mouse-hover">
          <img
            class="item-list-icon"
            v-bind:src="
            !item.image || item.image.length === 0
              ? 'images/monsters/icons/icon_unknown.png'
              : item.image
          "
          />
          <div class="flex-center">
            <div class="item-list-text">{{ item.name}}</div>
          </div>
        </div>
      </router-link>
      <router-view></router-view>
    </div>
    <div class="page-link-container">
      <span
        v-for="i in pagescount"
        :key="i"
        class="page-link"
        :class="{'page-link-current' : i===page}"
        @click="toPage(i)"
      >{{i}}</span>
    </div>
  </div>
</template>
<script>
module.exports = {
  data: function () {
    return {
      keyword: "",
      filter: false,
      searchitems: {},
      page: 1,
      showcount: 20
    };
  },
  props: ["items"],
  created: function () {
    this.searchitems = this.items;
  },
  mounted: function () {
    if (localStorage.getItem("items")) {
      try {
        let curData = JSON.parse(localStorage.getItem('items'));
        this.keyword = curData.keyword;
        this.filter = curData.filter;
        if (this.filter)
          this.applySearch();
        else
          this.clearSearch();
      } catch (e) {
        localStorage.removeItem('items');
      }
    }
  },
  methods: {
    applySearch: function () {
      this.searchitems = {};
      this.filter = true;
      for (let key in this.items) {
        const item = this.items[key];
        if (item.name.indexOf(this.keyword) > -1)
          this.searchitems[key] = item;
      }
      this.page = 1;
      this.saveState();
    },
    clearSearch: function () {
      this.filter = false;
      this.searchitems = this.items;
      this.keyword = "";
      this.page = 1;
      this.saveState();
    },
    toPage: function (i) {
      this.page = i;
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      this.saveState();
    },
    saveState() {
      const curData = { "keyword": this.keyword, "filter": this.filter };
      localStorage.setItem("items", JSON.stringify(curData));
    }
  }, computed: {
    sliceditems: function () {
      const start = (this.page - 1) * this.showcount;
      return Object.fromEntries(
        Object.entries(this.searchitems).slice(start, start + this.showcount)
      )
    },
    pagescount: function () {
      return Math.ceil(Object.keys(this.searchitems).length / this.showcount)
    }
  }
};
</script>  
<style scoped>
.search-container {
  width: 100%;
}
.search-button {
  width: 40px;
}
.search-icon {
  width: 100%;
}
.search-cancel {
  margin: 8px;
}
.page-link-container {
  margin: 8px;
}
.page-link {
  margin: 2px;
  display: inline-block;
  color: blue;
  text-decoration-line: underline;
}
.page-link-current {
  color: black !important;
  text-decoration-line: none !important;
  font-weight: bold !important;
}
</style>