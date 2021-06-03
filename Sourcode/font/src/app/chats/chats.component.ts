import { Component, NgZone, OnInit } from '@angular/core';
import { Messeger } from '../model/Messeger';
import { SignalRService } from '../services/signal-r.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent implements OnInit {

  title = 'ClientApp';  
  txtMessage: string = '';  
  uniqueID: string = new Date().getTime().toString();  
  messages = new Array<Messeger>();  
  message = new Messeger();  

  constructor(private signalRService:SignalRService,private _ngZone: NgZone) { 
    this.subscribeToEvents(); 
  }

  ngOnInit(): void {
    this.signalRService.startConnection(); 
    this.signalRService.registerOnServerEvents();
  }

  sendMessage(): void {  
    if (this.txtMessage) {  
      this.message = new Messeger();  
      // this.message.clientuniqueid = this.uniqueID;  
      this.message.type = "sent";  
      this.message.message = this.txtMessage;  
      this.message.date = new Date();  
      this.messages.push(this.message);  
      this.signalRService.sendMessage(this.message);  
      this.txtMessage = '';  
    }  
  }  
  private subscribeToEvents(): void {  
  
    this.signalRService.messageReceived.subscribe((message: Messeger) => {  
      this._ngZone.run(() => {  
        // if (message.clientuniqueid !== this.uniqueID) {  
        //   message.type = "received";  
        //   this.messages.push(message);  
        // }  
      });  
    });  
  }  

}
