import { createRouter, createWebHashHistory } from 'vue-router'
// 引入NProgress进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// 引入路由配置
import routes_base from './routes.base.js'
import { useUserStore } from '@/stores/index.js'

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes_base,
})

// 前置操作 next可选，但是已经不推荐使用啦
router.beforeEach((to, from) => {
  // 进度条
  NProgress.start()
  // 仓库示例
  const user = useUserStore()
  if (!user.token && to.path !== '/login') {
    return '/login'
  }
  if (user.token && to.path === '/login') {
    return from.path
  }
  if (to.path === '/') {
    return redirect('/article/manage')
  }
  // 前置守卫默认返回 true ，所以不写也可以
  return true
})

// 后置操作
router.afterEach(() => {
  NProgress.done()
})

export default router
