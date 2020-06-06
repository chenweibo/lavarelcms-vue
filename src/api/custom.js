import request from '@/utils/request'

export function getList() {
  return request({
    url: 'components',
    method: 'get'
  })
}

export function store(data) {
  return request({
    url: 'components',
    method: 'post',
    data
  })
}

export function deleteComponent(id) {
  return request({
    url: `components/${id}`,
    method: 'delete'
  })
}

export function update(id, data) {
  return request({
    url: `components/${id}`,
    method: 'put',
    data
  })
}

export function show(id) {
  return request({
    url: `components/${id}`,
    method: 'get'

  })
}

