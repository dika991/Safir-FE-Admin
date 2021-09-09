import $axios from "../api.js";

const state = () => ({});

const mutations = {};

const actions = {
  submit({ commit }, payload) {
    localStorage.setItem("token", null);
    commit("SET_TOKEN", null, { root: true });

    return new Promise((resolve) => {
      $axios
        .post("/login", payload)
        .then((response) => {
          if (response.data.meta.status) {
            let user = {
              name: response.data.data.name,
              email: response.data.data.email,
            };
            localStorage.setItem("user", JSON.stringify(user));
            commit("SET_USER", user, { root: true });
            localStorage.setItem("token", response.data.data.token);
            commit("SET_TOKEN", response.data.data.token, { root: true });
          } else {
            commit(
              "SET_ERRORS",
              { invalid: "Email/Password Salah" },
              { root: true }
            );
          }
          resolve(response.data.data);
        })
        .catch((error) => {
          if (error.response.status === 422) {
            commit("SET_ERRORS", error.response.data.meta.message, {
              root: true,
            });
          } else {
            commit(
              "SET_ERRORS",
              { invalid: error.response.data.meta.message },
              { root: true }
            );
          }
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
