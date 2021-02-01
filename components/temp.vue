<template>
  <div>
    <div>test</div>
    <div>{{obj}}</div>
  </div>
</template>
<script>
module.exports = {
  data() {
    return {
      msg: "Hello Vue.js",
    };
  },
  props: ["obj", "text"]
};
</script>  