
const { body } = document
const WIDTH = 992 // refer to Bootstrap's responsive design

export default {
  watch: {
    $route(route) {
      let bool=this.isCollapse;
      this.$_resizeHandler();
      this.isCollapse=bool;
      let _this=this;
      if(this.$_isMobile()){
        setTimeout(function () {
          _this.dialogShow=false;
          _this.isCollapse=true;
        },300)
      }
    }
  },
  beforeMount() {
    window.addEventListener('resize', this.$_resizeHandler)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.$_resizeHandler)
  },
  mounted() {
   this.$_resizeHandler();
  },
  methods: {
    $_isMobile() {
      const rect = body.getBoundingClientRect()
      return rect.width - 1 < WIDTH
    },
    $_resizeHandler() {
      if (!document.hidden) {
        const isMobile = this.$_isMobile();
        if (isMobile) {
            this.isCollapse=true;
            this.dialogShow=true;
            this.isMobile=true;
        }else{
          this.isCollapse=false;
          this.dialogShow=false;
          this.isMobile=false;
        }
      }
    }
  }
}
