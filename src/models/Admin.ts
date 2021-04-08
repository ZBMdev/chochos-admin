/* eslint-disable */

import { Admin1Data, RegisterObject } from '@/types/admin'
import Model from './Model';
import { string, object, ref } from 'yup';
import { FormSchema } from '@/types/dynamicForm';

export default class Admin extends Model {
  fullName!:           string;
  id!:                 number;
  lastName!:           string;
  firstName!:          string;
  email!:              string;
  password!:           string;
  oldPassword!:        string;
  username!:           string;
  userCategory!:       number;
  longitude!:          number;
  latitude!:           number;
  rating!:             number;
  totalRatingValue!:   number;
  totalRatingCount!:   number;
  address!:            string;
  mobile!:             string;
  isValidated!:        null;
  isActive!:           boolean;
  push_token!:         string;
  photoUrl!:           string;
  last_login!:         Date;
  updated_on!:         Date;
  created_on!:         Date;
  deletionDate!:       null;
  passwordUpdated_on!: Date;
  refreshToken!:       null;
  about!:              null;
  languages!:          string;
  categoryId!:         number;
  skills!:             any[];

    constructor(data?: Partial<Admin1Data>) {
        super();
        if (data) {
            Object.assign(this, data);
        }
    }


    toCreateParam() {
        return {
          email: this.email,
          password: this.password,
          firstName: this.firstName,
          lastName: this.lastName,
          username: this.username,
          categoryId: this.categoryId  
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
