<template>
  <div v-if="!currentRole">
    <Message severity="info" value="No role selected" />
  </div>
  <div v-else>
    <h3>Edit Role</h3>
    <div class="p-formgird p-grid p-fluid p-ai-end">
      <div class="p-col-12 p-md-8 p-field p-fluid">
        <label>Name</label>
        <InputText id="name" name="name" v-model="currentRole.name" />
      </div>
      <div class="p-col-12 p-md-4 p-field p-fluid">
        <Button icon="pi pi-save" label="Save" @click="updateRole" />
      </div>
    </div>
    <div class="p-field p-fluid">
      <label>Access</label>
      <div class="p-grid p-mt-0 p-pt-0">
        <div
          class="p-col-12 p-md-6"
          v-for="resModule in resModules"
          :key="resModule"
        >
          <h4>{{ resModule }}</h4>
          <div class="p-grid p-formgrid">
            <div
              class="p-col-6 p-md-6 p-field-checkbox"
              v-for="action in actions"
              :key="action"
            >
              <Checkbox
                :id="`${resModule}:${action}`"
                name="resource-action[]"
                :value="`${resModule}:${action}`"
                @update:modelValue="updateList"
                :modelValue="selectedAction"
              />
              <label :for="`${resModule}:${action}`">{{ action }}</label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="p-field p-fluid">
      <Button icon="pi pi-save" label="Save" @click="updateRoleResources" />
    </div> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRaw } from 'vue';
import RoleService from '@/services/RoleService';
import Role from '@/models/Role';
import { RESOURCES, RESOURCES_ACTION, ResourceData } from '@/types/roles';
import { useToast } from 'primevue/usetoast';

export default defineComponent({
  name: 'EditRole',
  props: ['role', 'id'],
  setup(props) {
    let role = reactive(new Role());
    try {
      role = reactive<Role>(JSON.parse(props.role) as Role);
    } catch (e) {
      window.location.pathname = '/settings/roles'
    }

    const service = new RoleService();
    const toast = useToast();

    const selectedAction = reactive<string[]>(role.resources.map((resource) => Role.resourceToString(resource)));

    const generateValue = (value: string) => Role.resourcefromString(value, role)

    function findValue(data: ResourceData[], value: string): ResourceData | undefined {
      const actualResource = data.find((resource) => Role.resourceToString(resource) == value)
      if (actualResource) {
        return actualResource;
      }
      return undefined;
    }

    let unSavedAdditions = reactive<string[]>([]);
    let originalSelected = reactive<string[]>([]);
    let toBeDeleted = reactive<string[]>([]);

    function updateList(newList: string[]) {
      unSavedAdditions = [...new Set([...unSavedAdditions, ...newList.filter(x => !toRaw(selectedAction).includes(x))])];
      originalSelected = role.resources.map((resource) => Role.resourceToString(resource)).filter(x => newList.includes(x))
      toBeDeleted = role.resources.map((resource) => Role.resourceToString(resource)).filter(x => !originalSelected.includes(x))

      // add unSavedAdditions
      unSavedAdditions.forEach((resource, index) => {
        service.addResource(generateValue(resource)).then((data) => {
          if (index == unSavedAdditions.length - 1) {
            unSavedAdditions = [];
          }

          newList.forEach((val, index) => {
            const deleteCount = selectedAction.length;
            selectedAction.splice(index, deleteCount, val);
          });

          role = new Role(data);
          toast.add({ severity: "success", detail: `${data.name} role updated succesfully`, life: 1000 });
        })
      })

      // delete tobedeleted.
      toBeDeleted.forEach((resource, index) => {
        const id = findValue(role.resources, resource)?.id;
        if (id) {
          service.deleteResource(role.id, id).then((data) => {

            if (index == toBeDeleted.length - 1) {
              toBeDeleted = [];
            }

            newList = newList.filter((x) => x !== resource);

            newList.forEach((val, index) => {
              const deleteCount = selectedAction.length;
              selectedAction.splice(index, deleteCount, val);
            });

            toast.add({ severity: "success", detail: `${data}`, life: 1000 });
          })
        }
      })

      // console.log(unSavedAdditions, newList, originalSelected, toBeDeleted);
    }

    function updateRole() {
      // change role name;
      service.update(role.id, { name: role.name }).then((data) => {
        toast.add({ severity: "success", detail: `${data.name} role updated succesfully`, life: 3000 });
      })
    }

    // function updateRoleResources() { }

    return {
      findValue,
      updateRole,
      // updateRoleResources,
      updateList,
      generateValue,
      selectedAction,
      resModules: RESOURCES,
      actions: RESOURCES_ACTION,
      currentRole: role,
    }
  },
})
</script>

<style scoped>
</style>