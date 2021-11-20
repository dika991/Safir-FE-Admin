import $axios from "../api.js";

const state = () => ({
  jemaah: {},
  jemaahs: [],
});

const mutations = {
  ASSIGN_LIST_JEMAAH(state, payload) {
    state.jemaahs = payload;
  },
  ASSIGN_JEMAAH(state, payload) {
    state.jemaah = payload;
  },
};

const actions = {
  getDetailJemaah({ commit }, payload) {
    return new Promise((resolve) => {
      $axios.get(`jemaah/detail/${payload}`).then((response) => {
          commit("ASSIGN_JEMAAH", response.data.data);
          resolve(response.data);
      });

    });
  },
};

export default {
    namespaced: true,
    state,
    actions,
    mutations
}