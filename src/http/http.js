
import AESUtil from "@/utils/AESUtil";
import {axiosBase,successTitle,errorTitle,openToast,clearToast,openConfirm} from './api/request'



/**
 * get请求
 * @param url 路径 路径
 * @param body 参数
 * @param isToast 开启Toast
 * @param LoadingTitle load提示
 * @returns {Promise<unknown>}
 */
export function get(url,body,isToast=true,LoadingTitle="加载中...") {
    return new Promise((resolve, reject) => {
        request(url, "get", body, {}, LoadingTitle, isToast).then(r => {
            resolve(r)
        }).catch(err=>{
            reject(err)
        })
    })
}

/**
 * post请求
 * @param url 路径
 * @param body 参数
 * @param isToast 开启Toast
 * @param LoadingTitle load提示
 * @returns {Promise<unknown>}
 */
export function post(url,body,isToast=true,LoadingTitle="加载中...") {
    return new Promise((resolve, reject) => {
        request(url, "post", body, {}, LoadingTitle, isToast).then(r => {
            resolve(r)
        }).catch(err=>{
            reject(err)
        })
    })
}
/**
 * postJson请求
 * @param url 路径
 * @param body 参数
 * @param isToast 开启Toast
 * @param LoadingTitle load提示
 * @returns {Promise<unknown>}
 */
export function postJson(url,body,isToast=true,LoadingTitle="加载中...") {
    return new Promise((resolve, reject) => {
        request(url, "post", JSON.stringify(body), {'content-type':"application/json"}, LoadingTitle, isToast).then(r => {
            resolve(r)
        }).catch(err=>{
            reject(err)
        })
    })
}
/**
 * postJson请求
 * @param url 路径
 * @param body 参数
 * @param isToast 开启Toast
 * @param LoadingTitle load提示
 * @returns {Promise<unknown>}
 */
export function postJsonAES(url,body,isToast=true,LoadingTitle="加载中...") {
    return new Promise((resolve, reject) => {
        request(url, "post", AESUtil.Encrypt(body), {'content-type':"application/json"}, LoadingTitle, isToast).then(r => {
            resolve(r)
        }).catch(err=>{
            reject(err)
        })
    })
}
/**
 * postFromData请求
 * @param url 路径
 * @param body 参数
 * @param isToast 开启Toast
 * @param LoadingTitle load提示
 * @returns {Promise<unknown>}
 */
export function postFromData(url,body,isToast=true,LoadingTitle="加载中...") {
    return new Promise((resolve, reject) => {
        request(url, "post", body, {}, LoadingTitle, isToast).then(r => {
            resolve(r)
        }).catch(err=>{
            reject(err)
        })
    })
}


/**
 * put请求
 * @param url 路径
 * @param body 参数
 * @param isToast 开启Toast
 * @param LoadingTitle load提示
 * @returns {Promise<unknown>}
 */
export function put(url,body,isToast=true,LoadingTitle="删除中...") {
    return new Promise((resolve, reject) => {
        request(url, "put", body, {}, LoadingTitle, isToast).then(r => {
            resolve(r)
        }).catch(err=>{
            reject(err)
        })
    })
}

/**
 * del请求
 * @param url 路径
 * @param body 参数
 * @param isToast 开启Toast
 * @param LoadingTitle load提示
 * @returns {Promise<unknown>}
 */
export function del(url,isToast=true,LoadingTitle="删除中...") {
    return new Promise((resolve, reject) => {
        request(url, "del", {}, {}, LoadingTitle, isToast).then(r => {
            resolve(r)
        }).catch(err=>{
            reject(err)
        })
    })
}

/**
 * json导出文件
 * @param url 路径
 * @param params 参数
 * @param fileName 文件名
 * @param timeout 超时时间
 * @param isToast 开启Toast
 * @returns {Promise<unknown>}
 */
export function postJsonExportFile(url,params={},fileName,timeout=103200,isToast=true){
    return new Promise((resolve, reject) => {
        exportFile(url,"post", JSON.stringify(params), fileName, {'content-type': "application/json"}, timeout, isToast, "导出中")
            .then(r =>{
                resolve(r)
            }).catch(err=>{
            reject(err)
        })
    })
}

/**
 * post导出文件
 * @param url 路径
 * @param params 参数
 * @param fileName 文件名
 * @param timeout 超时时间
 * @param isToast 开启Toast
 * @returns {Promise<unknown>}
 */
export function postExportFile(url,params={},fileName,timeout=103200,isToast=true){
    return new Promise((resolve, reject) => {
        exportFile(url,"post", params, fileName, {}, timeout, isToast, "导出中")
            .then(r =>{
                resolve(r)
            }).catch(err=>{
            reject(err)
        })
    })
}

/**
 * 文件导出
 * @param url 路径
 * @param method 方法 方法
 * @param params 参数
 * @param fileName 文件名
 * @param headers 请求头
 * @param timeout 超时时间
 * @param isToast 开启Toast
 * @param LoadingTitle load提示
 * @returns {Promise<unknown>}
 */
function exportFile(url,method, params={},fileName,headers,timeout=103200,isToast=true,LoadingTitle="导出中") {
    let loading;
    if(isToast){
        loading= openToast(LoadingTitle)
    }
    return new Promise((resolve, reject) => {
        axiosBase()({
            url:url,
            method:method,
            data:params,
            responseType: 'blob',
            headers:headers,timeout:timeout})
            .then(res => {
                if(isToast) {
                    clearToast(loading)
                }
                if(!res.data){
                    errorTitle("下载失败")
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
                            successTitle("下载成功")
                            resolve(res);
                        }catch (e1){
                            errorTitle("下载失败原因："+e1)
                        }
                    }else{
                        console.log(e.target)
                        let result=JSON.parse(e.target.result);
                        errorTitle("下载失败原因："+result.msg)
                    }
                }
            })
            .catch(err => {
                if(isToast) {
                    clearToast(loading)
                }
                reject(err)
            })
    });
}



/**
 * 请求
 * @param url 路径
 * @param method   方法
 * @param body 参数
 * @param headers 请求头
 * @param LoadingTitle load提示
 * @param isToast 开启Toast
 * @returns {Promise<unknown>}
 */
function request(url,method,body={},headers={},LoadingTitle="加载中...",isToast=true){
    let toast;
    if(isToast){
        toast=openToast(LoadingTitle)
    }

    return new Promise((resolve, reject) => {
        axiosBase()({url:url,method:method, data:body, headers:headers})
            .then(res => {
                if(isToast) {
                    clearToast(toast)
                }
                resolve(res);
            })
            .catch(err => {
                if(isToast) {
                    clearToast(toast)
                }
                reject(err)
            })
    });
}

/**
 * 基础http路径
 * @returns {*}
 */
export function baseHttpPath(){
    return axiosBase().defaults.baseURL;
}