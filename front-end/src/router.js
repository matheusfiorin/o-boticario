import Vue from 'vue';
import Router from 'vue-router';

// Containers
const Header = () => import("@/containers/Header");

// Page content
const Login = () => import("@/pages/Login");
const Dashboard = () => import("@/pages/Dashboard");
const Compras = () => import("@/pages/Compras");
const Sobre = () => import("@/pages/Sobre");

// Fallback page
const PageNotFound = () => import("@/pages/PageNotFound");

Vue.use(Router);

let router = new Router({
  mode: 'history',
  linkActiveClass: "active",
  scrollBehavior: () => ({
    y: 0
  }),
  routes: [{
      path: '/',
      redirect: '/dashboard',
      component: Header,
      children: [{
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard,
        meta: {
          requiresAuth: true
        }
      }, {
        path: "compras",
        name: "Compras",
        component: Compras,
        meta: {
          requiresAuth: true
        }
      }, {
        path: "sobre",
        name: "Sobre",
        component: Sobre,
        meta: {
          requiresAuth: true
        }
      }]
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