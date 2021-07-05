import { UserRequest, JobRequest, Customer, BillOfQuantity, Product, ProductImage } from "@/types/UserRequest";
// import { format } from "timeago.js";
import Model from "./Model";

export default class UserRequestModel extends Model {
    id!:               number;
    name!:             string;
    description!:      string;
    jobLocation!:      string;
    workManFee!:       number;
    workManFeeRate!:   number;
    duration!:         number;
    paymentCompleted!: boolean;
    startDate!:        Date;
    executorId!:       number;
    customerId!:       number;
    status!:           number;
    updatedOn!:        Date;
    createdOn!:        Date;
    executor_id!:      number;
    customer_id!:      number;
    billOfQuantities!: BillOfQuantity[];
    executor!:         Customer;
    customer!:         Customer;

    constructor(data?: Partial<JobRequest>) {
        super();
        if (data) {
            Object.assign(this, data);
        }
        
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

}