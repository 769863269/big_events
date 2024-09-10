<script setup>
defineProps({
  title: {
    required: true,
    type: String,
  },
})
</script>

<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span class="title">{{ title }}</span>
        <div class="extra">
          <!-- 插槽 -->
          <slot name="extra"></slot>
        </div>
      </div>
    </template>
    <slot></slot>
  </el-card>
</template>

<style lang="scss" scoped>
.page-container {
  min-height: 100%;
  box-sizing: border-box;
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .title {
      font-size: 25px;
      font-weight: bold;
    }
  }
}
</style>
