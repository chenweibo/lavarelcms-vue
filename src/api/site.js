import request from '@/utils/request'

export function getSite(data) {
  return request({
    url: '/admin/site',
    method: 'get',
    params: data
  })
}

export function saveSite(data) {
  return request({
    url: '/admin/site',
    method: 'post',
    data
  })
}
