<template>
  <Button class="l-button" v-if="loading" v-bind="$attrs" disabled>
    <div class="p-d-flex p-jc-between p-ai-center p-ml-auto p-mr-auto">
      <ProgressSpinner
        style="width:20px;height:20px"
        strokeWidth="8"
        fill="#ffffff00"
        animationDuration=".5s"
      />
      <span class="p-ml-4"> {{ loadingText }}</span>
    </div>
  </Button>
  <Button v-else v-bind="$attrs" />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    loading: {
      type: Boolean,
      defualt: true,
    },
    loadingText: {
      type: String,
      defualt: "Loading",
    },
  },
})
export default class LButton extends Vue {
  loading!: boolean;
  loadingText!: string;
}
</script>