// import { hasAccess } from '@/router/utils'
import AdminService from '@/services/AdminService';
// import { AdminData } from '@/types/admin';
// import { ResourceModule, ResourceAction } from '@/types/roles'

export async function getUser () {
  const user = await (new AdminService()).getCurrentUser();
  return user
}

/* export function useAuth() {
  return {
    can: (action: ResourceAction, module: ResourceModule) => hasAccess([`${module}:${action}`]),
    ResourceModule,
    ResourceAction,
  }
} */



export default getUser;