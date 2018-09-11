// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import './assets/css/common.css'
// import XLSX from 'xlsx'
import './assets/js/Blob.js';
window.FileSaver = require('file-saver');
import './assets/js/ExportUtil.js';
Vue.config.productionTip = true;
/* eslint-disable no-new */
new Vue({
  router,
  store
}).$mount('#app')
