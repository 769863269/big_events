<script setup>
import ChannelSelect from './channelSelect.vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { myArticleAdd, myArticleInfo, myArticleInfoUpdate } from '@/api/article'
import request from '@/utils/request'
import fetchImageAsFile from '@/utils/imgToFile'
import { nextTick, ref } from 'vue'

// 弹出层状态
const visibleDrawer = ref(false)
const loading = ref(false)

// 默认表单数据
const defaultFormData = {
  title: '',
  cate_id: '',
  cover_img: '',
  content: '',
  state: '',
}
const formModel = ref({ ...defaultFormData })
const formRef = ref()
// 表单提交
const onPublish = async state => {
  // 将已发布还是草稿状态，存入 state
  formModel.value.state = state
  // 普通对象无法进行上传图片 需要使用 FormData 对象
  const formDataObj = new FormData()
  // 遍历属性对象
  for (let key in formModel.value) {
    formDataObj.append(key, formModel.value[key])
  }
  // 判断编辑或者新增
  if (formModel.value.id) {
    await myArticleInfoUpdate(formDataObj)
    ElMessage.success('编辑成功')
    visibleDrawer.value = false
    emits('success', 'edit')
  } else {
    // 添加请求
    await myArticleAdd(formDataObj)
    ElMessage.success('添加成功')
    visibleDrawer.value = false
    emits('success', 'add')
  }
}

// 图片操作区域
const imgUrl = ref('')
const onUploadFile = uploadFile => {
  // console.log(uploadFile)
  // uploadFile.raw = File 对象
  // URL.createObjectURL 放入文件对象生成一个本地预览地址
  imgUrl.value = URL.createObjectURL(uploadFile.raw)
  formModel.value.cover_img = uploadFile.raw
}

// 富文本操作区域
const editorRef = ref(null)

const open = async row => {
  visibleDrawer.value = true
  loading.value = true
  if (row.id) {
    const baseURL = request.defaults.baseURL
    const res = await myArticleInfo(row.id)
    if (res.code === 0) {
      formModel.value = res.data
      imgUrl.value = baseURL + formModel.value.cover_img
      // 网络地址转换file对象使用的是ai生成的代码
      const fileObj = await fetchImageAsFile(imgUrl.value, formModel.value.cover_img)
      formModel.value.cover_img = fileObj
    }
  } else {
    // 重置表单数据为初始化数据，避免点击编辑后，在点击添加，表单被编辑的数据污染
    // 重置方法很多种 随便选一个简单的来用即可
    formModel.value = { ...defaultFormData }
    imgUrl.value = '' // 既然表单数据重置了 图片应该也要重置
    nextTick(() => {
      // 由于获取 ref 过快，元素没有加载完成就获取，获取的数据为空
      editorRef.value.setHTML('') // 清空富文本数据
      // console.log(editorRef.value)
    })
  }
  loading.value = false
}

const emits = defineEmits(['success'])
defineExpose({
  open,
})
</script>

<template>
  <el-drawer
    v-model="visibleDrawer"
    :title="formModel.id ? '编辑文章数据' : '新增文章数据'"
    size="50%"
  >
    <!-- 发表文章表单 -->
    <el-form v-loading="loading" :model="formModel" ref="formRef" label-width="100px">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="formModel.title" placeholder="请输入标题" />
      </el-form-item>
      <el-form-item label="文章分类" prop="cate_id">
        <ChannelSelect width="100%" v-model="formModel.cate_id" />
      </el-form-item>
      <el-form-item label="文章封面" prop="cover_img">
        <el-upload
          class="avatar-uploader"
          :auto-upload="false"
          :show-file-list="false"
          :on-change="onUploadFile"
        >
          <img v-if="imgUrl" :src="imgUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <div class="editor">
          <QuillEditor
            ref="editorRef"
            v-model:content="formModel.content"
            contentType="html"
            theme="snow"
          />
        </div>
      </el-form-item>
      <el-form-item>
        <el-button @click="onPublish('已发布')" type="primary" style="width: 150px">发布</el-button>
        <el-button @click="onPublish('草稿')" type="info" style="width: 150px">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }
    .el-upload:hover {
      border-color: var(--el-color-primary);
    }
    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}

.editor {
  width: 100%;
  :deep(.ql-editor) {
    min-height: 200px;
  }
}
</style>
