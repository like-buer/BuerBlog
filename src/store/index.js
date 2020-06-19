import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        hitokoto: '',
        IsDark: false
    },
    getters: {

    },
    mutations: {
        getHitokoto(state, payload) {
            state.hitokoto = payload;
        },
        setDark(state) {
            state.IsDark = !state.IsDark;
        }
    },
    actions: {
        hitokotoAsy({ commit }) {
            Vue.axios
                .get("https://v1.hitokoto.cn?c=k&encode=text")
                .then(({ data }) => {
                    commit('getHitokoto', data);
                })
                .catch(() => {
                    commit('getHitokoto', '不二正在努力加载中...');
                })
        }
    },
    modules: {}
})