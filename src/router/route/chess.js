export default [
  {
    path: '/gobang',
    name: 'gobang',
    component: () => import(/* webpackChunkName: "about" */ '../../views/demo/gobang/PageGobang.vue')
  }
]
