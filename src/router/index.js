
import { createRouter, createWebHashHistory } from 'vue-router'
import { Toast } from 'vant'
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      // @ts-ignore
      component: () => import('../views/home')
    },
    {
      path: '/home',
      // @ts-ignore
      component: () => import('../views/home')
    },
    {
      path: '/order',
      // @ts-ignore
      component: () => import('../views/order'),
      meta: {
        isAuth: true
      }
    },
    {
      path: '/cart',
      // @ts-ignore
      component: () => import('../views/cart'),
      meta: {
        isAuth: true
      }
    },
    {
      path: '/mine',
      // @ts-ignore
      component: () => import('../views/mine'),
      meta: {
        isAuth: true
      }
    },
    {
      path: '/store',
      // @ts-ignore
      component: () => import('../views/store')
    },
    {
      path: '/createorder',
      // @ts-ignore
      component: () => import('../views/createOrder'),
      meta: {
        isAuth: true
      }
    },
    {
      path: '/address',
      // @ts-ignore
      component: () => import('../views/address'),
      meta: {
        isAuth: true
      }
    },
    {
      path: '/addressedit',
      // @ts-ignore
      component: () => import('../views/addressEdit'),
      meta: {
        isAuth: true
      }
    },
    {
      path: '/userinfoedit',
      // @ts-ignore
      component: () => import('../views/userinfoedit'),
      meta: {
        isAuth: true
      }
    },
    {
      path: '/login',
      // @ts-ignore
      component: () => import('../views/login')
    },
    {
      path: '/register',
      // @ts-ignore
      component: () => import('../views/register')
    }
  ]
})
// @ts-ignore
router.beforeEach((to, from, next) => {
  if (to.meta.isAuth) {
    // 一会登录了以后 会在localstorage里面 存储一个标识
    if (localStorage.isLogin === 'login') {
      next()
    } else {
      next('/login')
      Toast('请先去登录')
    }
  } else {
    next()
  }
})
export default router