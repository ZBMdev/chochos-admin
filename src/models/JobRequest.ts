import { JobRequestData, Customer, Executor, BillOfQuantity, JobStatus } from "@/types/jobRequest";
// import { format } from "timeago.js";
import Model from "./Model";

export default class JobRequest extends Model {
    id!: number;
    name!: string;
    description!: string;
    jobLocation!: string;
    workManFee!: number;
    workManFeeRate!: number;
    duration!: number;
    paymentCompleted!: boolean;
    startDate!: Date;
    executorId!: number;
    customerId!: number;
    status!: number;
    updatedOn!: Date;
    createdOn!: Date;
    executor_id!: number;
    customer_id!: number;
    executor!: Executor;
    customer!: Customer;
    billOfQuantities!: BillOfQuantity[];

    constructor(data?: Partial<JobRequestData>) {
        super();
        if (data) {
            Object.assign(this, data);
        }
        // if (data && data.billOfQuantities) {
        //     this.billOfQuantities = data.billOfQuantities.map((cat) => new Bill(cat));
        // } else {
        //     this.billOfQuantities = []
        // }
    }

    get executorName() {
        return `${this.executor.fullName}`.trim();
    }
    get customerName() {
        return `${this.customer.fullName}`.trim();
    }

    get customerAddress() {
        return `${this.customer.address}`.trim();
    }

    get executorReview() {
        return `${this.executor.rating}`;
    }

    // get findProductNameById() 
    // {
    //     const product = this.billOfQuantities.find(({ id })=>pid === id) 
    //     return `${product?.productName}`
    // }

    get productsName() {
        const names = (this.billOfQuantities.map(({ productName }) => productName)).join(",");
       
        return names;
    }



    // get quantity() {
    // get productQuantity() {
    //     return `${this.billOfQuantities}`
    // }
    // return for (const quantity in this.billOfQuantities){
    //     if(obj.hasOwnProperty(quantity)){
    //       console.log(`${quantity} : ${this.billOfQuantities[quantity]}`)
    //     }
    //   }

    // let sumQuantity = 0;
    //     for (let x in this.billOfQuantities) {
    //       sumQuantity += this.billOfQuantities[quantity]
    //     }

    // let sumQuantity = 0;
    //     for (let x in this.billOfQuantities) {
    //       sumQuantity += this.billOfQuantities[this.billOfQuantities.quantity]
    //     }

    get productQuantity() {
        //let sumQuantity = 0;
        // for (let i=0; i < this.billOfQuantities.quantity; i++) {
        // //   sumQuantity += this.billOfQuantities.quantity[i];
        // sumQuantity += this.billOfQuantities.quantity;
        // }

        // for (let x in this.billOfQuantities) {
        //   console.log(x)
        // }

        // this.billOfQuantities.reduce(function (arrayItem) {
        //     var x = arrayItem.prop1 + 2;
        //     console.log(x);
        // },0);
        const sumQuantity: number = this.billOfQuantities.reduce((acc, obj) => {
            return acc += obj.quantity;
        }, 0)

        return sumQuantity;
    }

    /* get quantity() {
        return this.billOfQuantities.quantity
    }
    get totalAmount() {
        return this.billOfQuantities.totalPrice.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' });
    } */

    get totalAmount() {
        // return `${this.billOfQuantities.totalPrice}`
        const sumAmount: number = this.billOfQuantities.reduce((acc, obj) => {
            return acc += obj.totalPrice;
        }, 0)
        return sumAmount;
    }

    get start_date() {
        return this.formatDate(this.startDate);
    }

    get jobStatus() {
        return (this.status === 0) ? JobStatus.New : (this.status === 1) ? JobStatus.Approved : (this.status === 2) ? JobStatus.Declined :
            (this.status === 3) ? JobStatus.SendBill : (this.status === 4) ? JobStatus.ConfirmBill : JobStatus.RejectBill;
    }

}