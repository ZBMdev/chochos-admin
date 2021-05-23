<template>
  <div class="admin">
    <PageHeading title="Admin" subtitle="nothing yet" />
     <h1>This is an admin page</h1>

  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import MainLayout from '@/components/layouts/MainLayout.vue';

@Options({
  components: { MainLayout, },
})
export default class Admin extends Vue { }
</script>
