<template>
<div class="container-fluid mt-4">
    <h1 class="h1">Posts Manager</h1>
    <div class="row">
      <div class="col-8">
       <table class="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Content</th>
              <th>Creator</th>

              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="post in postList" :key="post.id">
              <td>{{ post.id }}</td>
              <td>{{ post.title }}</td>
              <td>{{ post.content }}</td>
               <td>{{ post.creator }}</td>

              <td class="text-right">
                <a href="#" @click="updateItem(post)" class="mr-2">Edit</a> 
                 <a href="#" v-if="updateStatus" @click="updatePost" class="mr-2">Update</a> 

                <a href="#" @click="deletePost(post.id)" class="mr-2">Delete</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div> 
       <div class="col-4">
      
        <div class="card" style="width: 30rem;">
            <div class="card-body">
              <h5 class="card-title mb-2">NEW POST</h5>
             
              <p class="card-text">Title</p>
               <div class="form-floating mb-3">
                <input type="text" v-model="post.title" class="form-control" id="floatingInput" >
                <label for="floatingInput">Title</label>
              </div>
              <p class="card-text">Content</p>
              <div class="form-floating">
                <textarea class="form-control" v-model="post.content" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 100px"></textarea>
                <label for="floatingTextarea2">Content</label>
              </div>
                <p class="card-text">Creator</p>
               <div class="form-floating mb-3">
                <input type="text-muted" v-model="post.creator" class="form-control" id="floatingInput" >
                <label for="floatingInput">Creator</label>
              </div>

              <a href="#" v-if="!updateStatus" @click="savePost" class="btn btn-success mt-1">Save Post</a>

            </div>
          </div>
      </div> 



    </div>
</div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      postList: [],
      post: {
         title: null,
        content: null,
        creator: null
      },
      updateID: null,
      updateStatus: false
    };
  },
  methods:{
     savePost() {
      axios.post("http://localhost:3000/posts", this.post).then(post_save_response => {
        console.log("post_save_response", post_save_response);
        if (post_save_response.status === 201) {
          this.postList.push(post_save_response.data);
        }
        this.user = {
          title: null,
          content: null,
          creator: null
        };
      });
    },
    deletePost(id) {
      axios.delete(`http://localhost:3000/posts/${id}`).then(post_delete_response => {
        console.log("post_delete_response", post_delete_response);
        this.postList = this.postList.filter(b => b.id !== id);
      });
    },
    updatePost() {

      axios.patch(`http://localhost:3000/posts/${this.updateID}`, this.user).then(update_response => {
        const matchedPost = this.postList.findIndex(b => b.id === this.updateID);
        if (matchedPost > -1) {
          this.postList[matchedPost] = {
            ...this.user
          };
          this.updateStatus = false;
          this.updateID = null;
          this.user = {
            title: null,
            content: null,
            creator: null
          };
        }
      });
    },
    updateItem(post_item) {
      console.log("post", post_item);
      // this.post = post_item;
      this.user = {
        title: post_item.title,
        content: post_item.content,
        creator: post_item.creator
      };
    
      this.updateID = post_item.id;
      this.updateStatus = true;
    },
    
  },

  created() {
    axios
      .get("http://localhost:3000/posts")
      .then(post_response => {
        console.log("post_response ", post_response);
        this.postList = post_response.data;
      })
      .catch(e => {
        console.log("Error", e);
      });
  }

}
  </script>