<template>
  <div class="main-layout p-grid p-ai-stretch vertical-container">
    <Sidebar class="hamburger-menu" v-model:visible="visibleLeft">
      <div class="brand p-text-bold p-d-flex p-ai-center">
        
        <div class="ml-2" id="brandName">Chochos-List</div>
      </div>
      <Navbar @click="closeSideBar" />
    </Sidebar>

    <div class="top-bar p-shadow-1">
      <div class="container p-d-flex p-ai-center">
        <Button
          icon="pi pi-bars"
          class="menu-button p-button-link p-button-secondary"
          @click="visibleLeft = true"
        />
        <div class="brand p-text-bold p-d-flex p-ai-center">
          
          <div class="ml-2" id="brandName">Chochos-List</div>
        </div>
        <div class="p-ml-auto p-ai-center p-d-flex">
          <Menu
            id="user_menu"
            :ref="setItemRef"
            :model="userMenu"
            :popup="true"
          />
          <!-- <Menu
            id="notification_menu"
            :ref="setItemRef"
            :model="notificationMenu"
            :popup="true"
          /> -->
          <Button
            id="toggleUserMenu"
            class="p-button-text p-button-secondary user p-0 p-ai-center p-d-flex"
            aria-haspopup="true"
            aria-controls="user_menu"
            @click="toggleUserMenu"
          >
            <Avatar
              class="avatar"
              style="background-color:#9c27b0; color: #ffffff"
              :label="adminInit"
              shape="circle"
            />
          </Button>
        </div>
      </div>
    </div>
    <div class="body">
      <div class="sidebar">
        <Navbar />
      </div>
      <main class="content">
        <!-- hash <main class="main"> -->
        <router-view />
        <slot></slot>
        <!-- hash </main> -->
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Navbar from '@/components/elements/Navbar.vue';
import Avatar from 'primevue/avatar';
import Menu from 'primevue/menu';
import { MenuItem } from '@/types/elements'
import { Ref } from 'vue'
// import logo from '@/assets/images/logo.svg';

@Options<MainLayout>({
  components: { Navbar, Avatar, Menu },

  props: {
    title: String,
    subtitle: String,
  },
  watch: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    '$route'(to, from) {
      this.closeSideBar()
    }
  },
  computed: {
    adminInit() {
      const initials = localStorage.getItem('username');
      return initials?.charAt(0).toUpperCase();
    }
  }


})
export default class MainLayout extends Vue {
  title!: string
  subtitle!: string
  visibleLeft = false;
  // logo: logo;
  notificationMenu: Partial<MenuItem>[] = [];
  userMenu: Partial<MenuItem>[] = [
    {
      label: '',
      items: [
        {
          label: 'Profile',
          icon: 'pi pi-pw pi-cog',
          to: '/profile',
        },
        {
          separator: true,
        },
        {
          label: 'Logout',
          icon: 'pi pi-pw pi-power-off',
          // to: '/login'
          command: () => this.logout(),
        },
      ]
    },
  ];
  itemRefs: Ref[] = [];

  logout() {
    window.localStorage.setItem("token", "");
    window.localStorage.setItem("user", "");
    window.localStorage.setItem("fullName", "");
    window.localStorage.setItem("email", "");
    window.localStorage.setItem("languages", "");
    window.localStorage.setItem("username", "");
    window.localStorage.setItem("admin", "");
    window.location.href = `/login?redirect=${window.location.pathname}`
    // this.$router.push({ name: "login", query: { redirect: this.$route.path } });

  }

  get user() {
    return this.$store.getters["Admin/getUser"];
  }
  get initial() {
    return this.$store.getters["Admin/getInitial"]();
  }
  
  mounted() {
    this.userMenu[0].label = this.user?.name
    // eslint-disable-next-line
    // @ts-ignore
    this.emitter.on("logout", this.logout);
    
    this.notificationMenu = [
      {
        label: 'Profile',
        icon: 'pi pi-pw pi-cog',
        to: '/profile',
      },
      {
        separator: true,
      },
      {
        label: 'Logout',
        icon: 'pi pi-pw pi-power-off',
        // to: '/',
      },
    ];
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setItemRef(el: Ref<any>) {
    if (el) {
      this.itemRefs.push(el)
    }
  }

  closeSideBar() {
    this.visibleLeft = false
  }

  beforeUpdate() {
    this.itemRefs = [];
  }

  toggleUserMenu(event: MouseEvent) {
    // console.log("hello user", this.itemRefs[0]);
    // eslint-disable-next-line
    (this.itemRefs[0] as any).toggle(event);
  }

  toggleNotifictionMenu(event: MouseEvent) {
    // console.log("hello notif", this.itemRefs[1]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (this.itemRefs[1] as any).toggle(event);
  }

}
</script>

<style scoped>
.main-layout {
  height: 100%;
  margin: 0;
  position: relative;
  width: 100%;
}
.brand img {
  height: 1.5rem;
  width: 1.5rem;
}

.brand {
  padding: 0 0.5rem;
  min-height: 4rem;
  font-size: 1.2rem;
  /* font-weight: bold; */
  color: #3e721d;
}
.top-bar {
  z-index: 999;
  padding: 0.1rem 0.8rem;
  margin: 0;
  /* max-height: 4rem; */
  height: 60px;
  top: 0;
  left: 0;
  right: 0;
  position: fixed;
  width: 100%;
  background: var(--surface-a);
}
.body {
  padding-top: 4rem;
  overflow-x: inherit;
  overflow-y: inherit;
  width: 100%;
  background-color: var(--surface-b);
  min-height: 100vh;
}
/* .main {
  background-color: var(--surface-b);
  margin: 0;
} */
.hamburger-menu {
  overflow-y: auto;
}

.content {
  padding: 12px 20px;
}

.sidebar {
  background: var(--surface-a);
  display: none;
  padding: 1rem;
}
.menu-button {
  display: block;
  margin-top: 15px;
}
.avatar{
  margin-top: -5px;
}
@media only screen and (min-width: 768px) {
  .menu-button {
    display: none;
  }
  .sidebar {
    display: block;
    position: fixed;
    margin-right: calc(100vw - 22vw);
    width: 22vw;
    /*height: calc(100vh - 4rem);*/
    height: 100vh;
    overflow-y: auto;
    bottom: 0;
    border-right: 1px solid #dee2e6;
  }
  .main {
    margin: 0px;
    width: 100%;
  }
  .content {
    position: relative;
    min-height: 100vh;
    margin-left: 22vw;
    right: 0;
    top: 0;
    width: calc(100vw - 22vw - 3);
  }
  .top-bar {
    padding: 0.1rem 2rem;
  }
}
</style>