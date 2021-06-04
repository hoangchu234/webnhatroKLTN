import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Account } from  '../../model/Account';
import { User } from 'src/app/model/User';
import { UserService } from 'src/app/services/user.service';

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
  constructor(private router: Router,private userService: UserService,
    private authenticationService: AuthenticationService) { 
      //this.authenticationService.currentAccount.subscribe(x => this.currentAccount = x);
      
    }

  async ngOnInit(): Promise<void> {
    if(this.authenticationService.currentAccountValue){
      this.hoVaTen = this.authenticationService.currentAccountValue.user.hovaTen;
      var user = await this.getUserById(this.authenticationService.currentAccountValue.user.id);
      if(user.userImage != null){
        this.image = user.userImage;
      }
      else{
        this.image = "../../../assets/images/blog_3.jpg";
      }
    }
    
  }

  async getUserById(id){
    return await this.userService.getUserFromId(id) as User;
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
