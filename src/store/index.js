import Vue from 'vue';
import Vuex from 'vuex';

import api from '@/api';

Vue.use(Vuex);

const Store = new Vuex.Store({
  state: {
    usersArray: [],
  },
  mutations: {
    GET_USERS(state, usersArray) {
      state.usersArray = usersArray;
    },
    DELETE_USERS(state, user) {
      state.usersArray.splice(state.usersArray.indexOf(user), 1);
    },
  },
  actions: {
    async fetchUsers({ commit }) {
      await api
        .get('/users')
        .then(res => {
          commit('GET_USERS', res.data);
        })
        .catch(error => {
          console.log('Error!!! ', error);
        });
    },
    removeUser({ commit }, user) {
      commit('DELETE_USERS', user);
    },
  },
});

export default Store;
