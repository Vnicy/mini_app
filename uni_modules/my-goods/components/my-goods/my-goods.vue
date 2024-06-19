<template>
  <view class="goods-item">
    <view class="goods-item-left">
      <image :src="item.goods_small_logo || defaultPic" class="goods-pic"></image>
    </view>
    <view class="goods-item-right">
      <view class="goods-name">{{item.goods_name}}</view>
      <view class="goods-info-box">
        <view class="goods-price">￥{{item.goods_price.toFixed(2)}}</view>
      </view>
    </view>
  </view>
</template>
<script>
  export default{
    props:{
      item:{
        type:Object,
        default:{}
      }
    },
    data(){
      return {
        //默认图片链接，图片失效即使用
        defaultPic:'http://image2.suning.cn/uimg/b2c/newcatentries/0070078057-000000000634917020_1_400x400.jpg'
      }
    },
  }

</script>
<style lang="scss">
  .goods-item{
    display: flex;
    padding: 10xp 5px;
    border-bottom: 1px solid #f0f0f0;
    
    .goods-item-left{
      margin-right: 5px;
      .goods-pic{
        width: 100px;
        height: 100px;
        display: block;
      }
    }
    .goods-item-right{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .goods-name{
        font-size: 13px;
      }
      .goods-info-box{
        .goods-price{
          font-size: 16px;
          color: #C00000;
        }
      }
    }
  }
</style>
