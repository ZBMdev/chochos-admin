<template>
  <div class="product-edit">
    <PageHeading
      :title="`${thereIsAnID ? 'Edit' : 'Create'} Artisan`"
      subtitle=""
    />
    <ProgressSpinner v-if="isLoading" />
    <form v-else>
      <div class="p-grid">
        <div class="p-col-12 p-md-8">
          <Card class="edit p-mb-4">
            <template #content>
              <div class="p-field p-fluid p-mb-4">
                <label for="name"> Name</label>
                <InputText
                  class="p-inputtext-md product-title"
                  id="name"
                  type="text"
                  :required="true"
                  v-model="artisan.fullName"
                />
                <label for="name"> Job</label>
                <InputText
                  class="p-inputtext-md product-title"
                  id="name"
                  type="text"
                  :required="true"
                  v-model="artisan.jobName"
                />
              </div>
            </template>
              <div class="p-field">
                <label for="description">Description</label>
                <Editor
                  class="p-mb-4"
                  id="description"
                  :required="true"
                  v-model="artisan.email"
                  editorStyle="height: 220px"
                >
                </Editor>
              </div>
          </Card>

        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Product from '@/models/Product';
import SpecificationCard from '@/components/products/SpecificationCard.vue';
import { useToast } from 'primevue/usetoast';
import ArtisanService from '@/services/ArtisanService';
import Artisan from '@/models/Artisan';
import CategoryService from '@/services/CategoryService';
// import { ProductCreateParam } from '@/types/product';
import { TreeNode, SelectedCheckbox } from '@/types/category';
import BombsightService from '@/services/BombsightService';
import { reactive } from 'vue';
import { ProductImageUpdateParam } from '@/types/product';

@Options<ProductEdit>({
  components: { SpecificationCard },
})
export default class ProductEdit extends Vue {
  artisan = reactive(new Artisan({})) as Artisan;
  categories: TreeNode[] = [];
  selectedCategories: SelectedCheckbox = {};
  toast = useToast();
  artisanService: ArtisanService = new ArtisanService();
  categoryService: CategoryService = new CategoryService();
  isLoading = false;
  expandedKeys: Record<number, boolean> = {};
  deleteProductDialog = false;
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
        }// else {
        //   this.getCategories();
        // }
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
    this.getProducts();
  }
 
  getProducts() {
    this.isLoading = true;
    this.artisanService.getOne(+this.$route.params.id)
      .then((productData) => {
        this.setProduct(new Artisan(productData));
        this.isLoading = false;
      });
  }

  setProduct(value: Artisan) {
    this.artisan = reactive(value) as Artisan;
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