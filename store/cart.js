//#ifdef VUE3
// import { defineStore } from 'pinia';
// export const useCart = defineStore('m_cart',{
//   state: () => ({
//     cart: [1,2,3,4,5],
//   }),
// });
// #endif


export default{
  namespaced:true,
  
  state:()=>({
    //购物车数组，用来存储购物车中每个商品的信息对象
    //每个商品的信息对象，包含以下六个属性：
    //id name price count smalllogo state
    cart:JSON.parse(uni.getStorageSync('cart') || '[]')
  }),
  mutations:{
    //state中的数据只能被mutations里面的方法修改
    addToCart(state, goods){
      const findResult = state.cart.find(x=>x.goods_id === goods.goods_id)

      if(!findResult){
        state.cart.push(goods)
      }else{
        findResult.goods_count++
      }
      this.commit('m_cart/saveToStorage')
    },
    saveToStorage(state){
      uni.setStorageSync('cart', JSON.stringify(state.cart))
    },
    updateGoodsState(state, goods){
      const findResult = state.cart.find(x => x.goods_id===goods.goods_id)
      if(findResult){
        findResult.goods_state = goods.goods_state
        this.commit('m_cart/saveToStorage')
      }
    },
    updateGoodsCount(state,goods){
      const findResult = state.cart.find(x => x.goods_id===goods.goods_id)
      if(findResult){
        findResult.goods_count = goods.goods_count
        this.commit('m_cart/saveToStorage')
      }
    },
    deleteGoods(state,goods_id){
      state.cart = state.cart.filter(x => x.goods_id!==goods_id)
      this.commit('m_cart/saveToStorage')
    },
    updateAllGoodsState(state, newState){
      state.cart.forEach(x => x.goods_state=newState)
      
      this.commit('m_cart/saveToStorage')
    }
    
    
  },
  getters:{
    total(state){
      return state.cart.reduce((total, item)=>total+item.goods_count, 0)
    },
    checkedCount(state){
      return state.cart.filter(x => x.goods_state).reduce((total, item)=> total += item.goods_count ,0)
    },
    totalPrice(state){
      return state.cart.filter(x => x.goods_state).reduce((price, item)=> price += item.goods_count*item.goods_price ,0).toFixed(2)
    }
  }
}
