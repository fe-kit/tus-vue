import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../pages/home/index.vue';
import About from '../pages/about/index.vue';
Vue.use(VueRouter);
let routes = [
  { path: '/home', component: Home },
  { path: '/about', component: About }
];

const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
});

export default router;
