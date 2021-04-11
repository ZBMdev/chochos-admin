export interface JobsSummary{
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
    completedOnDate:    Date;
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
    photoUrl:         string;
    languages:        Languages;
    categoryId:       number;
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



export enum JobStatus {
    New = "New",
    PaymentSuccessful = "PaymentSuccessful",
    PaymentFailed = "PaymentFailed",
    Started = "Started",
    Paused = "Paused",
    Completed = "Completed",
    Dispute = "Dispute"
}

export const statusDecorations = {
    [JobStatus.New]: {
        colors: {
            light: "#ffcdd2",
            dark: "#c63737",
        },
        icon: "pi pi-ellipsis-h"
    },
    [JobStatus.PaymentSuccessful]: {
        colors: {
            light: "#feedaf",
            dark: "#8a5340",
        },
        icon: "pi pi-cog"
    },
    [JobStatus.PaymentFailed]: {
        colors: {
            light: "#feedaf",
            dark: "#8a5340",
        },
        icon: "pi pi-cog"
    },
    [JobStatus.Started]: {
        colors: {
            light: "#feedaf",
            dark: "#8a5340",
        },
        icon: "pi pi-cog"
    },
    [JobStatus.Paused]: {
        colors: {
            light: "#feedaf",
            dark: "#8a5340",
        },
        icon: "pi pi-cog"
    },
    [JobStatus.Dispute]: {
        colors: {
            light: "#feedaf",
            dark: "#8a5340",
        },
        icon: "pi pi-times"
    },
    [JobStatus.Completed]: {
        colors: {
            light: "#dbe6c8",
            dark: "#446025",
        },
        icon: "pi pi-check"
    }
}

/* export const statusDecorations = {
    [JobStatus.Pending]: {
        colors: {
            light: "#ffcdd2",
            dark: "#c63737",
        },
        icon: "pi pi-ellipsis-h"
    },
    [JobStatus.Processing]: {
        colors: {
            light: "#feedaf",
            dark: "#8a5340",
        },
        icon: "pi pi-cog"
    },
    [JobStatus.Completed]: {
        colors: {
            light: "#dbe6c8",
            dark: "#446025",
        },
        icon: "pi pi-check"
    },
    [JobStatus.Declined]: {
        colors: {
            light: "#bababa",
            dark: "#3c3c3c",
        },
        icon: "pi pi-times"
    },
} */
