import { EventEmitter, Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { Messeger } from '../model/Messeger';  

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  private hubConnection: signalR.HubConnection;
  messageReceived = new EventEmitter<Messeger>();  
  
  constructor() { }

  sendMessage(message: Messeger) {  
    this.hubConnection.invoke('NewMessage', message);  
  } 

  public startConnection = () => {
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
  }

  public registerOnServerEvents(): void {  
    this.hubConnection.on('MessageReceived', (data: any) => {  
      this.messageReceived.emit(data);  
      console.log(data);
    });  
  } 

}
