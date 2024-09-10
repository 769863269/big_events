import http from '@/utils/a_request'

export const apiLogin = data => {
  return http.post('/api/login', {}, data)
}

export const apiRegister = data => {
  return http.post('/api/reg', {}, data)
}
