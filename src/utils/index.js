
/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, ' ') +
      '"}'
  )
}

export const type = [{ value: '0', label: '默认' }, { value: '1', label: '单篇' }, { value: '2', label: '列表' }]

export function toTree(data) {
  const cloneData = JSON.parse(JSON.stringify(data)) // 对源数据深度克隆
  return cloneData.filter(father => { // 循环所有项，并添加children属性
    const branchArr = cloneData.filter(child => father.id === child.parentId) // 返回每一项的子级数组
    branchArr.length > 0 ? father.children = branchArr : '' // 给父级添加一个children属性，并赋值
    return father.parentId === 0 // 返回第一层
  })
}

export const customizeList = { input: '文本', fileUpload: '文件上传组件', editor: '富文本编辑器',
  imgMoreUpload: '多图上传', textarea: '文本域', time: '日期选择器', OneImgupload: '单图上传',
  switch: '滑块'
}

export const customizeArray = [
  { value: 'input', label: '文本' },
  { value: 'fileUpload', label: '文件上传组件' },
  { value: 'editor', label: '富文本编辑器' },
  { value: 'imgMoreUpload', label: '多图上传' },
  { value: 'textarea', label: '文本域' },
  { value: 'time', label: '日期选择器' },
  { value: 'OneImgupload', label: '单图上传' },
  { value: 'switch', label: '滑块' }
]

export function isDevelopment() {
  if (process.env.NODE_ENV === 'development') {
    return true
  } else {
    return false
  }
}

export function maxNum(arr) {
  const result = Math.max.apply(Math, arr.map(function(o) {
    return o.id
  }))

  return result
}

export function imPath() {
  if (process.env.NODE_ENV === 'development') {
    return process.env.VUE_APP_BASE_IMG
  } else {
    return document.location.host
  }
}
