import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,of, from } from 'rxjs';
import { map ,tap, catchError} from 'rxjs/operators';
import { Bill } from '../model/Bill';

const httpOptions ={
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class BillService {

  private urlAPI = 'https://localhost:44324';

  constructor( private http: HttpClient) { }

  public getBills(id: string): Observable<Bill[]> {
    const url = `${this.urlAPI + "/api/Bills/BillUser"}/${id}`;
    return this.http.get<Bill[]>(url).pipe(
      tap(selectBills => selectBills),
      catchError(error => of([]))
    );
  }

  public getAdminBills(): Observable<Bill[]> {
    return this.http.get<Bill[]>(this.urlAPI + "/api/Bills").pipe(
      tap(receivedBills => receivedBills),
      catchError(error => of([]))
    );
  }

  public getNowsBills(): Observable<Bill[]> {
    return this.http.get<Bill[]>(this.urlAPI + "/api/Bills/Nows").pipe(
      tap(receivedNowsBills => receivedNowsBills),
      catchError(error => of([]))
    );
  }

  public getbillbyname(name: string): Observable<Bill[]>{
    const url = `${this.urlAPI + "/api/Bills/GetBill"}/${name}`;
    return this.http.get<Bill[]>(url).pipe(
      tap(getbillbyname => getbillbyname),
      catchError(error => of([]))
    );
  }

  public addbill(newbill: Bill): Observable<Bill>{
    return this.http.post<Bill>(this.urlAPI + "/api/Bills", newbill, httpOptions).pipe(
      tap((bill: Bill) => bill),
      catchError(error => of(new Bill()))
    );
  }
}
