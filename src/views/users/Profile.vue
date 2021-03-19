
<!-- <template>
  <div class="container">
    <h1><strong> {{ username }} Profile </strong> </h1>
    <br>
    <br>
    <br>
    
    <p>
      <strong>Name:</strong>
      {{ username }}
    </p>
    <p>
      <strong>Email:</strong>
      {{ email }}
    </p>
  </div>        
</template>

<script lang="ts">
</script>

<style scoped>

</style> -->

<template>
    <div class="p-col-12 p-md-6">
      <Card class="p-text-center">
        <template #header>
          <div
            class="p-d-flex p-jc-center p-ai-center p-pt-4 p-pl-4 p-pr-4 p-pb-0"
          >
            <Avatar
              label="B"
              class="p-mr-2"
              style="background-color:#9c27b0;color:#ffffff;width:8rem;height:8rem;font-size:4rem;"
              shape="circle"
            />
          </div>
        </template>
        <template #title>
          {{ user?.name }}
        </template>
        <template #content>
          <div class="p-text-left">
            <p>
              Username: <b>{{ "@" + user?.username }}</b>
            </p>
            <p>
              Email: <b>{{ user?.email }}</b>
            </p>
            <p>
              Role:
              <b>{{ user ? user.role.name : "" }}</b>
            </p>
            <p>
              Joined since:
              <b>{{ user ? new Date(user.created_at).toDateString() : "" }}</b>
            </p>
          </div>
        </template>
      </Card>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
