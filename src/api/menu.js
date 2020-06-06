import request from '@/utils/request'

export function getlist() {
  return request({
    url: '/menus',
    method: 'get'
  })
}
export function create() {
  return request({
    url: '/menus/create',
    method: 'get'
  })
}

export function store(data) {
  return request({
    url: '/menus',
    method: 'post',
    data
  })
}

export function deleteMenu(id) {
  return request({
    url: '/menus/' + id,
    method: 'delete'
  })
}

export function updateMenu(id, data) {
  return request({
    url: '/menus/' + id,
    method: 'put',
    data
  })
}

export function show(id) {
  return request({
    url: '/menus/' + id,
    method: 'get'
  })
}
