<template>
  <view class="my-search-container" :style="{'background-color':bgcolor}" @click="searchBoxHandler">
    <view class="my-search-box" :style="{'borderRadius':radius+'px'}">
      <!-- 使用uni-ui提供的图标组件 -->
      <uni-icons type="search" size="17"></uni-icons>
      <text class="placeholder">搜索</text>
    </view>
  </view>
</template>
<script>
  export default{
    props:{
      //背景颜色
      bgcolor:{
        type:String,
        default:"#C00000"
      },
      //圆角尺寸
      radius:{
        type:Number,
        default:18
      }
    },
    data(){
      
    },
    methods:{
      searchBoxHandler(){
        this.$emit('click')//触发外部gotoSearch
      }
    }
  }
</script>
<style lang="scss">
  .my-search-container{
    height: 50px;
    display: flex;
    align-items: center;
    padding: 0 10px;
     
    
    .my-search-box{
      height: 36px;
      background-color: #FFFFFF;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      
      .placeholder{
        font-size: 15px;
      }
    }
  }
</style>
