import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
const Login = () => import("../views/Login/Login.vue");
const Init = () => import("../views/Init/Init.vue");
const Location = () => import("../views/Location/Location.vue");
const UserInfo = () => import("../views/UserInfo/UserInfo.vue");
const PersonInfo = () => import("../views/PersonInfo/PersonInfo.vue");
const Warning = () => import("../views/Warning/Warning.vue");
const Analysis = () => import("../views/Analysis/Analysis.vue");
const MessageContent = () => import("../views/MessageContent/MessageContent.vue");
const PhysicalSign = () => import("../views/PhysicalSign/PhysicalSign.vue");
const Fake = () => import("../views/Fake/Fake.vue");

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
    path: '/UserInfo',
    component: UserInfo,
    meta: { title: 'UserInfo', requiresAuth: true }
  },
  {
    path: '/MessageContent',
    component: MessageContent,
    meta: { title: 'MessageContent', requiresAuth: true }
  },
  {
    path: '/PhysicalSign',
    component: PhysicalSign,
    meta: { title: 'PhysicalSign', requiresAuth: true }
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
      {
        path: '/Init/PersonInfo',
        component: PersonInfo,
        meta: { title: 'PersonInfo', requiresAuth: true }
      },
      {
        path: '/Init/Analysis',
        component: Analysis,
        meta: { title: 'Analysis', requiresAuth: true }
      },
      {
        path: '/Init/Warning',
        component: Warning,
        meta: { title: 'Warning', requiresAuth: true },
      },
      {
        path: '/Init/Fake',
        component: Fake,
        meta: { title: 'Fake', requiresAuth: true },
      },
    ]
  },
];

const router = new VueRouter({
  routes
});

// 导航守卫
router.beforeEach((to, from, next) => {
  // 不为登录页
  if (to.path !== '/') {
    // 存在session代表登录成功可以访问，否则则定位回登录页面
    if ( sessionStorage.getItem('token')) {
      next()
    } else {
      next('/')
    }
  } else {
    next()
  }
})

router.afterEach( () => {
  document.body.scrollTop =0;
  document.documentElement.scrollTop = 0;
});

export default router;
