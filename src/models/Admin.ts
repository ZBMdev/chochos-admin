/* eslint-disable */

import { AdminsData, RegisterObject } from '@/types/admin'
import Model from './Model';
import { string, object, ref } from 'yup';
import { FormSchema } from '@/types/dynamicForm';

export default class Admin extends Model {
  adminId!:          number;
  firstName!:        string;
  lastName!:         string;
  email!:            string;
  username!:         string;
  password!:         string;
  updated_At!:       Date;
  created_At!:       Date;

    constructor(data?: Partial<AdminsData>) {
        super();
        if (data) {
            Object.assign(this, data);
        }
    }

    get name() {
      return `${this.firstName} ${this.lastName}`.trim();
    }

    toCreateParam() {
        return {
          email: this.email,
          password: this.password,
          firstName: this.firstName,
          lastName: this.lastName,
          username: this.username
        } as RegisterObject;
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
