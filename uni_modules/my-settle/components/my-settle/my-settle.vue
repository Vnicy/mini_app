<template>
  <view class="my-settle-container">
    <!-- 全选 -->
    <label class="radio" @click="changeFullCheck">
      <radio color="#c00000" :checked="isFullCheck"/><text>全选</text>
    </label>
    <!-- 合计 -->
    <view class="amount-box">
      合计:<text class="amount">￥{{totalPrice}}</text>
    </view>
    <!-- 结算 -->
    <view class="btn-settle" @click="settlement">
      结算({{checkedCount}})
    </view>
  </view>
</template>
<script>
  import { mapGetters, mapMutations,mapState } from 'vuex';
  export default{
    data(){
      return {
        //倒计时秒数
        seconds:3,
        timer:null
      };
    },
    methods:{
      ...mapMutations('m_cart',['updateAllGoodsState']),
      ...mapMutations('m_user',['updateRedirectInfo']),
      ...mapGetters('my_user',['addstr']),
      changeFullCheck(){
        this.updateAllGoodsState(!this.isFullCheck)
      },
      settlement(){
        console.log(this.checkedCount);
        if(!this.checkedCount) return uni.$showMsg('请选择要结算的商品')
        
        if(!this.addstr) return uni.$showMsg('请选择收货地址')
        
        // if(!this.token) return uni.$showMsg('请先登录')
        if(!this.token) return this.delayNavigate('请先登录')
        
        this.payOrder()
        
      },
      async payOrder(){
        //1.创建订单
        //1.1组织订单的信息对象
        const orderInfo = {
          // order_price:this.totalPrice,
          order_price:0.01,
          consignee_addr:this.addstr,
          goods:this.cart.filter(x=>x.goods_state).map(x=>({
            goods_id:x.goods_id,
            goods_number:x.goods_count,
            goods_price:x.goods_price
          }))
        }
        //1.2发起请求，创建订单
        const {data:res} = await uni.$http.post('/api/public/v1/my/orders/create', orderInfo)
        console.log(res);
        if(res.meta.status!==200) return uni.$showMsg(res.meta.msg)
        //1.3得到服务器响应的订单编号
        const orderNumber = res.message.order_number
        
        //2.订单预支付
        //  2.1 发起请求获取订单的支付信息
        const {data:res2} = await uni.$http.post('/api/public/v1/my/orders/req_unifiedorder', {order_number: orderNumber})
        //  2.2 预付订单生成失败
        if(res2.meta.status!==200) return uni.$showMsg(res.meta.msg)
        //  2.3 得到订单支付相关的必要参数
        const payInfo = res2.message.pay
        
        //3.发起微信支付
        //3.1调用uni.requestPayment()发起微信支付
        const [err, succ] = await uni.requestPayment(payInfo)
        //3.2未完成支付
        if(err) return uni.$showMsg('订单未支付!')
        //3.3完成了支付，进一步查询支付结果
        const {data:res3} = await uni.$http.post('/api/public/v1/my/orders/chkOrder',{order_number:orderNumber})
        //3.4检测到订单未完成
        if(res3.meta.status!==200) return uni.$showMsg('订单未支付!')
        //3.5订单已完成
        uni.showToast({
          title:'订单支付完成',
          icon:'success'
        })
      },
      //延时导航到my页面
      delayNavigate(){
        this.seconds = 3
        this.showTips(this.seconds)
        
        this.timer = setInterval(()=>{
          this.seconds--;
          
          if(this.seconds<=0){
            clearInterval(this.timer)
            
            uni.switchTab({
              url:'/pages/my/my',
              success:()=>{
                this.updateRedirectInfo({
                  opentype:'switchTab',
                  from:'/pages/cart/cart'
                })
              }
            })
            
            return
          }
          
          this.showTips(this.seconds)
        },1000)
      },
      //展示倒计时提示消息
      showTips(n){
        uni.showToast({
          icon:'none',
          title:'请登录后再结算！'+n+'秒之后自动跳转到登录页',
          mask:true,
          duration:1500
        })
      }
    },
    computed:{
      ...mapGetters('m_cart',['checkedCount', 'total','totalPrice']),
      ...mapGetters('m_user', ['addstr']),
      ...mapState('m_user',['token']),
      ...mapState('m_cart',['cart']),
      isFullCheck(){
        return this.total===this.checkedCount
      }
    },
  }
</script>
<style lang="scss">
  .my-settle-container{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    padding-left: 5px;
    
    .radio{
      display: flex;
      align-items: center;
    }
    .amount-box{
      .amount{
        color: #C00000;
        font-weight: bold;
      }
    }
    .btn-settle{
      background-color: #c00000;
      height: 50px;
      color: white;
      line-height: 50px;
      padding: 0 10px;
      min-width: 100px;
      text-align: center;
    }
    
  }
</style>
