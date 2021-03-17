/*import { createStore } from 'vuex'

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})*/



import axios from 'axios';
import { createStore } from 'vuex'

export default createStore({
  state: {
    username: "Busola Okemoney",
    email: "busolaokemoney@gmail.com"
  },
  mutations: {
    updateUsername(state, username){
      state.username = username
    },
    updateEmail(state, email){
      state.email = email
    },
    loadUserData(state, payload){
      state.username = payload.username;
      state.email = payload.email;
    }
  },
  actions: {
    getUserData(context, payload){
      axios.get('http://localhost/profile').then((response) => {
          context.commit('loadUserData', response)
        })
    } 
  },
  modules: {
      
  }
})
