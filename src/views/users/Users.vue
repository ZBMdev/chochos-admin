<template>
  <div class="dashboard">
    <PageHeading title="Users" />

    <Card class="">
        <template #content>
          <TabView>
            <TabPanel>
              <template #header>
                <i class="pi pi-users"></i>
                <span class="p-ml-2">All Users <b>{{ userSummary }}</b></span>
              </template>
              <div>
                <AllUsers
                />
              </div>
            </TabPanel>
            <TabPanel>
              <template #header>
                <i class="pi pi-flag"></i>
                <span class="p-ml-2">Flagged Users <b>{{ summary.privateTopics }}</b></span>
              </template>
              <div>
              </div>
            </TabPanel>
            <TabPanel>
              <template #header>
                <i class="pi pi-ban"></i>
                <span class="p-ml-2">Blocked Users <b>{{ summary.privateTopics }}</b></span>
              </template>
              <div>
              </div>
            </TabPanel>
          </TabView>
        </template>
      </Card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { DashboardSummary } from '@/types/dashboard';
import DashboardService from '@/views/dashboard/DashboardService';
import UserService from '@/views/users/UserService'
import AllUsers from '@/views/users/AllUsers.vue'
import { Pagination, UserData } from '@/types/users';


export default defineComponent({
    components: { AllUsers },
    
    mounted() {
        this.summaryLoading = true;
        (new DashboardService()).getSummary()
        .then((data) => {
            this.summary = data;
            //this.registeredUsers = data.registeredUsers
        }).finally(() => {
            this.summaryLoading = false;
        });

        (new UserService()).getAllColours()
        .then((data) => {
            this.userSummary = data.pagination.totalCounts;
            //this.registeredUsers = data.registeredUsers
        }).finally(() => {
            this.summaryLoading = false;
        });
    },

    data() {
        return {
        summaryLoading: false,
        summary: {} as DashboardSummary,
        userSummary: 0,
        // userSummary: {} as Pagination,
        }
    }

})
</script>

<style scoped>
.tabview-custom .i{
    vertical-align: middle;
}
.tabview-custom span{
    vertical-align: middle;
    margin: 0.5rem;
}
.p-tabview p {
    line-height: 1.5;
    margin: 0;
}
</style>
