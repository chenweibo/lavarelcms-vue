import request from '@/utils/request'

export function clearCache() {
  return request({
    url: '/admin/clearCache',
    method: 'get'
  })
}

export function Cache() {
  return request({
    url: '/admin/Cache',
    method: 'get'
  })
}
