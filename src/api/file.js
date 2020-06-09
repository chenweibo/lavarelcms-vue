import request from '@/utils/request'

export function getViewList() {
  return request({
    url: '/admin/file/template',
    method: 'get'
  })
}

export function getFileInfo(params) {
  return request({
    url: 'admin/file/content',
    method: 'get',
    params
  })
}

export function getFileListByPath(path) {
  return request({
    url: 'admin/file/path',
    method: 'get',
    params: {
      path: path
    }
  })
}
