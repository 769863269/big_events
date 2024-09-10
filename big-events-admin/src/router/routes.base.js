const routes = [
  {
    path: '/login',
    component: () => import('@/views/login/LoginContainer.vue'),
  },
  {
    path: '/',
    component: () => import('@/views/Layout.vue'),
    redirect: '/article/manage',
    children: [
      {
        path: '/article/manage',
        component: () => import('@/views/article/ArticleManage.vue'),
      },
      {
        path: '/article/channel',
        component: () => import('@/views/article/ArticleChannel.vue'),
      },
      {
        path: '/user/avatar',
        component: () => import('@/views/user/UserAvatar.vue'),
      },
      {
        path: '/user/profile',
        component: () => import('@/views/user/UserProfile.vue'),
      },
      {
        path: '/user/password',
        component: () => import('@/views/user/UserPassword.vue'),
      },
    ],
  },
]

export default routes
