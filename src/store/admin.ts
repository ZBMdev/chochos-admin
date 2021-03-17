import AdminService from '@/services/AdminService';
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
      return () => state.user.name ? state.user.name.charAt(0).toUpperCase(): "";
    },
    async getUser(state: AdminState) {
      if (state.user) {
        return state.user;
      }
      const user = await (new AdminService()).getCurrentUser();
      return user;
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
    async getUser(context: ActionContext){
      const user = await (new AdminService()).getCurrentUser();
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