import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import about from './route/about'
import demo from './route/demo'
import viewInfo from './route/view'
import edit from './route/edit'
import add from './route/add'
import remove from './route/remove'

Vue.use(Router)

const instance = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    }
  ]
})

instance.addRoutes(about)
instance.addRoutes(demo)
instance.addRoutes(viewInfo)
instance.addRoutes(edit)
instance.addRoutes(add)
instance.addRoutes(remove)

instance.beforeEach((to, from, next) => {
  /* must call `next` */
  console.log(from, to)
  next()
})

export default instance
