<template>
  <nav>
    <router-link :to="{ name: 'init-reset-password' }">
      Forgot Password
    </router-link>
    <a @click.prevent="() => {}">|</a>
    <router-link :to="{ name: 'login' }">Login</router-link>
  </nav>
</template>


<style scoped>
nav {
  font-size: 0.8rem;
  display: flex;
  padding: 1rem 0 0;
  text-align: center;
  justify-content: center;
}
a {
  /* color: var(--primary-color); */
  color: #000;
  margin-right: 1rem;
  text-decoration: none;
}
.router-link-exact-active {
  display: none;
}
</style>