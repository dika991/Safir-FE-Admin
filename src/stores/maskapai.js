import $axios from "../api.js";

const state = () => ({
  maskapais: [],
  listMaskapai: [],
  maskapai: {
    kode: "",
    name: "",
  },
  page: 1,
});

const mutations = {
  ASSIGN_DATA(state, payload) {
    state.maskapais = payload;
  },
  ASSIGN_LIST(state, payload) {
    state.listMaskapai = payload;
  },
  SET_PAGE(state, payload) {
    state.page = payload;
  },
  ASSIGN_FORM(state, payload) {
    state.maskapai = {
      id: payload.id,
      kode: payload.kode_maskapai,
      name: payload.name,
    };
  },
  CLEAR_FORM(state) {
    state.maskapai = {
      kode: "",
      name: "",
    };
  },
};

const actions = {
  getMaskapais({ commit, state }, payload) {
    let search = typeof payload != "undefined" ? payload : "";
    return new Promise((resolve) => {
      $axios
        .get(`/maskapai?page=${state.page}&q=${search}`)
        .then((response) => {
          commit("ASSIGN_DATA", response.data.data);
          resolve(response.data);
        })
        .catch((error) => {
          if (error.response.status === 404) {
            commit("ASSIGN_DATA", []);
          }
        });
    });
  },

  getListMaskapai({ commit }, payload) {
    let search = typeof payload != "undefined" ? payload : "";
    return new Promise((resolve) => {
      $axios
        .get(`/maskapai/list?q=${search}`)
        .then((response) => {
          commit("ASSIGN_LIST", response.data.data);
          resolve(response.data);
        })
        .catch((error) => {
          if (error.response.status === 404) {
            commit("ASSIGN_DATA", []);
          }
        });
    });
  },
  submitMaskapai({ dispatch, commit, state }) {
    return new Promise((resolve) => {
      $axios
        .post("/maskapai", state.maskapai)
        .then((response) => {
          dispatch("getMaskapais").then(() => {
            resolve(response.data);
          });
        })
        .catch((error) => {
          if (error.response.data.status === 422) {
            commit("SET_ERRORS", error.response.data.errors, { root: true });
          }
        });
    });
  },

  editMaskapai({ commit }, payload) {
    return new Promise((resolve) => {
      $axios.get(`/maskapai/${payload}`).then((response) => {
        commit("ASSIGN_FORM", response.data.data);
        resolve(response.data);
      });
    });
  },

  updateMaskapai({ state, commit }, payload) {
    return new Promise((resolve) => {
      $axios.put(`/maskapai/${payload}`, state.maskapai).then((response) => {
        commit("CLEAR_FORM");
        resolve(response.data);
      });
    });
  },

  removeMaskapai({ dispatch }, payload) {
    return new Promise((resolve) => {
      $axios.delete(`/maskapai/${payload}`).then(() => {
        dispatch("getMaskapais").then(() => resolve());
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
