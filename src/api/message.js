import request from '@/utils/request'

export function getlist(data) {
  return request({
    url: '/messages',
    method: 'get',
    params: data
  })
}

export function read(id, data) {
  return request({
    url: `/messages/${id}`,
    method: 'put',
    data
  })
}

export function deleteMessage(id) {
  return request({
    url: `/messages/${id}`,
    method: 'delete'
  })
}

export function allRead() {
  return request({
    url: `/messages/allRead`,
    method: 'post'
  })
}

export function allDelete() {
  return request({
    url: `/messages/allDelete`,
    method: 'delete'
  })
}
