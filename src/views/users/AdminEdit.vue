<template>
  <div class="product-edit">
    <PageHeading
      :title="`${thereIsAnID ? 'Edit' : 'Create'} Admin`"
      subtitle=""
    />
    <ProgressSpinner v-if="isLoading" />
    <form v-else>
      <div class="p-grid">
        <div class="p-col-12 p-md-8">
          <Card class="edit p-mb-4">
            <template #content>
                <div class="p-d-flex p-jc-center p-ai-center ">
                    <Avatar
                        :label="`${admin.firstName.charAt(0).toUpperCase()}${admin.lastName.charAt(0).toUpperCase()}`" 
                        class="p-mr-2"
                        style="margin-top: 10px; padding: 10px; background-color:#c8e6c9; color:#256029; min-width:6rem; min-height:6rem; font-size:4rem;"
                        shape="circle"
                    />
                </div>
              <div class="p-field p-fluid p-mb-4">
                <label for="firstName">First Name</label>
                <InputText
                  class="p-inputtext-md product-title"
                  id="name"
                  type="text"
                  :required="true"
                  v-model="admin.firstName"
                />
              </div>
              <div class="p-field p-fluid p-mb-4">
                <label for="lastName">Last Name</label>
                <InputText
                  class="p-inputtext-md product-title"
                  id="lastName"
                  type="text"
                  :required="true"
                  v-model="admin.lastName"
                />
              </div>

              <div class="p-field p-fluid p-mb-4">
                <label for="username">Username</label>
                <InputText
                  class="p-inputtext-md product-title"
                  id="username"
                  type="text"
                  :required="true"
                  v-model="admin.username"
                />
              </div>
              <div class="p-field p-fluid p-mb-4">
                <label for="email">Email</label>
                <InputText
                  class="p-inputtext-md product-title"
                  id="email"
                  type="text"
                  :required="true"
                  v-model="admin.email"
                />
              </div>
            </template>
          </Card>
        </div>

        <div class="p-col-12 p-md-4">
          <div class="p-d-flex p-fluid p-mb-4">
            <Button
              type="submit"
              class="p-ml-auto p-button-info p-mr-2"
              icon="pi pi-save"
              label="Save"
              @click="saveAdmin()"
            />
          </div>


          <Card v-if="thereIsAnID" class="p-fluid p-mb-4">
            <template #title>
              Delete
            </template>
            <template #content>
              <Message severity="error" :closable="false">
                Be careful, you cannot undo this action
              </Message>
              <Button
                icon="pi pi-trash"
                class="p-button-danger"
                id="delete-product"
                label="Delete admin"
                @click="confirmDeleteAdmin"
              />
            </template>
          </Card>

          <Dialog
            v-model:visible="deleteAdminDialog"
            :style="{ width: '450px' }"
            header="Confirm"
            :modal="true"
          >
            <div class="confirmation-content">
              <i
                class="pi pi-exclamation-triangle p-mr-3"
                style="font-size: 2rem"
              />
              <span v-if="admin"
                >Are you sure you want to delete <b>{{ admin.firstName }}</b
                >?</span
              >
            </div>
            <template #footer>
              <Button
                label="No"
                icon="pi pi-times"
                class="p-button-text"
                @click="deleteAdminDialog = false"
              />
              <Button
                label="Yes"
                icon="pi pi-check"
                class="p-button-text"
                @click="deleteAdmin"
              />
            </template>
          </Dialog>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Admin from '@/models/Admin';
import SpecificationCard from '@/components/products/SpecificationCard.vue';
import { useToast } from 'primevue/usetoast';
import AdminService from '@/services/AdminService';
// import { ProductCreateParam } from '@/types/product';
import { TreeNode, SelectedCheckbox } from '@/types/category';
import BombsightService from '@/services/BombsightService';
import { reactive } from 'vue';
import { AdminUpdateParam } from '@/types/admin';


export default class AdminCardEdit extends Vue {
  admin = reactive(new Admin({})) as Admin;
  categories: TreeNode[] = [];
  selectedCategories: SelectedCheckbox = {};
  toast = useToast();
  adminService: AdminService = new AdminService();
  isLoading = false;
  expandedKeys: Record<number, boolean> = {};
  deleteAdminDialog = false;
  files!: File[];
  imageService = new BombsightService();
  imageLoading = false;

   created() {
    // watch the params of the route to fetch the data again
    this.$watch(
      () => this.$route.params,
      () => {
        if (this.thereIsAnID) {
          this.getData();
        }
      },
      // fetch the data when the view is created and the data is
      // already being observed
      { immediate: true }
    )
  }

  get thereIsAnID() {
    return !!this.$route.params.id
  }

  getData() {
    this.getAdmins();
  }


  getAdmins() {
    this.isLoading = true;
    this.adminService.getOne(+this.$route.params.id)
      .then((adminData) => {
        this.setAdmin(new Admin(adminData));
        this.isLoading = false;
      });
  }

  setAdmin(value: Admin) {
    this.admin = reactive(value) as Admin;
  }

  expandAll() {
    for (const node of this.categories) {
      this.expandNode(node);
    }

    this.expandedKeys = { ...this.expandedKeys };
  }

  expandNode(node: TreeNode) {
    this.expandedKeys[node.key] = true;
    if (node.children && node.children.length) {
      for (const child of node.children) {
        this.expandNode(child);
      }
    }
  }

  saveAdmin(param = this.admin.toCreateParam()) {
    this.isLoading = true;

    if (this.thereIsAnID) {
      return this.adminService
        .put(this.admin.id, param)
        .then((admin) => {
          this.setAdmin(new Admin(admin));
          this.toast.add({ severity: 'success', summary: 'Success', detail: 'Saved succesfully', life: 3000 });
        })
        .finally(() => {
          this.isLoading = false
        })
    } else {
      return this.adminService
        .create(param)
        .then((admin) => {
          const newadmin = new Admin(admin);
          this.toast.add({ severity: 'success', summary: 'Success', detail: 'Created succesfully', life: 3000 });
          this.$router.push({ name: "edit-admin", params: { id: newadmin.id, } })
        }).finally(() => {
          this.isLoading = false
        })
    }
  }

  confirmDeleteAdmin() {
    this.deleteAdminDialog = true;
  }

  deleteAdmin() {
    this.isLoading = true;
    this.adminService.delete(this.admin.id)
      .then((message) => {
        this.deleteAdminDialog = false;
        this.toast.add({ severity: 'success', summary: 'Successful', detail: message, life: 3000 });
        this.$router.push('/admins/')
      }).catch(() => {
        this.toast.add({ severity: 'error', summary: 'Error', detail: 'Deleting Failed', life: 3000 });
      }).finally(() => {
        this.isLoading = false;
      })
  }
}
</script>

<style>
.p-accordion .p-accordion-header .p-accordion-header-link {
  padding: 0.5rem !important;
}
@media (min-width: 768px) {
  .p-md-4 {
    padding: 0.5rem !important;
  }
}

.product-images .product-image .image-delete button:hover {
  color: #db1b1b;
}
.product-images .product-image .image-delete button {
  color: white;
  font-weight: 700;
  float: right;
}
.product-images .product-image .image-delete {
  display: none;
  position: absolute;
  inset: 0;
  background: #0000007b;
}

.product-images .product-image:hover .image-delete {
  display: block;
}

.product-images .product-image img {
  height: 100%;
  object-fit: cover;
}
.product-images .product-image {
  position: relative;
  height: 8rem;
  width: 100%;
}
.image-loading {
  display: flex;
  z-index: 2;
  inset: 0;
  position: absolute;
  background: rgba(0, 0, 0, 0.45);
  justify-content: center;
  align-items: center;
}
</style>