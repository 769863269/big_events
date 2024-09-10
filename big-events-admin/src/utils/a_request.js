// 导入封装好的axios实例
import request from './request'

const http = {
  /**
   * methods: 请求类型
   * @param url 请求地址
   * @param params 请求参数
   * @param data 提交参数
   */
  get(url, params) {
    const config = {
      method: 'get',
      url: url,
    }
    if (params) config.params = params
    return request(config)
  },
  post(url, params, data) {
    const config = {
      method: 'post',
      url: url,
    }
    if (params) config.params = params
    if (data) config.data = data
    return request(config)
  },
  put(url, params, data) {
    const config = {
      method: 'put',
      url: url,
    }
    if (params) config.params = params
    if (data) config.data = data
    return request(config)
  },
  delete(url, params) {
    const config = {
      method: 'delete',
      url: url,
    }
    if (params) config.params = params
    return request(config)
  },
}
// 导出自定义二次封装请求
export default http
