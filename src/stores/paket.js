import $axios from "../api.js";

const state = () => ({
  packages: [],
  package: {
    name: "",
    code: "",
    season: "",
    total_days: 0,
    start_date: new Date(),
    end_date: new Date(),
    hotel: {},
    airlines: {},
  },
  page: 1,
});

const mutations = {
  ASSIGN_DATA(state, payload) {
    state.packages = payload;
  },
  SET_PAGE(state, payload) {
    state.page = payload;
  },
  ASSIGN_FORM(state, payload) {
    state.package = {
      id: payload.uid,
      code: payload.code,
      name: payload.name,
      season: payload.season,
      total_days: payload.total_days,
      start_date: payload.start_date,
      end_date: payload.end_date,
      hotel: payload.hotel,
      airlines: payload.airlines,
      hotel_id: payload.hotel_id,
      airlines_id: payload.airlines_id,
      types: payload.types,
      status: payload.status,
    };
  },
  CLEAR_FORM(state) {
    state.package = {
      code: "",
      name: "",
      season: "",
      total_days: 0,
      start_date: "",
      end_date: "",
      hotel: {},
      airlines: {},
    };
  },
};
/*
*/
const actions = {
  getPackages({ commit, state }, payload) {
    let search = typeof payload != "undefined" ? payload : "";
    return new Promise((resolve) => {
      $axios
        .get(`/paket?page=${state.page}&q=${search}`)
        .then((response) => {
          commit("ASSIGN_DATA", response.data.data);
          resolve(response.data);
        })
        .catch((error) => {
          if (error.response.status) {
            commit("ASSIGN_DATA", []);
          }
        });
    });
  },
  submitPackages({ dispatch, commit, state }) {
    return new Promise((resolve) => {
      $axios
        .post("/paket", state.package)
        .then((response) => {
          dispatch("getPackages").then(() => {
            resolve(response.data);
          });
        })
        .catch((error) => {
          if (!error.response.meta.status) {
            commit("SET_ERRORS", error.response.data.meta.message),
              {
                root: true,
              };
          }
        });
    });
  },
  editPackages({ commit }, payload) {
    return new Promise((resolve) => {
      $axios.get(`paket/${payload}`).then((response) => {
        commit("ASSIGN_FORM", response.data.data);
        resolve(response.data);
      });
    });
  },
  updatePackages({ state, commit }, payload) {
    return new Promise((resolve) => {
      $axios.put(`/paket/${payload}`, state.package).then((response) => {
        commit("CLEAR_FORM");
        resolve(response.data);
      });
    });
  },
  removeHotel({ dispatch }, payload) {
    return new Promise((resolve) => {
      $axios.delete(`/paket/${payload}`).then(() => {
        dispatch("getPackages").then(() => resolve());
      });
    });
  },
  // getGaleries({commit, state}, payload){

  // }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
