import { JobRequestData, Customer, Executor, BillOfQuantity, JobStatus } from "@/types/jobRequest";
// import { format } from "timeago.js";
import Model from "./Model";

export default class JobRequest extends Model {
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
    executor!:         Executor;
    customer!:         Customer;
    billOfQuantities!: BillOfQuantity;

    constructor(data?: Partial<JobRequestData>) {
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

    get customerReview() {
        return `${this.customer.rating}`;
    }

    get products() {
        return `${this.billOfQuantities.productName}`
    }

    get quantity() {
        return `${this.billOfQuantities.quantity}`
    }

    /* get quantity() {
        return this.billOfQuantities.quantity
    }
    get totalAmount() {
        return this.billOfQuantities.totalPrice.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' });
    } */

    get totalAmount() {
        return `${this.billOfQuantities.totalPrice}`
    }

    get start_date() {
        return this.formatDate(this.startDate);
    }

    get jobStatus() {
        return (this.status === 0) ? JobStatus.New : (this.status === 1) ? JobStatus.Approved : (this.status === 2) ? JobStatus.Declined :
          (this.status === 3) ? JobStatus.SendBill : (this.status === 4) ? JobStatus.ConfirmBill : JobStatus.RejectBill;
    }

}