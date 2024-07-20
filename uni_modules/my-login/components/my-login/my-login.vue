<template>
  <view class="login-container">
    <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
    <button type="primary" class="btn-login" @click="getUserProfile">一键登录</button>
    <text class="tips-text">登录后尽享更多</text>
  </view>
</template>
<script>
  import { mapMutations,mapState } from 'vuex';
  export default{
    data(){
     return{
       
     }; 
    },
    computed:{
      ...mapState('m_user',['redirectInfo'])
    },
    methods:{
      ...mapMutations('m_user',['updateUserinfo','updateToken','updateRedirectInfo']),

      getUserProfile() {
          uni.getUserProfile({
               desc: '请求授权', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
               success: (res) => {

                // 这部分是更新用户信息的
                this.updateUserinfo(res.userInfo)
                console.log(res.userInfo);
                this.getToken(res)
               },
               fail: (res) => {
                return uni.$showMsg("已取消登录授权")
               }
            })
      },
      async getToken(info){
        //获取code对应的值
        const res = await uni.login().catch(err=>err)
        if(res.errMsg !== 'login:ok') return uni.$showMsg('登录失败！-1-')
        console.log(res);
        
        //准备参数
        const query ={
          code: res.code,
          encryptedData: info.encryptedData,
          iv: info.iv,
          rawData: info.rawData,
          signature:info.signature
        }
        
        const {data:loginResult} =  await uni.$http.post('/api/public/v1/users/wxlogin',query)
        console.log(loginResult);
        
      //因为没有，直接写死进去
      //   if(loginResult.meta.status !== 200) {
      //     return uni.$showMsg('登录失败！-2- 已写死token')
      //   }
        
        // this.updateToken(loginResult.message.token)
        this.updateToken('Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo')  
        uni.$showMsg('登录成功！')
        
        this.naviagteBack()
      },
      naviagteBack(){
        if(this.redirectInfo && this.redirectInfo.opentype==='switchTab'){
          uni.switchTab({
            url:this.redirectInfo.from,
            complete:()=> {
              this.updateRedirectInfo(null)
            }
          })
        }
      }
    }
    
  }
</script>
<style lang="scss">
  .login-container{
    height: 750rpx;
    background-color: #F8F8F8;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; 
    position: relative;
    overflow: hidden;
    
    &::after{
      content: ' ';
      display: block;
      width: 100%;
      height: 40px;
      background-color: cyan;
      position:absolute;
      bottom: 0;
      left: 0;
      border-radius: 100%;
      transform: translateY(50%);
      background-color: white;
      
    }
    
    .btn-login{
      width: 90%;
      border-radius: 100px;
      margin: 15px 0;
      background-color: #C00000;
    }
    .tips-text{
      font-size: 12px;
      color: gray;
    }
  }
</style>
