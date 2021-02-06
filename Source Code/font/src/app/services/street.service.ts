import { Injectable } from '@angular/core';
import { Street } from '../model/Street';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,of, from } from 'rxjs';
import { map ,tap, catchError} from 'rxjs/operators';

const httpOptions ={
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class StreetService {

  private urlAPI = 'https://localhost:44324';

  constructor( private http: HttpClient) { }

  public getStreets(): Observable<Street[]> {
    return this.http.get<Street[]>(this.urlAPI + "/api/Streets").pipe(
      tap(receivedStreets => receivedStreets),
      catchError(error => of([]))
    );
  }

  public getStreetFromId(id: number): Observable<Street>{
    const url = `${this.urlAPI + "/api/Streets/GetStreetByID"}/${id}`;
    return this.http.get<Street>(url).pipe(
      tap(selectStreet => selectStreet),
      catchError(error => of(new Street()))
    );
  }

  public getStreetByProvince(id: number): Observable<Street[]>{
    const url = `${this.urlAPI + "/api/Streets/GetStreetByProvince"}/${id}`;
    return this.http.get<Street[]>(url).pipe(
      tap(selectStreetByCity => selectStreetByCity),
      catchError(error => of([]))
    );
  }
}
