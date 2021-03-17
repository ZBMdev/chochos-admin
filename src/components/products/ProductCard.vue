<template>
  <Card class="product-card">
    <template #header>
      <img :alt="product.name" :src="product.images[0].url" />
    </template>
    <template #title>
      <router-link :to="'/products/' + product.id">
        {{ product.name }}
      </router-link>
    </template>
    <template #content>
      <div>{{ product.description }}</div>
    </template>
    <template #footer>
      <Button icon="pi pi-eye" label="View" />
    </template>
  </Card>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { ProductData } from '@/types/product'
import Card from 'primevue/card';

@Options({
  components: { Card },
  props: {
    product: Object
  }
})
export default class ProductCard extends Vue {
  product!: ProductData
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
