export default{
  namespaced:true,
  state:()=>({
    address:JSON.parse(uni.getStorageSync('address')||"{}"),
    token: uni.getStorageSync('token')||'',
    //Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo
    userinfo:JSON.parse(uni.getStorageSync('userinfo')||"{}"),
    //重定向的object对象
    redirectInfo:null
  }),
  mutations:{
    updateAddress(state, address){
      state.address = address
      
      this.commit('m_user/saveAddressToStorage')
    },
    saveAddressToStorage(state){
      uni.setStorageSync('address',JSON.stringify(state.address))
    },
    updateUserinfo(state, userinfo){
      state.userinfo = userinfo
      
      this.commit('m_user/saveUserinfoToStorage')
    },
    saveUserinfoToStorage(state){
      uni.setStorageSync('userinfo',JSON.stringify(state.userinfo))
    },
    updateToken(state, token){
      state.token = token
      
      this.commit('m_user/saveToken')
    },
    saveToken(state){
      uni.setStorageSync('token',JSON.stringify(state.token))
    },
    updateRedirectInfo(state,info){
      state.redirectInfo = info
    }
  },
  getters:{
    //收货地址
    addstr(state){
      if(!state.address.provinceName) return ''
      return state.address.provinceName+state.address.cityName+state.address.countyName+state.address.detailInfo
    }
  }
  
  }