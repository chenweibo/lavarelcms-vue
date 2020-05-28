import request from '@/utils/request'

export function getlist(data) {
  return request({
    url: '/admin/recycle',
    method: 'get',
    params: data
  })
}

export function restore(id) {
  return request({
    url: `/admin/recycle/${id}`,
    method: 'post'

  })
}
