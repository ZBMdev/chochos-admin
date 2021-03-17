<!--<template>
  <div class="container">
    <header class="jumbotron">
      <h3>
        <strong>{{ currentUser.username }}</strong> Profile
      </h3>
    </header>
    <p>
      <strong>Token:</strong>
      {{ currentUser.accessToken.substring(0, 20) }} ...
      {{ currentUser.accessToken.substr(currentUser.accessToken.length - 20) }}
    </p>
    <p>
      <strong>Id:</strong>
      {{ currentUser.id }}
    </p>
    <p>
      <strong>Email:</strong>
      {{ currentUser.email }}
    </p>
    <strong>Authorities:</strong>
    <ul>
      <li v-for="(role, index) in currentUser.roles" :key="index">
        {{ role }}
      </li>
    </ul>
  </div>
</template>
-->
<!--
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
const Auth = namespace("Auth");

@Component
export default class Profile extends Vue {
  @Auth.State("user")
  private currentUser!: any;

  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
  }
}
</script>-->


<template>
  <div class="container">
    <h1><strong> {{ username }}'s Profile </strong> </h1>
    <br>
    <br>
    <br>
    
    <p>
      <strong>Name:</strong>
      {{ username }}
    </p>
    <p>
      <strong>Email:</strong>
      {{ email }}
    </p>
  </div>
  <Button label="Edit" @click="handleEdit"/>
        
</template>

<script lang="ts">
// eslint-disable-next-line 
/* eslint-disable */

import { mapState, mapMutations, mapActions } from 'vuex';

export default{
   
  name: 'Profile',
 
  computed:{
    ...mapState(['username', 'email'])
  },
  methods: {
    ...mapMutations(['updateUsername']),
    ...mapActions(['getUserData'])
  }
}



 /*computed: {
    name: {
      get: ()=>{
        return this.$store.name
      },
      set: ()=>{
        this.$store.dispatch('updateUsername', newValue)
      }
    }
  }*/



/*export default {
  name: 'App',
  created(){
    this.$store.dispatch('videos/loadAll');
    this.$store.dispatch('users/loadCurrent');
    this.$store.dispatch('tags/loadAll');
  },
  components: {
  },
  computed: {
    ...mapState({
      currentUser: state => state.users.currentUser, 
      snackbars: state => state.snackbar.snackbars
    })
  },
  data: () => ({
    //
  }),
};
*/


/*//import {defineComponent} from "vue";
//import { createStore } from 'vuex'
import { VuexModule, Module, Mutation, Action} from 'vuex-module-decorators';

@Module ({ namespaced: true })
class Profile extends VuexModule{
  public username: string = "";
  public email: string = "";

  @Mutation
  public setUsername(newUsername: string): void {
    this.username = newUsername;
  }
  public setEmail(newEmail: string): void {
    this.email = newEmail;
  }
  
  @Action
  public updateUsername(newUsername: string): void {
    this.context.commit('setUsername',newUsername);
  }
  public updateEmail(newEmail: string): void {
    this.context.commit('setEmail',newEmail);
  }  

  get usernameUpperCase(): string {
    return this.username.toUpperCase();
  }
}

export default Profile;
*/

/*export default defineComponent({
  name: 'Profile',
  namespaced: true,
})*/

/*
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
const Profile = namespace('Profile');

@Component 
export default class Profile extends Vue{
  @Profile.State
  public username!: string;
  public email!: string;
  
  @Profile.Getter
  public usernameUpperCase!: string;
  public emailUpperCase!: string;

  @Profile.Action  
  public updateUsername!: (newUsername: string) => void;
  public updateEmail!:  (newEmail: string) => void;

}*/
</script>












