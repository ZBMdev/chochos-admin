<!-- <template @error="handleError($event)">
  <Toast :baseZIndex="999999" />
  <router-view></router-view>
</template> -->

<template @error="handleError($event)">
  <Toast :baseZIndex="999999" />
  <router-view></router-view>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { useToast } from 'primevue/usetoast';

@Options({})
export default class extends Vue {
  toast = useToast()

  mounted() {
    // eslint-disable-next-line
    // @ts-ignore
    this.emitter.on("error", this.handleError);
  }

  handleError(message: { message: string; validationErrors: string[] }) {
    const error = `${message.message}\n${message.validationErrors?.map((val) => '* ' + val).join("\n")}`;
    this.toast.add({ severity: "error", summary: "An error occured", detail: error, life: 5000 });
    // eslint-disable-next-line
    // @ts-ignore
    this.emitter.off('error', this.handleError); this.emitter.on('error', this.handleError)
  }
}
</script>

<style>
body {
  position: relative;
  margin: 0;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: var(--surface-a);
  font-family: var(--font-family) !important;
  font-weight: 400;
  color: var(--text-color);
  -webkit-font-smoothing: antialiased;
  --font-family: "Poppins", sans-serif;
}

html {
  font-size: 15px;
}
img {
  width: 100%;
  height: auto;
}
.p-component {
  font-family: var(--font-family) !important;
  --font-family: "Poppins", sans-serif;
}

.payment-methods .p-card .p-card-title {
  font-size: 1.2rem;
}
.product-edit .p-card .p-card-title,
.product-new .p-card .p-card-title {
  font-size: 1rem !important;
}

.p-tree {
  font-size: 0.8rem;
  padding: 1rem 0 !important;
}
.p-tree .p-checkbox .p-checkbox-box {
  width: 15px;
  height: 15px;
}
.p-tree .p-tree-container .p-treenode .p-treenode-content .p-tree-toggler {
  font-size: 0.6rem;
  width: 1rem !important;
  height: 1rem !important;
}
.p-datatable .p-column-filter {
  width: 100%;
}

.p-datatable-responsive .p-datatable-tbody > tr > td .p-column-title {
  display: none;
}

@media screen and (max-width: 40em) {
  .p-datatable.p-datatable-responsive .p-datatable-tfoot > tr > td,
  .p-datatable.p-datatable-responsive .p-datatable-thead > tr > th {
    display: none !important;
  }
  .p-datatable.p-datatable-responsive .p-datatable-tbody > tr > td {
    text-align: left;
    display: block;
    width: 100%;
    float: left;
    clear: left;
    border: 0 none;
  }
  .p-datatable.p-datatable-responsive
    .p-datatable-tbody
    > tr
    > td
    .p-column-title {
    padding: 0.4rem;
    min-width: 30%;
    display: inline-block;
    margin: -0.4em 1em -0.4em -0.4rem;
    font-weight: 700;
  }
  .p-datatable.p-datatable-responsive .p-datatable-tbody > tr > td:last-child {
    border-bottom: 1px solid var(--surface-d);
  }

  .p-datatable.p-datatable-responsive .p-rating {
    display: inline;
  }

  .p-datatable.p-datatable-responsive .p-datatable-scrollable-body {
    overflow: hidden;
    position: relative;
  }

  .p-datatable.p-datatable-responsive table.p-datatable-scrollable-body-table {
    width: unset;
  }

  .p-datatable.p-datatable-responsive
    table.p-datatable-scrollable-body-table
    td {
    width: calc(100vw - 2rem);
  }
}

.router-link-exact-active {
  color: var(--primary-color) !important;
}

.fancy-card-1 {
  border-top: 3px solid #c8e6c9 !important;
}
.fancy-card-1 .p-card-title {
  color: #256029 !important;
}
.fancy-card-2 {
  border-top: 3px solid #afb5fe !important;
}
.fancy-card-2 .p-card-title {
  color: #40468a !important;
}
.fancy-card-3 {
  border-top: 3px solid #feedaf !important;
}
.fancy-card-3 .p-card-title {
  color: #8a5340 !important;
}
.fancy-card-4 {
  border-top: 3px solid #ffcdd2 !important;
}
.fancy-card-4 .p-card-title {
  color: #c63737 !important;
}

.p-toast-detail {
  white-space: pre-wrap !important;
}

.order-badge.status-delivered {
  background: #c8e6c9;
  color: #256029;
}
.order-badge.status-processing {
  background: #feedaf;
  color: #8a5340;
}
.order-badge.status-pending {
  background: #ffcdd2;
  color: #c63737;
}
.order-badge.status-shipped {
  background: #dbe6c8;
  color: #446025;
}
.order-badge.status-cancelled,
.order-badge.status-declined {
  color: #3c3c3c;
  background: #bababa;
}
.order-badge {
  border-radius: 2px;
  padding: 0.25em 0.5rem;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.3px;
}

.item-deactivated,
.item-activated {
  border-radius: 2px;
  padding: 0.25em 0.5rem;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.3px;
}

.item-deactivated {
  background: #feedaf;
  color: #8a5340;
}
.item-activated {
  background: #c8e6c9;
  color: #256029;
}
</style>