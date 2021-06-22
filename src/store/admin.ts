// import AdminService from '@/services/AdminService';
// import { Admins, AdminsData } from '@/types/admin';
// import { ActionContext as BaseActionContext, } from 'vuex';

// type ActionContext = BaseActionContext<AdminState, AdminState>;
// export interface AdminState {
//   user: AdminsData;
//   token: string;
//   userName: string;
// }

// export default {
//   namespaced: true,
//   state: {
//     user: {} as AdminsData,
//     token: "",
//     userName: "",
//   },
//   getters: {
//     getInitial(state: AdminState) {
//       return () => state.user.firstName ? state.user.firstName.charAt(0).toUpperCase(): "";
//     },

//     getInits(state: AdminState) {
//       return () => state.user.firstName ? state.user.firstName.charAt(0).toUpperCase(): "";
//     },

//     async getUserAd (state: AdminState){
//       return () => state.userName
//     },
   
//   },
//   mutations: {
//     setUserName(state: AdminState, firstName: string) {
//       state.userName = firstName
//     },
//     setUser(state: AdminState, user: AdminsData){
//       state.user = user
//     },
//     setToken(state: AdminState, token: string){
//       state.token = token;
//     },
//   },
//   actions: {
    
//     async getUserAd(context: ActionContext, credentials: any){
//       const user = await (new AdminService()).login(credentials);
//       context.dispatch("attempt", user.admin.firstName);
//       // return user
//     },

//     async attempt (context: ActionContext, userName: any) {
//       context.commit("setUserName", userName)
//     },

   
//     getToken(context: ActionContext){
//       const token = window.localStorage.getItem("token");
//       if (token) {
//         context.commit("setToken", token);
//       }
//     },
//      // getUser(context: ActionContext){
//     //   const user = window.localStorage.getItem("user.fullName");
//     //   if (user) {
//     //     context.commit("setUser", user);
//     //   }
//     // },

//     // async getUser(context: ActionContext){
//     //   const user = await (new AdminService()).getCurrentAdmin();
//     //   context.commit("setUser", user);
//     //   return user
//     // },

//     // getter
//      // async getUser(state: AdminState) {
//     //   // if (state.user) {
//     //     return state.user;
//     //   // }
//     //   // const user = await (new AdminService()).getCurrentUser();
//     //   // return user;
//     // },
//   },
// };

import { AdminData } from '@/types/admin';
import { ActionContext as BaseActionContext, } from 'vuex';

type ActionContext = BaseActionContext<AdminState, AdminState>;
export interface AdminState {
  user: AdminData;
  token: string;
}

export default {
  namespaced: true,
  state: {
    user: {} as AdminData,
    token: "",
  },
  getters: {
    getInitial(state: AdminState) {
      return () => state.user.firstName ? state.user.firstName.charAt(0).toUpperCase(): "";
    },
    getUser(state: AdminState) {
      const userString = window.localStorage.getItem("user");
      if (userString) {
        state.user = JSON.parse(userString) as AdminData;
        return state.user
      }
      return state.user;
    },
  },
  mutations: {
    setUser(state: AdminState, user: AdminData){
      state.user = user
    },
    setToken(state: AdminState, token: string){
      state.token = token;
    },
  },
  actions: {
    getUser(context: ActionContext){
      const userString = window.localStorage.getItem("user");
      if (userString) {
        const user = JSON.parse(userString);
        context.commit("setUser", user);
      }
    },
    getToken(context: ActionContext){
      const token = window.localStorage.getItem("token");
      if (token) {
        context.commit("setToken", token);
      }
    },
  },
};