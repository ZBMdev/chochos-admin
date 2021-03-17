<template>
  <Card class="admin-card">
    <template #header>
      <img :alt="admin.name" :src="admin.images[0].url" />
    </template>
    <template #title>
      <router-link :to="'/admin/' + admin.id">
        {{ admin.name }}
      </router-link>
    </template>
    <template #content>
      <div>{{ admin.description }}</div>
    </template>
    <template #footer>
      <Button icon="pi pi-eye" label="View" />
    </template>
  </Card>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { AdminData } from '@/types/admin'
import Card from 'primevue/card';

@Options({
  components: { Card },
  props: {
    admin: Object
  }
})
export default class AdminCard extends Vue {
  admin!: AdminData
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
