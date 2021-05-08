import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { Account } from  '../../../model/Account';
import { Employee } from  '../../../model/Employee';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Output } from '@angular/core';
import { MotelService } from '../../../services/motel.service'
import { Location } from '@angular/common'
import { EmployeesService } from '../../../services/employees.service'

@Component({
  selector: 'app-slidebar-admin',
  templateUrl: './slidebar-admin.component.html',
  styleUrls: ['./slidebar-admin.component.css']
})
export class SlidebarAdminComponent implements OnInit {
  public username:string;
  admin:string;
  //currentAccount: Account;
  image = "";
  employee:Employee;
  job:string;

  constructor(private employeeService:EmployeesService,
    private location:Location,
    private router: Router,
    private motelService: MotelService,
    private authenticationService: AuthenticationService) { 
      
      //this.authenticationService.currentAccount.subscribe(x => this.currentAccount = x);
      if(this.authenticationService.currentAccountValue.employee.employeeImage != null){
        this.image = this.authenticationService.currentAccountValue.employee.employeeImage;
      }
      else{
        this.image = "./../../assets/images/blog_3.jpg";
      }
      this.employee = this.authenticationService.currentAccountValue.employee;

    }

  async ngOnInit(): Promise<void> {
    var roles: any[] = [];
    roles = await this.authenticationService.getRole() as any[];
    var index = roles.findIndex(a => a.id === this.authenticationService.currentAccountValue.roleId);
    this.job = roles[index].roleName;
  }

  get isAdmin() {
    if(this.username == ''){
      this.username = this.authenticationService.currentAccountValue.username;
    }
    
    return this.authenticationService.currentAccountValue && Number(this.authenticationService.currentAccountValue.roleId) === 4;
  }

  get isNotAdmin() {
    if(this.username == ''){
      this.username = this.authenticationService.currentAccountValue.username;
    }
    
    return this.authenticationService.currentAccountValue && Number(this.authenticationService.currentAccountValue.roleId) === 2;
  }
  
}
