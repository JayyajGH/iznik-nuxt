import Vue from 'vue'

export const state = () => ({
  list: {}
})

export const mutations = {
  set(state, list) {
    if (list) {
      for (const item of list) {
        Vue.set(state.list, item.id, item)
      }
    }
  },

  clear(state) {
    state.list = {}
  }
}

export const getters = {
  get: state => id => {
    id = parseInt(id)
    return state.list[id] ? state.list[id] : null
  },

  list: state => {
    return state.list
  }
}

export const actions = {
  async fetch({ commit }, params) {
    const { alerts, alert } = await this.$api.alert.fetch(params)
    if (alerts) {
      commit('clear')
      commit('set', alerts)
    } else {
      commit('set', [alert])
    }
  },

  async add({ commit, getters, dispatch }, params) {
    const { id } = await this.$api.alert.add(params)
    await dispatch('fetch', { id })
    return id
  },

  async record({ commit, getters, dispatch }, params) {
    await this.$api.alert.record({
      trackid: params.id,
      action: 'clicked'
    })
  }
}
