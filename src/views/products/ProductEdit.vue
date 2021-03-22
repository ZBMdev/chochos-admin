<template>
  <div class="product-edit">
    <PageHeading
      :title="`${thereIsAnID ? 'Edit' : 'Create'} Product`"
      subtitle=""
    />
    <ProgressSpinner v-if="isLoading" />
    <form v-else>
      <div class="p-grid">
        <div class="p-col-12 p-md-8">
          <Card class="edit p-mb-4">
            <template #content>
              <div class="p-field p-fluid p-mb-4">
                <label for="name">Product Name</label>
                <InputText
                  class="p-inputtext-md product-title"
                  id="name"
                  type="text"
                  :required="true"
                  v-model="product.name"
                />
              </div>

              <div class="p-field">
                <label for="description">Description</label>
                <Editor
                  class="p-mb-4"
                  id="description"
                  :required="true"
                  v-model="product.description"
                  editorStyle="height: 220px"
                >
                </Editor>
              </div>

              <div class="p-fluid p-grid p-formgrid p-mb-2">
                <div class="p-col p-field">
                  <label for="quantity">Quantity </label>
                  <InputNumber
                    class="product-quantity"
                    id="quantity"
                    :required="true"
                    :min="0"
                    v-model="product.quantity"
                  />
                </div>
              </div>

              <div class="p-fluid p-grid p-formgrid p-mb-2">
                <div class="p-col p-field">
                  <label for="price">Price </label>
                  <InputNumber
                    class="product-price"
                    id="price"
                    type="text"
                    :required="true"
                    v-model="product.price"
                    mode="currency"
                    currency="NGN"
                    locale="en-NG"
                  />
                </div>

                <div class="p-col p-field">
                  <label for="discount">Discount Price</label>
                  <InputNumber
                    class="product-discount"
                    id="discount"
                    type="text"
                    mode="currency"
                    currency="NGN"
                    locale="en-NG"
                    v-model="product.discount"
                  />
                </div>
              </div>
            </template>
          </Card>

          <Card v-if="thereIsAnID" class="p-fluid p-mb-4">
            <template #title>
              Images
            </template>
            <template #content>
              <div style="position: relative;" class="">
                <!-- <BlockUI
                  :baseZIndex="imageLoading ? 30 : 0"
                  autoZIndex="false"
                  :blocked="imageLoading"
                > -->
                <ProgressSpinner v-if="imageLoading" />
                <template v-else>
                  <div class="p-grid p-gutter-4 product-images">
                    <div
                      v-for="image in product.images"
                      :key="image.id"
                      class="p-col-6 p-lg-4"
                    >
                      <div class="product-image">
                        <div class="image-delete">
                          <Button
                            @click="deleteProductImage(image.id)"
                            class="p-button-text"
                            icon="pi pi-trash"
                          />
                        </div>
                        <img :src="image.url" :alt="product.name + image.id" />
                      </div>
                    </div>
                  </div>
                  <FileUpload
                    name="files"
                    :customUpload="true"
                    @uploader="uploadImage"
                    @before-upload="uploadImage"
                    chooseLabel="Browse"
                    accept="image/*"
                    :maxFileSize="5000000"
                    :auto="false"
                    :fileLimit="10"
                    :multiple="true"
                  >
                    <template #empty>
                      <p>Drag and drop files to here to upload.</p>
                    </template>
                  </FileUpload>
                </template>
                <!-- </BlockUI> -->
              </div>
            </template>
          </Card>

          <Card>
            <template #title>
              <div>Additional Information</div>
            </template>

            <template #content>
              <div class="p-fluid p-field">
                <label for="colors">Colors </label>
                <Chips
                  class="product-colors"
                  id="colors"
                  v-model="product.colorsList"
                  separator=","
                />
                <small id="colors-help">Separate by comma</small>
              </div>

              <div class="p-fluid p-field">
                <label for="size_variation">Size Variations </label>
                <Chips
                  class="product-size_variation"
                  id="size_variation"
                  v-model="product.sizeVariationList"
                  separator=","
                />
                <small id="size_variation-help">Separate by comma</small>
              </div>

              <div class="p-fluid p-field">
                <label for="size_metric">Size metrics </label>
                <Chips
                  class="product-size_metric"
                  id="size_metric"
                  v-model="product.sizeMetricList"
                  separator=","
                />
                <small id="size_metric-help">Separate by comma</small>
              </div>

              <div class="p-fluid p-field">
                <label for="specifications">Specifications</label>
                <SpecificationCard
                  buttonLabel="Create new specification"
                  keyLabel="Specification name"
                  valueLabel="Value"
                  id="specifications"
                  v-model:modelValue="product.specificationsObj"
                />
                <small id="specifications-help"
                  >Custom properties of you product</small
                >
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
              :label="!product.is_published ? `Save Draft` : 'Update'"
              @click="saveProduct()"
            />
            <!--  -->
            <Button
              v-if="!product.is_published"
              type="submit"
              class="p-ml-auto"
              icon="pi pi-upload"
              label="Publish"
              @click="publishProduct()"
            />
          </div>

          <Card class="p-fluid p-mb-4">
            <template #title>
              Information
            </template>
            <template #content>
              <div>
                <b>Published </b>
                <span>
                  {{
                    product.is_published ? product.publishedAtFormated : "--"
                  }}
                </span>
                <a
                  v-if="product.is_published"
                  href="/"
                  @click.prevent="unPublishProduct()"
                >
                  unpublish
                </a>
              </div>
              <div>
                <b>Last updated </b>
                <span>{{ product.updatedAtFormated }}</span>
              </div>
              <div>
                <!-- <b>By </b> <span>{{ $store.state.Admin.user.name }}</span> -->
              </div>
            </template>
          </Card>

          <Message
            v-if="product.is_published"
            severity="success"
            :closable="false"
          >
            You are editing published product
          </Message>

          <Card v-if="categories" class="p-fluid p-mb-4">
            <template #title>
              Category
            </template>
            <template #content>
              <Tree
                :value="categories"
                selectionMode="checkbox"
                v-model:selectionKeys="selectedCategories"
                @node-select="updateProductCategories"
                @node-unselect="updateProductCategories"
                :expandedKeys="expandedKeys"
              ></Tree>
              <!-- <MultiSelect
                v-model="selectedCategories"
                :options="categories"
                optionLabel="name"
                optionValue="id"
                placeholder="Select Categories"
                :filter="true"
              /> -->
            </template>
          </Card>

          <Card class="p-fluid p-mb-4">
            <template #title>
              Tags
            </template>
            <template #content>
              <Chips
                class="product-tags"
                id="tags"
                v-model="product.tagList"
                separator=","
              />
              <small id="tags-help">Separate by comma</small>
            </template>
          </Card>

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
                label="Delete product"
                @click="confirmDeleteProduct"
              />
            </template>
          </Card>

          <Dialog
            v-model:visible="deleteProductDialog"
            :style="{ width: '450px' }"
            header="Confirm"
            :modal="true"
          >
            <div class="confirmation-content">
              <i
                class="pi pi-exclamation-triangle p-mr-3"
                style="font-size: 2rem"
              />
              <span v-if="product"
                >Are you sure you want to delete <b>{{ product.name }}</b
                >?</span
              >
            </div>
            <template #footer>
              <Button
                label="No"
                icon="pi pi-times"
                class="p-button-text"
                @click="deleteProductDialog = false"
              />
              <Button
                label="Yes"
                icon="pi pi-check"
                class="p-button-text"
                @click="deleteProduct"
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
import Product from '@/models/Product';
import SpecificationCard from '@/components/products/SpecificationCard.vue';
import { useToast } from 'primevue/usetoast';
import ProductService from '@/services/ProductService';
import Category from '@/models/Category';
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
  product = reactive(new Product({})) as Product;
  categories: TreeNode[] = [];
  selectedCategories: SelectedCheckbox = {};
  toast = useToast();
  productService: ProductService = new ProductService();
  categoryService: CategoryService = new CategoryService();
  isLoading = false;
  expandedKeys: Record<number, boolean> = {};
  deleteProductDialog = false;
  files!: File[];
  imageService = new BombsightService();
  imageLoading = false;

  updateProductCategories() {
    this.product.categories = Category.fromSelectedKeys(this.selectedCategories, this.categories)
  }

  created() {
    // watch the params of the route to fetch the data again
    this.$watch(
      () => this.$route.params,
      () => {
        if (this.thereIsAnID) {
          this.getData();
        } else {
          this.getCategories();
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
    this.getProducts();
    this.getCategories();
  }

  // eslint-disable-next-line
  uploadImage(event: any) {
    console.log(event);
    //event.files == files to upload
    this.files = event.files;
    this.imageLoading = true;
    this.saveFiletoBombsight().then(() => {
      this.imageLoading = false;
      this.toast.add({ severity: "success", summary: "Successful!", detail: "Image uploaded successfully", life: 3000 })
    })
  }

  async saveFiletoBombsight() {
    if (this.files) {
      const formData = new FormData();
      this.files.forEach((file) => {
        formData.append('files', file, file.name);
      })
      console.log(formData.getAll("files"));

      const images = await this.imageService.uploadMultiple(formData);
      return this.syncProductImage(Product.toImageUrls([...images, ...this.product.images]));
    }
  }

  async syncProductImage(images: ProductImageUpdateParam) {
    this.productService.updateImages(images, this.product.id).then((data) => {
      this.setProduct(new Product(data));
    }).catch(() => {
      this.imageLoading = false;
    })
  }

  getProducts() {
    this.isLoading = true;
    this.productService.getOne(+this.$route.params.id)
      .then((productData) => {
        this.setProduct(new Product(productData));
        this.isLoading = false;
      });
  }

  setProduct(value: Product) {
    this.product = reactive(value) as Product;
  }

  getCategories() {
    this.categoryService.getAll()
      .then((categoryData) => {
        this.categories = categoryData.map((cat) => new Category(cat).toTreeNode());
        this.selectedCategories = Category.toSelectedKeys(this.product.categories.map((cat) => cat.toTreeNode()))
        this.expandAll();
      });
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

  publishProduct() {
    // eslint-disable-next-line @typescript-eslint/camelcase
    this.saveProduct({ ...this.product.toCreateParam(), is_published: true })
      .then(() => {
        this.toast.add({ severity: 'info', detail: 'Product published', life: 3000 });
      });
  }

  unPublishProduct() {
    // eslint-disable-next-line @typescript-eslint/camelcase
    this.saveProduct({ ...this.product.toCreateParam(), is_published: false })
      .then(() => {
        this.toast.add({ severity: 'info', detail: 'Product unpublished', life: 3000 });
      });
  }

  saveProduct(param = this.product.toCreateParam()) {
    this.isLoading = true;

    if (this.thereIsAnID) {
      return this.productService
        .update(this.product.id, param)
        .then((product) => {
          this.setProduct(new Product(product));
          this.toast.add({ severity: 'success', summary: 'Success', detail: 'Saved succesfully', life: 3000 });
        })
        .finally(() => {
          this.isLoading = false
        })
    } else {
      return this.productService
        .create(param)
        .then((product) => {
          const newProduct = new Product(product);
          this.toast.add({ severity: 'success', summary: 'Success', detail: 'Created succesfully', life: 3000 });
          this.$router.push({ name: "EditProduct", params: { id: newProduct.id, } })
        }).finally(() => {
          this.isLoading = false
        })
    }
  }

  deleteProductImage(imageId: number) {
    this.imageLoading = true;
    console.log(this.product.images, imageId);
    const images = [...this.product.images]
    const imageIndex = images.findIndex((image) => image.id === imageId);
    images.splice(imageIndex, 1);
    if (images.length > 0) {
      this.syncProductImage(Product.toImageUrls(images))
        .then(() => {
          this.toast.add({ severity: 'info', summary: 'Success', detail: 'Image deleted', life: 3000 });
        })
        .finally(() => {
          this.imageLoading = false;
        });
    } else {
      this.imageLoading = true;
      this.toast.add({ severity: "warning", summary: "Sorry", detail: "You can't leave this product without an image", life: 3000 });
    }
  }

  confirmDeleteProduct() {
    this.deleteProductDialog = true;
  }

  deleteProduct() {
    this.isLoading = true;
    this.productService.delete(this.product.id)
      .then((message) => {
        this.deleteProductDialog = false;
        this.toast.add({ severity: 'success', summary: 'Successful', detail: message, life: 3000 });
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