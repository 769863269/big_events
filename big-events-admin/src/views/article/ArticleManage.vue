<script setup>
import PageContainer from '@/components/PageContainer.vue'
import ChannelSelect from '@/components/channelSelect.vue'
import ArticleEdit from '@/components/articleEdit.vue'
import { formatTime } from '@/utils/format'
import { myArticleList, myArticleInfoDelect } from '@/api/article'
import { ref } from 'vue'

// 抽屉子组件操作区域
const articleEditRef = ref()

// 表格按钮操作
const loading = ref(false)
const onAddArticle = () => {
  articleEditRef.value.open({})
}
const onEditArticle = row => {
  articleEditRef.value.open(row)
}
const onDeleteArticle = async row => {
  try {
    await ElMessageBox.confirm('你确认删除该文章信息吗？', '温馨提示', {
      type: 'warning',
      confirmButtonText: '确认',
      cancelButtonText: '取消',
    })
    await myArticleInfoDelect(row.id)
    ElMessage({
      type: 'success',
      message: '删除文章数据成功',
    })
    getMyArticleList()
  } catch (err) {
    console.log(err)
  }
}
// 弹出层提交数据成功触发的回调
const onSuccess = type => {
  // 如果是添加，需要跳转渲染最后一页，编辑直接渲染当前页
  switch (type) {
    case 'add':
      // 进一算法 0.0=1  0.9=1   1.2=2  1.9=2
      const lastPage = Math.ceil((total.value + 1) / params.value.pagesize)
      params.value.pagenum = lastPage
      break
    case 'edit':
      break
  }
  getMyArticleList()
}

// 搜索模块按钮
const onSearch = () => {
  // 设置当前分页到 第一页
  params.value.pagenum = 1
  getMyArticleList()
}
const onReset = () => {
  // 设置当前分页到第一页
  params.value.pagenum = 1
  // 设置分类ID为空
  params.value.cate_id = ''
  // 设置分类状态为空
  params.value.state = ''
  // 获取数据
  getMyArticleList()
}

// 自定义变量 数据绑定
const params = ref({
  pagenum: 1,
  pagesize: 5,
  cate_id: '',
  state: '',
})
const total = ref(0)

// 分页操作
const handleCurrentChange = pageVal => {
  params.value.pagenum = pageVal
  getMyArticleList()
}

// 数据接收
const articleList = ref([])

// 获取数据接口区域
const getMyArticleList = async () => {
  loading.value = true
  const res = await myArticleList(params.value)
  if (res.code === 0) {
    articleList.value = res.data
    total.value = res.total
  }
  loading.value = false
}

// 调用接口区域
getMyArticleList()
</script>

<template>
  <div class="container">
    <PageContainer title="文章管理">
      <template #extra>
        <el-button type="primary" size="large" icon="Promotion" @click="onAddArticle">
          发布文章
        </el-button>
      </template>
      <!-- 搜索模块 -->
      <el-form inline>
        <el-form-item label="文章分类：">
          <!-- vue3 v-model="xx" 代表绑定 :modelValue  @update:modelValue -->
          <ChannelSelect width="130px" v-model="params.cate_id"></ChannelSelect>
        </el-form-item>
        <el-form-item label="发布状态：">
          <el-select v-model="params.state" style="width: 130px">
            <el-option label="已发布" value="已发布"></el-option>
            <el-option label="待审核" value="待审核"></el-option>
            <el-option label="草稿" value="草稿"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch">搜索</el-button>
          <el-button @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
      <!-- 表格数据显示 -->
      <el-table v-loading="loading" :data="articleList" height="285" style="width: 100%">
        <el-table-column label="文章标题" min-width="300" align="left">
          <template #default="{ row }">
            <el-link type="primary" :underline="false">{{ row.title }}</el-link>
          </template>
        </el-table-column>
        <el-table-column label="分类" prop="cate_name" width="120" align="center"></el-table-column>
        <el-table-column label="发表时间" prop="pub_date" width="200" align="center">
          <template #default="{ row }">
            {{ formatTime(row.pub_date) }}
          </template>
        </el-table-column>
        <el-table-column label="状态" prop="state" width="120" align="center"></el-table-column>
        <el-table-column label="操作" width="160" align="center">
          <template #default="{ row }">
            <el-button
              icon="Edit"
              circle
              plain
              type="primary"
              @click="onEditArticle(row)"
            ></el-button>
            <el-button
              icon="Delete"
              circle
              plain
              type="danger"
              @click="onDeleteArticle(row)"
            ></el-button>
          </template>
        </el-table-column>
        <template #empty>
          <el-empty description="没有数据" />
        </template>
      </el-table>
      <!-- 分页操作 -->
      <div class="pagination">
        <el-pagination
          v-model:current-page="params.pagenum"
          v-model:page-size="params.pagesize"
          :total="total"
          @current-change="handleCurrentChange"
          :background="true"
          layout="total, prev, pager, next, jumper"
        />
      </div>
    </PageContainer>
    <!-- 抽屉弹出层 1.新增  2.修改 显示组件 -->
    <ArticleEdit ref="articleEditRef" @success="onSuccess" />
  </div>
</template>

<style lang="scss" scoped>
.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
