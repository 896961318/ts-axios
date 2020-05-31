import { isPlainObject } from './util'
import { parse } from 'path'

// 请求头数据转换
function normalizeHeaderName(headers: any, normalizedName: string): void {
  if (!headers) {
    return
  }
  // 全部转换成大写看进行匹配
  Object.keys(headers).forEach(name => {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}

// 定义请求头
export function processHeaders(headers: any, data: any): any {
  normalizeHeaderName(headers, 'Content-Type')
  // 判断头部是不是对象
  if (isPlainObject(headers)) {
    if (headers && headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }

  return headers
}

// 处理返回的请求头
export function parseHeaders(headers: string): any {
  // 创建空对象用来返回处理过的请求头
  let parsed = Object.create(null)
  if (!headers) {
    return parsed
  }

  // 用回车符和换行符分割字符串 转换成数组
  headers.split('\r\n').forEach(line => {
    // 根据冒号分隔属性名和属性值
    let [key, val] = line.split(':')
    if (val) {
      // 清楚首尾空格
      key = key.trim()
    }
    parsed[key] = val
  })

  return parsed
}
