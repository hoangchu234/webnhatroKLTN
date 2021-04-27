import { Component, EventEmitter, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Account } from  '../../model/Account';
import { Reply } from  '../../model/Reply';
import { Router, NavigationEnd, NavigationStart, ActivatedRoute } from '@angular/router';
import { Output } from '@angular/core';
import { MotelService } from '../../services/motel.service'
import { ReplyService } from '../../services/reply.service'
import { Location } from '@angular/common'
import { TypeofnewService } from 'src/app/services/newstype.service';
import { NewType } from 'src/app/model/NewType';
import { RemoveVietnameseTones } from 'src/app/removeVietnameseTones.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  reply:Reply[] = [];
  countReply = 0;

  public username:string;
  //currentAccount: Account;

  // Name1 = "cho-thue-nha-tro";
  // Name2 = "nha-cho-thue";
  // Name3 = "cho-thue-can-ho";
  // Name4 = "cho-thue-mat-bang";
  // Name5 = "tim-nguoi-o-ghep";

  checkImage = false;
  checkLogin = false;

  checkreply = false;
  types: NewType[] = [];
  constructor(private activeRoute: ActivatedRoute,
    private replyService:ReplyService,
    private router: Router,
    private typeservice:TypeofnewService,
    private motelService: MotelService,
    private authenticationService: AuthenticationService) { 
      //this.authenticationService.currentAccount.subscribe(x => this.currentAccount = x);
      if(this.authenticationService.currentAccountValue){
        if(this.authenticationService.currentAccountValue.user){
          this.getReply();
          if(this.authenticationService.currentAccountValue.user.userImage != null){
            this.checkImage = true;
          }
          this.checkLogin = true;
        }
      }      
    }

  async ngOnInit(): Promise<void> { 
    this.types = await this.getTypes();
  }
  
  onClickNarbarURL(id){
    var type = this.types.find(a => a.id == id) as NewType;
    var linkURL = '/home' + '/' + RemoveVietnameseTones.removeVietnameseTones(type.name)
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([linkURL]);
      
    }); 
  }

  public async getTypes(){
    /*this.typeservice.getTypes().subscribe(gettypes => {
      this.newTypes = gettypes;
    })*/
    return await this.typeservice.getTypes() as NewType [];

  }
  
  // public callSetLocalStorage(){
  //   if(localStorage.getItem('searchtext') != null){
  //     localStorage.setItem('searchtext', "NULL")
  //   }
  // }

  // public onClickNewTypeOne(){
  //   this.callSetLocalStorage();
  //   this.router.navigate(['/home/cho-thue-nha-tro']);
  // }

  // public onClickNewTypeTwo(){
  //   this.callSetLocalStorage();
  //   this.router.navigate(['/home/nha-cho-thue']);
  // }
  // public onClickNewTypeThree(){
  //   this.callSetLocalStorage();
  //   this.router.navigate(['/home/cho-thue-can-ho']);
  // }
  // public onClickNewTypeFour(){
  //   this.callSetLocalStorage();
  //   this.router.navigate(['/home/cho-thue-mat-bang']);
  // }
  // public onClickNewTypeFive(){
  //   this.callSetLocalStorage();
  //   this.router.navigate(['/home/tim-nguoi-o-ghep-cap']);
  // }

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

  public async getReply(){
    /*this.replyService.getReplyFromUserId(this.authenticationService.currentAccountValue.user.id).subscribe(data => {
      for(let i=0;i<data.length;i++){
        if(data[i].isSee == false){
          this.reply.push(data[i])
          this.countReply = this.countReply + 1
        }
      }
      if(data.length){
        this.checkreply = true;
      }
    })*/
    const result = await this.replyService.getReplyFromUserId(this.authenticationService.currentAccountValue.user.id) as Reply[];
    for(let i=0;i<result.length;i++){
      if(result[i].isSee == false){
        this.reply.push(result[i])
        this.countReply = this.countReply + 1
      }
    }
    if(result.length){
      this.checkreply = true;
    }
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
      var role = Number(this.authenticationService.currentAccountValue.roleId);
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
    this.router.navigate(['/user/quan-ly-messeger']);
  }

}
