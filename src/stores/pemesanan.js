import $axios from "../api.js";

const state = () => ({
  pesanans: [],
  pesanan: {},
  page: 1,
});

const mutations = {
  SET_PAGE(state, payload) {
    state.page = payload;
  },
  ASSIGN_PESANANS(state, payload) {
    state.pesanans = payload;
  },
  ASSIGN_PESANAN(state, payload) {
    state.pesanan = payload;
  },
  CLEAER_DETAIL(state) {
    state.pesanan = null;
  },
};

const actions = {
  getPemesanan({ commit, state }, payload) {
    let search = typeof payload != "undefined" ? payload : "";
    return new Promise((resolve) => {
      $axios
        .get(`/pemesanan?page=${state.page}&q=${search}`)
        .then((response) => {
          console.log(response);
          commit("ASSIGN_PESANANS", response.data.data);
          resolve(response.data);
        });
    });
  },
  detailPemesanan({ commit }, payload) {
    return new Promise((resolve) => {
      $axios
        .get(`/pemesanan/${payload}`)
        .then((response) => {
          console.log(response);
          commit("ASSIGN_PESANAN", response.data.data);
          resolve(response.data);
        });
    });
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
