
import n_menu from "@/components/menu/NMenu";
import NTab from "@/components/tab/NTab";
import Breadcrumb from "@/components/breadcrumb/Breadcrumb";
import BreadcrumbItem from "@/components/breadcrumb/BreadcrumbItem";
import TreeMenu from "@/components/menu/TreeMenu";
import setting from '@/components/setting/setting'
import Init from "@/components/init/Init";
import SvgIcon from '@/components/svg/SvgIcon' // svg组件
import Auth_Table from "./table/Auth_Table";

const Load={
  install:function (Vue) {
    Vue.component("n-menu",n_menu);
    Vue.component("n-tab",NTab);
    Vue.component("breadcrumb",Breadcrumb);
    Vue.component("breadcrumb-item",BreadcrumbItem);
    Vue.component("tree-menu",TreeMenu);
    Vue.component("setting",setting);
    Vue.component("init",Init);
    Vue.component('svg-icon', SvgIcon);
    Vue.component("authTable",Auth_Table);
  }
}
export default Load
