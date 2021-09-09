import $axios from "../api.js";

const state = () => ({
  hotels: [],
  listHotels: [],
  hotel: {
    name: "",
    address: "",
    location: "",
  },
  page: 1,
});

const mutations = {
  ASSIGN_DATA(state, payload) {
    state.hotels = payload;
  },
  ASSIGN_LIST(state, payload) {
    state.listHotels = payload;
  },
  SET_PAGE(state, payload) {
    state.page = payload;
  },
  ASSIGN_FORM(state, payload) {
    state.hotel = {
      id: payload.id,
      name: payload.name,
      address: payload.address,
      location: payload.location,
    };
  },
  CLEAR_FORM(state) {
    state.hotel = {
      name: "",
      address: "",
      location: "",
    };
  },
};

const actions = {
  getHotel({ commit, state }, payload) {
    let search = typeof payload != "undefined" ? payload : "";
    return new Promise((resolve) => {
      $axios
        .get(`/hotel?page=${state.page}&q=${search}`)
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
  getListHotels({ commit }, payload) {
    let search = typeof payload != "undefined" ? payload : "";
    return new Promise((resolve) => {
      $axios
        .get(`/hotel/list?q=${search}`)
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
  submitHotel({ dispatch, commit, state }) {
    return new Promise((resolve) => {
      $axios.post("/hotel", state.hotel).then((response) => {
        dispatch("getHotel")
          .then(() => {
            resolve(response.data);
          })
          .catch((error) => {
            if (error.response.data.status === 422) {
              commit("SET_ERRORS", error.response.data.errors, {
                root: true,
              });
            }
          });
      });
    });
  },
  editHotel({ commit }, payload) {
    return new Promise((resolve) => {
      $axios.get(`/hotel/${payload}`).then((response) => {
        commit("ASSIGN_FORM", response.data.data);
        resolve(response.data);
      });
    });
  },
  updateHotel({ state, commit }, payload) {
    return new Promise((resolve) => {
      $axios.put(`/hotel/${payload}`, state.hotel).then((response) => {
        commit("CLEAR_FORM");
        resolve(response.data);
      });
    });
  },
  removeHotel({ dispatch }, payload) {
    return new Promise((resolve) => {
      $axios.delete(`/hotel/${payload}`).then(() => {
        dispatch("getHotel").then(() => resolve());
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
