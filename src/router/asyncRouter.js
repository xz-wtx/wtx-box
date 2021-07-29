import router from '../router/index'
import errer from "@/views/sys/errer/errer";
import index from '../views/sys/index/Index';
import layout from '../components/layout/common';
import store from '../store'

function addRouter() {

    let files = require.context('@/views/', true, /\.vue$/)
    const menuTreeList = JSON.parse(store.getters.getMenuList);

    if(menuTreeList===null||menuTreeList===undefined){
        return;
    }
    let list=filterRouter(menuTreeList,files.keys());

    let objIndex=
        {
            name:"Index",
            path: "/index",
            component: index,
            children: list
        }
    router.options.routes=router.options.routes.filter(p=>{
        return p.name!=='Index'
    })

    router.options.routes.push(objIndex);
    router.addRoute(objIndex);
    console.log("router:",router.options.routes)
    router.push("/index")
}

function filterRouter(routers,files) { // 遍历后台传来的路由字符串，转换为组件对象

    let accessedRouters=[];
    routers.filter(route => {

        let comment;
        if(route.component==='common'){
            comment=layout;
        }else{
            comment=component(route.component,files);
        }

        let obj= {
            path: route.path,
            name: route.name,
            component:comment,
            title:route.title,
            meta:route.meta
        }

        accessedRouters.push(obj);

        if (route.children && route.children.length) {
            obj.children= route.children = filterRouter(route.children,files)
        }
        return true
    })

    return accessedRouters
}

function component(component,files) {

    if(files.indexOf(`./` + component + `.vue`)>-1){
        return ()=>import(`@/views/`+component+`.vue`);
    }else{
        return ()=>errer;
    }
}

export default {
    addRouter,
}
