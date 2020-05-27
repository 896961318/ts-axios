import { isDate, isPlainObject } from './util'

// encodeURI函数二次封装替换特殊字符
function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

// 对URL进行分解
export function buildURL(url: string, params?: any): string {
  // 没有参数返回url
  if (!params) {
    return url
  }

  // 定义数组存储键值对
  const parts: string[] = []

  // 参数进行循环
  Object.keys(params).forEach(key => {
    const val = params[key]
    // 为空跳过不储存
    if (val === null || typeof val === 'undefined') {
      return
    }
    let values = []
    // 判断属性的值是不是数组
    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [val]
    }
    values.forEach(val => {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isPlainObject(val)) {
        val = JSON.stringify(val)
      }
      // 参数加工添加到数组拼接
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })

  let serializedParams = parts.join('&')

  if (serializedParams) {
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }
    // 对url进行拼接
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }

  return url
}
