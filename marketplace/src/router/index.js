import Vue from 'vue'
import VueRouter from 'vue-router'
import privateRoutes from '@/router/privateRoutes'
import Authorization from '@/views/Authorization.vue'
import Login from '@/components/Login'
import Registration from '@/components/Registration'
import ForgotPassword from '@/components/ForgotPassword'
import ResetPassword from '@/components/ResetPassword'

import Integration from '@/views/Integration.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/auth',
    component: Authorization,
    children: [
      {
        path: 'login',
        component: Login,
        meta: {
          isPublic: true
        }
      },
      {
        path: 'register',
        component: Registration,
        meta: {
          isPublic: true
        }
      },
      {
        path: 'forgot-password',
        component: ForgotPassword,
        meta: {
          isPublic: true
        }
      },
      {
        path: 'reset_password',
        component: ResetPassword,
        meta: {
          isPublic: true
        }
      },
      {
        path: 'register-end',
        name: 'Integration',
        component: Integration
      }
    ]
  },
  ...privateRoutes
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return {
      x: 0,
      y: 0
    }
  }
})

router.beforeEach((to, from, next) => {
  const auth = localStorage.getItem('user-token')
  if (to.matched.some(record => record.meta.isPublic)) {
    if (auth) {
      next({
        path: '/'
      })
    } else {
      next()
    }
  } else {
    if (!auth) {
      next({
        path: '/auth/login'
      })
    } else {
      next()
    }
  }
})

export default router
