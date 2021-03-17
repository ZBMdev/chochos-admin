<template>
  <div class="heading">
    <h1 class="p-mb-0">{{ title }}</h1>
    <p>{{ subtitle }}</p>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    title: { type: String, default: "", },
    subtitle: { type: String, default: "", },
  },
})
export default class PageHeading extends Vue {
  title!: string;
  subtitle!: string;
}
</script>

<style scoped>
</style>