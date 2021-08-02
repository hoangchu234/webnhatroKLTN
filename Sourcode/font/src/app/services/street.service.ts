import { Injectable } from '@angular/core';
import { Street } from '../model/Street';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,of, from } from 'rxjs';
import { map ,tap, catchError} from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const httpOptions ={
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class StreetService {

  private urlAPI = environment.urlAPI;

  constructor( private http: HttpClient) { }

  /*public getStreets(): Observable<Street[]> {
    return this.http.get<Street[]>(this.urlAPI + "/api/Streets").pipe(
      tap(receivedStreets => receivedStreets),
      catchError(error => of([]))
    );
  }*/
  // ko dùng
  public getStreets = async () => {
    try {
      return await this.http.get(this.urlAPI + "/api/Streets").toPromise();
    }
    catch (e) {
      // console.log(e);
    }
  }

  /*public getStreetFromId(id: number): Observable<Street>{
    const url = `${this.urlAPI + "/api/Streets/GetStreetByID"}/${id}`;
    return this.http.get<Street>(url).pipe(
      tap(selectStreet => selectStreet),
      catchError(error => of(new Street()))
    );
  }*/
  // ko dùng
  public getStreetFromId = async (id: number) => {
    try {
      const url = `${this.urlAPI + "/api/Streets/GetStreetByID"}/${id}`;
      return await this.http.get(url).toPromise();
    }
    catch (error) {
      // console.log(error);
    }
  }

  /*public getStreetByProvince(id: number): Observable<Street[]>{
    const url = `${this.urlAPI + "/api/Streets/GetStreetByProvince"}/${id}`;
    return this.http.get<Street[]>(url).pipe(
      tap(selectStreetByCity => selectStreetByCity),
      catchError(error => of([]))
    );
  }*/
  public getStreetByProvince = async (id: number) => {
    try {
      const url = `${this.urlAPI + "/api/Streets/GetStreetByProvince"}/${id}`;
      return await this.http.get(url).toPromise();
    }
    catch (error) {
      // console.log(error);
    }
  }
}
