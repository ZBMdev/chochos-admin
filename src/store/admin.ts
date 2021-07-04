import AdminService from '@/services/AdminService';
import { AdminsData } from '@/types/admin';
import { ActionContext as BaseActionContext, } from 'vuex';

type ActionContext = BaseActionContext<AdminState, AdminState>;
export interface AdminState {
  user: AdminsData;
  token: string;
  username: string;
  role: string;
}

export default {
  namespaced: true,
  state: {
    user: {} as AdminsData,
    token: "",
    username: "",
    role: ""
  },
  getters: {
    getInitial(state: AdminState) {
      return () => state.user.firstName ? state.user.firstName.charAt(0).toUpperCase(): "";
    },
    async getUser(state: AdminState) {
      // if (state.user) {
        return state.user;
      // }
      // const user = await (new AdminService()).getCurrentUser();
      // return user;
    },
    getUsername(state: AdminState) {
      return () => state.username
    },
   
  },
  mutations: {
    setUser(state: AdminState, user: AdminsData){
      state.user = user
    },
    setToken(state: AdminState, token: string){
      state.token = token;
    },
    setRole(state: AdminState, role: string){
      state.role = role;
    },
    setUsername(state: AdminState, username: string){
      state.username = username;
    },
  },
  actions: {
    // async getUser(context: ActionContext){
    //   const user = await (new AdminService()).getCurrentAdmin();
    //   context.commit("setUser", user);
    //   return user
    // },
    getUser(context: ActionContext){
      const admin = window.localStorage.getItem("admin");
      if (admin) {
        context.commit("setAdmin", admin);
      }
    },
    async attempt (context: ActionContext, userName: any) {
      context.commit("setUserName", userName)
    },

   
    getToken(context: ActionContext){
      const token = window.localStorage.getItem("token");
      if (token) {
        context.commit("setToken", token);
      }
    },
    getRole(context: ActionContext){
      const role = window.localStorage.getItem("role");
      if (role) {
        context.commit("setRole", role);
      }
    },
    getUsername(context: ActionContext){
      const username = window.localStorage.getItem("username");
      if (username) {
        context.commit("setUsername", username);
      }
    },
     // getUser(context: ActionContext){
    //   const user = window.localStorage.getItem("user.fullName");
    //   if (user) {
    //     context.commit("setUser", user);
    //   }
    // },

    // async getUser(context: ActionContext){
    //   const user = await (new AdminService()).getCurrentAdmin();
    //   context.commit("setUser", user);
    //   return user
    // },

    // getter
     // async getUser(state: AdminState) {
    //   // if (state.user) {
    //     return state.user;
    //   // }
    //   // const user = await (new AdminService()).getCurrentUser();
    //   // return user;
    // },
  },
};

// import { AdminData } from '@/types/admin';
// import { ActionContext as BaseActionContext, } from 'vuex';

// type ActionContext = BaseActionContext<AdminState, AdminState>;
// export interface AdminState {
//   user: AdminData;
//   token: string;
// }

// export default {
//   namespaced: true,
//   state: {
//     user: {} as AdminData,
//     token: "",
//   },
//   getters: {
//     getInitial(state: AdminState) {
//       return () => state.user.firstName ? state.user.firstName.charAt(0).toUpperCase(): "";
//     },
//     getUser(state: AdminState) {
//       const userString = window.localStorage.getItem("user");
//       if (userString) {
//         state.user = JSON.parse(userString) as AdminData;
//         return state.user
//       }
//       return state.user;
//     },
//   },
//   mutations: {
//     setUser(state: AdminState, user: AdminData){
//       state.user = user
//     },
//     setToken(state: AdminState, token: string){
//       state.token = token;
//     },
//   },
//   actions: {
//     getUser(context: ActionContext){
//       const userString = window.localStorage.getItem("user");
//       if (userString) {
//         const user = JSON.parse(userString);
//         context.commit("setUser", user);
//       }
//     },
//     getToken(context: ActionContext){
//       const token = window.localStorage.getItem("token");
//       if (token) {
//         context.commit("setToken", token);
//       }
//     },
//   },
// };