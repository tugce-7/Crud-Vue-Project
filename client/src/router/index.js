import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import PostManager from '../views/PostManager.vue'
import Login from '../views/Login.vue'



const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/postmanager',
    name: 'PostManager',
    component: PostManager
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }

]



const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})



router.beforeEach((to,from,next)=> {
  console.log(to,from)
  next()

})

export default router
