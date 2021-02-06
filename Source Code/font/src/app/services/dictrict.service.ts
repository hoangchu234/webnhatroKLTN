import { Injectable } from '@angular/core';
import { District } from '../model/District';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,of, from } from 'rxjs';
import { map ,tap, catchError} from 'rxjs/operators';

const httpOptions ={
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class DictrictService {

  private urlAPI = 'https://localhost:44324';

  constructor( private http: HttpClient) { }

  public getDistricts(): Observable<District[]> {
    return this.http.get<District[]>(this.urlAPI + "/api/Districts").pipe(
      tap(receivedDistricts => receivedDistricts),
      catchError(error => of([]))
    );
  }

  public getDistrictFromId(id: number): Observable<District>{
    const url = `${this.urlAPI + "/api/Districts/GetDistrictByID"}/${id}`;
    return this.http.get<District>(url).pipe(
      tap(selectDistrict => selectDistrict),
      catchError(error => of(new District()))
    );
  }

  public getDistrictByProvince(id: number): Observable<District[]>{
    const url = `${this.urlAPI + "/api/Districts/GetDistrictByProvince"}/${id}`;
    return this.http.get<District[]>(url).pipe(
      tap(selectDistrictByCity => selectDistrictByCity),
      catchError(error => of([]))
    );
  }
}
