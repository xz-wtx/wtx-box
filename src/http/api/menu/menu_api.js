import {del, get,put,post,postJson,postFromData} from '../../http'

/**
 *菜单列表分页
 */
export const getMenuPageList=p=>get("static/menuPageList.json",p,true);

/**
 *菜单详情
 */
export const getMenu=p=>get("",p,true);
/**
 *删除菜单
 */
export const delMenu=(u,p)=>del("",p,true);
/**
 *新增菜单
 */
export const saveMenu=(p)=>postJson("",p,true);
/**
 *编辑菜单
 */
export const editMenu=(p)=>put("",p,true);

/**
 *Tree菜单
 */
export const getMenuTreeList=(p)=>get("static/treeMenuList.json",p,true);

export default {
    getMenuPageList,
    getMenu,
    delMenu,
    saveMenu,
    editMenu,
    getMenuTreeList
}