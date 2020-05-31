import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import { parseHeaders } from '../helpers/headers'
import { createError } from '../helpers/error'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((reslove, reject) => {
    const { data = null, url, method = 'get', headers, responseType, timeout } = config

    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }

    if (timeout) {
      request.timeout = timeout
    }

    request.open(method.toUpperCase(), url!, true)

    // 网络错误返回reject
    request.onerror = function handleError() {
      return reject(createError('Network Error', config, null, request))
    }

    // 请求超时错误 返回请求时间超过多少毫秒错误
    request.ontimeout = function handleTimeout() {
      return reject(createError(`Timeout of ${timeout} ms exceeded`, config, 'Exceeded', request))
    }

    // 监听readystate
    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
        return
      }

      // 网络错误或者超时错误 状态为0
      if (request.status === 0) {
        return
      }

      // 调用parseHeaders方法 把头部转换成转换成对象类型
      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      const responeseData = responseType !== 'text' ? request.response : request.responseText

      const response: AxiosResponse = {
        data: responeseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      handleReponse(response)
    }

    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    request.send(data)

    function handleReponse(response: AxiosResponse): void {
      if (response.status >= 200 && response.status <= 300) {
        reslove(response)
      } else {
        reject(
          createError(
            `Resquest failed with status code ${response.status}`,
            config,
            null,
            request,
            response
          )
        )
      }
    }
  })
}
