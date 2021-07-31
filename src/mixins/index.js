import ResizeHandler from "@/components/menu/mixin/ResizeHandler";
export default  {

    methods:{
        $_is_Mobile(){
           return  ResizeHandler.methods.$_isMobile()?'85%':'65%'
        }
    }
}