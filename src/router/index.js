import { createRouter, createWebHashHistory } from "vue-router";
import Login from "../views/sys/login/Login"
import index from '../views/sys/index/Index'
import errer from "@/views/sys/errer/errer";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  // {
  //   path: "/index",
  //   name: "Index",
  //   component: index,
  //   children:[
      // {
      //   path: "/dashboard",
      //   name: "Dashboard",
      //   component: Dashboard,
      //   title:'数据汇总'
      // },
      // {
      //   path: "/personal_details",
      //   name: "personal_details",
      //   component: personal_details,
      //   title:'个人信息'
      // },
      // {
      //   path: "/test",
      //   name: "test",
      //   component: test,
      //   meta:{
      //     keepAlive:true
      //   }
      // },
      // {
      //   path: "/abc",
      //   name: "abc",
      //   component: test1,
      //   meta:{
      //     keepAlive:true
      //   }
      // }
  //   ]
  // },
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

export default router;
