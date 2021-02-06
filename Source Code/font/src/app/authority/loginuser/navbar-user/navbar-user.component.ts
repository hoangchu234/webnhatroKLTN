import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { Account } from  '../../../model/Account';
import { Router, NavigationEnd, NavigationStart, ActivatedRoute } from '@angular/router';
import { ReplyService } from 'src/app/services/reply.service';
import { Reply } from 'src/app/model/Reply';
import { MotelService } from 'src/app/services/motel.service';

@Component({
  selector: 'app-navbar-user',
  templateUrl: './navbar-user.component.html',
  styleUrls: ['./navbar-user.component.css']
})
export class NavbarUserComponent implements OnInit {

  reply:Reply[] = [];
  countReply = 0;

  public username:string;
  currentAccount: Account;

  Name1 = "cho-thue-nha-tro";
  Name2 = "nha-cho-thue";
  Name3 = "cho-thue-can-ho";
  Name4 = "cho-thue-mat-bang";
  Name5 = "tim-nguoi-o-ghep";

  name: string;
  checkImage = false;
  checkLogin = false;
  constructor(private activeRoute: ActivatedRoute,
    private replyService:ReplyService,
    private router: Router,
    private motelService: MotelService,
    private authenticationService: AuthenticationService) { 
      this.authenticationService.currentAccount.subscribe(x => this.currentAccount = x);
      if(this.currentAccount){
        this.getReply();
        if(this.currentAccount.user.userImage != null){
          this.checkImage = true;
        }
        this.checkLogin = true;
      }
      
      console.log(this.currentAccount)
    }

  ngOnInit(): void { 

  }
  
  public callSetLocalStorage(){
    if(localStorage.getItem('searchtext') != null){
      localStorage.setItem('searchtext', "NULL")
    }
  }

  public onClickNewTypeOne(){
    this.callSetLocalStorage();
    this.router.navigate(['/home/cho-thue-nha-tro']);
  }

  public onClickNewTypeTwo(){
    this.callSetLocalStorage();
    this.router.navigate(['/home/nha-cho-thue']);
  }
  public onClickNewTypeThree(){
    this.callSetLocalStorage();
    this.router.navigate(['/home/cho-thue-can-ho']);
  }
  public onClickNewTypeFour(){
    this.callSetLocalStorage();
    this.router.navigate(['/home/cho-thue-mat-bang']);
  }
  public onClickNewTypeFive(){
    this.callSetLocalStorage();
    this.router.navigate(['/home/tim-nguoi-o-ghep-cap']);
  }

  get isUser() {
    try{
      var role = Number(this.currentAccount.roleId);
      if(role == 1){
          this.username =this.currentAccount.user.hovaTen;
          return true;
      }
      return false;
    }
    catch(error)
    {
      
    }
   
  }

  public getReply(){
    this.replyService.getReplyFromUserId(this.currentAccount.user.id).subscribe(data => {
      for(let i=0;i<data.length;i++){
        if(data[i].isSee == false){
          this.reply.push(data[i])
          this.countReply = this.countReply + 1
        }
      }

    })
  }

  public onLogout = () => {
    this.authenticationService.logout();
    this.router.navigate(['/home']);
    this.username = '';
  }  

  public onClickDangTin(){
    try{
      
    }
    catch(error){
      var role = Number(this.currentAccount.roleId);
      if(role == 1){
        this.router.navigate(['/user/danh-muc']);
      }
      else{
        this.router.navigate(['/login']);
      }

    }
   

  }

  public onClick(id){
    var replyone = new Reply();
    for(let i=0;i<this.reply.length;i++){
      if(this.reply[i].id == id){
        replyone = this.reply[i];
      }
    }
    replyone.isSee = true;
    this.replyService.updateReply(replyone).subscribe(data => {
      //console.log(data);
    })
    window.location.reload();
    this.router.navigate(['/user/quan-ly-messeger']);
  }



}
