// 直接更新state的多个方法的对象

import {
  RECEIVE_USERINFO,
  RECEIVE_CAPTCHA,
  RECEIVE_PERSONINFO,
  RECEIVE_MACHINEINFO,
  RECEIVE_ALLSENSORINFO,
  RECEIVE_SENSORDATA,
  RECEIVE_ALLUWBINFO,
  RECEIVE_UWBDATA
} from './mutation-types'

export default {
  [RECEIVE_USERINFO] (state: any, {userInfo}: any) {
    state.userInfo = userInfo
  },
  [RECEIVE_CAPTCHA] (state: any, {captcha}: any) {
    state.captcha = captcha
  },
  [RECEIVE_PERSONINFO] (state: any, {personInfo}: any) {
    state.personInfo = personInfo
  },
  [RECEIVE_MACHINEINFO] (state: any, {machineInfo}: any) {
    state.machineInfo = machineInfo
  },
  [RECEIVE_ALLSENSORINFO] (state: any, {allSensorInfo}: any) {
    state.allSensorInfo = allSensorInfo
  },
  [RECEIVE_SENSORDATA] (state: any, {sensorData}: any) {
    state.sensorData = sensorData
  },
  [RECEIVE_ALLUWBINFO] (state: any, {allUWBInfo}: any) {
    state.allUWBInfo = allUWBInfo
  },
  [RECEIVE_UWBDATA] (state: any, {UWBData}: any) {
    state.UWBData = UWBData
  }
}