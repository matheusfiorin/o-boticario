import Vue from 'vue';
import Router from 'vue-router';

// Page content
import Page1 from '@/components/Page1';
import Login from '@/components/Login';

// Fallback page
import PageNotFound from '@/components/PageNotFound';

Vue.use(Router);

export default new Router({
  routes: [{
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/page-1',
      name: 'Page 1',
      component: Page1
    },
    {
      path: '**',
      name: 'PageNotFound',
      component: PageNotFound
    }
  ]
});