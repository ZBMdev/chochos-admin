import AdminService from '@/services/AdminService';
import { AdminsData } from '@/types/admin';
import { ActionContext as BaseActionContext, } from 'vuex';

type ActionContext = BaseActionContext<AdminState, AdminState>;
export interface AdminState {
  user: AdminsData;
  token: string;
}

export default {
  namespaced: true,
  state: {
    user: {} as AdminsData,
    token: "",
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
  },
  mutations: {
    setUser(state: AdminState, user: AdminsData){
      state.user = user
    },
    setToken(state: AdminState, token: string){
      state.token = token;
    },
  },
  actions: {
    async getUser(context: ActionContext){
      const user = await (new AdminService()).getCurrentAdmin();
      context.commit("setUser", user);
      return user
    },
    getToken(context: ActionContext){
      const token = window.localStorage.getItem("token");
      if (token) {
        context.commit("setToken", token);
      }
    },
  },
};