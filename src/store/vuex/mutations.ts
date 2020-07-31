// 直接更新state的多个方法的对象
import { State } from '../constraint';

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
  [RECEIVE_USERINFO] (state: State, {userInfo}: any) {
    state.userInfo = userInfo
  },
  [RECEIVE_CAPTCHA] (state: State, {captcha}: any) {
    state.captcha = captcha
  },
  [RECEIVE_PERSONINFO] (state: State, {personInfo}: any) {
    state.personInfo = personInfo
  },
  [RECEIVE_MACHINEINFO] (state: State, {machineInfo}: any) {
    state.machineInfo = machineInfo
  },
  [RECEIVE_ALLSENSORINFO] (state: State, {allSensorInfo}: any) {
    state.allSensorInfo = allSensorInfo
  },
  [RECEIVE_SENSORDATA] (state: State, {sensorData}: any) {
    state.sensorData = sensorData
  },
  [RECEIVE_ALLUWBINFO] (state: State, {allUWBInfo}: any) {
    state.allUWBInfo = allUWBInfo
  },
  [RECEIVE_UWBDATA] (state: State, {UWBData}: any) {
    state.UWBData = UWBData
  }
}