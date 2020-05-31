// 公共类型文件入口
// 定义请求方式
export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'

// 入参config接口
export interface AxiosRequestConfig {
  url?: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  // 指定超时时间
  timeout?: number
}

// 定义返回数据接口
export interface AxiosResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

// 定义返回promise类型的接口
export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {}

// 定义返回Error类型的接口
export interface AxiosError extends Error {
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse
  isAxiosError: boolean
}

// 定义AXIOS类型的接口
export interface Axios {
  interceptors: {
    request: AxiosInterceptorManger<AxiosRequestConfig>
    response: AxiosInterceptorManger<AxiosResponse>
  }

  request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>

  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>

  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>

  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
}

// Axios混合类型的接口 继承AXIOS函数接口
export interface AxiosInstance extends Axios {
  <T = any>(config: AxiosRequestConfig): AxiosPromise<T>

  // 重载类型的函数接口定义
  <T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
}

// 定义拦截器的类型接口
export interface AxiosInterceptorManger<T> {
  // 添加拦截器
  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number
  // 根据ID删除拦截器的接口
  eject(id: number): void
}

export interface ResolvedFn<T> {
  (val: T): T | Promise<T>
}

export interface RejectedFn {
  (error: any): any
}
