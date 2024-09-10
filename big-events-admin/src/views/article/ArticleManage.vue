<script setup>
import PageContainer from '@/components/PageContainer.vue'
</script>

<template>
  <div class="container">
    <PageContainer title="文章管理">
      <template #extra>
        <el-button type="primary" size="large" icon="Promotion">发布文章</el-button>
      </template>
    </PageContainer>
  </div>
</template>

<style scoped></style>
