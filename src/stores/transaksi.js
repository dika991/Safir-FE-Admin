import $axios from "../api";

const state = () => ({
  transactions: [],
  transaction: {
    deskripsi: "",
    id: null,
    limited_at: "",
    nominal: null,
    pemesanan: {},
    status: null,
    tipe: "",
    pembayaran: {},
    pictures: {},
  },
  page: 1,
});

const mutations = {
  SET_PAGE(state, payload) {
    state.page = payload;
  },
  ASSIGN_TRANSACTIONS(state, payload) {
    state.transactions = payload;
  },
  ASSIGN_DETAIL(state, payload) {
    state.transaction = {
      deskripsi: payload.deskripsi,
      id: payload.id,
      limited_at: payload.limited_at,
      nominal: payload.nominal,
      status: payload.status,
      tipe: payload.tipe,
      pemesanan: payload.pemesanan,
      pictures: payload.pictures,
    };
  },
  CLEAR_DETAIL(state) {
    state.transaction = {
      deskripsi: "",
      id: null,
      limited_at: "",
      nominal: null,
      pemesanan: {},
      status: null,
      tipe: "",
      pembayaran: {},
      pictures: {},
    };
  },
};

const actions = {
  getTransactions({ commit, state }, payload) {
    let search = typeof payload != "undefined" ? payload : "";
    return new Promise((resolve) => {
      $axios
        .get(`/transaksi?page=${state.page}&q=${search}`)
        .then((response) => {
          console.log(response);
          commit("ASSIGN_TRANSACTIONS", response.data.data);
          resolve(response.data);
        })
        .catch((error) => {
          if (error.response.status) {
            commit("ASSIGN_TRANSACTIONS", []);
          }
        });
    });
  },
  detailTransaction({ commit }, payload) {
    return new Promise((resolve) => {
      $axios.get(`/transaksi/${payload}`).then((response) => {
        commit("ASSIGN_DETAIL", response.data.data);
        resolve(response.data);
      });
    });
  },
  putVerifikasiTransaksi({ commit, state }) {
    return new Promise((resolve) => {
      $axios
        .put(`/transaksi/${state.transaction.id}`, state)
        .then((response) => {
          commit("CLEAR_DETAIL");
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
