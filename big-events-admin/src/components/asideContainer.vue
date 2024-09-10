<script setup></script>

<template>
  <el-menu class="default-menu-class" router :default-active="$route.path">
    <el-menu-item index="/article/channel">
      <el-icon><Memo /></el-icon>
      <span>文章分类</span>
    </el-menu-item>
    <el-menu-item index="/article/manage">
      <el-icon><Reading /></el-icon>
      <span>文章管理</span>
    </el-menu-item>
    <el-sub-menu index="/user">
      <template #title>
        <el-icon><User /></el-icon>
        <span>个人中心</span>
      </template>
      <el-menu-item index="/user/profile">
        <el-icon><UserFilled /></el-icon>
        <span>基本资料</span>
      </el-menu-item>
      <el-menu-item index="/user/avatar">
        <el-icon><PictureFilled /></el-icon>
        <span>更换头像</span>
      </el-menu-item>
      <el-menu-item index="/user/password">
        <el-icon><Promotion /></el-icon>
        <span>重置密码</span>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<style lang="scss" scoped>
.default-menu-class {
  height: 100%;
}
</style>
