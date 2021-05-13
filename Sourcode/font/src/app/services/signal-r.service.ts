import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  private hubConnection: signalR.HubConnection;

  constructor() { }

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`http://localhost:5200/signalr`)
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
}
