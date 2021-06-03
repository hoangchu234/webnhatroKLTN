import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/User';
import { Observable,of, from, BehaviorSubject } from 'rxjs';
import { map ,tap, catchError} from 'rxjs/operators';
import { Account } from '../model/Account';
import { environment } from 'src/environments/environment';

const httpOptions ={
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private urlAPI = environment.urlAPI;

  constructor(private http: HttpClient) { }

  /*public getsearchemail(email: string): Observable<User>{
    const url = `${this.urlAPI + "/api/Users/GetUser"}/${email}`;
    return this.http.get<User>(url).pipe(
      tap(selectUserByEmail => console.log(`selectUserByEmail = ${JSON.stringify(selectUserByEmail)}`)),
      catchError(error => of(new User))
    );
  }*/
  public getsearchemail = async (email: string) => {
    try {
      const url = `${this.urlAPI + "/api/Users/GetUser"}/${email}`;
      return await this.http.get(url).toPromise();
    }
    catch (error) {
      console.log(error);
    }
  }


  /*public getsearchemail = (email: string) => {
    const getUrl = `${this.urlAPI}/api/Users/GetUser/${email}`;
        return this.http.get<any>(getUrl).pipe(
            map((users) => {
                if(users == '')
                {
                    return true;
                }
                else{
                    return false;
                }
            })
        )
  }*/

  public adduser(newcuser: User): Observable<User>{
    return this.http.post<User>(this.urlAPI + "/api/Users/Normal", newcuser, httpOptions).pipe(
      tap((user: User) => JSON.stringify(user)),
      catchError(error => of(new User()))
    );
  }

  /*public adduser = async (user: User) => {
    try {
        const loginUrl = `${this.urlAPI}/api/Users/Normal`;
        return await this.http.post(loginUrl, user).toPromise();
    }
    catch (error) {
      console.log(error);
    }
  }*/


  /*public getUserFromId(id: number): Observable<User>{
    const url = `${this.urlAPI + "/api/Users"}/${id}`;
    return this.http.get<User>(url).pipe(
      tap(selectUser => selectUser),
      catchError(error => of(new User()))
    );
  }*/
  public getUserFromId = async (id: number) => {
    try {
      const url = `${this.urlAPI + "/api/Users"}/${id}`;
      return await this.http.get(url).toPromise();
    }
    catch (error) {
      console.log(error);
    }
  }

  public updateAccount(account: Account): Observable<any>{
    return this.http.put(`${this.urlAPI + "/api/Accounts"}/${account.id}`, account, httpOptions).pipe(
      tap(updateAccount => JSON.stringify(updateAccount)),
      catchError(error => of(new Account()))
    );
  }

  public updateUser(user: User): Observable<any>{
    return this.http.put(`${this.urlAPI + "/api/Users"}/${user.id}`, user, httpOptions).pipe(
      tap(updateUser =>  JSON.stringify(updateUser)),
      catchError(error => of(new User()))
    );
  }
}
