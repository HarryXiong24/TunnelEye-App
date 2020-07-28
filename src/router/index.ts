import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
const Login = () => import("../views/Login/Login.vue");
const Init = () => import("../views/Init/Init.vue");
const Location = () => import("../views/Location/Location.vue")

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: { title: 'Login', requiresAuth: true }
  },
  {
    path: '/Init',
    redirect: '/Init/Location',
    meta: { title: 'Main', requiresAuth: true }
  },
  {
    path: '/Init',
    name: 'Init',
    component: Init,
    meta: { title: 'Init', requiresAuth: true },
    children: [
      {
        path: '/Init/Location',
        name: 'Location',
        component: Location,
        meta: { title: 'Location', requiresAuth: true }
      },
    ]
  },
];

const router = new VueRouter({
  routes
});

export default router;
