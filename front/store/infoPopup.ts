export default {
  namespaced: true,
  state: () => ({
    visible: false,
    message: "Message",
  }),
  mutations: {
    show(state) {
      state.visible = true;
    },
    close(state) {
      state.visible = false;
    },
    setMessage(state, message) {
      state.message = message;
    },
  },
  getters: {
    isVisible: (state) => state.visible,
    message: (state) => state.message,
  },
};
