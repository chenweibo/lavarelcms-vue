import request from '@/utils/request'

export function create() {
  return request({
    url: '/contents/create',
    method: 'get'
  })
}

export function store(data) {
  return request({
    url: '/contents',
    method: 'post',
    data
  })
}

export function getList(data) {
  return request({
    url: '/contents',
    method: 'get',
    params: data
  })
}

export function deleteContent(id) {
  return request({
    url: `/contents/${id}`,
    method: 'delete'
  })
}

export function getContent(id) {
  return request({
    url: `/contents/${id}`,
    method: 'get'
  })
}

export function update(id, data) {
  return request({
    url: `/contents/${id}`,
    method: 'put',
    data
  })
}
