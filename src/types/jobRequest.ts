export interface JobRequestSummary {
    page:       number;
    pageSize:   number;
    items:      JobRequestData[];
    totalCount: number;
}

export interface JobRequestData {
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
    executor:         Executor;
    customer:         Customer;
    billOfQuantities: BillOfQuantity[];
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
}

export interface Executor {
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
    address:          string;
    mobile:           string;
    photoUrl:         string;
    languages:        Languages;
    categoryId:       number;
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
    address:          string;
    mobile:           string;
    photoUrl:         string;
    languages:        Languages;
    categoryId:       number;
}

export enum Languages {
    Empty = "",
    English = "English",
    Igbo = "Igbo",
}


export enum JobStatus {
    New = "New",
    Approved = "Approved",
    Declined = "Declined",
    SendBill = "SendBill",
    ConfirmBill = "ConfirmBill",
    RejectBill = "RejectBill"
}

export const statusDecorations = {
    [JobStatus.New]: {
        colors: {
            light: "#ffcdd2",
            dark: "#c63737",
        },
        icon: "pi pi-ellipsis-h"
    },
    [JobStatus.Approved]: {
        colors: {
            light: "#feedaf",
            dark: "#8a5340",
        },
        icon: "pi pi-cog"
    },
    [JobStatus.Declined]: {
        colors: {
            light: "#feedaf",
            dark: "#8a5340",
        },
        icon: "pi pi-cog"
    },
    [JobStatus.SendBill]: {
        colors: {
            light: "#feedaf",
            dark: "#8a5340",
        },
        icon: "pi pi-cog"
    },
    [JobStatus.RejectBill]: {
        colors: {
            light: "#feedaf",
            dark: "#8a5340",
        },
        icon: "pi pi-times"
    },
    [JobStatus.ConfirmBill]: {
        colors: {
            light: "#dbe6c8",
            dark: "#446025",
        },
        icon: "pi pi-check"
    }
}
