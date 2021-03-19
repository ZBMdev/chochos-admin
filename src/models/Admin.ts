/* eslint-disable */

import { AdminCreateParam, AdminData } from '@/types/admin'
import Model from './Model';
import { string, object, ref } from 'yup';
import { FormSchema } from '@/types/dynamicForm';

export default class Admin extends Model {
    id!: number;
    name!: string;
    email!: string;
    username!: string;
    is_published = false;
    published_at!: Date;
    created_at!: Date;
    updated_at!: Date;
    images: ImageData[] = [];

    constructor(data?: Partial<AdminData>) {
        super();
        if (data) {
            Object.assign(this, data);
        }
    }


    toCreateParam() {
        return {
            name: this.name,
            email: this.email,
            username: this.username,
        } as AdminCreateParam;
    }
      
}

export const profileFormSchema: FormSchema = {
    fields: [
        {
            label: 'Name',
            name: 'name',
            as: 'input',
        },
        {
            label: 'Username',
            name: 'username',
            as: 'input',
        },
    ],
    validation: object({
        username: string().required(),
        name: string().required(),
    }),
};

export const passwordFormSchema: FormSchema = {
      fields: [
        {
          label: 'Current password',
          name: 'old_password',
          as: 'input',
          togglemask: true,
          type: "password",
        },
        {
          label: 'New password',
          name: 'new_password',
          as: 'input',
          togglemask: true,
          type: "password",
        },
        {
          label: 'Confirm password',
          name: 'confirm_password',
          as: 'input',
          togglemask: true,
          type: "password",
        },
      ],
      validation: object({
        old_password: string().required(),
        new_password: string().notOneOf([ref<string>("old_password")], "New password cannot be the same as old password").required(),
        confirm_password: string().oneOf([ref<string>("new_password")], "Passwords do not match").required(),
      }),
    };
