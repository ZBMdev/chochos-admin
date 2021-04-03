<template>
  <div class="not-found p-d-flex p-jc-center p-ai-center">
    <div class="p-text-center p-text-info">
      <h1>404 <small> Not found </small></h1>
      <p>
        The page <b>{{ $route.fullPath }}</b> doesn't exist
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

<style scoped>
.not-found h1 {
  font-size: 6rem;
}
.not-found h1 small {
  font-size: 1.5rem;
  display: block;
  font-weight: 400;
}
.not-found p {
  font-size: 2rem;
}
.not-found a {
  font-size: 2rem;
  text-decoration: none;
}
</style>