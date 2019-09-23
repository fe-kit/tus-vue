import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const root = {
  state: {
    count: 1
  },
  mutations: {
    increment(state) {
      state.count++;
    }
  }
};

export const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment(state) {
      state.count++;
    }
  },
  modules: {
    root
  }
});
