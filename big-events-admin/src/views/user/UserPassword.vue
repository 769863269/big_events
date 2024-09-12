<script setup>
import PageContainer from '@/components/PageContainer.vue'
import { myUpdatepwd } from '@/api/user'
import { useUserStore } from '@/stores/index'
import { reactive, ref } from 'vue'

const userStore = useUserStore()

const formRef = ref()
const pwdForm = ref({
  old_pwd: '',
  new_pwd: '',
  re_pwd: '',
})

// 自定义验证规则
const verifyNewPassword = (rule, value, callback) => {
  // 验证新密码是否与旧密码一样
  if (value === pwdForm.value.old_pwd) {
    callback(new Error('新密码不得与原密码一样'))
  } else {
    callback()
  }
}
const verifyConfirmPassword = (rule, value, callback) => {
  // 验证新密码是否与旧密码一样
  if (value !== pwdForm.value.new_pwd) {
    callback(new Error('确认密码必须与新密码一致'))
  } else {
    callback()
  }
}

// 表单验证
const rules = reactive({
  old_pwd: [
    { required: true, message: '原密码不得为空', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '原密码长度必须是6-15位的非空字符串',
      trigger: 'blur',
    },
  ],
  new_pwd: [
    { required: true, message: '新密码不得为空', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '新密码长度必须是6-15位的非空字符串',
      trigger: 'blur',
    },
    { validator: verifyNewPassword, trigger: 'blur' },
  ],
  re_pwd: [
    { required: true, message: '确认密码不得为空', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '确认密码长度必须是6-15位的非空字符串',
      trigger: 'blur',
    },
    { validator: verifyConfirmPassword, trigger: 'blur' },
  ],
})

const onSubmit = async () => {
  try {
    await formRef.value.validate()
    // 更新密码接口
    myUpdatepwd(pwdForm.value).then(res => {
      if (res?.code === 0) {
        ElMessage({
          type: 'success',
          message: '重置密码成功',
        })
        // 清空所有本地数据
        localStorage.clear()
        window.location.href = window.location.origin
      }
    })
  } catch (err) {
    ElMessage({
      type: 'warning',
      message: '重置密码，表单验证失败',
    })
  }
}
const onReset = () => {
  formRef.value.resetFields()
}
</script>

<template>
  <PageContainer title="重置密码">
    <el-row>
      <el-col :md="14">
        <el-form :model="pwdForm" :rules="rules" ref="formRef" label-width="100px" size="large">
          <el-form-item label="原密码" prop="old_pwd">
            <el-input v-model="pwdForm.old_pwd" type="password"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="new_pwd">
            <el-input v-model="pwdForm.new_pwd" type="password"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" prop="re_pwd">
            <el-input v-model="pwdForm.re_pwd" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="onSubmit" type="primary">修改密码</el-button>
            <el-button @click="onReset">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </PageContainer>
</template>

<style scoped></style>
