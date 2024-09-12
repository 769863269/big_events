<script setup>
import PageContainer from '@/components/PageContainer.vue'
import { useUserStore } from '@/stores/index'
import { myUserinfoUpdate } from '@/api/user'
import { ref } from 'vue'

const userStore = useUserStore()
const {
  userInfo: { username, nickname, email, id },
} = useUserStore()

const userInfo = ref({ username, nickname, email, id })

const formRef = ref()

const rules = {
  nickname: [
    { required: true, message: '请输入用户昵称', trigger: 'blur' },
    {
      pattern: /^\S{2,10}$/,
      message: '昵称必须是2-10位的非空字符串',
      trigger: 'blur',
    },
  ],
  email: [
    { required: true, message: '请输入用户邮箱', trigger: 'blur' },
    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' },
  ],
}

const loading = ref(false)

const onSubmit = async () => {
  loading.value = true
  const valid = await formRef.value.validate()
  if (valid) {
    await myUserinfoUpdate(userInfo.value)
    await userStore.getMyUserinfo()
    ElMessage.success('修改成功')
  }
  loading.value = false
}
</script>

<template>
  <PageContainer title="基本资料">
    <el-row>
      <el-col :md="14">
        <el-form
          v-loading="loading"
          :model="userInfo"
          :rules="rules"
          ref="formRef"
          label-width="100px"
          size="large"
        >
          <el-form-item label="登录账号">
            <el-input v-model="userInfo.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="用户昵称" prop="nickname">
            <el-input v-model="userInfo.nickname"></el-input>
          </el-form-item>
          <el-form-item label="用户邮箱" prop="email">
            <el-input v-model="userInfo.email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">提交修改</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </PageContainer>
</template>

<style scoped></style>
