import "core-js/es6/promise";
import "core-js/es6/string";
import "core-js/es7/array";

import axios from 'axios';
import App from "./App";
import moment from 'moment';
import router from "./router";
import Vue from "vue";
import VueSweetalert2 from 'vue-sweetalert2';

import 'sweetalert2/dist/sweetalert2.min.css';

Vue.prototype.moment = moment;

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.headers.common['x-access-token'] = localStorage.getItem("jwt");
axios.defaults.headers.post['Content-Type'] = 'application/json';

Vue.use(VueSweetalert2, {
  confirmButtonColor: '#ea3c62',
  cancelButtonColor: '#ffffff'
});

new Vue({
  el: "#app",
  router,
  template: "<App/>",
  components: {
    App
  }
});