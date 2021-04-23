import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Account } from '../model/Account';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,of, from } from 'rxjs';
import { map ,tap, catchError} from 'rxjs/operators';
import { StorageService } from '../storage.service';

const httpOptions ={
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};


@Injectable({
    providedIn: 'root',
})

export class AuthenticationService {
 
    public account: Account;

    private currentAccountSubject: BehaviorSubject<Account>;
    //public currentAccount: Observable<Account>;
    private account_storage: string = StorageService.accountStorage;
    public remember: boolean = false;

    private urlAPI = 'https://localhost:44324';

    constructor(private http: HttpClient) {
        //this.currentAccountSubject = new BehaviorSubject<Account>(
        //JSON.parse(localStorage.getItem('currentAccount'))
    //);
        //this.currentAccount = this.currentAccountSubject.asObservable();.
        let account = localStorage.getItem(this.account_storage);
        if (account == null) 
        {
            account = sessionStorage.getItem(this.account_storage);
            this.remember = false;
        }
        else this.remember = true;
        
        let temp = null;
        if (account != null)
        {
            temp = JSON.parse(account)
        }
 
        this.currentAccountSubject = new BehaviorSubject<Account>(temp);
 
        //this.currentAccount = this.currentAccountSubject.asObservable();

    }
  
    public get currentAccountValue(): Account {
        return this.currentAccountSubject.value;
    }

    public saveAccount(account: Account, remember: boolean)
    {
       this.remember = remember;
       this.setAccount(account);
       this.currentAccountSubject.next(account);
    }
  
    private setAccount(account: Account)
    {
        let temp = (JSON.parse(JSON.stringify(account)));
        if (this.remember) localStorage.setItem(this.account_storage, JSON.stringify(temp));
        else  sessionStorage.setItem(this.account_storage, JSON.stringify(temp));
    }

    public loginPhone(account: Account): Observable<Account>{
        return this.http.post<Account>(this.urlAPI + "/api/Accounts/Signin", account, httpOptions).pipe(
          tap((account: Account) => account),
          catchError(error => of(new Account()))
        );
    }

    public loginFacebook = (account: Account) => {
        var path = `${this.urlAPI}/api/Accounts/Signinsocial`;
        return this.http.post<any>(path, account, httpOptions).toPromise() as any;
    }

    /*public login = (password:string, phone:string) => {
            const loginUrl = `${this.urlAPI}/api/Accounts/Signin`;
            return this.http.post<any>(loginUrl, { password, phone })
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
                                    //localStorage.setItem('currentAccount', JSON.stringify(newAccount));
                                    //this.currentAccountSubject.next(newAccount);
                                    return account;
                                } 
                                else {
                                    return null;
                                }
                            })
        );
    }*/

   public loginSocial = (email: string) => {
            console.log(email);
            const loginUrl = `${this.urlAPI}/api/Accounts/Signinsocial`;
            console.log(loginUrl);
            return this.http.post<any>(loginUrl, { email })
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
        //localStorage.removeItem('phone');
        //localStorage.removeItem('password');
        //localStorage.removeItem('currentAccount');
        if (this.remember)
        {
           localStorage.removeItem(this.account_storage);
           this.remember = false;
        }
        else 
        {
           sessionStorage.removeItem(this.account_storage); 
        }
        this.currentAccountSubject.next(null);
    }

    public updateAccountisHD(account: Account): Observable<any>{
        return this.http.put(`${this.urlAPI + "/api/Accounts"}/${account.id}`, account, httpOptions).pipe(
          tap(updateAccount => updateAccount),
          catchError(error => of(new Account()))
        );
      }
}