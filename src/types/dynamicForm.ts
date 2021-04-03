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
