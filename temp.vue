<template>
    <div>
        <div>{{obj.name1}}</div>
        <div>{{text}}</div>
    </div>
</template>
<script>
    module.exports = {
        data() {
            return {
                msg: 'Hello Vue.js'
            }
        },
        props: ["obj", "text"],
        watch: {
            "obj": function () {
                alert(obj.name1);
            }
        }
    }
</script>