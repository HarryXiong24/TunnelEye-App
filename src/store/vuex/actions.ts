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
  RECEIVE_WEATHERINFO,
  RECEIVE_MESSAGELISTS,
  RECEIVE_MESSAGECONTENT,
  RECEIVE_MAPDATA,
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
  reqWeatherInfo,
  reqMessageLists,
  reqMessageContent,
  reqMapData,
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
  },

  // 异步获取天气信息
  async getWeatherInfo({commit}: any, data: any) {
    // 发送异步ajax请求
    const result = await reqWeatherInfo(data)
    // 提交一个mutation
    const weatherInfo = result.data
    commit(RECEIVE_WEATHERINFO, {weatherInfo})
  },

  // 异步获取预警消息列表
  async getMessageLists({commit}: any, data: any) {
    // 发送异步ajax请求
    const result = await reqMessageLists(data)
    // 提交一个mutation
    const messageLists = result.data
    commit(RECEIVE_MESSAGELISTS, {messageLists})
  },

  // 异步获取预警消息正文
  async getMessageContent({commit}: any, data: any) {
    // 发送异步ajax请求
    const result = await reqMessageContent(data)
    // 提交一个mutation
    const messageContent = result.data
    commit(RECEIVE_MESSAGECONTENT, {messageContent})
  },

  // 异步获取平面图数据
  async getMapData({commit}: any, data: any) {
    // 发送异步ajax请求
    const result = await reqMapData(data)
    // 提交一个mutation
    const mapData = result.data
    commit(RECEIVE_MAPDATA, {mapData})
  }

}