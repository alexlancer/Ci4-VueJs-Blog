<template>
  <div class="row">
    <div
      class="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 mt-5 pt-3 pb-3 bg-white from-wrapper"
    >
      <div class="container">
        <h3>Signin</h3>
        <hr />

        <form @submit.prevent="signin()" action="/" method="post">
          <div class="form-group">
            <label for="email">Email address</label>
            <input type="text" class="form-control" name="email" id="email" v-model="email" />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              class="form-control"
              name="password"
              id="password"
              v-model="password"
            />
          </div>
          <alert v-if="msg" :msg="msg" :classAlert="classAlert"></alert>

          <div class="row">
            <div class="col-12 col-sm-4">
              <button type="submit" class="btn btn-primary">Login</button>
            </div>
            <div class="col-12 col-sm-8 text-right">
              <router-link to="/signup">Don't have an account yet?</router-link>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Alert from "./cmps/Alert";

export default {
  data() {
    return {
      token: null,
      expires_in: null,
      email: "",
      password: "",
      msg: null,
      classAlert: null
    };
  },
  components: {
    Alert
  },
  methods: {
    signin() {
      const auth = {
        username: process.env.VUE_APP_CLIENT_ID,
        password: process.env.VUE_APP_CLIENT_SECRET
      };
      const form = new FormData();

      form.append("username", this.email);
      form.append("password", this.password);
      form.append("grant_type", "password");

      this.$guest
        .post("/login", form, { auth })
        .then(res => {
          this.msg = "You have been successfully logged in!";
          this.classAlert = "success";
          this.email = "";
          this.password = "";

          this.token = res.data.access_token;
          this.expires_in = res.data.expires_in;
          const expiresMs = this.expires_in * 1000;
          const now = new Date();
          const expireDate = new Date(now.getTime() + expiresMs);
          localStorage.setItem("token", this.token);
          localStorage.setItem("expires", expireDate);

          this.$store.dispatch("login", expiresMs);
        })
        .catch(err => {
          console.log(err);

          this.msg = err.response.data.error_description;
          this.classAlert = "danger";
        });
    }
  }
};
</script>

<style>
</style>