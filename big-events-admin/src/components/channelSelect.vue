<script setup>
import { myCateList } from '@/api/article'
import { ref } from 'vue'

const cateListData = ref()
const getMyCateList = async () => {
  const res = await myCateList()
  if (res.code === 0) {
    cateListData.value = res.data
  }
}

// 获取父组件传入的数据
const emits = defineEmits(['update:modelValue'])
defineProps({
  modelValue: {
    type: [Number, String],
  },
  width: {
    type: String,
  },
})

// 调用接口
getMyCateList()
</script>

<template>
  <!-- $event 代表着被抛出的已修改数据 -->
  <el-select
    :style="{ width }"
    :modelValue="modelValue"
    @update:modelValue="emits('update:modelValue', $event)"
  >
    <el-option
      v-for="(item, index) in cateListData"
      :key="index"
      :label="item.cate_name"
      :value="item.id"
    />
  </el-select>
</template>

<style lang="scss" scoped></style>
