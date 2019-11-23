import Vue from 'vue';
import Router from 'vue-router';

// Page content
const Login = () => import("@/pages/Login");
const Dashboard = () => import("@/pages/Dashboard");

// Fallback page
const PageNotFound = () => import("@/pages/PageNotFound");

Vue.use(Router);

let router = new Router({
  mode: 'history',
  linkActiveClass: "open active",
  scrollBehavior: () => ({
    y: 0
  }),
  routes: [{
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        guest: true
      }
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '**',
      name: 'PageNotFound',
      component: PageNotFound
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem("jwt") == null) {
      next({
        path: "/login",
        params: {
          nextUrl: to.fullPath
        }
      });
    } else {
      if (to.matched.some(record => record.meta.is_admin)) {
        next({
          name: "Dashboard"
        });
      } else {
        next();
      }
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (localStorage.getItem("jwt") == null) {
      next();
    } else {
      next({
        name: "Dashboard"
      });
    }
  } else {
    next();
  }
});

export default router;