// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './store/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
// import echarts from 'echarts/lib/echarts'
import { date, date_, time } from '@/utils/date'
import { date0, time0 } from '@/utils/time'
import { isEmail, isMobile } from '@/utils/ifformat'
import { duration } from '@/utils/duration'
import { download } from '@/utils/download'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import { matchType, matchType0 } from '@/utils/matchType' // 引入文件格
import elTableInfiniteScroll from 'el-table-infinite-scroll' // 表格滚动

// import {Decrypt,Encrypt} from '@/utils/cryptoJS'

// router.beforeEach((to, from, next) => {
//     /* 路由发生变化修改页面title */
//     if (to.meta.title) {
//         document.title = to.meta.title
//     }
//     next()
// })

// 引入柱状图
// require('echarts/lib/chart/bar')
// // 引入提示框和标题组件
// require('echarts/lib/component/tooltip')
// require('echarts/lib/component/title')

Vue.config.productionTip = false
Vue.use(ElementUI)
// Vue.prototype.$echarts = echarts
Vue.prototype.$date = date
Vue.prototype.$date_ = date_
Vue.prototype.$time = time

Vue.prototype.$date0 = date0
Vue.prototype.$time0 = time0

Vue.prototype.$isEmail = isEmail
Vue.prototype.$isMobile = isMobile

Vue.prototype.$duration = duration

Vue.prototype.$download = download

Vue.prototype.$matchType = matchType
Vue.prototype.$matchType0 = matchType0

Vue.use(elTableInfiniteScroll);

Vue.use(VueAwesomeSwiper)
// Vue.prototype.$Decrypt = Decrypt
// Vue.prototype.$Encrypt = Encrypt


/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})