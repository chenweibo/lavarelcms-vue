import request from '@/utils/request'

export function imgUpload(data) {
  return request({
    url: 'admin/upload/common',
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data
  })
}

export function fileUpload(data) {
  return request({
    url: 'admin/upload/file',
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data
  })
}
