// 引入自定义样式
import '@/assets/tailwindcss.style.css'
import '@/assets/kongdong.rescss.css'
import '@/assets/kongdong.default.css'
// vue 组件定义
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './stores/pinia.config'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(ElementPlus, {
  locale: zhCn,
})
app.use(pinia)
app.use(router)
app.mount('#app')
