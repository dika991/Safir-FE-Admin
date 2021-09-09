import $axios from "../api.js";

const state = () => ({
  typePackages: [],
  typePackage: {
    package_id: 0,
    name: "",
    price: 0,
    quota: 0,
  },
});

const mutations = {
  ASSIGN_DATA(state, payload) {
    state.typePackages = payload;
  },
  SET_PAGE(state, payload) {
    state.page = payload;
  },
  ASSIGN_FORM(state, payload) {
    state.typePackage = {
      id: payload.id,
      name: payload.name,
      prices: payload.prices,
      quota: payload.quota,
      package_id: payload.packages_id,
    };
  },
  CLEAR_FORM(state) {
    state.typePackage = {
      name: "",
      price: 0,
      quota: 0,
    };
  },
};

const actions = {
  getTypeList({ commit }, payload) {
    commit("ASSIGN_DATA", []);
    return new Promise((resolve) => {
      $axios
        .get(`/paket/${payload}/types`)
        .then((response) => {
          commit("ASSIGN_DATA", response.data.data);
          resolve(response.data);
        })
        .catch((error) => {
          if (!error.response.status) {
            console.log(error.response.data);
          }
        });
    });
  },
  postType({ commit, state }, payload) {
    return new Promise((resolve) => {
      $axios
        .post(`/paket/${payload}/types`, state.typePackage)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          console.log(error.response);
          commit("SET_ERRORS", error.response.data);
        });
    });
  },
  getDetailTypes({ commit }, payload) {
    return new Promise((resolve) => {
      $axios
        .get(`paket/${payload.package_id}/types/${payload.id}`)
        .then((response) => {
          commit("ASSIGN_FORM", response.data.data);
          resolve(response.data);
        });
    });
  },
  updateType({ state, commit }) {
    return new Promise((resolve) => {
      $axios
        .put(
          `/paket/${state.typePackage.package_id}/types/${state.typePackage.id}`,
          state.typePackage
        )
        .then((response) => {
          commit("CLEAR_FORM");
          resolve(response.data);
        });
    });
  },
  removeType({ dispatch }, payload) {
    return new Promise((resolve) => {
      $axios
        .delete(`/paket/${payload.package_id}/types/${payload.id}`)
        .then(() => {
          dispatch("getTypeList", payload.package_id).then(() => resolve());
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
