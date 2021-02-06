import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Account } from  '../../model/Account';

@Component({
  selector: 'app-loginuser',
  templateUrl: './loginuser.component.html',
  styleUrls: ['./loginuser.component.css']
})
export class LoginuserComponent implements OnInit {
  public hoVaTen:string;
  currentAccount: Account;
  checkImage = false;
  constructor(private router: Router,
    private authenticationService: AuthenticationService) { 
      this.authenticationService.currentAccount.subscribe(x => this.currentAccount = x);
      
      if(this.currentAccount){
        this.hoVaTen = this.currentAccount.user.hovaTen;
        if(this.currentAccount.user.userImage != null){
          this.checkImage = true;
        }
      }
    }

  ngOnInit(): void {
  }

  public onLogout = () => {
    this.authenticationService.logout();
    this.router.navigate(['/home']);
    this.hoVaTen = '';
  }  
}
