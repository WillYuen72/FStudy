export default [
  {
    path: '/add',
    component: () => import('../../layouts/DemoLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('../../views/demo/table/add.vue')
      },
      {
        path: 'add',
        component: () => import('../../views/demo/table/add.vue')
      }
    ]
  }
]
