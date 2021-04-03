export interface Jobs {
    page:       number;
    pageSize:   number;
    items:      JobData[];
    totalCount: number;
}

export interface JobData{
    id:                 number;
    jobRequestId:       number;
    customerId:         number;
    executorId:         number;
    paymentId:          number;
    productsDelivered:  boolean;
    startDate:          Date;
    status:             number;
    completedOnDate:    Date | null;
    isStarted:          boolean;
    isCompleted:        boolean;
    workManTotalAmount: number;
    productsAmount:     number;
    totalAmount:        number;
    updatedOn:          Date;
    createdOn:          Date;
    executor:           Customer;
    customer:           Customer;
    jobRequest:         JobRequest;
    jobProducts:        any[];
}

export interface Customer {
    fullName:         string;
    id:               number;
    lastName:         string;
    firstName:        string;
    email:            string;
    username:         string;
    userCategory:     number;
    longitude:        number;
    latitude:         number;
    rating:           number;
    totalRatingValue: number;
    address:          string;
    mobile:           string;
    photoUrl:         null | string;
    languages:        Languages | null;
    categoryId:       number | null;
}


export enum Languages {
    English = "English",
    Igbo = "Igbo",
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
}

export enum Name {
    RequestForCleaning = "Request for Cleaning",
    RequestForElectrician = "Request for Electrician",
    RequestForTheKing = "Request for the King",
}
