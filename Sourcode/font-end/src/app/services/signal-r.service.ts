import { EventEmitter, Injectable } from '@angular/core';
import { Messeger } from '../model/Messeger';  
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,of, from } from 'rxjs';
import { map ,tap, catchError} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Conversation } from '../model/Conversation';
import { CreateMessageRequest } from '../model/viewmodel/CreateMessageRequest';

const httpOptions ={
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  private urlAPI = environment.urlAPI;

  constructor( private http: HttpClient) { }

  // public startConnection = () => {
  //   this.hubConnection = new signalR.HubConnectionBuilder()
  //     .withUrl(`http://localhost:5001/signalr`)
  //     .build();

  //   this.hubConnection
  //     .start()
  //     .then(() => {
  //       console.log('Connection started!')
  //     })
  //     .then()
  //     .catch(error => {
  //       console.log('Can not start connection with error: ' + error);
  //     })
  // }

  // public registerOnServerEvents(): void {  
  //   this.hubConnection.on("BroadcastMessage", (data: Messeger) => {  
  //     this.data.messegers.push(data);
  //     console.log(data)
  //   });  
  // } 

  public checkSenderOrReceiver = async (idMain: number, idClick: number) => {
    try {
      const url = `${this.urlAPI + "/api/Messegers/CheckSenderOrReceiver"}/${idMain}/${idClick}`;
      return await this.http.get(url, {responseType: 'text'}).toPromise();
    }
    catch (error) {
      //console.log(error);
    }
  }

  public getConservationSend = async (idSender: number, idReciver: number) => {
    try {
      const url = `${this.urlAPI + "/api/Messegers/GetConservationSend"}/${idSender}/${idReciver}`;
      return await this.http.get<Conversation>(url).toPromise();
    }
    catch (error) {
      //console.log(error);
    }
  }

  public getConservationReceive = async (idSender: number, idReciver: number) => {
    try {
      const url = `${this.urlAPI + "/api/Messegers/GetConservationReceive"}/${idSender}/${idReciver}`;
      return await this.http.get<Conversation>(url).toPromise();
    }
    catch (error) {
      //console.log(error);
    }
  }

  public addMesseger(newMesseger: CreateMessageRequest): Observable<CreateMessageRequest>{
    return this.http.post<CreateMessageRequest>(this.urlAPI + "/api/Messegers", newMesseger, httpOptions).pipe(
      tap((Messeger: CreateMessageRequest) => Messeger),
      catchError(error => of(new CreateMessageRequest()))
    );
  }

  public getNotificationCount = async (idReciver: number) => {
    try {
      const url = `${this.urlAPI + "/api/Notifications/GetNotificationCount"}/${idReciver}`;
      return await this.http.get(url).toPromise();
    }
    catch (error) {
      //console.log(error);
    }
  }

  public getNotificationMessage = async (idReciver: number) => {
    try {
      const url = `${this.urlAPI + "/api/Notifications/GetNotificationMessage"}/${idReciver}`;
      return await this.http.get(url).toPromise();
    }
    catch (error) {
      //console.log(error);
    }
  }

  public getUserForChat = async (id: number) => {
    try {
      const url = `${this.urlAPI + "/api/Messegers/GetChatUser"}/${id}`;
      return await this.http.get(url).toPromise();
    }
    catch (error) {
      //console.log(error);
    }
  }

  public getUpdate = async (id: number, idNotifi: number) => {
    try {
      const url = `${this.urlAPI + "/api/Notifications/PutNotification"}/${id}/${idNotifi}`;
      return await this.http.get(url).toPromise();
    }
    catch (error) {
      // //console.log(error);
    }
  }

  public getUpdateClick = async (id: number, idConver: number) => {
    try {
      const url = `${this.urlAPI + "/api/Notifications/PutNotificationClick"}/${id}/${idConver}`;
      return await this.http.get(url).toPromise();
    }
    catch (error) {
      // //console.log(error);
    }
  }
}
