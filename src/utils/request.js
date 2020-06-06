import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Authorization'] = 'Bearer ' + getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    const status = response.status

    if (status === 204) {
      Message({
        message: '删除成功',
        type: 'success',
        duration: 5 * 1000
      })

      return res
    }

    return res
  },
  error => {
    const status = error.response.status
    const data = error.response.data
    if (status === 422) {
      if (data.errors === undefined) {
        Message({
          message: data.message,
          type: 'error',
          duration: 3 * 1000
        })
        return Promise.reject(error)
      }

      Message({
        message: Object.values(data.errors)[0][0],
        type: 'error',
        duration: 5 * 1000
      })

      return Promise.reject(error)
    }

    if (status === 413) {
      Message({
        message: '文件太大,请处理后上传',
        type: 'error',
        duration: 5 * 1000
      })

      return Promise.reject(error)
    }

    if (status === 401) {
      MessageBox.confirm('您已注销，可以取消以保留在该页面上，或者再次登录', '确认登出', {
        confirmButtonText: '重新登入',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
      }).catch(() => {})

      return Promise.reject(error)
    }
    // console.log(JSON.stringify(data)) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
