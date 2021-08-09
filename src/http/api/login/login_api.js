import {get} from '../../http'

/**
 *登录
 */
export const login=p=>get("static/login.json",p,true);



export default  {
    login
}