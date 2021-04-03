<!--<template>
  <div class="other-layout p-d-flex p-ai-center">
    <main class="layout-content">
      <div class="brand p-text-center">
        <img
          class="logo p-mr-2"
          src="@/assets/images/logo.svg"
          alt="Chochos admin"
        />
      </div>
      <router-view />
    </main>
  </div>
</template> -->

<template>
  <div class="other-layout p-d-flex p-ai-center">
    <main class="layout-content">
      <router-view />
    </main>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Menu from 'primevue/menu';
// import { Ref } from 'vue'

@Options<MainLayout>({
  components: { Menu },
})
export default class MainLayout extends Vue { }
</script>

<style scoped>
.other-layout {
  min-height: 100vh;
  height: 100%;
  margin: 0;
  position: relative;
  width: 100%;
  background-color: var(--surface-b);
  padding: 2rem 0;
}

.brand img {
  height: auto;
  width: 10rem;
}

.layout-content {
  width: 100%;
  margin-left: 0.6rem;
  margin-right: 0.6rem;
}

@media only screen and (min-width: 768px) {
  .layout-content {
    width: 450px;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>