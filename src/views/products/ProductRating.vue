<template>
  <div class="">
    <div style="border-top: 1px solid #dee2e6;margin: 0.25rem 0;" />
    <div class="product-review p-pl-2 p-pr-2 p-mb-2">
      <div class="p-d-flex p-ai-center">
        <Avatar
          size="large"
          label="E"
          class="p-mr-2"
          style="background-color:#c8e6c9;color:#256029"
          shape="circl"
        />
        <h4 class="p-mb-2 p-mt-2">
          Emmanuel Oluwa
          <small class="p-d-block text-muted" style="font-weight:normal;">
            <Rating
              :readonly="true"
              :modelValue="2"
              :stars="5"
              :cancel="false"
            />
            on
            <a href="/">
              Chicken (broiler)
            </a>
            <span class="p-d-block text-muted">Wednesday Feb 24 2021</span>
          </small>
        </h4>
      </div>
      <div style="font-style:italic;">
        I really enjoyed the chicken stew
      </div>
    </div>
    <div style="border-top: 1px solid #dee2e6;margin: 0.25rem 0;" />
    <div class="product-review p-pl-2 p-pr-2 p-mb-2">
      <div class="p-d-flex p-ai-center">
        <Avatar
          size="large"
          label="E"
          class="p-mr-2"
          style="background-color:#c8e6c9;color:#256029"
          shape="circl"
        />
        <h4 class="p-mb-2 p-mt-2">
          Emmanuel Oluwa
          <small class="p-d-block text-muted" style="font-weight:normal;">
            <Rating
              :readonly="true"
              :modelValue="2"
              :stars="5"
              :cancel="false"
            />
            on
            <a href="/">
              Chicken (broiler)
            </a>
            <span class="p-d-block text-muted">Wednesday Feb 24 2021</span>
          </small>
        </h4>
      </div>
      <div style="font-style:italic;">
        I really enjoyed the chicken stew
      </div>
    </div>
    <div style="border-top: 1px solid #dee2e6;margin: 0.25rem 0;" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import ProgressBar from 'primevue/progressbar'
import Rating from 'primevue/rating'
import Chart from 'primevue/chart'

@Options({
  components: { Rating, ProgressBar, Chart },
})
export default class ProductRating extends Vue {

}
</script>

<style>
.product-review .p-rating .p-rating-icon {
  font-size: 0.8rem;
}
.product-review .p-rating {
  display: inline;
}
</style>