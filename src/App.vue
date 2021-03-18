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
    this.toast.add({ severity: "error", summary: "An error occured", detail: error });
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

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {   
  padding: 30px;
}  
a {
    font-weight: bold;
    color: #2c3e50;
}
.router-link-exact-active {
      color: #42b983;
}

</style>