import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,of, from } from 'rxjs';
import { map ,tap, catchError} from 'rxjs/operators';
import { Bill } from '../model/Bill';
import { environment } from 'src/environments/environment';

const httpOptions ={
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class BillService {

  private urlAPI = environment.urlAPI;

  constructor( private http: HttpClient) { }

  /*public getBills(id: string): Observable<Bill[]> {
    const url = `${this.urlAPI + "/api/Bills/BillUser"}/${id}`;
    return this.http.get<Bill[]>(url).pipe(
      tap(selectBills => selectBills),
      catchError(error => of([]))
    );
  }*/
  public getBills = async (id: string) => {
    try {
      const url = `${this.urlAPI + "/api/Bills/BillUser"}/${id}`;
      return await this.http.get(url).toPromise();
    }
    catch (error) {
      console.log(error);
    }
  }
  

  /*public getAdminBills(): Observable<Bill[]> {
    return this.http.get<Bill[]>(this.urlAPI + "/api/Bills").pipe(
      tap(receivedBills => receivedBills),
      catchError(error => of([]))
    );
  }*/
  public getAdminBills = async () => {
    try {
      return await this.http.get(this.urlAPI + "/api/Bills").toPromise();
    }
    catch (e) {
      console.log(e);
    }
  }

  /*public getNowsBills(): Observable<Bill[]> {
    return this.http.get<Bill[]>(this.urlAPI + "/api/Bills/Nows").pipe(
      tap(receivedNowsBills => receivedNowsBills),
      catchError(error => of([]))
    );
  }*/
  public getNowsBills = async () => {
    try {
      return await this.http.get(this.urlAPI + "/api/Bills/Nows").toPromise();
    }
    catch (e) {
      console.log(e);
    }
  }

  //Không xài
  /*public getbillbyname(name: string): Observable<Bill[]>{
    const url = `${this.urlAPI + "/api/Bills/GetBill"}/${name}`;
    return this.http.get<Bill[]>(url).pipe(
      tap(getbillbyname => getbillbyname),
      catchError(error => of([]))
    );
  }*/
  public getbillbyname = async (name: string) => {
    try {
      const url = `${this.urlAPI + "/api/Bills/GetBill"}/${name}`;
      return await this.http.get(url).toPromise();
    }
    catch (error) {
      console.log(error);
    }
  }

  /*public addbill(newbill: Bill): Observable<Bill>{
    return this.http.post<Bill>(this.urlAPI + "/api/Bills", newbill, httpOptions).pipe(
      tap((bill: Bill) => bill),
      catchError(error => of(new Bill()))
    );
  }*/
  public addbill = async (newBill: Bill) => {
    try {
      return await this.http.post(this.urlAPI, newBill).toPromise();
    }
    catch (e) {
      console.log(e);
    }
  }
}
