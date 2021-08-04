import {get, post, postAES} from '../../http'

/**
 *登录
 */
export const login=p=>post("x/login",p,true);



export default  {
    login
}