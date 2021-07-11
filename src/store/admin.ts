import axios from 'axios'
import AdminService from '@/services/AdminService';
import { AdminData, AdminsData } from '@/types/admin';
import { ActionContext as BaseActionContext, } from 'vuex';

type ActionContext = BaseActionContext<AdminState, AdminState>;
export interface AdminState {
  admin: AdminsData;
  user: AdminsData;
  token: string;
  username: string;
  role: string;
}

export default {
  namespaced: true,
  state: {
    admin: {} as AdminsData,
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
    async getAdmin(state: AdminState) {
      return state.user.fullName;
    },
    getUsername(state: AdminState) {
      return () => state.username
    },
   
  },
  mutations: {
    setUser(state: AdminState, user: AdminsData){
      state.user = user
    },
    setAdmin(state: AdminState, admin: AdminsData){
      state.admin = admin
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
    getUser(context: ActionContext){
      const admin = window.localStorage.getItem("admin");
      if (admin) {
        context.commit("setAdmin", admin);
      }
    },
    getAdmin(context: ActionContext){
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
  },
};
