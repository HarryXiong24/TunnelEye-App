/*
通过mutation间接更新state的多个方法的对象
 */
import {
  RECEIVE_USERINFO,
  RECEIVE_CAPTCHA,
  RECEIVE_PERSONINFO,
  RECEIVE_MACHINEINFO,
  RECEIVE_ALLSENSORINFO,
  RECEIVE_SENSORDATA,
  RECEIVE_ALLUWBINFO,
  RECEIVE_UWBDATA,
} from './mutation-types'

import {
  reqUserInfo,
  reqCaptcha,
  reqPersonInfo,
  reqMachineInfo,
  reqAllSensorInfo,
  reqSensorData,
  reqAllUWBInfo,
  reqUWBData,
} from '../../api/index'

export default {

  // 异步获取验证码
  async getCaptcha({commit}: any) {
    // 发送异步ajax请求
    const result = await reqCaptcha()
    // 将验证码请求里headers里的captcha值存入sessionStorage
    sessionStorage.setItem("captcha", result.headers.captcha)
    // 处理返回的图片
    const captcha = 'data:image/png;base64,' + 
    btoa( new Uint8Array(result.data).reduce((data, byte) => data + String.fromCharCode(byte), ''))
    // 提交一个mutation
    commit(RECEIVE_CAPTCHA, {captcha})
  },
  
  // 异步在登录时获取用户信息
  async getUserInfo({commit}: any, loginMsg: any) {
    // 发送异步ajax请求
    const result = await reqUserInfo(loginMsg)
    // 提交一个mutation
    const userInfo = result.data
    commit(RECEIVE_USERINFO, {userInfo})
  },

  // 异步获取出勤信息
  async getPersonInfo({commit}: any, date: any) {
    // 发送异步ajax请求
    const result = await reqPersonInfo(date)
    // 提交一个mutation
    const personInfo = result.data
    commit(RECEIVE_PERSONINFO, {personInfo})
  },

  // 异步获取下位机信息
  async getMachineInfo({commit}: any) {
    // 发送异步ajax请求
    const result = await reqMachineInfo()
    // 提交一个mutation
    const machineInfo = result.data
    commit(RECEIVE_MACHINEINFO, {machineInfo})
  },

  // 异步获取所有环境传感器信息
  async getAllSensorInfo({commit}: any, data: any) {
    // 发送异步ajax请求
    const result = await reqAllSensorInfo(data)
    // 提交一个mutation
    const allSensorInfo = result.data
    commit(RECEIVE_ALLSENSORINFO, {allSensorInfo})
  },

  // 异步获取环境传感器数据
  async getSensorData({commit}: any, data: any) {
    // 发送异步ajax请求
    const result = await reqSensorData(data)
    // 提交一个mutation
    const sensorData = result.data
    commit(RECEIVE_SENSORDATA, {sensorData})
  },

  // 异步获取所有UWB定位标签的定位信息
  async getAllUWBInfo({commit}: any, data: any) {
    // 发送异步ajax请求
    const result = await reqAllUWBInfo(data)
    // 提交一个mutation
    const allUWBInfo = result.data
    commit(RECEIVE_ALLUWBINFO, {allUWBInfo})
  },

  // 异步获取指定UWB定位标签的定位数据
  async getUWBData({commit}: any, data: any) {
    // 发送异步ajax请求
    const result = await reqUWBData(data)
    // 提交一个mutation
    const UWBData = result.data
    commit(RECEIVE_UWBDATA, {UWBData})
  }

  // // 异步获取食品分类列表
  // async getCategorys({commit}) {
  //   // 发送异步ajax请求
  //   const result = await reqFoodCategorys()
  //   // 提交一个mutation
  //   if (result.code === 0) {
  //     const categorys = result.data
  //     commit(RECEIVE_CATEGORYS, {categorys})
  //   }
  // },

  // // 异步获取商家列表
  // async getShops({commit, state}) {
  //   // 发送异步ajax请求
  //   const {longitude, latitude} = state
  //   const result = await reqShops(longitude, latitude)
  //   // 提交一个mutation
  //   if (result.code === 0) {
  //     const shops = result.data
  //     commit(RECEIVE_SHOPS, {shops})
  //   }
  // },

  // // 同步记录用户信息
  // recordUser({commit}, userInfo) {
  //   commit(RECEIVE_USER_INFO, {userInfo})
  // },

  // // 异步获取用户信息
  // async getUserInfo({commit}) {
  //   const result = await reqUserInfo()
  //   if (result.code === 0) {
  //     const userInfo = result.data
  //     commit(RECEIVE_USER_INFO, {userInfo})
  //   }
  // },

  // // 异步登出
  // async logout({commit}) {
  //   const result = await reqLogout()
  //   if (result.code === 0) {
  //     commit(RESET_USER_INFO)
  //   }
  // },

  // // 异步获取商家信息
  // async getShopInfo({commit}) {
  //   const result = await reqShopInfo()
  //   if (result.code === 0) {
  //     const info = result.data
  //     commit(RECEIVE_INFO, {info})
  //   }
  // },

  // // 异步获取商家评价列表
  // async getShopRatings({commit}, callback) {
  //   const result = await reqShopRatings()
  //   if (result.code === 0) {
  //     const ratings = result.data
  //     commit(RECEIVE_RATINGS, {ratings})
  //     // 数据更新了, 通知一下组件
  //     callback && callback()
  //   }
  // },

  // // 异步获取商家商品列表
  // async getShopGoods({commit}, callback) {
  //   const result = await reqShopGoods()
  //   if (result.code === 0) {
  //     const goods = result.data
  //     commit(RECEIVE_GOODS, {goods})
  //     // 数据更新了, 通知一下组件
  //     callback && callback()
  //   }
  // },

  // // 同步更新food中的count值
  // updateFoodCount({commit}, {isAdd, food}) {
  //   if (isAdd) {
  //     commit(INCREMENT_FOOD_COUNT, {food})
  //   } else {
  //     commit(DECREMENT_FOOD_COUNT, {food})
  //   }
  // },

  // // 同步清空购物车
  // clearCart({commit}) {
  //   commit(CLEAR_CART)
  // },

  // // 异步获取商家商品列表
  // async searchShops({commit, state}, keyword) {

  //   const geohash = state.latitude + ',' + state.longitude
  //   const result = await reqSearchShop(geohash, keyword)
  //   if (result.code === 0) {
  //     const searchShops = result.data
  //     commit(RECEIVE_SEARCH_SHOPS, {searchShops})
  //   }
  // },
}