import $axios from "../api";

const state = () => ({
  list_admin: [],
  admin: {
    name: "",
    email: "",
    roles: null,
  },
  page: 1,
});

const mutations = {
  SET_PAGE(state, payload) {
    state.page = payload;
  },
  ASSIGN_LIST_ADMINS(state, payload) {
    state.list_admin = payload;
  },
  ASSIGN_ADMINS(state, payload) {
    state.admin = {
      id: payload.id,
      name: payload.name,
      email: payload.email,
      roles: payload.roles,
    };
  },
  CELAR_ADMINS(state) {
    state.admin = {
      name: "",
      email: "",
      roles: null,
    };
  },
};

const actions = {
  getListAdmins({ commit, state }, payload) {
    let search = typeof payload != "undefined" ? payload : "";
    return new Promise((resolve) => {
      $axios
        .get(`/admins?page=${state.page}&q=${search}`)
        .then((response) => {
          commit("ASSIGN_LIST_ADMINS", response.data.data);
          resolve(response.data);
        })
        .catch((error) => {
          if (error.response.status) {
            commit("ASSIGN_LIST_ADMINS", []);
          }
        });
    });
  },
  detailAdmins({ commit }, payload) {
    return new Promise((resolve) => {
      $axios
        .get(`/admins/${payload}`)
        .then((response) => {
          if (response.data.meta.status) {
            commit("ASSIGN_ADMINS", response.data.data);
          }
          resolve(response.data);
        })
        .catch((error) => {
          console.log(error.response);
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
