import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Account } from '../model/Account';
import { Observable,of, from } from 'rxjs';
import { map ,tap, catchError} from 'rxjs/operators';

const httpOptions ={
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private urlAPI = 'https://localhost:44324';

  constructor( private http: HttpClient) { }

  public addAccount(newaccount: Account): Observable<Account>{
    return this.http.post<Account>(this.urlAPI + "/api/Accounts/Normal", newaccount, httpOptions).pipe(
      tap((account: Account) => console.log(`inserted Account = ${JSON.stringify(account)}`)),
      catchError(error => of(new Account()))
    );
  }

  /*public addAccount = async (account: Account) => {
    try {
        const loginUrl = `${this.urlAPI}/api/Accounts/Normal`;
        return await this.http.post(loginUrl, account).toPromise();
    }
    catch (error) {
      console.log(error);
    }
  }*/
  
}
