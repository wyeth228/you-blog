import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import user from "./user";
import infoPopup from "./infoPopup";

export default () =>
  new Vuex.Store({
    modules: { user, infoPopup },
  });
