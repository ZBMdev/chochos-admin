<template>
  <PageHeading :title="`${occupation.name}`"  style="display:flex; justify-content: center; margin-bottom: 30px" />
  <ProgressSpinner style="display:flex; justify-content: center" v-if="loading" />
  <div v-else class="p-d-grid p-jc-center p-ai-center">
    <div v-for="(user, index) in occupation" :key="index" id="userCard" class="p-col-12 p-md-6">
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
              Date Created: <b>{{ occupation?.createdAt }}</b>
            </p>
            <p>
              Last update: <b>{{ occupation?.updatedAt }}</b>
            </p>
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
import OccupationArtisan from '@/models/OccupationArtisan';
import OccupationArtisanService from '@/services/OccupationArtisanService';
import { OccupationArtisanData } from '@/types/occupationArtisan'
import BombsightService from '@/services/BombsightService';
import { useToast } from 'primevue/usetoast';
import qs from 'qs';
import { reactive } from 'vue';


export default class OccupationCard extends Vue {

  isLoading = false;
  occupations: Occupation[] = [];
  occupation = reactive(new Occupation({})) as Occupation;  
  occupationArtisans: OccupationArtisan[] = [];
  occupationArtisan = reactive(new OccupationArtisan({})) as OccupationArtisan;
  datasource: Occupation[] = [];
  totalRecords = 0;
  service: OccupationService = new OccupationService();
  artisanservice: OccupationArtisanService = new OccupationArtisanService();
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
    // this.getOccupationArtisan();
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
  // getOccupationArtisan() {
  //   this.isLoading = true;
  //   // this.artisanservice.getAllPaginated(this.artisanservice.allOccupations)
  //   //   .then(data => {
  //   //     this.occupationArtisans = data.items.map((prod) => new OccupationArtisan(prod));
  //   //     this.isLoading = false;
  //   //   })
  //   this.artisanservice.getOne(+this.$route.params.id)
  //     .then((occupationData) => {
  //       this.setOccupationArtisan(new OccupationArtisan(occupationData));
  //       this.isLoading = false;
  //     }).catch((e) => {
  //     this.toast.add({
  //       severity: "error",
  //       summary: "There was an error loading artisans",
  //       detail: "Please check your internet connection and refresh the page"
  //     })
  //     console.log(e);
  //   });
  // }

  // setOccupationArtisan(value: OccupationArtisan) {
  //   this.occupationArtisan = reactive(value) as OccupationArtisan;
  // }
}
</script>

<style scoped>
#userCard{
    display: grid;
}
.btns{
    display: flex;
    justify-content: space-around;
}
</style>