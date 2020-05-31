import { AxiosInstance } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/util'

function createInstance(): AxiosInstance {
  // 创建AXIOS类的实例
  const context = new Axios()
  // 创建调用Axios类上的原型方法并绑定在创建出来的实例上
  const instance = Axios.prototype.request.bind(context)

  // 混合继承 把实例上的属性和方法拷贝在instance
  extend(instance, context)
  return instance as AxiosInstance
}

const axios = createInstance()

export default axios
