import Vue from 'vue';
import Router from 'vue-router';

// Containers
const Header = () => import("@/containers/Header");

// Page content
const Login = () => import("@/pages/Login");
const CadastrarCompra = () => import("@/pages/CadastrarCompra");
const EditarCompra = () => import("@/pages/EditarCompra");
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
      redirect: '/compras',
      component: Header,
      children: [{
        path: "compras",
        name: "Compras",
        redirect: "/compras",
        component: {
          render(c) {
            return c("router-view");
          }
        },
        children: [{
          path: "",
          component: Compras,
          meta: {
            requiresAuth: true,
            breadcrumb: "Compras"
          },
        }, {
          path: "cadastrar",
          name: "Cadastrar",
          component: CadastrarCompra,
          meta: {
            requiresAuth: true,
            breadcrumb: "Cadastrar"
          }
        }, {
          path: "editar/:id",
          name: "Editar",
          component: EditarCompra,
          meta: {
            requiresAuth: true,
            breadcrumb: "Editar"
          }
        }]
      }, {
        path: "sobre",
        name: "Sobre",
        component: Sobre,
        meta: {
          requiresAuth: true,
          breadcrumb: "Sobre"
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
          name: "Compras"
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
        name: "Compras"
      });
    }
  } else {
    next();
  }
});

export default router;