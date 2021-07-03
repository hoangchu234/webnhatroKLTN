import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/model/Account';
import { Employee } from 'src/app/model/Employee';
import { EmployeesService } from 'src/app/services/employees.service';

export interface Type{
  id:number;
  text:string;
} 

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

  public genders:Array<Type> = [
    {id: 0, text:'Nam'},
    {id: 1, text:'Nữ'},  
  ];
  genderShow = "";

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

  onClickGender (gen: Type)  {
    this.genderShow = gen.text;
  }
}
