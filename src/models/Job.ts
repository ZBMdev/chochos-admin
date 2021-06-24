import { JobData, JobRequest, Customer, JobStatus } from "@/types/jobs";
// import { format } from "timeago.js";
import Model from "./Model";

export default class Job extends Model {
    id!:                number;
    jobRequestId!:      number;
    customerId!:        number;
    executorId!:        number;
    paymentId!:         number;
    productsDelivered!: boolean;
    startDate!:         Date;
    status!:            number;
    completedOnDate!:   Date | null;
    isStarted!:         boolean;
    isCompleted!:       boolean;
    workManTotalAmount!: number;
    productsAmount!:    number;
    totalAmount!:       number;
    updatedOn!:         Date;
    createdOn!:         Date;
    executor!:          Customer;
    customer!:          Customer;
    jobRequest!:        JobRequest;
    jobProducts!:       any[];

    constructor(data?: Partial<JobData>) {
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
        return `${this.executor.rating}`;
    }

    get amount() {
        return this.totalAmount.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' });
    }

    get start_date() {
        return this.formatDate(this.startDate);
    }

    get jobStatus() {
        return (this.status === 0) ? JobStatus.New : (this.status === 1) ? JobStatus.PaymentSuccessful : (this.status === 2) ? JobStatus.PaymentFailed :
          (this.status === 3) ? JobStatus.Started : (this.status === 4) ? JobStatus.Paused : (this.status === 5) ? JobStatus.Completed : JobStatus.Dispute;
    }

    /* toCreateParam(password: string) {
        return {
            id: this.id,
            name: this.name,
            description:  this.description,
            jobLocation: this.jobLocation,
            workManFee: this.workManFee,
            workManfeeRate: this.workManfeeRate,
            duration: this.duration,
            paymentCompleted: this.paymentCompleted,
            startDate: this.startDate,
            executorId: this.executorId,
            customerId: this.customerId,
            status: this.status,
            updatedOn: this.updatedOn,
            createdOn: this.createdOn,
            executor_id: this.executor_id,
            customer_id: this.customer_id
        } as JobRequest;
    } */

}