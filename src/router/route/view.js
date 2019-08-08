export default [
    {
      path: '/viewInfo',
      component: () => import('../../layouts/DemoLayout.vue'),
      children: [
        {
          path: '',
          component: () => import('../../views/demo/table/view.vue')
        },
        {
          path: 'viewInfo',
          component: () => import('../../views/demo/table/view.vue')
        }
      ]
    }
  ]
  