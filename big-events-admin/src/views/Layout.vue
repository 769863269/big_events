<script setup>
import headerContainer from '@components/headerContainer.vue'
import asideContainer from '@components/asideContainer.vue'
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <headerContainer />
      </el-header>
      <el-container>
        <el-aside width="250px">
          <asideContainer />
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.common-layout {
  height: 100%;

  .el-container {
    height: 100%;
  }

  .el-header {
    margin: 0;
    padding: 0;
  }
}
</style>
