import { Injectable } from '@angular/core';
import { Reply } from '../model/Reply';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,of, from } from 'rxjs';
import { map ,tap, catchError} from 'rxjs/operators';

const httpOptions ={
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class ReplyService {

  private urlAPI = 'https://localhost:44324';

  constructor( private http: HttpClient) { }

  public addReply(newReply: Reply): Observable<Reply>{
    return this.http.post<Reply>(this.urlAPI + "/api/Replies", newReply, httpOptions).pipe(
      tap((reply: Reply) => reply),
      catchError(error => of(new Reply()))
    );
  }

  /*public getReplyFromUserId(id: number): Observable<Reply[]>{
    const url = `${this.urlAPI + "/api/Replies/GetRepliesByUserId"}/${id}`;
    return this.http.get<Reply[]>(url).pipe(
      tap(selectReply => selectReply),
      catchError(error => of([]))
    );
  }*/
  public getReplyFromUserId = async (id: number) => {
    try {
      const url = `${this.urlAPI + "/api/Replies/GetRepliesByUserId"}/${id}`;
      return await this.http.get(url).toPromise();
    }
    catch (error) {
      console.log(error);
    }
  }


  public updateReply(reply: Reply): Observable<any>{
    return this.http.put(`${this.urlAPI + "/api/Replies"}/${reply.id}`, reply, httpOptions).pipe(
      tap(updateReply => updateReply),
      catchError(error => of(new Reply()))
    );
  }
}
