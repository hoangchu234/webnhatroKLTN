import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Account } from '../model/Account';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,of, from } from 'rxjs';
import { map ,tap, catchError} from 'rxjs/operators';

const httpOptions ={
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};


@Injectable({
    providedIn: 'root',
})

export class AuthenticationService {
 
    public account: Account;

    private currentAccountSubject: BehaviorSubject<Account>;
    public currentAccount: Observable<Account>;

    private urlAPI = 'https://localhost:44324';

    constructor(private http: HttpClient) {
        this.currentAccountSubject = new BehaviorSubject<Account>(
        JSON.parse(localStorage.getItem('currentAccount'))
    );
        this.currentAccount = this.currentAccountSubject.asObservable();
    }
  
   public get currentAccountValue(): Account {
        return this.currentAccountSubject.value;
   }

   public login = (password:string, phone:string) => {
            console.log(password + phone);
            const loginUrl = `${this.urlAPI}/api/Accounts/Signin`;
            console.log(loginUrl);
            return this.http
            .post<any>(loginUrl, {
                password,
                phone
            })
            .pipe(
            map((account) => {
                if (account != null){
                    const newAccount = {} as Account;
                    newAccount.id = account.id;
                    newAccount.username = account.username;
                    newAccount.password = account.password;
                    newAccount.roleId = account.roleId;
                    newAccount.isActive = account.isActive;
                    newAccount.role = account.role;
                    if(Number(account.roleId) == Number(1)){
                        newAccount.user = account.user;
                    }
                    else{
                        newAccount.isHD = "1";
                        newAccount.employee = account.employee;
                    }                 
                    console.log(account);
                    localStorage.setItem('currentAccount', JSON.stringify(newAccount));
                    this.currentAccountSubject.next(newAccount);
                    return account;
                } 
                else {
                    return null;
                }
            })
        );
    }

   public loginSocial = (email: string) => {
            console.log(email);
            const loginUrl = `${this.urlAPI}/api/Accounts/Signinsocial`;
            console.log(loginUrl);
            return this.http
            .post<any>(loginUrl, {
                email
        })
        .pipe(
        map((account) => {
        // console.log(user);
            if (account != null){
                const newAccount = {} as Account;
                newAccount.id = account.id;
                newAccount.username = account.username;
                newAccount.password = account.password;
                newAccount.roleId = account.roleId;
                newAccount.isActive = account.isActive;
                newAccount.role = account.role;
                if(Number(account.roleId) == Number(1)){
                    newAccount.user = account.user;
                }
                else{
                    newAccount.isHD = "1";
                    newAccount.employee = account.employee;
                }                 
                console.log(account);
                localStorage.setItem('currentAccount', JSON.stringify(newAccount));
                this.currentAccountSubject.next(newAccount);
                return account;
            } 
            else {
                return null;
            }
        })
        );
    }
  
    public logout = () => {
        localStorage.removeItem('phone');
        localStorage.removeItem('password');
        localStorage.removeItem('currentAccount');
        this.currentAccountSubject.next(null);
    }

    public updateAccountisHD(account: Account): Observable<any>{
        return this.http.put(`${this.urlAPI + "/api/Accounts"}/${account.id}`, account, httpOptions).pipe(
          tap(updateAccount => updateAccount),
          catchError(error => of(new Account()))
        );
      }
}