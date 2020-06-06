import request from '@/utils/request'

export function getBannerList() {
  return request({
    url: 'banners',
    method: 'get'
  })
}

export function store(data) {
  return request({
    url: 'banners',
    method: 'post',
    data
  })
}

export function create() {
  return request({
    url: 'banners/create',
    method: 'get'
  })
}

export function deleteBanner(id) {
  return request({
    url: `banners/${id}`,
    method: 'delete'
  })
}

export function update(id, data) {
  return request({
    url: `banners/${id}`,
    method: 'put',
    data
  })
}
