import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/model/Account';
import { Employee } from 'src/app/model/Employee';
import { EmployeesService } from 'src/app/services/employees.service';
import {FormGroup, FormControl} from '@angular/forms';
import { ToastService } from 'src/app/services/toast.service';

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

  public genders:Array<Type> = [
    {id: 0, text:'Nam'},
    {id: 1, text:'Nữ'},  
  ];
  genderShow = "";

  range = new FormGroup({
    hovaten: new FormControl(),
    username: new FormControl(),
    password: new FormControl(),
    address: new FormControl(),
    birthday: new FormControl()
  });

  constructor(private employeesService: EmployeesService,private toast: ToastService) { }

  ngOnInit(): void {
  }


  add(){
    var check = this.range.value.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*?[#?!@$%^&*-])/);

    if(check != null){
      var employee = new Employee;
      employee.hovaTen = this.range.value.hovaten;
      employee.addressOne = this.range.value.address;
      employee.gender = this.genderShow
      employee.doB = this.convertDateTimeCSharp(this.range.value.birthday);
      var account =  new Account;
      account.username = this.range.value.username;
      account.password = this.range.value.password;
      account.employee = employee;

      this.employeesService.addemployee(account).subscribe()
    }
    else{
      this.toast.toastInfo('Mật khẩu phải có các ký tự đặc biệt, có các số hay in hoa chữ cái đầu');
    }
    
  }

  onClickGender (gen: Type)  {
    this.genderShow = gen.text;
  }

  convertDateTimeCSharp(raw) {
    let date = raw;

    const day = date.getDate();       // yields date
    const month = date.getMonth() + 1;    // yields month (add one as '.getMonth()' is zero indexed)
    const year = date.getFullYear();  // yields year
    const hour = date.getHours();     // yields hours 
    const minute = date.getMinutes(); // yields minutes
    const second = date.getSeconds(); // yields seconds

    // After this construct a string with the above results as below
    const time = day + "/" + month + "/" + year + " " + hour + ':' + minute + ':' + second;
    console.log('time: ', time);

    return time;
  }
}
