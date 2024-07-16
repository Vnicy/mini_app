import {mapGetters} from 'vuex'

export default {
    computed:{
      ...mapGetters('m_cart',['total'])
    },
    onShow(){
      this.setBedge()
    },
    watch:{
      total(){
        this.setBedge()
      }
    },
    methods: {
      setBedge(){
          uni.setTabBarBadge({
            index:1,
            text:this.total + ''
          })
        
      }
    }

  
}