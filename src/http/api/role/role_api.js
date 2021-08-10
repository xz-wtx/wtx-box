import {del, get,put,post,postJson,postFromData} from '../../http'

/**
 *角色列表分页
 */
export const getRolePageList=p=>get("static/rolePageList.json",p,true);
/**
 *角色列表
 */
export const getRoleList=p=>get("static/roleList.json",p,true);
/**
 *角色详情
 */
export const getRole=p=>get("",p,true);
/**
 *删除角色
 */
export const delRole=(u,p)=>del("",p,true);
/**
 *新增角色
 */
export const addRole=(p)=>postJson("",p,true);
/**
 *编辑角色
 */
export const editRole=(p)=>put("",p,true);

export default {
    getRolePageList,
    getRoleList,
    getRole,
    delRole,
    addRole,
    editRole,

}