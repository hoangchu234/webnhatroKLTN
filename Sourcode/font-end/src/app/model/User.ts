import { Account } from '../model/Account'; 

export class User {
    id: number;
    hovaTen: string;  
    gender: string;
    doB: Date;
    email: string;
    facebook: string;
    userImage: string;
    createdDate:Date;
    lastLogOnDate:Date;
    account:Account;
    accountId:string;
    pubishFree:number;
}