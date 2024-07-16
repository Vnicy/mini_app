import Vuex from 'vuex'
import m_cart from '@/store/cart.js'
import m_user from '@/store/user.js'

const store = new Vuex.Store({
  modules:{
    m_cart,
    m_user
  }
})

export default store;
