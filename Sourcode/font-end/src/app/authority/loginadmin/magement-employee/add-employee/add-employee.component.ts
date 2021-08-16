import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/model/Account';
import { Employee } from 'src/app/model/Employee';
import { EmployeesService } from 'src/app/services/employees.service';
import {FormGroup, FormControl} from '@angular/forms';
import { ToastService } from 'src/app/services/toast.service';
import { MatDialogRef } from '@angular/material/dialog';
import { RegisterService } from 'src/app/services/register.service';

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

  hovaten: ""
  username: ""
  password: ""
  address: ""
  birthday: ""

  phone: "";
  email = "";
  constructor(private service: RegisterService,public dialogRef: MatDialogRef<AddEmployeeComponent>,private employeesService: EmployeesService,private toast: ToastService) { }

  ngOnInit(): void {
  }


  async add(){
    if(this.validationPhone(this.phone) == -2){
      this.toast.toastInfo('Số điện thoại của bạn không đúng định dạng!');
      // alert('Số điện thoại của bạn không đúng định dạng!');
    }
    else if(this.validationPhone(this.phone) == -2){
      // alert('Số điện thoại của bạn hợp lệ!');
      this.toast.toastInfo('Số điện thoại của bạn hợp lệ!');

    }
    else if(this.validationPhone(this.phone) == -2){
      // alert('Bạn chưa điền số điện thoại!');
      this.toast.toastInfo('Bạn chưa điền số điện thoại!');

    }
    else{
      var check = this.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*?[#?!@$%^&*-])/);

      if(check != null){
        if(Number(this.calculateDiff(this.birthday)) > 18){
          var checkPhone = await this.service.checkPhone(this.phone);
          if(checkPhone == "Số điện thoại chưa được dùng"){
            var employee = new Employee;
            employee.hovaTen = this.hovaten;
            employee.addressOne = this.address;

            employee.email = this.email;
            if(this.genderShow == "Nam"){
              employee.gender = true;
            }
            else{
              employee.gender = false;
        
            }

            
            employee.birthday = this.convertDateTimeCSharp(this.birthday);
            var account =  new Account;
            account.username = this.username;
            account.password = this.password;
            account.employee = employee;
            account.phone = this.phone;
    
            
            // console.log(account)
            this.employeesService.addemployee(account).subscribe()
            this.dialogRef.close();
          }
          else if(checkPhone == "Số điện thoại đã được dùng"){
            this.toast.toastInfo('Số điện thoại đã được dùng');
          }
        }
        else{
          this.toast.toastInfo('Tuổi phải lớn hơn 18 tuổi');
        }
      }
      else{
        this.toast.toastInfo('Mật khẩu phải có các ký tự đặc biệt, có các số hay in hoa chữ cái đầu');
      }
    } 
  }

  validationPhone(mobile){
    var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    if(mobile !==''){
        if (vnf_regex.test(mobile) == false) 
        {
          // alert('Số điện thoại của bạn không đúng định dạng!');
          return -2;
        }
        else{
          return -1;
          // alert('Số điện thoại của bạn hợp lệ!');
        }
    }
    else{
      // alert('Bạn chưa điền số điện thoại!');
      return 0;
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

    return time;
  }


  calculateDiff(dateSent){
    let currentDate = new Date();
    dateSent = new Date(dateSent);

    return currentDate.getFullYear() - dateSent.getFullYear();
    // return Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate()) ) /(1000 * 60 * 60 * 24));
  }
}
