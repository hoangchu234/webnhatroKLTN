import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { Account } from  '../app/model/Account';
import {APP_BASE_HREF} from '@angular/common'
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import {TestBed, async} from '@angular/core/testing';
import { MotelService } from './services/motel.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{


  public username:string;
  public admin;
  currentAccount: Account;

  constructor(private router: Router,
    private motelService: MotelService,
    private authenticationService: AuthenticationService) {
      this.authenticationService.currentAccount.subscribe(x => this.currentAccount = x);
      this.motelService.getmoteloutofdate().subscribe(a =>
        console.log("aaaa")
      )
    }
    
  ngOnInit(): void {
    
  }




  get isUser() {
      try{
        var role = Number(this.currentAccount.roleId);
        if(role == 1){
            this.username = this.currentAccount.user.hovaTen;
            return true;
        }
        return false;
      }
      catch(error)
      {

      }
  }

  get isAdmin() {
    try{
      var role = Number(this.currentAccount.roleId);
      if(role == 4){
          this.admin = this.currentAccount.user.hovaTen;
          return true;
      }
      return false;
    }
    catch(error)
    {

    }

  }
}
