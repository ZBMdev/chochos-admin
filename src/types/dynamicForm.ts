// The field schema shape
export interface FieldSchema {
  as: string;
  name: string;
  label: string; // user friendly string
  fieldGroupClass: string;
  [k: string]: any; // any additional attributes
  children?: Array<{
    tag: string; // the tag that will be rendered
    text?: string; // a text content (optional)
    [k: string]: any; // any additional attributes
    }>;
}

// The form schema shape
export interface FormSchema {
  fields: Partial<FieldSchema>[]; // fields
  validation: any;
  values?: Record<string, any>;
}

/*
// togglemask // for passwords

      schema: {
        fields: [
          {
            label: 'Your Name',
            name: 'name',
            as: 'input',
          },
          {
            label: 'Your Email',
            name: 'email',
            as: 'input',
          },
          {
            label: 'Your Password',
            name: 'password',
            as: 'input',
          },
          {
            label: 'Favorite Drink',
            name: 'drink',
            as: 'select',
            children: [
              {
                tag: 'option',
                value: '',
                text: '',
              },
              {
                tag: 'option',
                value: 'coffee',
                text: 'Coffeee',
              },
              {
                tag: 'option',
                value: 'tea',
                text: 'Tea',
              },
              {
                tag: 'option',
                value: 'coke',
                text: 'Coke',
              },
            ],
          },
        ],
        validation: object({
          email: string().email().required(),
          name: string().required(),
          password: string().min(8).required(),
        }),
        values: {
          email: 'example@example.com',
          name: 'John Smith',
          password: 'p@$$vv0rd',
        },
      },

 */