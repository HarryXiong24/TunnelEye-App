/*
 * 包含n个接口请求函数的模块
 * 函数的返回值: promise对象
 */
import axios from 'axios'
// import '@/mock/mockServer.js'

const BASE_URL = 'http://121.89.223.235:8081'
// const BASE_URL = '/api'
import {decrypt} from '../util/crypto'

// 获取验证码
export const reqCaptcha = () => {

  let promise = axios({
    method: 'GET', 
    url: BASE_URL + '/captcha',
    withCredentials: false,
    responseType: 'arraybuffer'
  })
  
  return new Promise<any>(function (resolve, reject) {
    promise.then(function (response) {
      // 成功了调用resolve()
      resolve(response)
    }).catch(function (error) {
      //失败了调用reject()
      reject(error)
    })
  })
}

// 获取登录信息
export const reqUserInfo = (loginMsg: any) => {

  let promise = axios({
    method: 'POST', 
    url: BASE_URL + '/login',
    data: loginMsg, 
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'captcha': sessionStorage.getItem('captcha'),
    }
  })

  return new Promise<any>(function (resolve, reject) {
    promise.then(function (response) {
      // 成功了调用resolve()
      resolve(response)
    }).catch(function (error) {
      //失败了调用reject()
      reject(error)
    })
  })
}

// 获取出勤信息
export const reqPersonInfo = (date: any) => {
  let promise = axios({
    method: 'get',
    url: BASE_URL + '/PersonInfo',
    headers: {
      'Authorization': decrypt(sessionStorage.getItem("token"))
    },
    params: date
  })

  return new Promise<any>(function (resolve, reject) {
    promise.then(function (response) {
      // 成功了调用resolve()
      resolve(response)
    }).catch(function (error) {
      //失败了调用reject()
      reject(error)
    })
  })
}

// 获取所有下机位信息
export const reqMachineInfo = () => {
  let promise = axios({
    method: 'get',
    url: BASE_URL + '/node',
    headers: {
      'Authorization': decrypt(sessionStorage.getItem("token"))
    }
  })

  return new Promise<any>(function (resolve, reject) {
    promise.then(function (response) {
      // 成功了调用resolve()
      resolve(response)
    }).catch(function (error) {
      //失败了调用reject()
      reject(error)
    })
  })
}

// 获取所有传感器信息
export const reqAllSensorInfo = (data: any) => {
  let promise = axios({
    method: 'get',
    url: BASE_URL + '/sensor/infos',
    headers: {
      'Authorization': decrypt(sessionStorage.getItem("token"))
    },
    params: data
  })
  
  return new Promise<any>(function (resolve, reject) {
    promise.then(function (response) {
      // 成功了调用resolve()
      resolve(response)
    }).catch(function (error) {
      //失败了调用reject()
      reject(error)
    })
  })
}

// 获取环境传感器数据
export const reqSensorData = (data: any) => {
  let promise = axios({
    method: 'get',
    url: BASE_URL + '/sensor/data',
    headers: {
      'Authorization': decrypt(sessionStorage.getItem("token"))
    },
    params: data
  })

  return new Promise<any>(function (resolve, reject) {
    promise.then(function (response) {
      // 成功了调用resolve()
      resolve(response)
    }).catch(function (error) {
      //失败了调用reject()
      reject(error)
    })
  })
}

// 获取所有UWB定位标签的定位信息
export const reqAllUWBInfo = (data: any) => {
  let promise = axios({
    method: 'get',
    url: BASE_URL + '/uwb/datas',
    headers: {
      'Authorization': decrypt(sessionStorage.getItem("token"))
    },
    params: data
  })

  return new Promise<any>(function (resolve, reject) {
    promise.then(function (response) {
      // 成功了调用resolve()
      resolve(response)
    }).catch(function (error) {
      //失败了调用reject()
      reject(error)
    })
  })
}

// 获取指定UWB定位标签的定位数据
export const reqUWBData = (data: any) => {
  let promise = axios({
    method: 'get',
    url: BASE_URL + '/uwb/userdata',
    headers: {
      'Authorization': decrypt(sessionStorage.getItem("token"))
    },
    params: data
  })

  return new Promise<any>(function (resolve, reject) {
    promise.then(function (response) {
      // 成功了调用resolve()
      resolve(response)
    }).catch(function (error) {
      //失败了调用reject()
      reject(error)
    })
  })
}

// 获取IP
export const reqIP = () => {
  let promise = axios({
    method: 'get',
    url: BASE_URL + '/ip',
    headers: {
      'Authorization': decrypt(sessionStorage.getItem("token")),
      'Content-Type': 'application/json; charset=UTF-8'
    }
  })

  return new Promise<any>(function (resolve, reject) {
    promise.then(function (response) {
      // 成功了调用resolve()
      resolve(response)
    }).catch(function (error) {
      //失败了调用reject()
      reject(error)
    })
  })
}

// 获取天气
export const reqWeatherInfo = (data: any) => {
  let promise = axios({
    method: 'get',
    url: 'http://wthrcdn.etouch.cn/weather_mini',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    },
    params: data
  })

  return new Promise<any>(function (resolve, reject) {
    promise.then(function (response) {
      // 成功了调用resolve()
      resolve(response)
    }).catch(function (error) {
      //失败了调用reject()
      reject(error)
    })
  })
}

// 获取预警信息列表
export const reqMessageLists = (data: any) => {
  let promise = axios({
    method: 'get',
    url: BASE_URL + '/infos',
    headers: {
      'Authorization': decrypt(sessionStorage.getItem("token")),
      'Content-Type': 'application/json; charset=UTF-8'
    },
    params: data
  })

  return new Promise<any>(function (resolve, reject) {
    promise.then(function (response) {
      // 成功了调用resolve()
      resolve(response)
    }).catch(function (error) {
      //失败了调用reject()
      reject(error)
    })
  })
}

// 获取预警信息正文
export const reqMessageContent = (data: any) => {
  let promise = axios({
    method: 'get',
    url: BASE_URL + '/info',
    headers: {
      'Authorization': decrypt(sessionStorage.getItem("token")),
      'Content-Type': 'application/json; charset=UTF-8'
    },
    params: data
  })

  return new Promise<any>(function (resolve, reject) {
    promise.then(function (response) {
      // 成功了调用resolve()
      resolve(response)
    }).catch(function (error) {
      //失败了调用reject()
      reject(error)
    })
  })
}

// 获取平面图信息
export const reqMapData = (data: any) => {
  let promise = axios({
    method: 'get',
    url: BASE_URL + '/drawing',
    headers: {
      'Authorization': decrypt(sessionStorage.getItem("token")),
      'Content-Type': 'application/json; charset=UTF-8'
    },
    params: data
  })

  return new Promise<any>(function (resolve, reject) {
    promise.then(function (response) {
      // 成功了调用resolve()
      resolve(response)
    }).catch(function (error) {
      //失败了调用reject()
      reject(error)
    })
  })
}

// 获取sysId
export const reqSysId = (data: any) => {
  let promise = axios({
    method: 'get',
    url: BASE_URL + '/uwbsys/ids',
    headers: {
      'Authorization': decrypt(sessionStorage.getItem("token")),
      'Content-Type': 'application/json; charset=UTF-8'
    },
    params: data
  })

  return new Promise<any>(function (resolve, reject) {
    promise.then(function (response) {
      // 成功了调用resolve()
      resolve(response)
    }).catch(function (error) {
      //失败了调用reject()
      reject(error)
    })
  })
}
