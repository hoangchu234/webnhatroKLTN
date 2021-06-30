import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/model/Account';
import { Employee } from 'src/app/model/Employee';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  hovaten: string = "";
  username: string = "";
  password: string = "";
  address: string = "";

  gender: string;
  birthday: Date;

  constructor(private employeesService: EmployeesService) { }

  ngOnInit(): void {
  }

  add(){
    var employee = new Employee;
    employee.hovaTen = this.hovaten;
    employee.addressOne = this.address;
    employee.gender = this.gender;
    employee.doB = this.birthday;
    var account =  new Account;
    account.username = this.username;
    account.password = this.password;
    account.employee = employee;

    this.employeesService.addemployee(account).subscribe()
  }
}
