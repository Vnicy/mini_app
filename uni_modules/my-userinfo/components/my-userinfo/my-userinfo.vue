<template>
  <view class="my-userinfo-container">
    <view class="top-box">
      <image :src="userinfo.avatarUrl" class="avater"></image>
      <view class="nickname">{{userinfo.nickName}}</view>
    </view>
    
    
        <!-- 面板区域 -->
        <view class="panel-list">
          <!-- 第1个面板 -->
          <view class="panel">
            <view class="panel-body">
              <view class="panel-item">
                <text>8</text>
                <text>收藏的店铺</text>
              </view>
              <view class="panel-item">
                <text>14</text>
                <text>收藏的商品</text>
              </view>
              <view class="panel-item">
                <text>18</text>
                <text>关注的商品</text>
              </view>
              <view class="panel-item">
                <text>84</text>
                <text>足迹</text>
              </view>
            </view>
          </view>
    
          <!-- 第2个面板 -->
          <view class="panel">
            <view class="panel-title">
              我的订单
            </view>
            <view class="panel-body">
              <view class="panel-item">
                <image src="/static/my-icons/icon1.png" class="icon"></image>
                <text>待付款</text>
              </view>
              <view class="panel-item">
                <image src="/static/my-icons/icon2.png" class="icon"></image>
                <text>待收货</text>
              </view>
              <view class="panel-item">
                <image src="/static/my-icons/icon3.png" class="icon"></image>
                <text>退款/退货</text>
              </view>
              <view class="panel-item">
                <image src="/static/my-icons/icon4.png" class="icon"></image>
                <text>全部订单</text>
              </view>
            </view>
          </view>
    
          <!-- 第3个面板 -->
          <view class="panel">
            <view class="panel-list-item">
              <text>收货地址</text>
              <uni-icons type="arrowright" size="15"></uni-icons>
            </view>
            <view class="panel-list-item">
              <text>联系客服</text>
              <uni-icons type="arrowright" size="15"></uni-icons>
            </view>
            <view class="panel-list-item" @click="logout">
              <text>退出登录</text>
              <uni-icons type="arrowright" size="15"></uni-icons>
            </view>
          </view>
        </view>
      </view>

</template>
<script>
import { mapState,mapMutations } from 'vuex';
  export default{
      data(){
        return {
          
        };
      },
      computed:{
        ...mapState('m_user',['userinfo'])
      },
      methods:{
        ...mapMutations('m_user',['updateAddress','updateUserinfo','updateToken']),
        async logout(){
          const succ = await uni.showModal({
            title:"提示",
            content:'确认退出登录吗？',
          }).catch(err=>err)

          if(succ&&succ.confirm){
            this.updateAddress({})
            this.updateUserinfo({})
            this.updateToken()
          }
        }
      }
  }
</script>
<style lang="scss">
  .my-userinfo-container{
    
    background-color: #F4F4F4;
    height: 100%;
    
    .top-box{
      height: 400rpx;
      background-color: #C00000;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      
      .avater{
        width: 90px;
        height: 90px;
        border-radius: 45px;
        border: 2px solid #fff;
        box-shadow: 0 1px 5px black;
      }
      .nickname{
        font-size: 16px;
        color: #FFF;
        font-weight: bold;
        margin-top: 10px;
      }
    }
    
    .panel-list{
      padding: 0 10px;
      position: relative;
      top: -10px;
      
      .panel{
        background-color: white;
        border-radius: 3px;
        margin-bottom: 8px;
        .panel-title{
          line-height: 45px;
          padding-left: 10px;
          font-size: 15px;
          border-bottom: 1px solid #F4F4F4;
        }
        
        .panel-body{
          display: flex;
          justify-content: space-around;
          
          .panel-item{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;
            padding: 10px 0;
            font-size: 13px;
            
            .icon{
              width: 35px;
              height: 35px;
            }
          }
        }
      }
    }
  }
  .panel-list-item{
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 15px;
    padding: 0 10px;
    line-height: 45px;
  }
</style>
