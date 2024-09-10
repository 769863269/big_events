import axios from 'axios'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useUserStore } from '../stores/index'

// 创建实例
const instance = axios.create({
  baseURL: 'http://big-event-vue-api-t.itheima.net', //设置过跨域的api接口名称
  timeout: 5000, // 超时响应
})

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers.Authorization = userStore.token
    }
    // 在发送请求之前做些什么
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  },
)

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    switch (response.data.code) {
      case 0:
        return response.data
      case 1:
        ElMessage({
          message: response.data.message || '服务发生异常错误',
          type: 'error',
        })
        break
      case 2:
        ElMessage({
          message: response.data.message || '服务发生异常错误',
          type: 'error',
        })
        break
      default:
        return Promise.reject(response)
    }
  },
  function (error) {
    const userStore = useUserStore()
    const router = useRouter()
    // 身份验证失败 或者 token过期 返回401
    if (error.response?.status === 401) {
      ElMessage({
        message: '用户登录凭证已过期',
        type: 'error',
      })
      userStore.removeToken()
      router.push({ path: '/login' })
    }
    ElMessage({
      message: error.response.data.message || '服务发生异常错误',
      type: 'error',
    })
    return Promise.reject(error)
  },
)

export default instance
