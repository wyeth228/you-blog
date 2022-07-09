export default {
  namespaced: true,
  state: () => ({
    visible: false,
    message: "Message",
  }),
  mutations: {
    show(state: any) {
      state.visible = true;
    },
    close(state: any) {
      state.visible = false;
    },
    setMessage(state: any, message: string) {
      state.message = message;
    },
  },
  getters: {
    isVisible: (state: any) => state.visible,
    message: (state: any) => state.message,
  },
};
