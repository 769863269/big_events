<script setup>
import { reactive, ref } from 'vue'
import { apiLogin, apiRegister } from '../../api/login'
import { useUserStore } from '@/stores/index'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const fromData = reactive({
  // 1-10位大小写字母和数字
  username: 'kongdong',
  // 6-15位非空格字符
  password: '123456',
  // 确认密码
  repassword: '123456',
})

// 是否注册 0登录  1注册
const isRegister = ref(0)

// 表单dom元素
const fromRef = ref(null)

// 自定义验证规则
const checkPassword = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('确认密码不得为空'))
  } else if (value !== fromData.password) {
    callback(new Error('确认密码与密码不匹配'))
  } else {
    callback()
  }
}

// 表单验证规则
const fromRules = reactive({
  username: [
    { required: true, message: '用户名不得为空', trigger: 'blur' },
    { min: 1, max: 10, message: '用户名长度 1 - 10 个字符', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '密码不得为空', trigger: 'blur' },
    { min: 5, max: 15, message: '密码长度 5 - 15 个字符', trigger: 'blur' },
  ],
  repassword: [{ validator: checkPassword, trigger: 'blur' }],
})

// 提交表单
const submitForm = (formEl, type) => {
  if (!formEl) return
  formEl.validate(valid => {
    if (valid) {
      switch (type) {
        case 0:
          postApiLogin()
          break
        case 1:
          postApiRegister()
          break
      }
    } else {
      console.log('error submit!')
    }
  })
}

const postApiLogin = async () => {
  const res = await apiLogin(fromData)
  if (res?.code === 0) {
    ElMessage({
      type: 'success',
      message: res.message,
    })
    userStore.setToken(res.token)
    router.push('/')
  }
}

const postApiRegister = async () => {
  const res = await apiRegister(fromData)
  if (res?.code === 0) {
    ElMessage({
      type: 'success',
      message: res.message,
    })
    // 注册成功 转跳到登录页面
    isRegister.value = 0
  }
}
</script>

<template>
  <div class="wrapper">
    <div class="container">
      <div class="form-box">
        <el-form :model="fromData" ref="fromRef" :rules="fromRules" style="width: 60%">
          <el-form-item>
            <div class="title">
              <span class="text-3xl">
                {{ isRegister ? '注册模块' : '登录模块' }}
              </span>
            </div>
          </el-form-item>
          <el-form-item prop="username">
            <el-input
              type="text"
              v-model="fromData.username"
              prefix-icon="User"
              size="large"
              clearable
              placeholder="请输入用户名"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              v-model="fromData.password"
              prefix-icon="Lock"
              size="large"
              clearable
              placeholder="请输入密码"
            />
          </el-form-item>
          <el-form-item prop="repassword" v-if="isRegister">
            <el-input
              type="password"
              v-model="fromData.repassword"
              prefix-icon="Lock"
              size="large"
              clearable
              placeholder="请再次输入密码"
            />
          </el-form-item>
          <div class="tips w-full flex justify-between items-center mb-3">
            <span class="cursor-pointer hover:text-cyan-600">忘记密码?</span>
            <span class="cursor-pointer hover:text-cyan-600" @click="isRegister = 0" v-if="isRegister">立即登录</span>
            <span class="cursor-pointer hover:text-cyan-600" @click="isRegister = 1" v-else>立即注册</span>
          </div>
          <el-button
            type="primary"
            size="large"
            class="w-full"
            style="font-size: 22px"
            @click="submitForm(fromRef, isRegister)"
          >
            {{ isRegister ? '注册' : '登录' }}
          </el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100vh;
  background-color: rgb(200, 216, 237);
  display: flex;
  justify-content: center;
  align-items: center;

  .container {
    width: 600px;

    background: rgba(255, 255, 255, 0.55);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(10.5px);
    -webkit-backdrop-filter: blur(10.5px);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.18);

    .form-box {
      width: 100%;
      height: 100%;

      display: flex;
      justify-content: center;
      align-items: center;

      margin: 50px 0;

      .title {
        width: 100%;
        text-align: center;
      }
    }
  }
}
</style>
