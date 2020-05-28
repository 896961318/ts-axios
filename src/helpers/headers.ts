import { isPlainObject } from './util'

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
