import { EventEmitter, Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { Messeger } from '../model/Messeger';  
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,of, from } from 'rxjs';
import { map ,tap, catchError} from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const httpOptions ={
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  private hubConnection: signalR.HubConnection;
  messageReceived = new EventEmitter<Messeger>();  
  
  private urlAPI = environment.urlAPI;

  constructor( private http: HttpClient) { }

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
    this.hubConnection.on('MessageReceived', async (data: any) => {  
     
    });  
  } 

  public getConservation = async (idReciver: number, idSender: number) => {
    try {
      const url = `${this.urlAPI + "/api/Messegers/GetConservation"}/${idReciver}/${idSender}`;
      return await this.http.get(url).toPromise();
    }
    catch (error) {
      console.log(error);
    }
  }


}
