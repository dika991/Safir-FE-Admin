import auth from "./stores/auth.js";
import maskapai from "./stores/maskapai";
import hotel from "./stores/hotels";
import paket from "./stores/paket";
import tipe from "./stores/tipe_paket";
import { createStore } from "vuex";

const store = createStore({
  modules: {
    auth,
    maskapai,
    hotel,
    paket,
    tipe,
  },
  state: {
    token: localStorage.getItem("token"),
    user: localStorage.getItem("user"),
    errors: [],
  },
  getters: {
    isAuth: (state) => {
      return state.token !== "null" && state.token !== null;
    },
  },
  mutations: {
    SET_TOKEN(state, payload) {
      state.token = payload;
    },
    SET_USER(state, payload) {
      state.user = payload;
    },
    SET_ERRORS(state, payload) {
      state.errors = payload;
    },
    CLEAR_ERRORS(state) {
      state.errors = [];
    },
  },
});

export default store;
