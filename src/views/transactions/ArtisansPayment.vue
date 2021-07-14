<template>
<div class="main-card">
  <h3> Artisans Payments </h3>
  <div>
    <Card>
      <template #content>
        <DataTable
          class="p-datatable-responsive p-datatable-sm"
          
          v-model:filters="filters"
          filterDisplay="row" 
          :globalFilterFields="['name']"
          :paginator="true"
          :rows="10"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          :rowsPerPageOptions="[10, 20, 50, 100, 200]"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
          responsiveLayout="scroll"
          scrollable="true"
          :rowHover="true"
          @row-click="editCategory($event.data)"
        >
          <template #header>
            <div class="table-header p-d-flex p-flex-column p-flex-md-row p-jc-md-between">
              
              <span class="p-input-icon-left">
                <i class="pi pi-search" />
                <InputText
                  placeholder="Search..."
                />
              </span>
            </div>
          </template>
          <template #empty>
            No artisan found.
          </template>
          <template #loading>
            Loading payment data. Please wait.
          </template>
          <Column
            field="name"
            style="min-width: 14rem"
            headerStyle="min-width: 14rem; height: 50px; font-weight: bold;"
            header="Name"
            sortable
          >
          </Column>
          <Column
            header="Date"
            style="min-width: 14rem"
            headerStyle="min-width: 14rem; height: 50px; font-weight: bold;"
            
            filterMatchMode="contains"
          >
            
          </Column>
          <Column :exportable="false">
            <template #body="slotProps">
              <Button
                label="Job"
                icon="pi pi-briefcase"
                @click="openResponsive" 
              />
              <Button
                icon="pi pi-check"
                class="p-button-raised p-button-success p-mr-2"
                @click="editCategory(slotProps.data)"
              />
            </template>
          </Column>
        </DataTable>
      </template>
    </Card>

    <Dialog header="Header" v-model:visible="displayResponsive" :breakpoints="{'960px': '75vw'}" :style="{width: '50vw'}">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <template #footer>
        <Button label="No" icon="pi pi-times" @click="closeResponsive" class="p-button-text"/>
        <Button label="Yes" icon="pi pi-check" @click="closeResponsive" autofocus />
      </template>
    </Dialog>
    
    
  </div>
</div>
</template>

<script>
export default {

}
</script>

<style>
.main-card{
  display: grid;
  margin: 10px;
}
</style>