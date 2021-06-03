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
  //currentAccount: Account;
  image = "";
  // checkImage = false;
  constructor(private router: Router,
    private authenticationService: AuthenticationService) { 
      //this.authenticationService.currentAccount.subscribe(x => this.currentAccount = x);
      
      if(this.authenticationService.currentAccountValue){
        this.hoVaTen = this.authenticationService.currentAccountValue.user.hovaTen;
        if(this.authenticationService.currentAccountValue.user.userImage != null){
          this.image = this.authenticationService.currentAccountValue.user.userImage;
        }
        else{
          this.image = "../../../assets/images/blog_3.jpg";
        }
       
        
      }
    }

  ngOnInit(): void {
  }

  
  public onLogout = () => {
    this.authenticationService.logout();
    window.location.reload()
    this.hoVaTen = '';
    this.router.navigate(['/home']);
    
  }
  
  check(){
    var link = this.router.url;
    if(link == '/user/thong-tin-vi-tri' || link == '/user/thong-tin-nha-tro' || link == '/user/thong-tin-chi-tiet-nha-tro' || link == '/user/thong-tin-hinh-anh' || link == '/user/goi-thanh-toan' || link == '/user/thanh-toan-dong'){
      return false;
    }
    else{
      return true;
    }
  }
}
