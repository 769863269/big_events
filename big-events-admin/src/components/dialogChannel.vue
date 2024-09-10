<script setup>
import { ref } from 'vue'
import { myCateAdd, myCateInfo } from '@/api/article'

const dialogVisible = ref(false)

// 关闭对话框前执行的回调方法
const beforeClose = () => {
  dialogVisible.value = false
  formRef.value.resetFields()
}

const open = async row => {
  formModel.value = { ...row }
  dialogVisible.value = true
}

defineExpose({
  open,
})

const emits = defineEmits(['success'])

// 表单操作区域
// 表单元素dom
const formRef = ref()
// 表单数据
const formModel = ref({
  cate_name: '',
  cate_alias: '',
})
// 表单验证规则
const rules = {
  cate_name: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    {
      pattern: /^\S{1,10}$/,
      message: '分类名必须是1-10位的非空字符',
      trigger: 'blur',
    },
  ],
  cate_alias: [
    { required: true, message: '请输入分类别名', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{1,15}$/,
      message: '分类别名必须是1-15位的字母数字',
      trigger: 'blur',
    },
  ],
}
// 表单提交
const onSubmit = async formEl => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      // 大于0 都是真
      const isEdit = formModel.value.id
      let res = {}
      if (isEdit) {
        res = await myCateInfo(formModel.value)
      } else {
        res = await myCateAdd(formModel.value)
      }
      if (res.code === 0) {
        ElMessage({
          type: 'success',
          message: res.message,
        })
        beforeClose()
        emits('success')
      }
    } else {
      ElMessage({
        type: 'error',
        message: '表单验证失败，请确认是否输入错误',
      })
    }
  })
}
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    :before-close="beforeClose"
    :title="formModel.id ? '编辑分类' : '新增分类'"
    width="40%"
  >
    <el-form ref="formRef" :model="formModel" :rules="rules" label-width="100px" style="padding-right: 30px">
      <el-form-item label="分类名称" prop="cate_name">
        <el-input v-model="formModel.cate_name"></el-input>
      </el-form-item>
      <el-form-item label="分类别名" prop="cate_alias">
        <el-input v-model="formModel.cate_alias"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit(formRef)">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped></style>
