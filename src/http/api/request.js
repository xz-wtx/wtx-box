/**axios封装
 * 请求拦截、相应拦截、错误统一处理
 */

import axios from 'axios';
import { ElLoading,ElMessage } from 'element-plus';
import store from '../../store'

// 环境的切换
let HOST = process.env.NODE_ENV;


axios.defaults.baseURL = 'http://localhost:8080';
if (HOST === 'uat') {
  axios.defaults.baseURL =  'http://localhost:8080';
} else if (HOST === 'prod') {
  axios.defaults.baseURL = 'http://106.14.10.78/admin-web';
}

// 请求超时时间
axios.defaults.timeout = 40000;

// 请求拦截器
axios.interceptors.request.use(
    config => {
      config.headers['Content-Type'] = 'application/json'
      console.log(JSON.stringify(store.getters.getToken))
      config.headers.Authorization = store.getters.getToken
      return config;
    },
    error => {
      return Promise.error(error);
    })

// 响应拦截器
axios.interceptors.response.use(
    response => {

      if (response.status === 200) {
        return Promise.resolve(response);
      } else {
        return Promise.reject(response);
      }
    },
    // 服务器状态码不是200的情况
    error => {
      if(error.response===undefined){
        return Promise.reject(error.response);
      }

      if (error.response.status) {
        switch (error.response.status) {
            // 401: 未登录
          case 401:
            errorTitle("未登录或无权限")
            setTimeout(() => {
              location.href="/";
            },1200)
            break;
          case 402:
            errorTitle("登录已过期")
            setTimeout(() => {
              location.href="/";
            },1200)
            break;
          case 403:
            errorTitle("无操作权限")
            //清除token
            break;
          case 500:
            break;
          case 901:
            errorTitle("下载失败")
            //清除token
            break;
            // 其他错误，直接抛出错误提示
          default:
        }
        return Promise.reject(error.response);
      }
    }
);


/**
 * 成功
 * @param title
 */
export function successTitle(title="ok") {
  ElMessage.success(title)
}

/**
 * 失败
 * @param title
 */
export function errorTitle(title="error") {
  ElMessage.error(title)
}
/**
 * 打开加载load
 * @param LoadingTitle
 * @returns {ILoadingInstance}
 */
export function openToast(LoadingTitle=""){
  return ElLoading.service({
    lock: true,
    text: LoadingTitle,
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  });
}

/**
 * 关闭load
 * @param toast
 */
export function clearToast(toast){
  toast.close();
}

/**
 * axios对象
 * @returns {AxiosStatic}
 */
export function axiosBase(){
  return axios;
}


//JSON.stringify 少8小时解决方案
Date.prototype.format = function(fmt) {
  var o = {
    "M+" : this.getMonth()+1,                 //月份
    "d+" : this.getDate(),                    //日
    "h+" : this.getHours(),                   //小时
    "m+" : this.getMinutes(),                 //分
    "s+" : this.getSeconds(),                 //秒
    "q+" : Math.floor((this.getMonth()+3)/3), //季度
    "S"  : this.getMilliseconds()             //毫秒
  };
  if(/(y+)/.test(fmt)) {
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  }
  for(var k in o) {
    if(new RegExp("("+ k +")").test(fmt)){
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    }
  }
  return fmt;
}
/*
 * 重写时间的toJSON方法，因为在调用JSON.stringify的时候，时间转换就调用的toJSON，这样会导致少8个小时，所以重写它的toJSON方法
 */
Date.prototype.toJSON = function () {
  return this.format("yyyy-MM-dd hh:mm:ss"); // util.formatDate是自定义的个时间格式化函数
}

