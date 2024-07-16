<template>
  <view class="goods-item">
    <view class="goods-item-left">
      <radio :checked="item.goods_state" color="#c00000" v-if="showRadio" @click="radioClickHandler"></radio>
      <image :src="item.goods_small_logo || defaultPic" class="goods-pic"></image>
    </view>
    <view class="goods-item-right">
      <view class="goods-name">{{item.goods_name}}</view>
      <view class="goods-info-box">
        <view class="goods-price">￥{{item.goods_price.toFixed(2)}}</view>
        <uni-number-box :min="1" :value="item.goods_count" v-if="showNum" @change="numChange"></uni-number-box>
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
      },
      showRadio:{
        type:Boolean,
        //默认不会显示radio属性
        default:false
      },
      showNum:{
        type:Boolean,
        default:false
      }
    },
    data(){
      return {
        //默认图片链接，图片失效即使用
        defaultPic:'http://image2.suning.cn/uimg/b2c/newcatentries/0070078057-000000000634917020_1_400x400.jpg'
      }
    },
    methods:{
      //这是radio点击事件的处理函数
      radioClickHandler(){
        //调用this.$emit触发外界自定义函数
        this.$emit('radio-change',{
          goods_id:this.item.goods_id,
          goods_state:!this.item.goods_state,
        })
      },
      //数量改变事件的处理函数
      numChange(val){
        console.log(val);
        this.$emit('num-change',{
          goods_id:this.item.goods_id,
          goods_count:+val
        })
      }
    }
  }

</script>
<style lang="scss">
  .goods-item{
    width: 750rpx;
    box-sizing: border-box;
    display: flex;
    padding: 10xp 5px;
    border-bottom: 1px solid #f0f0f0;
    
    .goods-item-left{
      margin-right: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .goods-pic{
        width: 100px;
        height: 100px;
        display: block;
      }
    }
    .goods-item-right{
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: space-between;
      .goods-name{
        font-size: 13px;
      }
      .goods-info-box{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .goods-price{
          font-size: 16px;
          color: #C00000;
        }
      }
    }
  }
</style>
