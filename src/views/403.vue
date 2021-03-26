<template>
  <div class="unauthorized p-d-flex p-jc-center p-ai-center">
    <div class="p-text-center p-text-info">
      <h1>403 <small> Forbbiden </small></h1>
      <p>
        You are not authorised to access
        <b>{{ $route.query.page || "this page" }}</b>
      </p>
      <div class="p-d-flex p-jc-center">
        <Button
          icon="pi pi-arrow-left"
          label="Go Back"
          class="p-button-text"
          @click="$router.go(-2)"
        />
        <Button
          icon="pi pi-home"
          label="Go Home"
          class="p-button-text"
          @click="$router.push('/')"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// import { hasAccess } from '@/router/utils'

export default defineComponent({
  mounted() {
    if (this.$route.query.page) {
      const availableRoutes = this.$router.getRoutes()
      const toRoute = availableRoutes.find((route) => route.path == this.$route.query.page)
      /* if (hasAccess(toRoute?.meta.permit)) {
        this.$router.replace({ path: (this.$route.query.page as string) })
      } */
    }
  }
})
</script>

<style scoped>
.unauthorized h1 {
  font-size: 6rem;
}
.unauthorized h1 small {
  font-size: 1.5rem;
  display: block;
  font-weight: 400;
}
.unauthorized p {
  font-size: 2rem;
}
.unauthorized a {
  font-size: 2rem;
  text-decoration: none;
}
</style>