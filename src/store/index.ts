import { createStore } from 'vuex'
import AdminModule, {AdminState} from './admin';

export type State = {
  Admin: AdminState;
} & AdminState;

export default createStore<State>({
  // plugins: [createLogger()],
  state: { } as State,
  mutations: { },
  actions: { },
  modules: {
    Admin: AdminModule,
  }
})
