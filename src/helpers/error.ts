import { AxiosRequestConfig, AxiosResponse } from '../types'

export class AxiosErroe extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse

  constructor(
    message: string,
    config: AxiosRequestConfig,
    code?: string | null,
    request?: any,
    response?: AxiosResponse
  ) {
    super(message)

    this.config = config
    this.code = code
    this.request = request
    this.response = response
    this.isAxiosError = true

    // typescript的bug 在继承ts内置的对象要添加该方法解决该问题
    Object.setPrototypeOf(this, AxiosErroe.prototype)
  }
}

// 创建error的工厂函数
export function createError(
  message: string,
  config: AxiosRequestConfig,
  code?: string | null,
  request?: any,
  response?: AxiosResponse
) {
  const error = new AxiosErroe(message, config, code, request, response)
  return error
}
