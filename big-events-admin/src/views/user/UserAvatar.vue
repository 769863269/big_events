<script setup>
import PageContainer from '@/components/PageContainer.vue'
import { ref } from 'vue'
import { useUserStore } from '@/stores/index'
import { myUpdateAvatar } from '@/api/user'

const userStore = useUserStore()

const loading = ref(false)

const imgUrl = ref(userStore.userInfo.user_pic)

const onUploadFile = file => {
  // console.log(file)
  // 使用另一种api操作图片显示并获取链接
  const reader = new FileReader()
  reader.readAsDataURL(file.raw)
  reader.onload = () => {
    imgUrl.value = reader.result
  }
}

const onSubmitImg = async () => {
  loading.value = true
  const res = await myUpdateAvatar(imgUrl.value)
  if (res.code === 0) {
    ElMessage({
      type: 'success',
      message: res.message,
    })
    userStore.getMyUserinfo()
  }
  loading.value = false
}
</script>

<template>
  <PageContainer v-loading="loading" title="更换头像">
    <el-row>
      <el-col :md="14">
        <el-upload
          class="avatar-uploader"
          :auto-upload="false"
          :show-file-list="false"
          :on-change="onUploadFile"
        >
          <img v-if="imgUrl" :src="imgUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
        <br />
        <el-button
          @click="onSubmitImg"
          type="primary"
          icon="Upload"
          size="large"
          style="width: 300px"
        >
          上传头像
        </el-button>
      </el-col>
    </el-row>
  </PageContainer>
</template>

<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 300px;
      height: 300px;
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
      width: 300px;
      height: 300px;
      text-align: center;
    }
  }
}
</style>
