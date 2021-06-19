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
import { User } from 'src/app/model/User';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { SignalRService } from 'src/app/services/signal-r.service';
import * as signalR from '@aspnet/signalr';
import { NotificationResult } from 'src/app/model/viewmodel/NotificationResult';
import { INotifyComment } from 'src/app/model/interface/INotifyComment';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  reply:Reply[] = [];
  countReply = 0;

  public username:string;
  userImage = "";

  // Name1 = "cho-thue-nha-tro";
  // Name2 = "nha-cho-thue";
  // Name3 = "cho-thue-can-ho";
  // Name4 = "cho-thue-mat-bang";
  // Name5 = "tim-nguoi-o-ghep";

  checkLogin = false;

  checkreply = false;
  types: NewType[] = [];

  listNote: NotificationResult[] = [];
  countNote = 0

  private hubConnection: signalR.HubConnection;
  
  countNotifyNotSee = 0;
  notifys: Array<INotifyComment> = [];

  constructor(private activeRoute: ActivatedRoute,
    public dialog: MatDialog,
    private signalRService:SignalRService,
    private replyService:ReplyService,
    private router: Router,
    private typeservice:TypeofnewService,
    private motelService: MotelService,
    private userService: UserService,
    public postService:PostService,
    private authenticationService: AuthenticationService) {     
    }

  async ngOnInit(): Promise<void> { 
    this.types = await this.getTypes();
    if(this.authenticationService.currentAccountValue){
      if(this.authenticationService.currentAccountValue.user){
        this.getReply();
        this.checkLogin = true;
      }
      var user = await this.getUserById(this.authenticationService.currentAccountValue.user.id);
      if(user.userImage != null){
        this.userImage = user.userImage;
      }
      else{
        this.userImage = "../../../assets/images/blog_3.jpg";
      }
    }

    await this.signalR();
  }

  async signalR(){
    if(this.checkHasLogin()){
      var userId = this.authenticationService.currentAccountValue.user.id;
      await this.getDataMessage(userId);    
      await this.getDataMessageCount(userId);

      await this.getDataForumNotification();

      this.hubConnection = new signalR.HubConnectionBuilder()
        .withUrl(`http://localhost:5001/signalr`)
        .build();

      this.hubConnection
        .start()
        .then(() => {
          console.log('Connection started!')
        })
        .then()
        .catch(error => {
          console.log('Can not start connection with error: ' + error);
        })
    
      this.hubConnection.on("BroadcastMessage", async () => {  
        //message
        await this.getDataMessage(userId);    
        await this.getDataMessageCount(userId);
        //forum
        await this.getDataForumNotification();
        console.log("run")
      });

    }
  }

  async getDataForumNotification(){
    this.notifys = await this.postService.getCommentNotifyByOneUser(this.authenticationService.currentAccountValue.user.id.toString()) as INotifyComment[];
    // for(let i=0; i< this.notifys.length;i++){
    //   if(this.notifys[i].imageUser == null){
    //     this.notifys[i].imageUser = "";
    //   }
    // }
    this.countNotifyNotSee = await this.postService.countCommentNotifyByOneUser(this.authenticationService.currentAccountValue.user.id.toString()) as number;
  }

  checkHasLogin(){
    if(this.authenticationService.checkLogin()){
      return true;
    }
    else{
      return false;
    }
  }

  async getDataMessage(id){
    this.listNote = await this.signalRService.getNotificationMessage(id) as NotificationResult[];
  }

  async getDataMessageCount(id){
    var data = await this.signalRService.getNotificationCount(id) as any;
    this.countNote = data.count;
  }

  onClickURLChat(id){
    var link = '/chat' + '/' + id;
    window.location.replace(link);
  }
  
  ///////////////////////////////////////////////////////////////////////////////////////////////
  async onClickDetailPostINotify(data){
    if(data.justSee == false){
      data.justSee = true;
      var update = {id: data.id,idUserReceiced: data.idUserReceiced,justSee: data.justSee,commentId: data.idComment};
      const result = await this.postService.updateCommentNotifyByOneUser(update,data.id);
      if(result){
        var link = '/forum' + '/' + data.postUser + '/' + data.idPost;
        window.location.replace(link);
      }
    }
    
    // this.router.navigate(['/forum',data.postUser,data.idPost]);
    // this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    //   this.route.navigate(['/forum',data.postUser,data.idPost]);
    // }); 
  }

  async getUserById(id){
    return await this.userService.getUserFromId(id) as User;
  }
  
  onClickNarbarURL(id){
    var type = this.types.find(a => a.id == id) as NewType;
    var linkURL = '/home' + '/' + RemoveVietnameseTones.removeVietnameseTones(type.name)
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([linkURL]);
      
    }); 
  }

  onClickURL(link){
    window.location.replace(link);
    //this.router.navigate([link]);
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
        this.router.navigate(['/user/thong-tin-vi-tri']);
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
