import axios from 'axios'

// 创建 Axios 实例
const instance = axios.create({
  baseURL: '/api', // 替换为你的 API 基础 URL
  timeout: 5000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json',
  },
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么，比如添加 Token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    // 处理请求错误
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 确保返回数据的 code 为 200 才视为成功
    if (response.data.code === 200) {
      return response.data.data // 返回请求体的 data
    } else {
      return Promise.reject(new Error(response.data.message || '请求失败'))
    }
  },
  (error) => {
    // 处理响应错误
    console.error('API Error:', error)
    return Promise.reject(error)
  }
)

export default instance
