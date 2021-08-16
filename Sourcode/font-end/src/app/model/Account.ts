import { Role } from '../model/Role';
import { User } from '../model/User';
import { Employee } from '../model/Employee';

export class Account {
    id: string;
    username: string;
    password: string;
    phone: string;
    isActive: boolean;
    roleId: string;
    role:Role;
    user:User;
    employee:Employee;
    isHD:boolean;
}
