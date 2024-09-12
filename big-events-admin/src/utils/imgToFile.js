import axios from 'axios'

// 从网络图片到file对象
async function fetchImageAsFile(url, fileName) {
  try {
    // 发送请求以获取图片数据
    const response = await axios.get(url, { responseType: 'arraybuffer' })

    // 根据响应内容类型判断文件格式（这里简化处理）
    const contentType = response.headers['content-type']

    // 创建 Blob 对象
    const blob = new Blob([response.data], { type: contentType })

    // 创建并返回 File 对象
    return new File([blob], fileName, { type: contentType })
  } catch (error) {
    console.error('将图片转换为File对象时发生错误:', error)
    throw error
  }
}

export default fetchImageAsFile
