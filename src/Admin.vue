<template>
  <div class="row">
    <div class="col-12 mt-5 pt-3 pb-3 bg-white from-wrapper">
      <h3>Post</h3>
      <hr />
      <form @submit.prevent="save()">
        <div class="row">
          <div class="col-12 col-sm-8">
            <div class="row">
              <div class="col-12">
                <div class="form-group">
                  <label for="firstname">Title</label>
                  <input type="text" class="form-control" name="title" id="title" v-model="title" />
                </div>
              </div>
              <div class="col-12">
                <div class="form-group">
                  <label for="content">Content</label>
                  <textarea
                    type="text"
                    class="form-control"
                    name="content"
                    rows="7"
                    id="content"
                    v-model="content"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-sm-4">
            <img class="img-fluid" :src="imgPreview" alt />
            <div class="form-group mt-3">
              <input
                type="file"
                @change="updatePreview($event)"
                ref="featured_image"
                class="form-control-file"
              />
            </div>
          </div>
          <alert v-if="msg" :msg="msg" :classAlert="classAlert"></alert>
        </div>

        <div class="row">
          <div class="col-12">
            <hr />
            <button type="submit" class="btn btn-primary">{{(post_id ? 'Update' : 'Create')}}</button>
            <button @click.prevent="cancel()" class="btn btn-secondary float-right">Cancel</button>
          </div>
        </div>
      </form>
    </div>
    <div v-if="posts.length > 0" class="col-12 mt-5 pt-3 pb-3 bg-white from-wrapper">
      <h3>Posts</h3>
      <hr />
      <PostItem
        @delete="deletePost"
        @edit="getPost"
        v-for="(post, index) in posts"
        :key="post.post_id"
        :index="index"
        :post="post"
        :imgPlaceholder="imgPlaceholder"
      ></PostItem>
    </div>
  </div>
</template>

<script>
import Alert from "./cmps/Alert";
import PostItem from "./cmps/PostItem";
export default {
  data() {
    return {
      msg: null,
      classAlert: null,
      post_id: null,
      post_index: null,
      posts: [],
      title: "",
      content: "",
      image: "",
      imgPlaceholder: "http://via.placeholder.com/300"
    };
  },
  computed: {
    imgPreview() {
      return this.image == "" ? this.imgPlaceholder : this.image;
    }
  },
  components: {
    Alert,
    PostItem
  },
  methods: {
    save() {
      if (this.post_id) {
        this.update();
      } else {
        this.create();
      }
    },
    create() {
      const form = new FormData();
      form.append("title", this.title);
      form.append("description", this.content);
      form.append("featured_image", this.$refs.featured_image.files[0]);

      this.$api
        .post("/blog", form)
        .then(res => {
          this.msg = "Post has been created";
          this.classAlert = "success";
          this.posts.unshift(res.data);
          this.cancel(true);
        })
        .catch(err => {
          this.msg = err.response.data.messages.error;
          this.classAlert = "danger";
        });
    },
    update() {
      const form = new FormData();
      form.append("title", this.title);
      form.append("description", this.content);

      if (this.$refs.featured_image.files.length > 0)
        form.append("featured_image", this.$refs.featured_image.files[0]);

      this.$api
        .post("/blog/update/" + this.post_id, form)
        .then(res => {
          this.msg = "Post has been updated";
          this.classAlert = "success";
          this.posts[this.post_index] = res.data;
          this.cancel(true);
        })
        .catch(err => {
          this.msg = err.response.data.messages.error;
          this.classAlert = "danger";
        });
    },
    get() {
      this.$api
        .get("/blog")
        .then(res => {
          this.posts = res.data;
        })
        .catch(err => {
          console.log(err.response);

          this.msg = err.response.data.messages.error;
          this.classAlert = "danger";
        });
    },
    getPost(post_id, post_index) {
      this.cancel();
      this.post_id = post_id;
      this.post_index = post_index;

      this.$api.get("/blog/" + post_id).then(res => {
        this.title = res.data.post_title;
        this.content = res.data.post_description;
        var image = res.data.post_featured_image;
        if (image != "")
          this.image = "http://localhost/assets/uploads/" + image;
        else this.image = "";

        window.scroll(0, 0);
      });
    },
    deletePost(id, index) {
      this.$api
        .delete("/blog/" + id)
        .then(() => {
          this.msg = "Post has been deleted";
          this.classAlert = "warning";
          this.cancel(true);
          this.posts.splice(index, 1);
          window.scroll(0, 0);
        })
        .catch(err => {
          this.msg = err.response.data.messages.error;
          this.classAlert = "danger";
        });
    },
    updatePreview(event) {
      const file = event.target.files[0];
      this.image = URL.createObjectURL(file);
    },
    cancel(alertShow = false) {
      this.post_index = null;
      this.post_id = null;
      this.title = "";
      this.content = "";
      this.image = "";
      if (!alertShow) {
        this.msg = null;
        this.classAlert = null;
      }
    }
  },
  created() {
    this.get();
  }
};
</script>

<style>
</style>