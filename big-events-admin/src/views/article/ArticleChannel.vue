<script setup>
import PageContainer from '@/components/PageContainer.vue'
import { onMounted, ref } from 'vue'
import { myCateList, myCateDel } from '@/api/article'
import DialogChannel from '@/components/dialogChannel.vue'

// 表格数据操作区域
const loading = ref(false)
const tableDataList = ref([])
const onAddChannel = () => {
  DialogChannelRef.value.open({})
}
const onEditChannel = row => {
  DialogChannelRef.value.open(row)
}
const onDelChannel = async row => {
  const res = await myCateDel(row.id)
  if (res.code === 0) {
    ElMessage.success(res.message)
    getMyCateList()
  }
}

// 自定义对话框操作区域
const DialogChannelRef = ref()
const onDialogSuccess = () => {
  getMyCateList()
}

// 生命周期 - 挂载完毕
onMounted(() => {
  getMyCateList()
})

// 接口操作区域
// 获取文章分类列表数据
const getMyCateList = async () => {
  loading.value = true
  const res = await myCateList()
  if (res.code === 0) {
    tableDataList.value = res.data
  }
  loading.value = false
}
</script>

<template>
  <div class="container">
    <PageContainer title="文章分类">
      <template #extra>
        <el-button type="primary" size="large" icon="Promotion" @click="onAddChannel()">添加分类</el-button>
      </template>
      <el-table :data="tableDataList" v-loading="loading" style="width: 100%">
        <el-table-column label="序号" width="100" align="center" type="index"></el-table-column>
        <el-table-column label="编号ID" min-width="130" align="center" prop="id"></el-table-column>
        <el-table-column label="分类名称" min-width="130" align="center" prop="cate_name"></el-table-column>
        <el-table-column label="分类别名" min-width="130" align="center" prop="cate_alias"></el-table-column>
        <el-table-column label="操作模块" width="160" align="center">
          <template #default="{ row }">
            <el-button icon="Edit" circle plain type="primary" @click="onEditChannel(row)"></el-button>
            <el-button icon="Delete" circle plain type="danger" @click="onDelChannel(row)"></el-button>
          </template>
        </el-table-column>
        <template #empty>
          <el-empty description="没有数据" />
        </template>
      </el-table>
    </PageContainer>

    <DialogChannel ref="DialogChannelRef" @success="onDialogSuccess"></DialogChannel>
  </div>
</template>

<style scoped></style>
