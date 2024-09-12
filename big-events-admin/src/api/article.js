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

// 获取-文章管理
export const myArticleList = params => {
  return http.get('/my/article/list', params)
}

// 发布-文章管理
export const myArticleAdd = data => {
  return http.post('/my/article/add', {}, data)
}

// 详情-文章管理
export const myArticleInfo = id => {
  return http.get('/my/article/info', { id })
}

// 更新-文章管理
export const myArticleInfoUpdate = data => {
  return http.put('/my/article/info', {}, data)
}

// 删除-文章管理
export const myArticleInfoDelect = id => {
  return http.delete('/my/article/info', { id })
}
