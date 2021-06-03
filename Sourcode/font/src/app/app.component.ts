import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { Account } from  '../app/model/Account';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { MotelService } from './services/motel.service';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
import { environment } from 'src/environments/environment';  
import { SignalRService } from './services/signal-r.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{


  public username:string;
  public admin;
  //currentAccount: Account;

  constructor(
    private authenticationService: AuthenticationService) {
      //this.authenticationService.currentAccount.subscribe(x => this.currentAccount = x);

    }
    
  ngOnInit(): void {
  }



  get isUser() {
      try{
        var role = Number(this.authenticationService.currentAccountValue.roleId);
        if(role == 1){
            this.username = this.authenticationService.currentAccountValue.user.hovaTen;
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
      var role = Number(this.authenticationService.currentAccountValue.roleId);
      if(role == 4){
          this.admin = this.authenticationService.currentAccountValue.user.hovaTen;
          return true;
      }
      return false;
    }
    catch(error)
    {

    }

  }
}
