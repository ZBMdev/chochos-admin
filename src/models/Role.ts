import { ResourceData, RoleCreateParam, RoleData, RoleResourceParams } from '@/types/roles'
import Model from './Model';
// import { string, object, ref } from 'yup';
// import { FormSchema } from '@/types/dynamicForm';

export default class Role extends Model {
    id!:         number;
    name!:       string;
    created_at!: Date;
    updated_at!: Date;
    resources:  ResourceData[] = [];

    constructor(data?: Partial<RoleData>) {
        super();
        if (data) {
            Object.assign(this, data);
        }
    }

    static resourceToString(resource: ResourceData | RoleResourceParams) {
        return `${resource.module}:${resource.action}`;
    }

    static resourcefromString(value: string, role: Role): RoleResourceParams {
        const [resModule, action] = value.split(':');
        return {
            role_id: role.id,
            module: resModule,
            action,
        } as RoleResourceParams;
    }
    
    get resourcesAsString() {
        return this.resources.map((resource) => Role.resourceToString(resource));
    }

    toCreateParam() {
        return {
            name: this.name,
        } as RoleCreateParam;
    }
      
}