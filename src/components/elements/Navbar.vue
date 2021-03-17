<template>
  <!-- hash <Menu class="navbar" :model="items" /> -->
  <div :class="['p-menu p-component layout-sidebar', { active: active }]">
    <div class="layout-menu  p-menu-list p-reset">
      <template v-for="item in items" :key="item.label">
        <div class="p-menu-separator" v-if="item.separator" />
        <template v-else>
          <div class="menu-category p-submenu-header">{{ item.label }}</div>
          <div v-if="item.items" class="menu-items p-menuitem">
            <template v-for="child in item.items" :key="child.label">
              <div class="p-menu-separator" v-if="child.separator" />
              <template v-else>
                <a
                  class="p-menuitem-link"
                  v-if="child.target"
                  :href="child.target"
                  target="_blank"
                >
                  <span :class="`p-menuitem-icon pi ${child.icon}`"></span>
                  {{ child.label }}
                </a>
                <router-link
                  class="p-menuitem-link"
                  v-if="child.to"
                  :to="child.to"
                >
                  <span :class="`p-menuitem-icon pi ${child.icon}`"></span>
                  {{ child.label }}
                  <Tag
                    class="p-tag-rounded p-error p-pt-1 p-pb-1 p-ml-2"
                    v-if="child.badge"
                    :value="child.badge"
                  ></Tag>
                </router-link>
                <template v-if="child.items">
                  <router-link
                    class="p-menuitem-link"
                    :to="child.items ? child.items[0].to : '/'"
                    v-slot="{ isActive }"
                    custom
                  >
                    <div>
                      <a
                        class="p-menuitem-link"
                        tabindex="0"
                        @click="
                          toggleSubmenu(
                            $event,
                            child.label ? child.label.toLowerCase() : ''
                          )
                        "
                        >{{ child.label }}</a
                      >
                      <transition name="p-toggleable-content">
                        <div
                          class="p-toggleable-content"
                          v-show="
                            isSubmenuActive(
                              child.label
                                ? child.label.toLowerCase()
                                : ''?.toLowerCase(),
                              isActive
                            )
                          "
                        >
                          <ul v-if="child.items">
                            <li
                              v-for="(submenuitem, i) in child.items"
                              :key="i"
                            >
                              <router-link
                                class="p-menuitem-link"
                                :to="submenuitem.to"
                                >{{ submenuitem.label }}</router-link
                              >
                            </li>
                          </ul>
                        </div>
                      </transition>
                    </div>
                  </router-link>
                </template>
              </template>
            </template>
          </div>
        </template>
      </template>
    </div>
  </div>
</template>




<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Menu from 'primevue/menu';
import { MenuItem } from '@/types/elements'
import menu from '@/assets/menu.json';

@Options({
  components: { Menu },

  props: {
    active: { type: Boolean, default: true, },
  },
})
export default class Navbar extends Vue {
  active!: boolean;
  items!: Partial<MenuItem>[];
  activeSubmenus: Record<string, boolean> = {};

  created() {
    this.items = menu as Partial<MenuItem>[];
  }

  // eslint-disable-next-line
  toggleSubmenu(event: { preventDefault: () => void; }, name: string | number) {
    this.activeSubmenus[name] = this.activeSubmenus[name] ? false : true;
    this.activeSubmenus = { ...this.activeSubmenus };
    event.preventDefault();
  }

  // eslint-disable-next-line
  isSubmenuActive(name: string | number, routerIsActive: any) {
    if (this.activeSubmenus[name]) {
      return true;
    }
    else if (routerIsActive) {
      this.activeSubmenus[name] = true;
      return true;
    }
    return false;
  }
}
</script>

<style scope>
.p-menu.navbar,
.p-menu.layout-sidebar {
  width: 100% !important;
  margin: 0;
  border-radius: 0;
  border: none;
}
.layout-sidebar .p-tag {
  min-height: 1rem;
  min-width: 1rem;
}
</style>
