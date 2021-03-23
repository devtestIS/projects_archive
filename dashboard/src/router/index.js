import Vue from 'vue';
import Router from 'vue-router';
import ActivateAccount from '@/views/ActivateAccount.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import ForgotPassword from '@/views/ForgotPassword.vue';
import ResetPassword from '@/views/ResetPassword.vue';
import Errors from '@/views/Errors.vue';
import privateRoutes from '@/router/privateRoutes';

Vue.use(Router);
const router = new Router({
  mode: 'history' /* 'history' - для сервера */,
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  linkExactActiveClass: 'exact-active',
  scrollBehavior() {
    return {
      x: 0,
      y: 0,
    };
  },
  routes: [
    {
      path: '/activate-account',
      name: 'activate-account',
      meta: {
        layout: 'header-navigation',
        isPublic: true,
      },
      component: ActivateAccount,
    },
    {
      path: '/',
      redirect: '/login',
      meta: {
        isPublic: true,
      },
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        layout: 'header-navigation',
        isPublic: true,
      },
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      meta: {
        layout: 'header-navigation',
        isPublic: true,
      },
      component: Register,
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      meta: {
        layout: 'header-navigation',
        isPublic: true,
      },
      component: ForgotPassword,
    },
    {
      path: '/password-reset',
      query: {
        uid: 'uid',
        token: 'token',
      },
      name: 'password-reset',
      meta: {
        layout: 'header-navigation',
        isPublic: true,
      },
      component: ResetPassword,
    },
    {
      path: '/errors',
      name: 'errors',
      component: Errors,
    },
    {
      path: '*',
      redirect: '/errors',
    },
    ...privateRoutes,
  ],
});

router.beforeEach((to, from, next) => {
  const auth = localStorage.getItem('user-token');
  if (to.matched.some(record => record.meta.isPublic)) {
    if (auth) {
      next({
        path: '/user-profile',
      });
    } else {
      next();
    }
  } else {
    if (!auth) {
      next({
        path: '/login',
      });
    } else {
      next();
    }
  }
});

export default router;
