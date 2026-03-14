import axios from '../../utils/axios'

// 分片上传
export function uploadFileChunk(data) {
  return axios.post({
    url: '/file/uploadBig',
    data
  })
}

// 检查文件状态
export function checkFileChunk(params) {
  return axios.get({
    url: '/file/uploadBig',
    params
  })
}
