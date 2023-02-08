import { createStore } from "vuex";
import axios from "axios";

const store = createStore({
  modules: {},
  state() {
    return {
      planets: [],
    };
  },
  getters: {
    getPlanets: (state) => state.planets,
  },
  actions: {
    async fetchPlanets({ commit }) {
      try {
        const data = axios.get("http://localhost:4246/v1/planets");
        commit("SET_PLANETS", data.data);
      } catch (err) {
        alert(err);
        console.log(err);
      }
    },
  },
  mutations: {},
});

export default store;
