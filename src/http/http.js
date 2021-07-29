/**axios封装
 * 请求拦截、相应拦截、错误统一处理
 */

import axios from 'axios';
import QS from 'qs';
import AESUtil from "../utils/AESUtil";
import { ElLoading,ElMessage } from 'element-plus';
import store from '../store'

// 环境的切换
let HOST = process.env.NODE_ENV;


axios.defaults.baseURL = 'http://localhost:8003';
if (HOST === 'uat') {
  axios.defaults.baseURL =  'http://localhost:8003';
} else if (HOST === 'prod') {
  axios.defaults.baseURL = 'http://localhost:8003';
}

// 请求超时时间
axios.defaults.timeout = 40000;

// 请求拦截器
axios.interceptors.request.use(
    config => {
      config.headers['Content-Type'] = 'application/json'
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
            ElMessage.error("未登录或无权限")
            setTimeout(() => {
              location.href="/";
            },1200)
            break;
          case 402:
            ElMessage.error("登录已过期")
            setTimeout(() => {
              location.href="/";
            },1200)
            break;
          case 403:
            ElMessage.error("无操作权限")
            //清除token
            break;
          case 500:
            break;
          case 901:
            ElMessage.error("下载失败")
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
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @param isToast
 * @param LoadingTitle
 */
export function get(url, params={},isToast=false,LoadingTitle="数据加载中") {
  let loading;
  if(isToast){
    loading = ElLoading.service({
      lock: true,
      text: LoadingTitle,
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    });
  }
  return new Promise((resolve, reject) => {
    axios.get(url,{params:params})
        .then(res => {

          if(isToast) {
            loading.close();
          }
          resolve(res);
        })
        .catch(err => {

          if(isToast) {
            loading.close();
          }
          reject(err)
        })
  });
}
/**
 * postFromData方法，对应postFromData请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @param isToast
 * @param LoadingTitle
 */
export function postFromData(url, params={},isToast=false,LoadingTitle="数据加载中") {
  let loading;
  if(isToast){
    loading = ElLoading.service({
      lock: true,
      text: LoadingTitle,
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    });
  }
  return new Promise((resolve, reject) => {
    axios.post(url,params)
        .then(res => {
          if(isToast) {
            loading.close();
          }
          resolve(res);
        })
        .catch(err => {
          if(isToast) {
            loading.close();
          }
          reject(err)
        })
  });
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @param isToast
 * @param LoadingTitle
 */
export function postData(url, params={},isToast=false,LoadingTitle="数据加载中") {

  let loading;
  if(isToast){
    loading = ElLoading.service({
      lock: true,
      text: LoadingTitle,
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    });
  }

  return new Promise((resolve, reject) => {
    axios.post(url,QS.stringify(params))
        .then(res => {
          if(isToast) {
            loading.close();
          }
          resolve(res);
        })
        .catch(err => {
          if(isToast) {
            loading.close();
          }
          reject(err)
        })
  });
}
export function postAES(url, params={},isToast=false,LoadingTitle="数据加载中") {
  return post(url,params,isToast,LoadingTitle,true)
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @param isToast
 * @param LoadingTitle
 * @param AES
 */
export function post(url, params={},isToast=false,LoadingTitle="数据加载中",AES=false) {

  let loading;
  if(isToast){
    loading = ElLoading.service({
      lock: true,
      text: LoadingTitle,
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    });
  }
  let body=JSON.stringify(params);
  if(AES){
    body= AESUtil.Encrypt(body);
  }
  return new Promise((resolve, reject) => {
    axios({url:url,method:'post', data:body,
      headers:{
        'content-type':"application/json"
      }})
        .then(res => {
          if(isToast) {
            loading.close();
          }
          resolve(res);
        })
        .catch(err => {
          if(isToast) {
            loading.close();
          }
          reject(err)
        })
  });
}

/**
 * 文件导出
 * @param url
 * @param params
 * @param fileName 文件名加后缀（123.xlsx）
 * @param isToast
 * @param LoadingTitle
 * @returns {Promise<unknown>}
 */
export function postExportFileAES(url, params={},fileName={},isToast=true,LoadingTitle="导出中") {
  return postExportFile(url,params,fileName,isToast,LoadingTitle,true)
}

/**
 * 文件导出
 * @param url
 * @param params
 * @param fileName
 * @param isToast
 * @param LoadingTitle
 * @param AES
 * @returns {Promise<unknown>}
 */
export function postExportFile(url, params={},fileName,isToast=false,LoadingTitle="导出中",AES=false) {
  let loading;
  if(isToast){
    loading = ElLoading.service({
      lock: true,
      text: LoadingTitle,
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    });
  }
  let body=JSON.stringify(params);
  if(AES){
    body= AESUtil.Encrypt(body);
  }
  return new Promise((resolve, reject) => {

    axios({url:url,method:'post',
      data:body,
      responseType: 'blob',
      headers:{
        'content-type':"application/json"
      },timeout:43200})
        .then(res => {
          if(isToast) {
            loading.close();
          }
          if(!res.data){
            ElMessage.error("下载失败")
            return
          }
          const fileReader = new FileReader();
          fileReader.readAsText(res.data);
          fileReader.onload = function (e) {
            if(e.target.result.indexOf("code")===-1){
              try {
                let blob = new Blob([res.data]);
                let url = window.URL.createObjectURL(blob);
                let aLink = document.createElement("a");
                aLink.style.display = "none";
                aLink.href = url;
                aLink.setAttribute("download", fileName);
                document.body.appendChild(aLink);
                aLink.click();
                document.body.removeChild(aLink); //下载完成移除元素
                window.URL.revokeObjectURL(url); //释放掉blob对象
                ElMessage.success("下载成功")
                resolve(res);
              }catch (e1){
                ElMessage.error("下载失败原因："+e1)
              }
            }else{
              console.log(e.target)
              let result=JSON.parse(e.target.result);
              ElMessage.error("下载失败："+result.msg)
            }
          }
        })
        .catch(err => {
          if(isToast) {
            loading.close();
          }
          reject(err)
        })
  });
}

export function BaseUrl(){
  return axios.defaults.baseURL;
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

