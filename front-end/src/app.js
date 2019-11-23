import Vue from 'vue';
import App from './App.vue';
import router from './router';

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(VueSweetalert2, {
  confirmButtonColor: '#ea3c62',
  cancelButtonColor: '#ffffff'
});

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
});