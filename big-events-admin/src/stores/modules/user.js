// 组合式用法
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { myUserinfo } from '@/api/user'

export const useUserStore = defineStore(
  'user',
  () => {
    // 身份令牌相关
    const token = ref('')
    const setToken = newToken => {
      token.value = newToken
    }
    const removeToken = () => {
      token.value = ''
    }

    // 用户数据相关
    const userInfo = ref({})
    const getMyUserinfo = async () => {
      const res = await myUserinfo()
      if (res.code === 0) {
        userInfo.value = res.data
      }
    }
    const setMyUserinfo = info => {
      userInfo.value = info
    }

    return {
      token,
      setToken,
      removeToken,
      userInfo,
      getMyUserinfo,
      setMyUserinfo,
    }
  },
  {
    // 开启 pinia 持久化
    persist: true,
  },
)
