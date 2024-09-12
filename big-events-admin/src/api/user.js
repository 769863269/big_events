import http from '@/utils/a_request'
import request from '@/utils/request'

// 获取用户数据
export const myUserinfo = () => {
  return http.get('/my/userinfo', {})
}

// 更新用户数据
export const myUserinfoUpdate = ({ id, nickname, email }) => {
  return http.put('/my/userinfo', {}, { id, nickname, email })
}

// 更新-用户头像
export const myUpdateAvatar = avatar => {
  return http.patch('/my/update/avatar', {}, { avatar })
}

// 更新-用户密码
export const myUpdatepwd = data => {
  return http.patch('/my/updatepwd', {}, data)
}

// 获取-侧边栏数据
export const myMenus = () => {
  return http.get('/my/menus', {})
}
