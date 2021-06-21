import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as signalR from '@aspnet/signalr';
import { Conversation } from '../model/Conversation';
import { Messeger } from '../model/Messeger';
import { User } from '../model/User';
import { ChatUserViewModel } from '../model/viewmodel/ChatUserViewModel';
import { CreateMessageRequest } from '../model/viewmodel/CreateMessageRequest';
import { AuthenticationService } from '../services/authentication.service';
import { SignalRService } from '../services/signal-r.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent implements OnInit {

  // title = 'ClientApp';  
  // txtMessage: string = '';  
  // uniqueID: string = new Date().getTime().toString();  
  // messages = new Array<Messeger>();  
  // message = new Messeger();  
  // messageDatas: Messeger[] = [];  

  private hubConnection: signalR.HubConnection;

  conversation:Conversation;
  messageDatas: Messeger[] = [];  
  txtMessage: string = '';  
  senderId: number = 0;
  receiverId: number = 0;

  message: Messeger = { id: "", message:"", date:null, userId: null, conversationId:null}; 

  userSender: User = {id: null, hovaTen: "", gender: "", doB: null, email:"", facebook:"", userImage:"", createdDate:null, lastLogOnDate:null, account:null, accountid:"", pubishFree:null}
  userNow: User = {id: null, hovaTen: "", gender: "", doB: null, email:"", facebook:"", userImage:"", createdDate:null, lastLogOnDate:null, account:null, accountid:"", pubishFree:null}
  
  listUserHasChat: ChatUserViewModel[] = [];
  fisrtUserHasChat: ChatUserViewModel = {idSender:"", idReceiver:"", hovaTen:"", image:"",messeger:"", date:null, click:"", active:""}
  constructor(private userService: UserService,private route: Router,private router: ActivatedRoute,private signalRService:SignalRService,private _ngZone: NgZone,private authenticationService: AuthenticationService) { 
    
  }

  async ngOnInit(): Promise<void> {
    await this.runData();

    this.userNow = this.authenticationService.currentAccountValue.user;
    if(this.userNow.userImage == null){
      this.userNow.userImage = "../../assets/forum/images1/resources/user2.jpg";
    }
    await this.getDataHasChat(this.userNow.id);

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
      // kết nối
  
    this.hubConnection.on("BroadcastMessage", async () => {  
      var check = await this.check(this.senderId, this.receiverId);
      if(check == "Sender"){
        await this.getDataSend(this.senderId, this.receiverId);
      }
      else if(check == "Receiver"){
        await this.getDataReceive(this.senderId, this.receiverId);
      }  
    });// khi thay đổi update
  }

  async runData(){
    const id = this.router.snapshot.paramMap.get("id");
    await this.getDataUserSend(id);

    this.senderId = Number(this.authenticationService.currentAccountValue.user.id);
    this.receiverId = Number(id);

    var check = await this.check(this.senderId, this.receiverId);
    if(check == "Sender"){
      await this.getDataSend(this.senderId, this.receiverId);
    }
    else if(check == "Receiver"){
      await this.getDataReceive(this.senderId, this.receiverId);
    }
  }

  async getDataUserSend(id){
    this.userSender = await this.userService.getUserFromId(id) as User;
    if(this.userSender.userImage == null){
      this.userSender.userImage = "../../assets/forum/images1/resources/user2.jpg";
    }
  }

  async getDataHasChat(idNow){
    this.listUserHasChat = await this.signalRService.getUserForChat(idNow) as ChatUserViewModel[];
    this.fisrtUserHasChat = this.listUserHasChat[0];
    this.fisrtUserHasChat.active = "active";

    if(this.fisrtUserHasChat.image == null){
      this.fisrtUserHasChat.image = "../../assets/forum/images1/resources/user2.jpg";
    }

    this.listUserHasChat.shift();
    for(let i=0;i<this.listUserHasChat.length;i++){
      if(this.listUserHasChat[i].image == null){
        this.listUserHasChat[i].image = "../../assets/forum/images1/resources/user2.jpg";
      }
    }
  }

  async getDataSend(idSender: number, idReciver: number){
    this.conversation = await this.signalRService.getConservationSend(idSender,idReciver) as any;
    this.messageDatas = this.conversation.messegers;
  }

  async getDataReceive(idSender: number, idReciver: number){
    this.conversation  = await this.signalRService.getConservationReceive(idSender,idReciver) as any;
    this.messageDatas = this.conversation.messegers;
  }

  sendMessage(): void {  
    if (this.txtMessage) {  
      var save = new CreateMessageRequest();
      save.senderId = Number(this.senderId);
      save.receiverId = this.receiverId;
      save.content = this.txtMessage;
      this.signalRService.addMesseger(save).subscribe(data => {
        this.txtMessage = "";
      })
    }  
  } 

  async check(idMain: number, idClick: number){
    return await this.signalRService.checkSenderOrReceiver(idMain,idClick) as any;
  }

  async clickChangeRoute(idSender, idReceiver){
    var userId = 0;

    var userNow = Number(this.authenticationService.currentAccountValue.user.id);

    if(Number(idSender) == userNow){
      userId = idReceiver;
    }

    if(Number(idReceiver) == userNow){
      userId = idSender;
    }
    // var link = '/chat' + '/' + userId;
    // this.route.navigate([link]);
    this.route.navigateByUrl('/chat/' + userId);
    

    await this.getDataUserSend(userId);

    this.receiverId = Number(userId);

    var check = await this.check(this.senderId, this.receiverId);
    if(check == "Sender"){
      await this.getDataSend(this.senderId, this.receiverId);
    }
    else if(check == "Receiver"){
      await this.getDataReceive(this.senderId, this.receiverId);
    }

  }
}
