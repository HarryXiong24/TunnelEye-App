import Vue from 'vue'
import Vuex from 'vuex'
import state from './vuex/state'
import mutations from './vuex/mutations'
import actions from './vuex/actions'
import getters from './vuex/getters'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})