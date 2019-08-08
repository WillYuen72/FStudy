export default [
  {
    path: '/delete',
    component: () => import('../../layouts/DemoLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('../../views/demo/table/delete.vue')
      },
      {
        path: 'delete',
        component: () => import('../../views/demo/table/delete.vue')
      }
    ]
  }
]
