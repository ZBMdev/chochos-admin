<template>
  <PageHeading :title="`${occupation.name}`" style="display:flex; justify-content: center; margin-bottom: 30px" />
  <ProgressSpinner style="display:flex; justify-content: center" v-if="loading" />
  <div v-else class="p-d-grid p-jc-center p-ai-center">
    <div v-if="artisanNo < 1">
      <p class="NoArtisan">No available artisan</p>
    </div>
    <div v-else id="card-holder">
      <div v-for="user in occupationArtisans" :key="user" id="userCard" class="p-col-12 p-md-6">
        <!-- <div v-if="user === null">
          <p>No available artisan</p>
        </div> -->
        <div
          class="p-text-center"
          :value="occupationArtisans"
          id="userCard"
        >
          
            <div
              class="p-d-flex p-jc-center p-ai-center p-pt-4 p-pl-4 p-pr-4 p-pb-0"
            >
              <Avatar
                v-if="user.photoUrl === '' || user.photoUrl === null "
                :label="user.fullName.charAt(0).toUpperCase()"
                class="p-mr-2"
                style="background-color:#c8e6c9;color:#256029;width:8rem;height:8rem;font-size:4rem;"
                shape="circle"
              />
              <img v-else
                :src="user.photoUrl"
                :alt="user.photoUrl"
                style="width:8rem;height:8rem;font-size:4rem;border-radius:50%;"
              />
            </div>
          
            <div class="p-text-left">
              <p>
                Name: <b>{{ user?.fullName }}</b>
              </p>
              <p>
                Username: <b>{{ user?.username }}</b>
              </p>
              <p>
                Email: <b>{{ user?.email }}</b>
              </p>
              <p>
                Mobile: <b>{{ user?.mobile }}</b>
              </p>
              <p>
                Address: <b>{{ user?.address }}</b>
              </p>
              <p>
                About: <b>{{ user?.about }}</b>
              </p>
              <p>
                Job: <b>{{ user?.userCategoryRecord.occupationName }}</b>
              </p>
              <p>
                Rating: <b>{{ user?.rating }}</b>
              </p>
              <p>
                Last login: <b>{{ user?.last_login }}</b>
              </p>
            </div>
            <div class="portfolio">
              <!-- <div v-if="user.portfolios === null">
                <p> No portfolio available </p>
              </div> -->
              <div v-if="user === null">
                <p> No portfolio available </p>
              </div>
              <div v-else>
                <div v-for="port in user.portfolios" :key="port">
                  <img :src="port.url" alt="" style="height:250px">
                  <h3> {{ port.name }} </h3>
                  <p> {{ port.description }} </p>
                </div>
              </div>
            </div>
        </div>
      </div>
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
import PortfolioModel from '@/models/Portfolio';
import PortfolioService from '@/services/PortfolioService';
import { Portfolio, Row } from '@/types/portfolio'
import BombsightService from '@/services/BombsightService';
import { useToast } from 'primevue/usetoast';
import qs from 'qs';
import { reactive } from 'vue';
// import { number } from "yup/lib/locale";


export default class OccupationCard extends Vue {

  isLoading = false;
  occupations: Occupation[] = [];
  occupation = reactive(new Occupation({})) as Occupation;  
  occupationArtisans: OccupationArtisan[] = [];
  occupationArtisan!: OccupationArtisan; 
  portfolios: PortfolioModel[] = [];
  portfolio!: PortfolioModel;
  // datasource: Occupation[] = [];
  totalRecords = 0;
  service: OccupationService = new OccupationService();
  artisanservice: OccupationArtisanService = new OccupationArtisanService();
  portfolioservice: PortfolioService = new PortfolioService();
  selectedOccupations: Occupation[] = [];
  filters: Record<string, unknown> = {};
  submitted = false;
  toast = useToast();
  imageService = new BombsightService();
  imageLoading = false;
  firstRecordIndex = 0;
  rowstoDisplay = 10;
  artisanNo = 10;


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
    this.getOccupationArtisan();
    this.getPortfolio();
  }

  getOccupation() {
    this.isLoading = true;
    this.service.getOne(+this.$route.params.id)
      .then((occupationData) => {
        this.setOccupation(new Occupation(occupationData));
        this.isLoading = false;
      }).catch((e) => {
        this.toast.add({
          severity: "error",
          summary: "There was an error loading artisans",
          detail: "Please check your internet connection and refresh the page"
        })
        console.log(e);
      });
  }

  setOccupation(value: Occupation) {
    this.occupation = reactive(value) as Occupation;
  }

  getOccupationArtisan() {
    this.isLoading = true;
    this.artisanservice.occupationArtisans(+this.$route.params.id)
      .then((data) => {
        this.occupationArtisans = data.items.map((prod) => new OccupationArtisan(prod))
        this.artisanNo = this.occupationArtisans.length;
        this.isLoading = false;
        console.log(this.artisanNo)
      }).catch((e) => {
        this.toast.add({
          severity: "error",
          summary: "There was an error loading artisans",
          detail: "Please check your internet connection and refresh the page"
        })
        console.log(e);
      });
  }

  getPortfolio() {
    this.isLoading = true;
    this.portfolioservice.userPortfolio(+this.$route.params.id)
      .then((data) => {
        this.portfolios = data.items.rows.map((prod) => new PortfolioModel(prod))
        this.isLoading = false;
      }).catch((e) => {
        this.toast.add({
          severity: "error",
          summary: "There was an error loading portfolios",
          detail: "Please check your internet connection and refresh the page"
        })
        console.log(e);
      });
  }

  setOccupationArtisan(value: OccupationArtisan) {
    this.occupationArtisan = reactive(value) as OccupationArtisan;
  }
}
</script>

<style scoped>
#card-holder{
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
}
#userCard{
  display: grid;
  background: white;
  width: 400px;
  border-radius: 10px;
  margin: auto;
}
.btns{
    display: flex;
    justify-content: space-around;
}
.NoArtisan{
  display: flex;
  justify-content: center;
  margin-top: 100px;
}
</style>