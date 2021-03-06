import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { Account } from  '../../../model/Account';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.css']
})
export class NavbarAdminComponent implements OnInit {

  username:string;
  //currentAccount: Account;

  image = "";
  constructor(private router: Router,
    private authenticationService: AuthenticationService) { 
      //this.authenticationService.currentAccount.subscribe(x => this.currentAccount = x);
      if(this.authenticationService.currentAccountValue.employee.employeeImage != null){
        this.image = this.authenticationService.currentAccountValue.employee.employeeImage;
      }
      else{
        this.image = "../../../assets/images/blog_3.jpg";
      }
    }

  ngOnInit(): void {
  }
  
  get isAdmin() {
    try{
      var role = Number(this.authenticationService.currentAccountValue.roleId);
      if(role == 4){
          this.username = this.authenticationService.currentAccountValue.username + this.authenticationService.currentAccountValue.username;
          return true;
      }
      return false;
    }
    catch(error)
    {
      
    }
   
  }

  public onLogout = () => {
    this.username = '';
    this.authenticationService.logout();
    this.router.navigate(['/home']);

  }  

}
