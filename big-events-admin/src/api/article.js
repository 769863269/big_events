// 文章分类接口操作
import http from '@/utils/a_request'

// 获取文章分类列表
export const myCateList = () => {
  return http.get('/my/cate/list', {})
}

// 增加-文章分类
export const myCateAdd = data => {
  return http.post('/my/cate/add', {}, data)
}

// 更新-文章分类
export const myCateInfo = data => {
  return http.put('/my/cate/info', {}, data)
}

// 删除-文章分类
export const myCateDel = id => {
  return http.delete('/my/cate/del', { id })
}
