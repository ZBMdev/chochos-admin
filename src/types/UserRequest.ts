export interface UserRequest {
    jobRequest: JobRequest;
}

export interface JobRequest {
    id:               number;
    name:             string;
    description:      string;
    jobLocation:      string;
    workManFee:       number;
    workManFeeRate:   number;
    duration:         number;
    paymentCompleted: boolean;
    startDate:        Date;
    executorId:       number;
    customerId:       number;
    status:           number;
    updatedOn:        Date;
    createdOn:        Date;
    executor_id:      number;
    customer_id:      number;
    billOfQuantities: BillOfQuantity[];
    executor:         Customer;
    customer:         Customer;
}

export interface BillOfQuantity {
    id:            number;
    productName:   string;
    quantity:      number;
    unitPrice:     number;
    totalPrice:    number;
    updatedOn:     Date;
    createdOn:     Date;
    productId:     number;
    jobRequestId:  number;
    jobRequest_id: number;
    product:       Product;
}

export interface Product {
    id:                 number;
    name:               string;
    description:        string;
    colour:             string;
    quantity:           number;
    isDeleted:          null;
    brand:              null;
    metricQuantity:     number;
    metric:             string;
    rating:             number;
    unitPrice:          number;
    userId:             number;
    productCategoryId:  number;
    updatedOn:          Date;
    createdOn:          Date;
    productCategory_id: number;
    productImages:      ProductImage[];
}

export interface ProductImage {
    id:        number;
    url:       string;
    order:     number;
    updatedOn: Date;
    createdOn: Date;
    productId: number;
    deletedAt: null;
}

export interface Customer {
    fullName:         string;
    id:               number;
    userCategory:     number;
    lastName:         string;
    firstName:        string;
    email:            string;
    username:         string;
    longitude:        number;
    latitude:         number;
    rating:           number;
    totalRatingValue: number;
    totalRatingCount: number;
    address:          string;
    mobile:           string;
    isValidated:      null;
    isActive:         boolean;
    push_token:       string;
    photoUrl:         string;
    last_login:       Date;
    about:            string;
    languages:        string;
    categoryId:       number;
}
