<template>
  <Button
    class="p-button-text fancy-card p-p-0 fancy-card-1 p-text-left"
    @click="action"
    style="width: 100%"
  >
    <div class="p-card stats-card p-component p-p-3" style="width: 100%">
      <div class="stats-number p-card-title" v-if="loading">
        <ProgressSpinner
          style="width:20px;height:20px"
          strokeWidth="8"
          fill="#ffffff00"
          animationDuration=".5s"
        />
      </div>
      <div class="stats-number p-card-title" v-else>{{ value }}</div>
      <div class="stats-detail p-d-flex p-jc-between p-ai-center">
        <span>{{ title }}</span>

        <small
          :class="`${!!stat.direction ? 'text-success' : 'text-danger'}`"
          v-if="stat"
        >
          <template v-if="stat.value && stat.direction != null">
            <i v-if="!!stat.direction" class="text-success pi pi-caret-up"></i>
            <i v-else class="text-danger pi pi-caret-down"></i>
          </template>
          {{ stat.value || "" }}
        </small>
      </div>
    </div>
  </Button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    value: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    loading: {
      type: Boolean,
    },
    stat: {
      type: Object,
      required: false,
      default: () => ({}),
    },
    action: {
      type: Function,
      required: false,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      default: () => (() => { })(),
    },
  }
})
</script>

<style scoped>
.text-success {
  color: var(--primary-color);
}
.text-danger {
  color: var(--text-color-error);
}
.fancy-card {
  box-shadow: 0 2px 1px -1px rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%),
    0 1px 3px 0 rgb(0 0 0 / 12%);
  border-radius: 3px;
}
.fancy-card:hover {
  box-shadow: 0 3px 5px -1px rgb(0 0 0 / 20%), 0 5px 8px 0 rgb(0 0 0 / 14%),
    0 1px 14px 0 rgb(0 0 0 / 12%);
}
</style>