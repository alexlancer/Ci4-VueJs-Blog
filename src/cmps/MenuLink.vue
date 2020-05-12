<template>
  <router-link class="nav-item" active-class="active" :to="path" tag="li">
    <a class="nav-link">{{text}}</a>
  </router-link>
</template>

<script>
export default {
  props: ["path", "text"]
};
</script>

<style>
</style>