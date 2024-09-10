import http from '@/utils/a_request'

export const myUserinfo = () => {
  return http.get('/my/userinfo', {})
}
