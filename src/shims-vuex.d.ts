// vuex.d.ts
import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'
import Vue from 'vue'
import {State} from "@/store"

declare module '@vue/runtime-core' {
  // declare your own store states
  // type State = State

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>
  }
}