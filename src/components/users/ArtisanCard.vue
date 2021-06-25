<template>
  <PageHeading :title="`${artisan.fullName}'s Profile`"  style="display:flex; justify-content: center; margin-bottom: 30px" />
  <ProgressSpinner style="display:flex; justify-content: center" v-if="loading" />
  <div v-else>
    <TabView :value="artisan">
      <TabPanel header="About">
        <div class="userCard">
              <div
                class="p-d-flex p-jc-center p-ai-center p-pt-4 p-pl-4 p-pr-4 p-pb-0"
              >
                <Avatar
                  v-if="artisan.photoUrl === '' || artisan.photoUrl === null " 
                  icon="pi pi-user"
                  class="p-mr-2"
                  style="background-color:#c8e6c9;color:#256029;width:8rem;height:8rem;font-size:4rem;"
                  shape="circle"
                />
                <img v-else-if="artisan.photoUrl != '' || artisan.photoUrl != null "
                  :src="artisan.photoUrl"
                  :alt="artisan.photoUrl"
                  style="width:8rem;height:8rem;font-size:4rem;"
                />
                <Avatar 
                  v-else
                  :label="artisan.fullName.charAt(0).toUpperCase()"
                  class="p-mr-2"
                  style="background-color:#c8e6c9;color:#256029;width:8rem;height:8rem;font-size:4rem;"
                  shape="circle"
                />
                
              </div>
              <div class="details1">
                <h3> {{ artisan.fullName }} </h3>
                <!--<jobName>
                  <template #body="slotProps">
                    {{ slotProps.data.userCategoryRecord.occupationName }}
                  </template>
                </jobName>-->
                <h4> {{  }} Electrician </h4>
                <span> <i class="pi pi-map-marker"></i> <p> {{ artisan.address }} </p> </span>
              </div>
              <div class="details2">
                <div class="jobs">
                  <p> Jobs completed </p>
                  <p class="jobNumber"> {{  }} 5 </p>
                </div>
                <div class="rating">
                  <p> Average rating </p>
                  <Rating
                    :modelValue="artisan.rating"
                    :readonly="true"
                    :cancel="false"
                    :stars="5"
                    class="p-rating"
                    :style="{color: gold}"
                  />
                </div>
                <div class="price">
                  <p> Average price </p>
                  <h4> {{ }} 2500</h4>
                </div>
              </div>
              <div class="about">
                <h4>About </h4>
                <div class="about-card">
                  {{ artisan.about}}
                </div>
              </div>
              <div class="details3">                
                <div class="status">
                  <p> Status: </p>
                  <div v-if="artisan.isActive === true">
                    <p class="active"> Active </p>
                  </div>
                  <div v-else>
                    <p class="block"> Inactive </p>
                  </div>
                </div>
                <p>
                  Date registered: <b>{{ artisan?.created_on }}</b>
                </p>
                <p>
                  Last login: <b>{{ artisan?.lastLogin }}</b>
                </p>
              </div>  
        </div>
      </TabPanel>
      <TabPanel header="Portfolio">
        <!-- <div v-for="(portfolio, index) in portfolios" :key="index">
          <Card style="width: 25em">
            <template #header>
                <img :src="portfolio.url" style="height: 15rem" />
            </template>
            <template #subtitle class="subtitle">
                {{ portfolio.name }}
            </template>
            <template #content>
              {{ portfolio.description }}
            </template>
          </Card>
        </div>-->
        <div class="portfolios">
          <Card style="width: 25em" class="p-card-portfolio">
            <template #header>
                <img src="" style="height: 15rem" />
            </template>
            <template #subtitle class="subtitle">
                Card subtitle
            </template>
            <template #content>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
                quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!</p>
            </template>
          </Card>
          <Card style="width: 25em" class="p-card-portfolio">
            <template #header>
                <img src="" style="height: 15rem" />
            </template>
            <template #subtitle class="subtitle">
                Card subtitle
            </template>
            <template #content>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
                quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!</p>
            </template>
          </Card>
          <Card style="width: 25em" class="p-card-portfolio">
            <template #header>
                <img src="" style="height: 15rem" />
            </template>
            <template #subtitle class="subtitle">
                Card subtitle
            </template>
            <template #content>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
                quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!</p>
            </template>
          </Card>
          <Card style="width: 25em" class="p-card-portfolio">
            <template #header>
                <img src="" style="height: 15rem" />
            </template>
            <template #subtitle class="subtitle">
                Card subtitle
            </template>
            <template #content>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
                quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!</p>
            </template>
          </Card>
          <Card style="width: 25em" class="p-card-portfolio">
            <template #header>
                <img src="" style="height: 15rem" />
            </template>
            <template #subtitle class="subtitle">
                Card subtitle
            </template>
            <template #content>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
                quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!</p>
            </template>
          </Card>
          <Card style="width: 25em" class="p-card-portfolio">
            <template #header>
                <img src="" style="height: 15rem" />
            </template>
            <template #subtitle class="subtitle">
                Card subtitle
            </template>
            <template #content>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
                quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!</p>
            </template>
          </Card>
          <Card style="width: 25em" class="p-card-portfolio">
            <template #header>
                <img src="" style="height: 15rem" />
            </template>
            <template #subtitle class="subtitle">
                Card subtitle
            </template>
            <template #content>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
                quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!</p>
            </template>
          </Card>
          <Card style="width: 25em" class="p-card-portfolio">
            <template #header>
                <img src="" style="height: 15rem" />
            </template>
            <template #subtitle class="subtitle">
                Card subtitle
            </template>
            <template #content>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
                quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!</p>
            </template>
          </Card>
          <Card style="width: 25em" class="p-card-portfolio">
            <template #header>
                <img src="" style="height: 15rem" />
            </template>
            <template #subtitle class="subtitle">
                Card subtitle
            </template>
            <template #content>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
                quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!</p>
            </template>
          </Card>
          <Card style="width: 25em" class="p-card-portfolio">
            <template #header>
                <img src="" style="height: 15rem" />
            </template>
            <template #subtitle class="subtitle">
                Card subtitle
            </template>
            <template #content>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
                quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!</p>
            </template>
          </Card>
        </div>
      </TabPanel>
      <TabPanel header="Reviews">
        <div>
          <!--<div v-if="artisan.reviews.length >=1" class="review-card">
            <Card style="width: 25em">
              <template #content>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
                  quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!</p>
              </template>
            </Card>
          </div>
          <div v-else class="review-card">
            No reviews
          </div>-->
          <div class="review-card">
            No reviews
          </div>
        </div>
      </TabPanel>
    </TabView>
  </div>

  <!--<div class="p-d-flex p-jc-center p-ai-center">
    <div class="p-col-12 p-md-6">
      <Card
        class="p-text-center"
        :value="artisan"
      >
        <template #header>
          <div
            class="p-d-flex p-jc-center p-ai-center p-pt-4 p-pl-4 p-pr-4 p-pb-0"
          >
            <Avatar
              v-if="artisan.photoUrl === '' || artisan.photoUrl === null " 
              icon="pi pi-user"
              class="p-mr-2"
              style="background-color:#c8e6c9;color:#256029;width:8rem;height:8rem;font-size:4rem;"
              shape="circle"
            />
            <Avatar 
              v-else-if="artisan.fullName"
              :label="artisan.fullName.charAt(0).toUpperCase()"
              class="p-mr-2"
              style="background-color:#c8e6c9;color:#256029;width:8rem;height:8rem;font-size:4rem;"
              shape="circle"
            />
            <img v-else
              :src="artisan.photoUrl"
              :alt="artisan.photoUrl"
              style="width:8rem;height:8rem;font-size:4rem;"
            />
          </div>
        </template>
        <template #content>
          <div class="p-text-left">
            <p>
              Name: <b>{{ artisan?.fullName }}</b>
            </p>
            <p>
              Username: <b>{{ "@" + artisan?.username }}</b>
            </p>
            <p>
              Email: <b>{{ artisan?.email }}</b>
            </p>
            <p>
              Products: <b>{{ artisan?.about }}</b>
            </p>
            <p>
              Address: <b>{{ artisan?.address }}</b>
            </p>
          </div>
        </template>
      </Card>
    </div>
  </div>-->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Options, Vue } from 'vue-class-component';
import MainLayout from '@/components/layouts/MainLayout.vue';
import Artisan from '@/models/Artisan';
import ArtisanService from '@/services/ArtisanService';
import { ArtisanData } from '@/types/artisan'
import BombsightService from '@/services/BombsightService';
import { useToast } from 'primevue/usetoast';
import qs from 'qs';
import { reactive } from 'vue';


export default class ArtisanCard extends Vue {

  isLoading = false;
  artisans: Artisan[] = [];
  artisan = reactive(new Artisan({})) as Artisan;
  //artisan!: Artisan;
  datasource: Artisan[] = [];
  totalRecords = 0;
  service: ArtisanService = new ArtisanService();
  selectedArtisans: Artisan[] = [];
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
    this.getArtisan();
  }

  getArtisan() {
    this.isLoading = true;
    this.service.getOne(+this.$route.params.id)
      .then((artisanData) => {
        this.setArtisan(new Artisan(artisanData));
        this.isLoading = false;
      });
  }

  setArtisan(value: Artisan) {
    this.artisan = reactive(value) as Artisan;
  }
}
</script>

<style scoped>
.userCard{
  width: 100%;
  height: 100vh;
}
.p-text-center{
  widows: 100%;
}
#userDetails {
  display: flex;
}
.details1{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.details1 h4{
  margin-top: 0;
  font-weight: lighter;
}
.details1 span {
  display: flex;
}
.details1 span p {
  margin-top: 0;
  padding-left: 5px;
}
.jobs{
  display: flex;
  justify-content: space-between;
  text-align: left;
}
.jobs p{
  text-align: left;
}
.jobNumber {
  font-weight: bold;
  text-align: right;
}
.rating{
  display: flex;
  justify-content: space-between;
}
.rating p{
  text-align: left;
}
.p-rating{
   color: gold;
}
.price{
  display: flex;
  justify-content: space-between;
}
.price h4{
  color: green;
}
.about-card{
  border-radius: 5px;
  color: purple;
  font-weight: lighter;
  padding: 10px;
}
.status {
  display: flex;
  justify-content: space-between;
}
.status p {
  margin-right: 10px;
}
.active {
  color: green;
}
.block{
  color: black;
}

.portfolios {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.p-card-portfolio {
  margin: 10px;
}
#personalDetails{
  float: left;
  margin-left: 20px;
}
#jobDetails{
  float: right;
  margin-right: 350px;
}
</style>