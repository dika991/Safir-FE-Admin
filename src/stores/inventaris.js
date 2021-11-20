import $axios from "../api";

const state = () => ({
  list_inventaris: [],
  inventaris: {
    nama: "",
    jenis: "",
    catatan: "",
    jumlah: null,
  },
  page: 1,
});

const mutations = {
  SET_PAGE(state, payload) {
    state.page = payload;
  },
  ASSIGN_LIST_INVENTARIS(state, payload) {
    state.list_inventaris = payload;
  },
  ASSIGN_INVENTARIS(state, payload) {
    state.inventaris = {
      nama: payload.nama,
      jenis: payload.jenis,
      catatan: payload.catatan,
      jumlah: payload.jumlah,
      id: payload.id,
    };
  },
};

const actions = {
  getListInventaris({ commit, state }, payload) {
    let search = typeof payload != "undefined" ? payload : "";
    return new Promise((resolve) => {
      $axios
        .get(`/inventaris?page=${state.page}&q=${search}`)
        .then((response) => {
          commit("ASSIGN_LIST_INVENTARIS", response.data.data);
          resolve(response.data);
        })
        .catch((error) => {
          if (error.response.status) {
            commit("ASSIGN_LIST_INVENTARIS", []);
          }
        });
    });
  },
  detailInvetaris({ commit }, payload) {
    return new Promise((resolve) => {
      $axios.get(`/inventaris/${payload}`).then((response) => {
        commit("ASSIGN_INVENTARIS", response.data.data);
        resolve(response.data);
      });
    });
  },
  updateInventaris({ state }, payload) {
    return new Promise((resolve) => {
      $axios
        .put(`/inventaris/${payload}`, state.inventaris)
        .then((response) => {
          resolve(response.data);
        });
    });
  },
  postInventaris({ state }) {
    return new Promise((resolve) => {
      $axios.post(`/inventaris`, state.inventaris).then((response) => {
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
