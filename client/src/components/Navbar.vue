<template>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
      <router-link to="/" class="navbar-brand">MY POST APP</router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarScroll">
      <ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style="--bs-scroll-height: 100px;">
          <li class="nav-item">
            <router-link to="/" class="nav-link">HOME </router-link>
        </li>
        <li class="nav-item">
            <router-link to="/PostManager" class="nav-link">POST MANAGER</router-link>
        </li>
  
      </ul>
      <form class="d-flex">               

       <ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" :class="logoutClass" >
          <li class="nav-item">
         <a @click.prevent="logout" class="nav-link" href="#" > SIGN OUT</a>
        </li>
      </ul>            

    </form>
     
    </div>
  </div>
</nav>
  
  </template>

  <script>
  export default {
    methods:{
      logout(){
          localStorage.clear()
          this.$router.push('/Login')
      }
    },
    computed: {
      logoutClass(){
      return {
        'd-none' :false
      }},
      token(){
        if(!localStorage.token){
console.log("token yok")
        }
      }
    }
  }
  </script>