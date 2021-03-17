<template>
<div class="home">
  <section class="hero is-dark">
    <div id="navbar" class="navbar-menu">
    <div class="navbar-start">
      <!--<router-link to="/" class="navbar-item">Home</router-link>-->
      <router-link to="/about" class="navbar-item">About</router-link>
      <router-link to="/mainlayout" class="navbar-item">Dashboard</router-link>
      <router-link to="/admin" class="navbar-item">Admin</router-link>
    </div>
    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          <a class="button is-dark">
            <!--<strong>Sign In</strong>
            <router-link to="/login" class="login">Sign In</router-link>-->
            <router-link to="/login"  class="logout" @click="Logout">Logout</router-link>
          </a>
        </div>
      </div>
    </div>
  </div>

 
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          Welcome {{ name }}, to Foxygreen         
        </h1>
        <h2 class="subtitle">
          Make sure you check out our upcoming events below
        </h2>
      </div>
    </div>
  </section>
</div>
</template>
<script>

import {ref , onBeforeMount} from 'vue';
import firebase from 'firebase';

export default {
  setup(){
    const name = ref("");

    onBeforeMount(() => {
      const user = firebase.auth().currentUser;
      if (user){
        name.value = user.email.split('@')[0];
      }
    });

    const Logout = () => {
      firebase
        .auth()
        .signOut()
        .then(()=> console.log("Signed Out"))
        .catch(err=> alert(err.message));
    }
    return{
      name,
      Logout
    }
  }
}
</script>
<style scoped>
  .hero {    
    text-align: center;
    background-image: url('https://cdn.auth0.com/blog/vue-meetup/event-banner.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 400px;
  }
  .hero-body .title {
    text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.6);
    padding: 40px 0 20px 0;
    font-size: 60px;
  }
  .subtitle {
    text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.7);
    font-size: 30px;
  }
  .button-block {
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    position: absolute;
    bottom: -150px;
  }
  .button {
      margin-right: 50px;
      padding-left: 50px;
      padding-right: 50px;
    }
    .welcome {
      width: 400px;
      padding: 10px;
      margin-left: auto;
      margin-right: auto;
    }
  .is-xl {
    font-size: 1.7rem;
  }
</style>