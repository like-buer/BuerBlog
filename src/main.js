import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

// 重置样式
import './assets/style/reset.css'
// 动画库
import './assets/style/animate.min.css'
// iconfont图标库
import './assets/style/iconfont/iconfont.css'

// axios请求
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)


// 编辑器
import mavonEditor from 'mavon-editor'
import "mavon-editor/dist/css/index.css";
Vue.use(mavonEditor);

// 设置浏览器标题
Vue.directive('title', {
    inserted: function(el, binding) {
        document.title = el.dataset.title
    }
})

// 时间格式处理
String.prototype.MyData = function() {
    const NowDate = new Date(this);
    return `${NowDate.getFullYear()}年${NowDate.getMonth()}月${NowDate.getDay()}日 ${NowDate.toLocaleTimeString()}`
}

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')