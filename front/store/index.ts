import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import infoPopup from "./infoPopup";

export default () =>
  new Vuex.Store({
    modules: { infoPopup },
  });
