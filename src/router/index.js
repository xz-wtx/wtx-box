import { createRouter, createWebHashHistory } from "vue-router";
import Login from "../views/sys/login/Login"
import errer from "@/views/sys/errer/errer";
//页面加载进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/:catchAll(.*)",
    name: "404",
    component: errer,
    keepAlive:0
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

NProgress.configure({ showSpinner: false }) // NProgress Configuration

router.beforeEach((to, from , next) => {
  // 每次切换页面时，调用进度条
  NProgress.start();
  next();
});
router.afterEach(() => {
  // 在即将进入新的页面组件前，关闭掉进度条
  NProgress.done()
})

export default router;
