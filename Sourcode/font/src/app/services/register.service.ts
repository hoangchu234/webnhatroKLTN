import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Account } from '../model/Account';
import { Observable,of, from } from 'rxjs';
import { map ,tap, catchError} from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const httpOptions ={
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private urlAPI = environment.urlAPI;

  constructor( private http: HttpClient) { }

  // public addAccount(newaccount: Account): Observable<Account>{
  //   return this.http.post<Account>(this.urlAPI + "/api/Accounts/Normal", newaccount, httpOptions).pipe(
  //     tap((account: Account) => console.log(`inserted Account = ${JSON.stringify(account)}`)),
  //     catchError(error => of(new Account()))
  //   );
  // }

  public addAccount = async (account: Account) => {
    try {
        const loginUrl = `${this.urlAPI}/api/Accounts/Normal`;
        return await this.http.post(loginUrl, account).toPromise();
    }
    catch (error) {
      console.log(error);
    }
  }

  forgetPassword = async (account: Account) => {
    try {
        const loginUrl = `${this.urlAPI}/api/Accounts/ForgetPassword`;
        return await this.http.put(loginUrl, account).toPromise();
    }
    catch (error) {
      console.log(error);
    }
  }

  checkPhone = async (phone: string) => {
    try {
      const url = `${this.urlAPI + "/api/Accounts/CheckPhoneNumber"}/${phone}`;      
      return await this.http.get(url, {responseType: 'text'}).toPromise();
    }
    catch (error) {
      console.log(error);
    }
  }

checkPhoneForget = async (phone: string) => {
    try {
      const url = `${this.urlAPI + "/api/Accounts/CheckPhoneNumberForget"}/${phone}`;      
      return await this.http.get(url, {responseType: 'text'}).toPromise();
    }
    catch (error) {
      console.log(error);
    }
  }

  checkPassword = async (id: string, account: Account) => {
    try {
      const url = `${this.urlAPI + "/api/Accounts/CheckPasswordEdit"}/${id}`;      
      return await this.http.post(url,account, {responseType: 'text'}).toPromise();
    }
    catch (error) {
      console.log(error);
    }
  }
}
