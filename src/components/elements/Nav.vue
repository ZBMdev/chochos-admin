<template>
<nav class="navbar container" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="/">
      <strong class="is-size-4">Foxygreen</strong>
    </a>
    <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>
  <div id="navbar" class="navbar-menu">
    <div class="navbar-start">
      <!--<router-link to="/" class="navbar-item">Home</router-link>
      <router-link to="/about" class="navbar-item">About</router-link>
      <router-link to="/mainlayout" class="navbar-item">Dashboard</router-link>-->

      <router-link to="/admin" class="navbar-item">Admin</router-link>
    </div>
    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          <a class="button is-dark">
            <!--<strong>Sign In</strong>-->
            <router-link to="/login" class="login">Sign In</router-link>
          </a>
          <a class="button is-dark">
            <router-link to="/register" class="register">Register</router-link>
          </a>
        </div>
      </div>
    </div>
  </div>
</nav>
</template>
<script>
export default {
  name: 'Nav'
}
</script>
<style scoped>
  nav {
    margin-top: 25px;
    margin-bottom: 30px;
  }
  nav a {
      font-weight: bold;
      color: #2c3e50;
  }
  nav .login, nav .register{
    color: #fff;
  }
  nav .router-link-exact-active {
        color: #d88d00; 
  } 
</style>