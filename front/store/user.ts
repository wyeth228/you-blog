export default {
  namespaced: true,
  state: () => ({
    auth: false,
  }),
  mutations: {
    setAuth(state, auth: boolean): void {
      state.auth = auth;
    },
  },
  getters: {
    auth: (state) => state.auth,
  },
};
