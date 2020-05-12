<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <router-link class="navbar-brand" :to="(loggedIn ? '/' : '/signin')">{{brand}}</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul v-if="!loggedIn" class="navbar-nav mr-auto">
          <MenuLink path="/signin" text="Signin"></MenuLink>
          <MenuLink path="/signup" text="Signup"></MenuLink>
        </ul>
        <ul v-else class="navbar-nav mr-auto">
          <MenuLink path="/" text="Admin"></MenuLink>

          <li class="nav-item">
            <a class="nav-link" href="#" @click.prevent="logout()">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import MenuLink from "./MenuLink";
export default {
  props: ["loggedIn"],
  data() {
    return {
      brand: process.env.VUE_APP_APPNAME
    };
  },
  components: {
    MenuLink
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>

<style>
</style>