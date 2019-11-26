import "core-js/es6/promise";
import "core-js/es6/string";
import "core-js/es7/array";

require('dotenv').config();

import axios from 'axios';
import App from "./App";
import moment from 'moment';
import money from 'v-money';
import router from "./router";
import Vue from "vue";
import VueSweetalert2 from 'vue-sweetalert2';

import 'sweetalert2/dist/sweetalert2.min.css';

Vue.prototype.moment = moment;

axios.defaults.baseURL = `http://192.168.0.5:3000`;
axios.defaults.headers.common['x-access-token'] = localStorage.getItem("jwt");
axios.defaults.headers.post['Content-Type'] = 'application/json';

Vue.use(VueSweetalert2, {
  confirmButtonColor: '#ea3c62',
  cancelButtonColor: '#ffffff'
});

Vue.use(money, {
  precision: 4
});

new Vue({
  el: "#app",
  router,
  template: "<App/>",
  components: {
    App
  }
});

axios.interceptors.response.use(null, (err) => {
  console.info({});
  if (err.response.data.disconnect) {
    return Promise.reject(err);
  }

  var causes = (err.response.data.causes || []).reduce((previousValue, currentValue, index) => {
    return `${previousValue}${index === 0 ? ', ' : ' '}${currentValue}`;
  });
  var html = `${err.response.data.name || err} - ${causes}`;
  Vue.swal.fire({
    title: "Oops...",
    html,
    type: "error",
    customClass: {
      confirmButton: "confirm-button-class"
    }
  });
  return Promise.reject(err);
});