export default [
    {
      path: '/edit',
      component: () => import('../../layouts/DemoLayout.vue'),
      children: [
        {
          path: '',
          component: () => import('../../views/demo/table/edit.vue')
        },
        {
          path: 'edit',
          component: () => import('../../views/demo/table/edit.vue')
        }
      ]
    }
  ]
  