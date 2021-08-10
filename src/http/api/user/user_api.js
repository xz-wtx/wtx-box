import {del, get,put,post,postJson,postFromData} from '../../http'

/**
 *用户列表分页
 */
export const getUserPageList=p=>get("static/userPageList.json",p,true);

/**
 *用户详情
 */
export const getUser=p=>get("static/",p,true);
/**
 *删除用户
 */
export const delUser=(u,p)=>del("",p,true);
/**
 *新增用户
 */
export const addUser=(p)=>postJson("",p,true);
/**
 *编辑用户
 */
export const editUser=(p)=>put("",p,true);




export default  {
    getUserPageList,
    delUser,
    addUser,
    editUser,
    getUser
}