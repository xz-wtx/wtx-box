import {get, post, postAES} from '../../http'

/**
 *登录
 */
export const login=p=>post("x/login",p,true);

/**
 *获取菜单
 */
export const getMenu=p=>post("x/getMenu",p,true);