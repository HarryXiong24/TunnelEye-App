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
    url: BASE_URL+ '/PersonInfo',
    headers: {
      Authorization: decrypt(sessionStorage.getItem("token"))
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
    url: BASE_URL+ '/node',
    headers: {
      Authorization: decrypt(sessionStorage.getItem("token"))
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
    url: BASE_URL+ '/sensor/infos',
    headers: {
      Authorization: decrypt(sessionStorage.getItem("token"))
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
    url: BASE_URL+ '/sensor/data',
    headers: {
      Authorization: decrypt(sessionStorage.getItem("token"))
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
    url: BASE_URL+ '/uwb/datas',
    headers: {
      Authorization: decrypt(sessionStorage.getItem("token"))
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
    url: BASE_URL+ '/uwb/userdata',
    headers: {
      Authorization: decrypt(sessionStorage.getItem("token"))
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

// // 1、根据经纬度获取位置详情
// export const reqAddress = (geohash) => ajax(`${BASE_URL}/position/${geohash}`)
// // 2、获取食品分类列表
// export const reqFoodCategorys = () => ajax(BASE_URL+'/index_category')
// // 3、根据经纬度获取商铺列表
// export const reqShops = (longitude, latitude) => ajax(BASE_URL+'/shops', {longitude, latitude})
// // 4、根据经纬度和关键字搜索商铺列表
// export const reqSearchShop = (geohash, keyword) => ajax(BASE_URL+'/search_shops', {geohash, keyword})
// // 6、用户名密码登陆
// export const reqPwdLogin = ({name, pwd, captcha}) => ajax(BASE_URL+'/login_pwd', {name, pwd, captcha}, 'POST')
// // 7、发送短信验证码
// export const reqSendCode = (phone) => ajax(BASE_URL+'/sendcode', {phone})
// // 8、手机号验证码登陆
// export const reqSmsLogin = (phone, code) => ajax(BASE_URL+'/login_sms', {phone, code}, 'POST')
// // 9、根据会话获取用户信息
// export const reqUserInfo = () => ajax(BASE_URL+'/userinfo')
// // 10、用户登出
// export const reqLogout = () => ajax(BASE_URL+'/logout')
// 用例获取商家信息
// export const reqShopInfo = () => ajax('/info')


