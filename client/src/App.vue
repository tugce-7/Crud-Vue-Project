<template>   
 <Navbar/>
  <router-view/>
  
  

</template>

<script>
import Navbar from '@/components/Navbar.vue'
import axios from 'axios'
export default{
  components: {
    Navbar,
  },
  
   created() {

    if (localStorage.getItem('token') === null) {
      this.$router.push('/Login');
    }
  },
  mounted(){
    axios.get('http://localhost:5000/user', {headers: { token: localStorage.getItem('token')}})
    .then(res=> {
      console.log(res)
    })
  }
}
</script>

<style lang="scss">

</style>


