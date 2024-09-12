<script setup>
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '../stores/index'

const route = useRoute()
const router = useRouter()
const activeIndex = ref(null)
watch(
  () => route.path,
  (newVal, oldVal) => {
    if (route.path === '/') activeIndex.value = '1'
  },
  { deep: true, immediate: true },
)

const defaultAvatar = 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
const userStore = useUserStore()
userStore.getMyUserinfo()

// 用户信息操作模块
const onCommand = item => {
  switch (item) {
    case 'logout':
      ElMessageBox.confirm('你确认退出当前账号吗?', '温馨提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        userStore.removeToken()
        userStore.setMyUserinfo({})
        router.push(`/login`)
      })
      break
    default:
      // 如果不等于退出就默认跳转到对应的用户操作页面
      router.push(`/user/${item}`)
      break
  }
}
</script>

<template>
  <el-menu class="memu-container" mode="horizontal" :ellipsis="false" :default-active="activeIndex">
    <el-menu-item index="1">
      <span class="logo">后台管理系统</span>
    </el-menu-item>
    <div class="right-container">
      <el-menu-item index="2">
        <el-dropdown @command="onCommand">
          <div class="userInfo">
            <span>{{ userStore.userInfo.nickname || userStore.userInfo.username }}</span>
            <el-avatar
              :size="35"
              :src="userStore.userInfo.user_pic ? userStore.userInfo.user_pic : defaultAvatar"
            />
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item icon="User" command="profile">个人信息</el-dropdown-item>
              <el-dropdown-item icon="Edit" command="password">修改密码</el-dropdown-item>
              <el-dropdown-item icon="CircleClose" command="logout">退出账号</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-menu-item>
    </div>
  </el-menu>
</template>

<style lang="scss" scoped>
.memu-container {
  .logo {
    font-size: 26px;
  }
  .right-container {
    width: 100%;
    display: flex;
    justify-content: end;
    align-items: center;

    .userInfo {
      display: flex;
      justify-content: center;
      align-items: center;

      span {
        font-size: 18px;
        margin-right: 10px;
      }
    }

    // 去除下拉框边框
    :deep(.el-tooltip__trigger:focus-visible) {
      outline: unset;
    }
  }
}
</style>
