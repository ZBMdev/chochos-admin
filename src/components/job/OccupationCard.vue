<template>
  <PageHeading :title="`${occupation.name}`"  style="display:flex; justify-content: center; margin-bottom: 30px" />
  <ProgressSpinner style="display:flex; justify-content: center" v-if="loading" />
  <div v-else class="p-d-flex p-jc-center p-ai-center">
    <div class="p-col-12 p-md-6">
      <Card
        class="p-text-center"
        :value="occupation"
      >
        <template #header>
          <div
            class="p-d-flex p-jc-center p-ai-center p-pt-4 p-pl-4 p-pr-4 p-pb-0"
          >
            <Avatar
                v-if="occupation.image === '' || occupation.image === null "
              :label="occupation.name.charAt(0).toUpperCase()"
              class="p-mr-2"
              style="background-color:#c8e6c9;color:#256029;width:8rem;height:8rem;font-size:4rem;"
              shape="circle"
            />
            <img v-else
              :src="occupation.image"
              :alt="occupation.image"
              style="width:8rem;height:8rem;font-size:4rem;"
            />
          </div>
        </template>
        <template #content>
          <div class="p-text-left">
            <p>
              Name: <b>{{ occupation?.name }}</b>
            </p>
            <p>
              Description: <b>{{ occupation?.description }}</b>
            </p>
            <p>
              Tags: <b>{{ occupation?.tags }}</b>
              <Chips
                id="desription"
                v-model="occupation.tags"
                required="true"
                separator=","
                :addOnBlur="true"
                :allowDuplicate="false"
              />
            </p>
            <p>
              Date Created: <b>{{ occupation?.createdAt }}</b>
            </p>
            <p>
              Last update: <b>{{ occupation?.updatedAt }}</b>
            </p>
            <div class="btns">
                <div>
                    <p> Active </p>
                    <InputSwitch
                    class="p-mr-2"
                    v-model="occupation.isActive"
                    />
                </div>
                <div>
                    <p> Featured </p>
                    <InputSwitch
                    class="p-mr-2"
                    v-model="occupation.isFeatured"
                    />
                </div>
            </div>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Options, Vue } from 'vue-class-component';
import MainLayout from '@/components/layouts/MainLayout.vue';
import Occupation from '@/models/Occupation';
import OccupationService from '@/services/OccupationService';
import { OccupationData } from '@/types/occupation'
import BombsightService from '@/services/BombsightService';
import { useToast } from 'primevue/usetoast';
import qs from 'qs';
import { reactive } from 'vue';


export default class OccupationCard extends Vue {

  isLoading = false;
  occupations: Occupation[] = [];
  occupation = reactive(new Occupation({})) as Occupation;
  datasource: Occupation[] = [];
  totalRecords = 0;
  service: OccupationService = new OccupationService();
  selectedOccupations: Occupation[] = [];
  filters: Record<string, unknown> = {};
  submitted = false;
  toast = useToast();
  imageService = new BombsightService();
  imageLoading = false;
  firstRecordIndex = 0;
  rowstoDisplay = 10;  


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
    this.getOccupation();
  }

  getOccupation() {
    this.isLoading = true;
    this.service.getOne(+this.$route.params.id)
      .then((occupationData) => {
        this.setOccupation(new Occupation(occupationData));
        this.isLoading = false;
      });
  }

  setOccupation(value: Occupation) {
    this.occupation = reactive(value) as Occupation;
  }
}
</script>

<style scoped>
.btns{
    display: flex;
    justify-content: space-around;
}
</style>