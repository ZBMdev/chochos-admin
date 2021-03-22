<template>
  <Timeline
    v-if="order.status_histories.length"
    :value="histories"
    align="left"
    dataKey="id"
    class="history-timeline"
  >
    <template #marker="{item: history}">
      <span
        class="custom-marker p-shadow-2"
        :style="{
          backgroundColor: statusDecorations[history.to_status].colors.light,
          color: statusDecorations[history.to_status].colors.dark
        }"
      >
        <i :class="statusDecorations[history.to_status].icon"></i>
      </span>
    </template>
    <template #content="{item: history}">
      <div
        class="p-card p-component p-pl-2 p-pr-2 p-pt-3 p-pb-3 p-mb-3"
        :style="{
          borderTop:
            '3px solid ' + statusDecorations[history.to_status].colors.light
        }"
      >
        <div
          class="p-card-title"
          :style="{
            color: statusDecorations[history.to_status].colors.dark
          }"
        >
          {{ history.to_status }}
        </div>
        <div class="p-d-flex p-mb-2" style="font-size:0.8rem;">
          <span>{{ order.formatDate(history.created_at) }}</span>
        </div>
        <blockquote
          style="width:100%;"
          v-if="history.comment"
          class="p-mt-3 p-ml-0"
        >
          {{ history.comment }}
        </blockquote>
      </div>
    </template>
  </Timeline>
  <template v-else>
    Nothing yet.
  </template>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { statusDecorations, StatusHistoryData } from '@/types/orders';

export default defineComponent({
  data() {
    return {
      statusDecorations
    }
  },
  props: {
    order: { type: Object, required: true }
  },
  computed: {
    histories() {
      const histories: StatusHistoryData[] = [
        {
          id: -1,
          /* eslint-disable-next-line */
          to_status: this.order.status_histories[0].from_status,
          /* eslint-disable-next-line */
          created_at: this.order.created_at
        },
        ...this.order.status_histories,
      ]
      return histories.sort((a, b) => b.id - a.id);
    }
  }
});
</script>
<style>
.history-timeline .p-timeline-event-opposite {
  display: none;
}
.history-timeline .p-timeline-event-content {
  padding-right: 0 !important;
}
.history-timeline .p-card-title {
  font-size: 1rem;
  text-transform: capitalize;
}
.history-timeline .custom-marker {
  border-radius: 5rem;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>