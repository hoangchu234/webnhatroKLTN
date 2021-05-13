import { Account } from '../model/Account';

export class Employee {
    id: number;
    hovaTen: string;
    gender: string;
    doB: Date;
    email: string;
    phone: string;
    country: string;
    employeeImage: string;
    createdate:Date;
    lastlogdata:Date;
    addressOne:string;
    addressTwo:string;
    city:string;
    accountid:Int32Array;
    account:Account;
}
