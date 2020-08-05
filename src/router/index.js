import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import store from '../store/index'
import Login from '@/pages/login/login'
import Test from '@/pages/test'
// import Home from '@/pages/home/home'
// import Gantti from '@/pages/gantti/gantti'
// import Problem from '@/pages/problem/problem'
// import Test from '@/pages/test'
import { Decrypt, Encrypt } from '@/utils/cryptoJS'
import { MessageBox } from 'element-ui';

Vue.prototype.$axios = axios;
Vue.use(Router)

// 请求超时时间
axios.defaults.timeout = 10000;

// axios.defaults.baseURL = process.env.API_ROOT;
// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

// 请求拦截器
axios.interceptors.request.use(
  config => {
    // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    // if (config.url.indexOf('http://pms.guoxinad.com.cn') == -1) {
    //   const token = '';
    //   const userSign = store.state.userSign;
    //   config.headers.token = 123
    //   userSign && (config.headers.userSign = userSign);
    //   config.data = Encrypt(JSON.stringify(config.data))
    // }
    // console.log(config)
    // if (config.url === '/pmbs/save') {

    // config.headers['Content-Type'] = "application/json;charset=UTF-8";
    // }
    // console.log(config)
    return config;
  },
  error => {
    return Promise.error(error);
  })

// 响应拦截器
axios.interceptors.response.use(
  response => {
    // console.log(response)
    // if (response.config.url.indexOf('http://pms.guoxinad.com.cn') == -1) {
    //   // console.log(response)
    //   response.data = JSON.parse(Decrypt(response.data));
    // }
    // if (typeof response.data == "string") {
    //   response.data = JSON.parse(Decrypt(response.data));
    // }
    // console.log(response)
    // console.log(response.headers.status)   
    // response.data = JSON.parse(Decrypt(response.data));
    // console.log(response)
    if (response.status === 200) {
      if (response.data.errcode == 401 || response.data.errcode == 402) {
        console.log('错误')
        MessageBox.alert('您好，您的登录时间已过期，请重新扫码登录！', '提示', {
          confirmButtonText: '确定',
          // cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.commit('clearToken', null)
        }).catch(() => {
        });
      } else {
        return Promise.resolve(response);
      }
    } else {
      return Promise.reject(response);
    }
  },
  // 服务器状态码不是200的情况    
  error => {
    console.log(error)
    if (error.response.status) {
      switch (error.response.status) {
        case 401:
          MessageBox.alert('您好，您的登录时间已过期，请重新扫码登录！', '提示', {
            confirmButtonText: '确定',
            // cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            store.commit('clearToken', null)
          }).catch(() => {
          });
          console.log('401token过期清除token')
          break;
        default:

      }
      return Promise.reject(error.response);
    }
  }
);

const router = new Router({
  mode: 'hash',
  routes: [
    {
      path: '*',
      name: '',
      redirect: '/home',
      // component: Login,
      meta: {
        requireAuth: true,
      }
    }, {
      path: '/',
      name: '',
      redirect: '/login',
      // component: Login,
      meta: {
        requireAuth: true,
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        requireAuth: true,
      }
    },
    {
      path: '/home',
      name: 'home',
      redirect: '/home/task',
      component: resolve => require(['@/pages/home/home'], resolve),
      meta: {
        requireAuth: true,
      },
      children: [
        {
          path: '/home/task',
          name: 'task',
          component: resolve => require(['@/pages/home/task/task'], resolve),
          meta: {
            requireAuth: true,
            title: '任务管理'
          }
        },
        {
          path: '/home/addTask',
          name: 'addTask',
          component: resolve => require(['@/pages/home/task/addtask'], resolve),
          meta: {
            requireAuth: true,
          }
        },
        {
          path: '/home/taskDetail',
          name: 'taskDetail',
          component: resolve => require(['@/pages/home/task/taskdetail'], resolve),
          meta: {
            requireAuth: true,
          }
        },
        {
          path: '/home/tasksettlement',
          name: 'tasksettlement',
          component: resolve => require(['@/pages/home/task/tasksettlement'], resolve),
          meta: {
            requireAuth: true,
          }
        },
        {
          path: '/home/settlement',
          name: 'settlement',
          component: resolve => require(['@/pages/home/settlement/settlement'], resolve),
          meta: {
            requireAuth: true,
            title: '结算管理'
          }
        },
        {
          path: '/home/settlementDetail',
          name: 'settlementDetail',
          component: resolve => require(['@/pages/home/settlement/settlementdetail'], resolve),
          meta: {
            requireAuth: true,
          }
        },
        {
          path: '/home/owners',
          name: 'owners',
          component: resolve => require(['@/pages/home/owners/owners'], resolve),
          meta: {
            requireAuth: true,
          }
        },
        {
          path: '/home/ownerssite',
          name: 'ownerssite',
          component: resolve => require(['@/pages/home/owners/ownerssite'], resolve),
          meta: {
            requireAuth: true,
          }
        },
        {
          path: '/home/ownersrecord',
          name: 'ownersrecord',
          component: resolve => require(['@/pages/home/owners/ownersrecord'], resolve),
          meta: {
            requireAuth: true,
          }
        },
        {
          path: '/home/ownersschedule',
          name: 'ownersschedule',
          component: resolve => require(['@/pages/home/owners/ownersschedule'], resolve),
          meta: {
            requireAuth: true,
          }
        },
        {
          path: '/home/addowners',
          name: 'addowners',
          component: resolve => require(['@/pages/home/owners/addowners'], resolve),
          meta: {
            requireAuth: true,
          }
        },
        {
          path: '/home/ownersdetail',
          name: 'ownersdetail',
          component: resolve => require(['@/pages/home/owners/ownersdetail'], resolve),
          meta: {
            requireAuth: true,
          }
        },
        {
          path: '/home/site',
          name: 'site',
          component: resolve => require(['@/pages/home/site/site'], resolve),
          meta: {
            requireAuth: true,
          }
        },
        {
          path: '/home/sitecarownerlist',
          name: 'sitecarownerlist',
          component: resolve => require(['@/pages/home/site/sitecarownerlist'], resolve),
          meta: {
            requireAuth: true,
          }
        },
        {
          path: '/home/analysis',
          name: 'analysis',
          component: resolve => require(['@/pages/home/analysis/analysis'], resolve),
          meta: {
            requireAuth: true,
          }
        },
        {
          path: '/home/metadata',
          name: 'metadata',
          redirect: '/home/metadata/brand',
          component: resolve => require(['@/pages/home/metadata/metadata'], resolve),
          meta: {
            requireAuth: true,
          },
          children: [
            {
              path: '/home/metadata/brand',
              name: 'brand',
              component: resolve => require(['@/pages/home/metadata/components/brand'], resolve),
              meta: {
                requireAuth: true,
              }
            },
            {
              path: '/home/metadata/certifications',
              name: 'certifications',
              component: resolve => require(['@/pages/home/metadata/components/certifications'], resolve),
              meta: {
                requireAuth: true,
              }
            },
            {
              path: '/home/metadata/carownertype',
              name: 'carownertype',
              component: resolve => require(['@/pages/home/metadata/components/carownertype'], resolve),
              meta: {
                requireAuth: true,
              }
            },
            {
              path: '/home/metadata/carownersource',
              name: 'carownersource',
              component: resolve => require(['@/pages/home/metadata/components/carownersource'], resolve),
              meta: {
                requireAuth: true,
              }
            },
            {
              path: '/home/metadata/carownerspeciality',
              name: 'carownerspeciality',
              component: resolve => require(['@/pages/home/metadata/components/carownerspeciality'], resolve),
              meta: {
                requireAuth: true,
              }
            },
            {
              path: '/home/metadata/scheduletype',
              name: 'scheduletype',
              component: resolve => require(['@/pages/home/metadata/components/scheduletype'], resolve),
              meta: {
                requireAuth: true,
              }
            },
            {
              path: '/home/metadata/sitetype',
              name: 'sitetype',
              component: resolve => require(['@/pages/home/metadata/components/sitetype'], resolve),
              meta: {
                requireAuth: true,
              }
            }
          ]
        },
        {
          path: '/home/document',
          name: 'document',
          component: resolve => require(['@/pages/home/document/document'], resolve),
          meta: {
            requireAuth: true,
          }
        },
        {
          path: '/home/resource',
          name: 'resource',
          redirect: '/home/resource/place',
          component: resolve => require(['@/pages/home/resource/resource'], resolve),
          meta: {
            requireAuth: true,
          },
          children:[//modelmen
            {
              path: '/home/resource/cameraman',
              name: 'cameraman',
              component: resolve => require(['@/pages/home/resource/cameraman/cameraman'], resolve),
              meta: {
                requireAuth: true,
              }
            },
            {
              path: '/home/resource/modelmen',
              name: 'modelmen',
              component: resolve => require(['@/pages/home/resource/modelmen/modelmen'], resolve),
              meta: {
                requireAuth: true,
              }
            },
            {
              path: '/home/resource/place',
              name: 'place',
              component: resolve => require(['@/pages/home/resource/place/place'], resolve),
              meta: {
                requireAuth: true,
              }
            },
            {
              path: '/home/resource/addplace',
              name: 'addplace',
              component: resolve => require(['@/pages/home/resource/place/addplace'], resolve),
              meta: {
                requireAuth: true,
              }
            },
            {
              path: '/home/resource/placedetails',
              name: 'placedetails',
              component: resolve => require(['@/pages/home/resource/place/placedetails'], resolve),
              meta: {
                requireAuth: true,
              }
            }
          ]
        }
      ]
    },
    {
      path: '/test',
      name: 'test',
      component: Test,
      meta: {
        requireAuth: true,
      }
    }
  ]//Test
})
// TaskDetail
// 页面刷新时，重新赋值 更新vuex内部值
try {
  // if (window.sessionStorage.getItem('isLogin') == 'success') {
  // }

  var user = JSON.parse(localStorage.getItem('user'));
  let token = localStorage.getItem('token');
  let userSign = localStorage.getItem('userSign');
  // store.commit('login', { token, user, userSign });
  // if (user==null) {
  //   window.location.replace('http://guoxin.insun-china.com/hrm');
  // }
  // var user = JSON.parse(localStorage.getItem('user'));
  // let token = localStorage.getItem('token');
  // let userSign = localStorage.getItem('userSign');
  // if (user&&token&&userSign) {
  //   store.commit('login', { token, user, userSign });
  // }else{
  //   store.commit('clearToken')
  // }

} catch (e) {

}

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(r => r.meta.requireAuth)) {
//     if (store.state.isLogin == 'success') {
//       console.log('%c login success!', 'color:red;background:yellow')
//       next();
//     } else {
//       console.log('%c please login!', 'color:blue;background:yellow')
//       next({
//         path: '/login',
//         query: { redirect: to.fullPath }
//       })
//     }
//   } else {
//     next();
//   }
// })

export default router;