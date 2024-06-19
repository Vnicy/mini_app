<template>
  <view>
    <view class="goods-list">
      <view v-for="(item,index) in goodsList" :key="index" @click="gotoDetail(item)">
        <my-goods :item="item"></my-goods>
      </view>

    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 请求参数对象
        queryObj:{
          query:'',
          cid:'',
          pagenum:1,
          pagesize:10
        },
        goodsList:[],
        total:0,
        isloading:false
      };
    },
    onLoad(options){
      this.queryObj.query = options.query || ''
      this.queryObj.cid = options.cid || ''
      
      this.getGoodsList()
    },
    methods:{
      //获取商品列表数据
      async getGoodsList(cd){
        // 打开节流阀
        this.isloading = true
        const {data:res} = await uni.$http.get('/api/public/v1/goods/search',this.queryObj)
        // 打开节流阀
        this.isloading = false
        cd&&cd()
        if(res.meta.status !== 200) return uni.$showMsg()
        this.goodsList = [...this.goodsList,...res.message.goods]
        this.total = res.message.total
      },
      gotoDetail(item){
        uni.navigateTo({
          url:'/subpkg/goods_details/goods_details?goods_id'+item.goods_id
        })
      }
    },
    onReachBottom() {
      if(this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return uni.$showMsg("数据加载完毕")
      
      //页码值自增＋1
      if(this.isloading) return
      this.queryObj.pagenum++
      this.getGoodsList()
    },
    onPullDownRefresh (){
      
      //重制关键数据
      this.queryObj.pagenum = 1
      this.total = 0 
      this.isloading = false
      this.goodsList = []
      
      //重新发起数据请求
      this.getGoodsList(()=> uni.stopPullDownRefresh())
    }
  }
</script>

<style lang="scss">

</style>
