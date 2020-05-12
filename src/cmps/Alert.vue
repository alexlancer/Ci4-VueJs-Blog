<template>
  <div class="col-12">
    <div :class="'alert alert-' + classAlert" role="alert" v-html="msg"></div>
  </div>
</template>

<script>
export default {
  props: ["msg", "classAlert"]
};
</script>

<style>
</style>