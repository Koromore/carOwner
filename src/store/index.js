import Vue from 'vue'
import Vuex from 'vuex'
// import state from './state'
// import mutations from './mutations'
// import action from './action'

Vue.use(Vuex)
// 项目群ID150  项目部ID93 内容营销部64
export default new Vuex.Store({
  state: {
    user: {}, // 员工信息
    token: '', // 登录令牌
    userSign: '', // 用户信息带参
    // isLogin: 'error', //error/success, // 是否登陆
    isLogin: 'success', //error/success, // 是否登陆
    isRouterAlive: true // 控制页面刷新
  },
  action: {

  },
  mutations: {
    // 项目列表我参与/我发起显示
    projectListShow(state, data) {
      state.projectListNum = data
    },
    // 项目列表我发起分页记录
    projectPageNumRecord(state, data) {
      state.projectPageNum = data
      // console.log('我发起'+state.projectPageNum)
    },
    // 项目列表我参与分页记录
    projectPageNumRecord_(state, data) {
      state.projectPageNum_ = data
      // console.log('我参与'+state.projectPageNum_)
    },
    /**
     * [reload 控制页面刷新]
     */
    beginReload(state) {
      // this.$store.commit('beginReload');

      //         this.$nextTick(()=>{
      //             this.$store.commit('endReload');
      //         })
      state.isRouterAlive = false;
    },
    /**
     * [endReload 恢复页面]
     */
    endReload(state) {
      state.isRouterAlive = true;
    },
    //登录
    login(state, data) {
      // 将获取到的user，token和微信标识存在vuex内
      state.user = data.user;
      state.token = data.token;
      state.userSign = data.userSign;
      // state.isLogin = window.sessionStorage.getItem('isLogin') || 'error';
      // 将获取到的user，token和微信标识存在缓存内
      localStorage.user = JSON.stringify(data.user);
      localStorage.token = data.token;
      localStorage.userSign = data.userSign;

    },
    /**
     * [clearToken 清除token信息]
     */
    clearToken(state, data) {
      console.log('拦截错误信息,应该跳登录了');
      // window.sessionStorage.setItem('isLogin','error');
      // state.isLogin = 'error';

      //清空 localStorage 的值 并跳转扫码页
      // localStorage.removeItem('user');
      // localStorage.removeItem('token');
      // localStorage.removeItem('userSign');
      // window.location.replace('http://guoxin.insun-china.com/hrm');

    },
    //退出登录
    logout(state, data) {
      // window.sessionStorage.setItem('isLogin', 'error');
      // state.isLogin = 'error';
      // //清空 localStorage 的值
      // localStorage.removeItem('user');
      // localStorage.removeItem('token');
      // localStorage.removeItem('userSign');
    }
  }
})